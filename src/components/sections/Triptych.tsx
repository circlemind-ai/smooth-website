import Image from "next/image";
import { SpecTip } from "@/components/ui/SpecTip";
import { Rail } from "@/components/ui/Rail";

// Benchmark rows for the "sota reliability" cell — parked while the cell
// tries on the plug & play content; restore together with the bar chart.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rows: {
  label: string;
  src: string;
  size: number;
  score: number;
  self?: boolean;
}[] = [
  {
    label: "smooth",
    src: "/assets/smooth-symbol.jpg",
    size: 16,
    score: 92,
    self: true,
  },
  {
    label: "openai operator",
    src: "/assets/logo-openai-trim.png",
    size: 14,
    score: 87,
  },
  {
    label: "claude computer use",
    src: "/assets/logo-anthropic.png",
    size: 16,
    score: 84,
  },
  {
    label: "gemini 2.5 computer use",
    src: "/assets/logo-gemini.png",
    size: 16,
    score: 79,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- parked with the bar chart
function BrandMark({ src, size }: { src: string; size: number }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="block shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

// Only used by the benchmarks link, which is hidden until the repo is public.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GithubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="currentColor"
      className="shrink-0 -mb-px"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/** Tiny seeded LCG so the "random" pink cubes are stable across renders. */
function makeRnd(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/**
 * Isometric grid of cubes, drawn in the same blue line-art style as the
 * iso-5x/7x numerals. Build-up variant: cubes pop in floor by floor (see
 * `.iso-cube` in globals.css), hold, dissolve as one, loop. Currently
 * benched in favour of IsoCubeGridPulse below — kept for easy revert.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function IsoCubeGrid() {
  const N = 4; // cubes per edge of each floor
  const LAYERS = 3; // floors
  // grid pitch (cube spacing) is larger than the cube itself, so the
  // boxes float with a visible gap in every direction
  const px = 24; // horizontal half-pitch
  const py = 12; // vertical half-pitch (2:1 isometric)
  const step = 39; // vertical pitch between stacked layers
  const a = 18; // cube half-width
  const b = 9; // cube half-height
  const ch = 18; // cube height

  // One or two pink odd-ones-out per floor, picked by a seeded PRNG so the
  // server and client render the same "random" cubes. Picks are confined to
  // positions whose faces are actually visible: anywhere on the top floor,
  // front edges (i or j = N-1) on the floors below.
  const rnd = makeRnd(0x5eed);
  const pinks = new Set<string>();
  for (let k = 0; k < LAYERS; k++) {
    const count = rnd() < 0.5 ? 1 : 2;
    for (let c = 0; c < count; c++) {
      if (k === LAYERS - 1) {
        pinks.add(`${(rnd() * N) | 0},${(rnd() * N) | 0},${k}`);
      } else {
        const t = (rnd() * N) | 0;
        pinks.add(rnd() < 0.5 ? `${N - 1},${t},${k}` : `${t},${N - 1},${k}`);
      }
    }
  }

  const cubes: { x: number; y: number; delay: number; pink: boolean }[] = [];
  // paint back-to-front, bottom-to-top so near cubes occlude far ones
  for (let sum = 0; sum <= 2 * (N - 1); sum++) {
    for (let i = 0; i < N; i++) {
      const j = sum - i;
      if (j < 0 || j >= N) continue;
      for (let k = 0; k < LAYERS; k++) {
        cubes.push({
          x: 120 + (i - j) * px,
          y: 11 + (i + j) * py + (LAYERS - 1 - k) * step,
          // construction order: floors rise bottom-to-top (k), each floor
          // fills back-to-front (i+j) — one coherent sweep, not a scatter
          delay: k * 0.28 + (i + j) * 0.034,
          pink: pinks.has(`${i},${j},${k}`),
        });
      }
    }
  }

  return (
    <svg
      viewBox="0 0 240 190"
      aria-hidden
      className="block w-[78%] max-w-[240px]"
    >
      <g className="iso-grid">
        {cubes.map(({ x, y, delay, pink }, n) => (
          <g
            key={n}
            className="iso-cube"
            style={{ "--d": `${delay}s` } as React.CSSProperties}
            stroke={pink ? "#FF7BDF" : "var(--color-accent)"}
            strokeWidth="1.4"
            strokeLinejoin="round"
          >
            <path
              d={`M${x} ${y - b} L${x + a} ${y} L${x} ${y + b} L${x - a} ${y} Z`}
              fill={pink ? "#FFE4F8" : "#EDF5FF"}
            />
            <path
              d={`M${x - a} ${y} L${x} ${y + b} L${x} ${y + b + ch} L${x - a} ${y + ch} Z`}
              fill="#FFFFFF"
            />
            <path
              d={`M${x + a} ${y} L${x} ${y + b} L${x} ${y + b + ch} L${x + a} ${y + ch} Z`}
              fill={pink ? "#FFD6F4" : "#DEEEFF"}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * Pulse variant: the full grid is always present, and pink "activity"
 * roams across it — a seeded pool of visible cubes each flashes pink on
 * its own offset within a shared 5s loop (see `.iso-pink` in globals.css).
 * Pool size × duty cycle ≈ 1–2 pink cubes per floor at any moment, the
 * same ratio as the build-up variant's static picks.
 */
function IsoCubeGridPulse() {
  const N = 4; // cubes per edge of each floor
  const LAYERS = 3; // floors
  const px = 24; // horizontal half-pitch
  const py = 12; // vertical half-pitch (2:1 isometric)
  const step = 39; // vertical pitch between stacked layers
  const a = 18; // cube half-width
  const b = 9; // cube half-height
  const ch = 18; // cube height

  // Six pulse candidates per floor, drawn from positions whose faces are
  // visible (anywhere on the top floor, front edges below), each with a
  // seeded offset into the loop. One per floor stays pink for the static
  // reduced-motion render.
  const rnd = makeRnd(0xa11ce);
  const pulses = new Map<string, { delay: number; staticPink: boolean }>();
  for (let k = 0; k < LAYERS; k++) {
    const visible: [number, number][] = [];
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        if (k === LAYERS - 1 || i === N - 1 || j === N - 1)
          visible.push([i, j]);
    for (let t = visible.length - 1; t > 0; t--) {
      const r = (rnd() * (t + 1)) | 0;
      [visible[t], visible[r]] = [visible[r], visible[t]];
    }
    visible.slice(0, 6).forEach(([i, j], idx) => {
      pulses.set(`${i},${j},${k}`, { delay: rnd() * 5, staticPink: idx === 0 });
    });
  }

  const cubes: {
    x: number;
    y: number;
    pulse?: { delay: number; staticPink: boolean };
  }[] = [];
  // paint back-to-front, bottom-to-top so near cubes occlude far ones
  for (let sum = 0; sum <= 2 * (N - 1); sum++) {
    for (let i = 0; i < N; i++) {
      const j = sum - i;
      if (j < 0 || j >= N) continue;
      for (let k = 0; k < LAYERS; k++) {
        cubes.push({
          x: 120 + (i - j) * px,
          y: 11 + (i + j) * py + (LAYERS - 1 - k) * step,
          pulse: pulses.get(`${i},${j},${k}`),
        });
      }
    }
  }

  const faces = (x: number, y: number, fills: [string, string, string]) => (
    <>
      <path
        d={`M${x} ${y - b} L${x + a} ${y} L${x} ${y + b} L${x - a} ${y} Z`}
        fill={fills[0]}
      />
      <path
        d={`M${x - a} ${y} L${x} ${y + b} L${x} ${y + b + ch} L${x - a} ${y + ch} Z`}
        fill={fills[1]}
      />
      <path
        d={`M${x + a} ${y} L${x} ${y + b} L${x} ${y + b + ch} L${x + a} ${y + ch} Z`}
        fill={fills[2]}
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 240 190"
      aria-hidden
      className="block w-[78%] max-w-[240px]"
    >
      {cubes.map(({ x, y, pulse }, n) => (
        <g key={n} strokeWidth="1.4" strokeLinejoin="round">
          <g stroke="var(--color-accent)">
            {faces(x, y, ["#EDF5FF", "#FFFFFF", "#DEEEFF"])}
          </g>
          {pulse && (
            <g
              className={`iso-pink${pulse.staticPink ? " iso-pink-static" : ""}`}
              style={{ "--d": `${pulse.delay.toFixed(2)}s` } as React.CSSProperties}
              stroke="#FF7BDF"
            >
              {faces(x, y, ["#FFE4F8", "#FFFFFF", "#FFD6F4"])}
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

const heading =
  "m-0 font-mono text-[clamp(17px,1.8vw,21px)] font-semibold tracking-[-0.02em]";
const body = "m-0 text-sm leading-[1.65] text-pretty text-dim";
const cell = "flex min-w-0 flex-col gap-4 px-8 pt-9 pb-10";

export function Triptych() {
  return (
    <Rail id="benchmarks">
      <div className="grid grid-cols-[1.25fr_1fr_1fr] max-md:grid-cols-1 max-md:[&>div+div]:border-t max-md:[&>div+div]:border-dashed max-md:[&>div+div]:border-line">
        {/* scalability — the "sota reliability" bar chart this cell used to
            carry is parked at the bottom of this file. */}
        <div className={cell}>
          <div className="flex flex-1 items-center justify-center">
            <IsoCubeGridPulse />
          </div>
          <h3 className={heading}>infinitely scalable &amp; serverless</h3>
          <p className={body}>
            from one-off runs to millions of executions, smooth scales
            instantly with zero infrastructure management
          </p>
        </div>

        {/* speed */}
        <div
          className={`${cell} border-l border-dashed border-line max-md:border-l-0`}
        >
          <div className="flex flex-1 items-start justify-center pt-2">
            <Image
              src="/assets/iso-5x.png"
              alt="5x faster"
              width={260}
              height={260}
              className="block w-[78%] max-w-[260px] object-contain"
            />
          </div>
          <h3 className={heading}>really, really fast</h3>
          <p className={body}>
            we use{" "}
            <SpecTip tip="small language models, orders of magnitude smaller than frontier LLMs">
              SLMs
            </SpecTip>{" "}
            and a few{" "}
            <SpecTip tip="for example, we colocate the agent and the browser to minimize network latency">
              engineering tricks
            </SpecTip>{" "}
            to make things really fast
          </p>
        </div>

        {/* cost */}
        <div
          className={`${cell} border-l border-dashed border-line max-md:border-l-0`}
        >
          <div className="flex flex-1 items-start justify-center pt-2">
            <Image
              src="/assets/iso-7x.png"
              alt="7x cheaper"
              width={260}
              height={260}
              className="block w-[78%] max-w-[260px] object-contain"
            />
          </div>
          <h3 className={heading}>massively cheaper</h3>
          <p className={body}>
            small models get the job done at a fraction of the cost
          </p>
        </div>
      </div>
    </Rail>
  );
}

/* Parked: the "sota reliability" cell this section carried before trying the
   plug & play content — drop back into the first cell to restore.

        <div className={cell}>
          <div className="mt-1 flex flex-1 flex-col justify-center">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <BrandMark src={r.src} size={r.size} />
                  <span
                    className={`truncate font-mono text-[12.5px] ${
                      r.self ? "font-bold text-ink" : "text-dim"
                    }`}
                  >
                    {r.label}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className="relative block h-2 w-[74px] border border-line bg-soft">
                    <span
                      className={`absolute inset-y-0 left-0 ${r.self ? "bg-accent" : "bg-hair"}`}
                      style={{ width: `${r.score}%` }}
                    />
                  </span>
                  <span
                    className={`w-[34px] text-right font-mono text-[12.5px] ${
                      r.self ? "font-bold" : ""
                    }`}
                  >
                    {r.score}%
                  </span>
                </span>
              </div>
            ))}
            <div className="mt-2 font-mono text-[11px] text-[#A4A4A4]">
              webvoyager pass@1
            </div>
          </div>
          <h3 className={heading}>sota reliability</h3>
          <p className={body}>
            we develop small specialized models that are more reliable at web
            navigation than any frontier model
          </p>
        </div>
*/
