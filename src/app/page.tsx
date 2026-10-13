import { DividerStrip } from "@/components/chrome/DividerStrip";
import { Hero } from "@/components/sections/Hero";
import { OverviewTerminal } from "@/components/sections/OverviewTerminal";
import { CardStackV3 } from "@/components/sections/CardStackV3";
import { Triptych } from "@/components/sections/Triptych";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ForDevsIde } from "@/components/sections/ForDevsIde";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- hidden section, see below
import { PlugPlay } from "@/components/sections/PlugPlay";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

/**
 * Eight divider strips run down the page, alternating which gutter carries the
 * mosaic — right, left, right, left… The last two live in the root layout
 * (after the CTA and after the footer) so they wrap the pricing and blog pages
 * too.
 *
 * `seedIndex` seeds each mosaic's PRNG and must stay unique across the whole
 * page: 0–2 are the full-size mosaics, 3+ the gutter strips (11 was added
 * out of order when the plug-&-play section landed).
 */
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <OverviewTerminal />
        <DividerStrip side="right" seedIndex={3} />
        <CardStackV3 />
        <DividerStrip side="left" seedIndex={4} />
        <Triptych />
        <DividerStrip side="right" seedIndex={5} />
        <FeaturesGrid />
        <DividerStrip side="left" seedIndex={6} />
        <ForDevsIde />
        <DividerStrip side="right" seedIndex={7} />
        {/* Hidden for now. When restoring, also restore the alternating
            strip sides: PlugPlay's strip is left/11, Faq's flips to right,
            and the two layout strips flip to left/right. */}
        {/* <PlugPlay />
        <DividerStrip side="left" seedIndex={11} /> */}
        <Faq />
        <DividerStrip side="left" seedIndex={8} />
        <Cta />
      </main>
    </>
  );
}
