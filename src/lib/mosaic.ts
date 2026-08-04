/**
 * The tile mosaic that backs every blue panel on the site.
 *
 * A field of 21px tiles samples six soft "light blobs" drifting on slow
 * Lissajous paths. Each blob has a wobbling, lobed radius so the field reads
 * as liquid rather than as overlapping circles. Tints are per-blob:
 *   0 = white light (brightens), -1 = deep blue (darkens), 1 = pink accent.
 *
 * The pointer leaves a wake: recent positions are sampled roughly once per
 * tile of travel, ignite fast, then decay over 1.6s.
 *
 * Every instance seeds its own PRNG from a fixed index, so a canvas that
 * remounts regenerates the identical field — no visual jump on re-render.
 *
 * All canvases share one rAF loop; off-screen ones are skipped per frame.
 */

const TILE = 21;
const TRAIL_MS = 1.6;

type RGB = [number, number, number];

const mix = (a: RGB, b: RGB, k: number): RGB => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
  a[2] + (b[2] - a[2]) * k,
];

const hexRgb = (hex: string): RGB => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

type Palette = { deep: RGB; base: RGB; top: RGB };

/** Derive a three-stop ramp from a single accent colour. */
export function paletteFromHue(hex: string): Palette {
  const base = hexRgb(hex);
  return {
    deep: mix(base, [12, 8, 53], 0.35),
    base: mix(base, [255, 255, 255], 0.3),
    top: mix(base, [255, 255, 255], 0.72),
  };
}

function shade(v: number, pink: number, light: boolean, pal: Palette | null): string {
  const t = Math.max(0, Math.min(1, v));

  if (pal) {
    const c = t < 0.5 ? mix(pal.deep, pal.base, t * 2) : mix(pal.base, pal.top, (t - 0.5) * 2);
    return `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
  }

  // The light variant never reaches white — it sits in blue/pink territory
  // so it reads as decoration against a white page rather than as a gap.
  const deep: RGB = light ? [55, 155, 255] : [43, 102, 246];
  const base: RGB = light ? [122, 188, 255] : [155, 205, 255];
  const top: RGB = light ? [190, 222, 255] : [255, 255, 255];

  let c = t < 0.5 ? mix(deep, base, t * 2) : mix(base, top, (t - 0.5) * 2);
  if (pink > 0) c = mix(c, [255, 123, 223], Math.min(light ? 0.75 : 0.45, pink));
  return `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
}

type Blob = {
  ax: number; ay: number;
  rx: number; ry: number;
  sx: number; sy: number;
  px: number; py: number;
  rad: number; w: number; tint: number;
  lobes: number; lph: number; lamp: number; lspd: number;
};

type Field = {
  cols: number; rows: number;
  blobs: Blob[];
  trail: { x: number; y: number; t: number }[];
  ox: number;
};

export type MosaicOptions = {
  /** Stable per-instance seed. Same index => same field, always. */
  seedIndex: number;
  /** Pale variant used in the page gutters. */
  light?: boolean;
  /** Tint the whole field toward one accent colour. */
  hue?: string | null;
  /** Anchor tiles to the right edge (for gutters on the left of the page). */
  alignRight?: boolean;
};

function tintsFor({ seedIndex, light, hue }: MosaicOptions): number[] {
  if (hue) return [0, 0, -1, 0, 0, -1];
  if (light) return [0, 1, 0, 1, 0, 1];
  // The first full mosaic on the page gets extra pink so the accent reads
  // immediately; later ones are calmer.
  return seedIndex === 0 ? [1, 1, -1, 1, 0, -1] : [0, 0, -1, 1, 0, -1];
}

function buildField(w: number, h: number, opts: MosaicOptions): Field {
  const cols = Math.ceil(w / TILE);
  const rows = Math.ceil(h / TILE);
  const tints = tintsFor(opts);

  let seed = (opts.seedIndex + 1) * 1013904223;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const blobs: Blob[] = [];
  for (let i = 0; i < 6; i++) {
    const tint = tints[i];
    blobs.push({
      ax: (i + 0.5) * (cols / 6) + (rnd() - 0.5) * cols * 0.15,
      ay: rnd() * rows,
      rx: cols * (0.2 + rnd() * 0.3),
      ry: rows * (0.25 + rnd() * 0.4),
      sx: 0.015 + rnd() * 0.025,
      sy: 0.012 + rnd() * 0.02,
      px: rnd() * 6.28,
      py: rnd() * 6.28,
      // Pink blobs stay small and dim so the accent reads as a hint.
      rad: tint === 1 ? cols * 0.14 + rnd() * cols * 0.1 : cols * 0.3 + rnd() * cols * 0.25,
      w: tint === 1 ? 0.35 + rnd() * 0.15 : 0.6 + rnd() * 0.4,
      tint,
      lobes: 2 + Math.floor(rnd() * 3),
      lph: rnd() * 6.28,
      lamp: 0.25 + rnd() * 0.25,
      lspd: (rnd() - 0.5) * 0.3,
    });
  }

  return {
    cols,
    rows,
    blobs,
    trail: [],
    ox: opts.alignRight ? w - cols * TILE : 0,
  };
}

type Entry = {
  canvas: HTMLCanvasElement;
  opts: MosaicOptions;
  field: Field | null;
};

const entries = new Set<Entry>();
let raf: number | null = null;

function paint(entry: Entry, now: number) {
  const { canvas } = entry;
  const rect = canvas.getBoundingClientRect();
  if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;

  if (canvas.width !== w || canvas.height !== h || !entry.field) {
    canvas.width = w;
    canvas.height = h;
    entry.field = buildField(w, h, entry.opts);
  }

  const field = entry.field;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const light = !!entry.opts.light;
  const pal = entry.opts.hue ? paletteFromHue(entry.opts.hue) : null;

  const pos = field.blobs.map((b) => ({
    x: b.ax + b.rx * Math.sin(now * b.sx * 6.28 + b.px),
    y: b.ay + b.ry * Math.sin(now * b.sy * 6.28 + b.py),
    rad: b.rad,
    w: b.w,
    tint: b.tint,
    lobes: b.lobes,
    lph: b.lph + now * b.lspd,
    lamp: b.lamp,
  }));

  // Fade out the pointer wake: quick ignite, slow decay.
  while (field.trail.length && now - field.trail[0].t > TRAIL_MS) field.trail.shift();
  const wake: { x: number; y: number; w: number }[] = [];
  for (const p of field.trail) {
    const age = now - p.t;
    const w2 = Math.min(1, age * 8) * Math.exp(-age * 2.2);
    if (w2 > 0.02) wake.push({ x: p.x, y: p.y, w: w2 * 0.2 });
  }

  const mr = Math.max(2.5, field.cols * 0.055);
  const mr2 = mr * mr;

  for (let c = 0; c < field.cols; c++) {
    for (let r = 0; r < field.rows; r++) {
      let bright = 0;
      let dark = 0;
      let pink = 0;

      for (const p of wake) {
        // y is scaled by 1.35 throughout so the falloff stays circular
        // despite tiles being taller than wide once the +1 overlap lands.
        const dx = c - p.x;
        const dy = (r - p.y) * 1.35;
        bright += p.w * Math.exp(-(dx * dx + dy * dy) / mr2);
      }

      for (const p of pos) {
        const dx = c - p.x;
        const dy = (r - p.y) * 1.35;
        const ang = Math.atan2(dy, dx);
        const rr = p.rad * (1 + p.lamp * Math.sin(p.lobes * ang + p.lph));
        const f = p.w * Math.exp(-(dx * dx + dy * dy) / (rr * rr));

        if (p.tint === 1) pink += f * 0.35;
        else if (p.tint === -1) dark += f;
        else bright += f;
      }

      const v = light ? 0.5 + bright * 0.6 - dark * 0.25 : 0.5 + bright * 0.75 - dark * 0.7;
      ctx.fillStyle = shade(v, light ? pink * 1.6 : pink, light, pal);
      // +1 on the size closes the seams between tiles.
      ctx.fillRect(c * TILE + field.ox, r * TILE, TILE + 1, TILE + 1);
    }
  }
}

function loop() {
  const now = performance.now() / 1000;
  for (const entry of entries) paint(entry, now);
  raf = entries.size ? requestAnimationFrame(loop) : null;
}

/** Register a canvas with the shared render loop. Returns an unsubscribe fn. */
export function registerMosaic(
  canvas: HTMLCanvasElement,
  opts: MosaicOptions,
): { update: (next: MosaicOptions) => void; dispose: () => void } {
  const entry: Entry = { canvas, opts, field: null };
  entries.add(entry);

  const onMove = (ev: PointerEvent) => {
    const field = entry.field;
    if (!field) return;
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / TILE;
    const y = (ev.clientY - rect.top) / TILE;
    const last = field.trail[field.trail.length - 1];
    // Sample roughly once per tile of travel.
    if (!last || (x - last.x) ** 2 + (y - last.y) ** 2 > 1) {
      field.trail.push({ x, y, t: performance.now() / 1000 });
      if (field.trail.length > 40) field.trail.shift();
    }
  };

  // Gutter mosaics live inside pointer-events:none wrappers, so they can't
  // receive their own events — listen on the document instead.
  const host: Document | HTMLElement = opts.light ? document : (canvas.parentElement ?? document);
  host.addEventListener("pointermove", onMove as EventListener, { passive: true });

  if (raf === null) raf = requestAnimationFrame(loop);

  return {
    update(next) {
      // Only a hue swap should survive without rebuilding the field —
      // the blob geometry is identical, just re-shaded.
      entry.opts = { ...entry.opts, ...next };
    },
    dispose() {
      host.removeEventListener("pointermove", onMove as EventListener);
      entries.delete(entry);
      if (!entries.size && raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    },
  };
}
