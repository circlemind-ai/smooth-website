/**
 * The dashed band that separates every major block: a hairline, then a 42px
 * row and an 84px row. The vertical rails continue through it, and one page
 * gutter — alternating left/right down the page — is filled with a light
 * canvas mosaic so the margin isn't dead space.
 *
 * 603px is half the wide rail (1204/2) plus the hairline, so the gutter
 * starts exactly where the rail ends. Under 1240px the rail pins to an 18px
 * margin, so the gutter follows it in.
 */
import { TileMosaic } from "@/components/ui/TileMosaic";
import { Rail } from "@/components/ui/Rail";

/**
 * `seedIndex` must be unique and stable per mosaic on the page — it seeds the
 * PRNG, so reusing one makes two strips render identical fields. 0–2 belong to
 * the full-size mosaics; strips start at 3.
 */
export function DividerStrip({
  side = "right",
  seedIndex,
}: {
  side?: "left" | "right";
  seedIndex: number;
}) {
  const gutter =
    side === "right"
      ? "left-[calc(50%+603px)] right-0 max-[1240px]:left-[calc(100%-18px)]"
      : "right-[calc(50%+603px)] left-0 max-[1240px]:right-[calc(100%-18px)]";

  return (
    <div className="relative">
      <div className="border-t border-dashed border-line" />
      <div className="h-[42px] border-b border-dashed border-line" />
      <div className="h-[84px] border-b border-dashed border-line" />

      <div
        className={`pointer-events-none absolute top-0 h-[42px] overflow-hidden ${gutter}`}
      >
        <TileMosaic seedIndex={seedIndex} light alignRight={side === "left"} />
      </div>

      {/* rails continue through the strip */}
      <div className="pointer-events-none absolute inset-0">
        <Rail className="h-full" />
      </div>
    </div>
  );
}
