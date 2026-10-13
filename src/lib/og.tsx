import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared pieces for the generated share cards (opengraph-image.tsx files):
 * the brand fonts loaded from disk, and the pink/blue tile strip that
 * echoes the site's canvases.
 */

/** The tile-canvas palette, mostly blues with pink passing through. */
const TILE_STRIP = [
  "#2b66f6", "#168aff", "#9bcdff", "#bcdeff", "#168aff", "#ff7bdf",
  "#9bcdff", "#2b66f6", "#deeeff", "#168aff", "#bcdeff", "#ff7bdf",
  "#168aff", "#9bcdff", "#2b66f6", "#bcdeff", "#168aff", "#deeeff",
  "#ff7bdf", "#9bcdff",
];

export async function loadOgFonts() {
  const [mono, fuzzy] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/JetBrainsMono-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/fonts/FuzzyBubbles-Bold.ttf")),
  ]);
  return [
    { name: "JetBrains Mono", data: mono, weight: 600 as const },
    { name: "Fuzzy Bubbles", data: fuzzy, weight: 700 as const },
  ];
}

export function TileStrip() {
  return (
    <div style={{ display: "flex", gap: 8, padding: "0 88px 56px" }}>
      {TILE_STRIP.map((c, i) => (
        <div
          key={i}
          style={{ width: 43, height: 26, background: c, borderRadius: 3 }}
        />
      ))}
    </div>
  );
}
