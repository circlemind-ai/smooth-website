"use client";

import { useEffect, useRef } from "react";

/**
 * Animated "LED tile" backdrop, ported from agentcard.sh's TileStage (the
 * canvas behind their Vault product card). A grid of 10x4px tiles on a 6px
 * row pitch, shaded by two-octave value noise: one field drives brightness,
 * a second slower field picks the hue along a looping blue colour ramp.
 * The pointer leaves glowing trails — a click sends a ripple ring through
 * the grid. (Their center-out reveal animation is deliberately omitted:
 * the field starts fully drawn.)
 *
 * Plain 2D canvas — no WebGL. Absolutely positioned to fill its parent; the
 * parent needs `position: relative`, `overflow: hidden`, and a dark
 * background (see BACK_FACTOR below) for the pre-paint frame. Pointer
 * listeners attach to the canvas's grandparent, so trails work while
 * hovering the content sitting on top.
 */

/*
 * The original mosaic's pink-and-blue mix, arranged as a looping ramp:
 * mostly blues with a pink passage, same shape as agentcard's ramp
 * (dark → bright → peak → back down → dark).
 */
const RAMP_LOOP = [
  "#2b66f6", // original mosaic deep blue
  "#1063b6", // accent-deep
  "#168aff", // accent
  "#9bcdff", // original mosaic light blue
  "#ff7bdf", // original mosaic pink
  "#2b66f6",
  "#0c0835", // ink
];
/*
 * Light mode swaps the ink stop for a blue — on a white base the dark
 * passages read as smudges, and the original mosaic never went dark.
 */
const LIGHT_RAMP_LOOP = [...RAMP_LOOP.slice(0, 6), "#59abff"];

/* Peak-brightness tiles blend toward this (their --palette-sky). */
const SKY = "#bcdeff";
/* Dark mode: background = this fraction of RAMP_LOOP[0] → `bg-[#07122c]`. */
const BACK_FACTOR = 0.18;

function hexToRgb(hex: string): number[] {
  const s = hex.trim().replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" + [r, g, b].map((v) => (v | 0).toString(16).padStart(2, "0")).join("")
  );
}

/** Integer-lattice hash → [0,1). */
function hash(x: number, y: number, z: number): number {
  let h =
    (Math.imul(x, 0x165667b1) +
      Math.imul(y, 0x27d4eb2f) +
      Math.imul(z, 0x55dec49b)) |
    0;
  h = Math.imul(h ^ (h >>> 13), 0x4bf19f61);
  return ((h ^= h >>> 16) >>> 0) / 0x100000000;
}

/** Trilinear value noise with smoothstep fades. */
function valueNoise(x: number, y: number, z: number): number {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  const xf = x - xi,
    yf = y - yi,
    zf = z - zi;
  const u = xf * xf * (3 - 2 * xf),
    v = yf * yf * (3 - 2 * yf);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c00 = lerp(hash(xi, yi, zi), hash(xi + 1, yi, zi), u);
  const c10 = lerp(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u);
  const c01 = lerp(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u);
  const c11 = lerp(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u);
  return lerp(lerp(c00, c10, v), lerp(c01, c11, v), zf * zf * (3 - 2 * zf));
}

/** Two octaves is enough for tiles this coarse. */
function fbm(x: number, y: number, z: number): number {
  return (
    0.62 * valueNoise(x, y, z) +
    0.38 * valueNoise(2.17 * x + 11.3, 2.17 * y + 7.9, 2.17 * z + 3.1)
  );
}

const smooth = (t: number) =>
  t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);

/** 512-entry gradient LUT over the colour loop, interpolated in sqrt space. */
function buildRamp(colors: number[][]): Uint8ClampedArray {
  const out = new Uint8ClampedArray(1536);
  const n = colors.length;
  for (let i = 0; i < 512; i++) {
    const pos = (i / 512) * n;
    const idx = Math.floor(pos);
    let f = pos - idx;
    f = f * f * (3 - 2 * f);
    const a = colors[idx % n];
    const b = colors[(idx + 1) % n];
    for (let ch = 0; ch < 3; ch++)
      out[3 * i + ch] = Math.sqrt(a[ch] * a[ch] * (1 - f) + b[ch] * b[ch] * f);
  }
  return out;
}

export function TileStage({
  seed = 0,
  pointer = true,
  light = false,
  hue,
  className = "",
}: {
  seed?: number;
  pointer?: boolean;
  /**
   * Tint the whole field toward one accent colour (light mode only) — the
   * ramp collapses to that hue and brightness does the deep → pastel → white
   * work, like the original mosaic's `hue`. Changing it re-shades in place.
   */
  hue?: string;
  /**
   * Pastel variant in the spirit of the original mosaic: brightness maps to
   * lightness (deep blue valleys → pastel → near-white peaks, with pink
   * passages) and tiles fill the row pitch so the field reads liquid instead
   * of interlaced. Parent background should be #BCDEFF.
   */
  light?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const hueRef = useRef(hue);
  hueRef.current = hue;
  const repaintRef = useRef<((h?: string) => void) | null>(null);

  // Hue swaps re-shade the live field instead of tearing it down, so the
  // animation doesn't jump when the selection changes.
  useEffect(() => {
    repaintRef.current?.(hue);
  }, [hue]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const host = canvas.parentElement?.parentElement ?? canvas;

    const sky = hexToRgb(SKY);
    const tileH = light ? 6 : 4;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const colorCache = new Map<number, string>();
    let ramp: Uint8ClampedArray;
    let back: string;
    const setPalette = (hueColor?: string) => {
      colorCache.clear();
      if (light && hueColor) {
        const [hr, hg, hb] = hexToRgb(hueColor);
        ramp = buildRamp([[hr, hg, hb]]);
        back = rgbToHex(
          hr + (255 - hr) * 0.65,
          hg + (255 - hg) * 0.65,
          hb + (255 - hb) * 0.65,
        );
      } else {
        ramp = buildRamp(
          (light ? LIGHT_RAMP_LOOP : RAMP_LOOP).map(hexToRgb),
        );
        const [br, bg, bb] = hexToRgb(RAMP_LOOP[0]);
        back = light
          ? "#bcdeff"
          : rgbToHex(BACK_FACTOR * br, BACK_FACTOR * bg, BACK_FACTOR * bb);
      }
    };
    setPalette(hueRef.current);
    let cols = 0,
      rows = 0,
      offX = 0,
      offY = 0;
    let rafId = 0,
      lastT = 0;
    let clock = 37 * seed; // noise time, offset per stage
    let trailClock = 0; // pointer-trail timeline
    let onScreen = false;
    const dabs: { x: number; y: number; t: number; r: number; a: number }[] =
      [];
    const ripples: { x: number; y: number; t: number }[] = [];
    let lastCell = -1;

    const frame = (dt: number) => {
      trailClock += dt;
      clock += dt;
      for (let i = dabs.length - 1; i >= 0; i--) {
        dabs[i].t += dt;
        if (dabs[i].t > 1.5) dabs.splice(i, 1);
      }
      while (ripples.length && trailClock - ripples[0].t > 0.52)
        ripples.shift();

      ctx.fillStyle = back;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < rows; row++) {
        const py = offY + 6 * row;
        const ny = ((row + 0.5) * 6) / 16;
        for (let col = 0; col < cols; col++) {
          const nx = ((col + 0.5) * 10) / 16;

          let v = fbm(
            0.1 * nx + 0.06 * clock,
            0.1 * ny + 0.025 * clock,
            0.09 * clock + 47.1 + seed,
          );
          v = (v - 0.02) / 0.98;
          v = v < 0 ? 0 : Math.pow(v, 0.95);
          v = 0.6 + 0.4 * (v > 1 ? 1 : v);

          let hue =
            fbm(
              0.05 * nx + 0.04 * clock,
              0.05 * ny + 0.018 * clock,
              0.05 * clock + 3.1 * seed,
            ) +
            0.012 * clock;

          if (ripples.length) {
            let boost = 0;
            for (const rp of ripples) {
              const t = trailClock - rp.t - 0.07;
              if (t < 0) continue;
              const fade = 1 - t / 0.45;
              if (fade <= 0) continue;
              const f2 = fade * fade;
              const dx = nx - rp.x,
                dy = ny - rp.y;
              const d2 = dx * dx + dy * dy;
              const spread = 0.42 + 2.1 * t;
              boost += 0.22 * f2 * Math.exp(-d2 / (spread * spread * 0.28));
              const ring = Math.sqrt(d2) - 6.5 * t;
              boost += 0.28 * f2 * Math.exp(-(ring * ring) / 0.7);
            }
            if (boost > 0.004) {
              v += boost;
              hue += 0.09 * boost;
            }
          }

          for (const dab of dabs) {
            const dx = nx - dab.x,
              dy = ny - dab.y;
            if (dx > 8 || dx < -8 || dy > 8 || dy < -8) continue;
            const g =
              Math.exp(-(dx * dx + dy * dy) / dab.r) *
              Math.exp(-dab.t / 0.55) *
              dab.a;
            v += g;
            hue += 0.1 * g;
          }

          if (v > 1) v = 1;

          const hueIdx = (512 * (hue - Math.floor(hue))) | 0;
          const briIdx = (63 * v) | 0;
          const key = (hueIdx << 6) | briIdx;
          let color = colorCache.get(key);
          if (!color) {
            const bri = (briIdx + 0.5) / 64;
            const base = 3 * hueIdx;
            let ch: (i: number) => number;
            if (light) {
              // Same three-stop treatment the original mosaic applied to its
              // accent colours: deep shadow → 30%-white pastel → 72%-white
              // top, indexed by brightness. The hue still comes from the ramp.
              const t = Math.max(0, Math.min(1, (bri - 0.55) / 0.45));
              const DEEP = [12, 8, 53]; // the mosaic's ink anchor
              ch = (i) => {
                const c = ramp[base + i];
                const deep = c + (DEEP[i] - c) * 0.35;
                const mid = c + (255 - c) * 0.3;
                const top = c + (255 - c) * 0.72;
                return t < 0.5
                  ? deep + (mid - deep) * (t * 2)
                  : mid + (top - mid) * ((t - 0.5) * 2);
              };
            } else {
              const toSky = 0.75 * smooth((bri - 0.78) / 0.22);
              ch = (i) => ramp[base + i] * bri * (1 - toSky) + sky[i] * toSky;
            }
            color = rgbToHex(ch(0), ch(1), ch(2));
            colorCache.set(key, color);
          }
          ctx.fillStyle = color;
          ctx.fillRect(offX + 10 * col, py, 10, tileH);
        }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      frame(dt);
      rafId = requestAnimationFrame(tick);
    };

    let pressed = false;
    const addPointer = (e: PointerEvent, big: boolean, force: boolean) => {
      if (still) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / 16;
      const y = (e.clientY - rect.top) / 16;
      const last = ripples[ripples.length - 1];
      if (
        force ||
        !last ||
        Math.hypot(x - last.x, y - last.y) >= 0.62 ||
        trailClock - last.t >= 0.035
      ) {
        ripples.push({ x, y, t: trailClock });
        if (ripples.length > 28) ripples.shift();
      }
      const cell = ((2 * x) | 0) + ((2 * y) | 0) * 4096;
      if (cell !== lastCell || force) {
        lastCell = cell;
        dabs.push({ x, y, t: 0, r: big ? 12 : 6.5, a: big ? 0.85 : 0.38 });
        if (dabs.length > 60) dabs.shift();
      }
    };
    const onMove = (e: PointerEvent) => addPointer(e, pressed, false);
    const onDown = (e: PointerEvent) => {
      pressed = true;
      addPointer(e, true, true);
    };
    const onUp = () => {
      pressed = false;
    };
    if (pointer) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
    }

    const ro = new ResizeObserver(() => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / 10);
      rows = Math.ceil(height / 6) + 1;
      offX = Math.round((width - 10 * cols) / 2);
      offY = Math.round((height - 6 * rows + 2) / 2);
      if (!onScreen || still) frame(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      cancelAnimationFrame(rafId);
      if (onScreen && !still) {
        lastT = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    });
    io.observe(canvas);

    repaintRef.current = (h?: string) => {
      setPalette(h);
      // Animated stages pick the new palette up next frame; static ones
      // (off-screen or reduced motion) need an explicit repaint.
      if (!onScreen || still) frame(0);
    };

    return () => {
      repaintRef.current = null;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [seed, pointer, light]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <canvas
        ref={ref}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
