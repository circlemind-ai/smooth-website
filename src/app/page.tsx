import { RevealObserver } from "@/components/ui/RevealObserver";
import { DividerStrip } from "@/components/chrome/DividerStrip";
import { Hero } from "@/components/sections/Hero";
import { OverviewTerminal } from "@/components/sections/OverviewTerminal";
import { CardStackV3 } from "@/components/sections/CardStackV3";
import { Triptych } from "@/components/sections/Triptych";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ForDevsIde } from "@/components/sections/ForDevsIde";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

/**
 * Eight divider strips run down the page, alternating which gutter carries the
 * mosaic — right, left, right, left… The last two live in the root layout
 * (after the CTA and after the footer) so they wrap the pricing and blog pages
 * too.
 *
 * `seedIndex` seeds each mosaic's PRNG and must stay unique across the whole
 * page: 0–2 are the full-size mosaics, 3+ the gutter strips.
 */
export default function Home() {
  return (
    <>
      <RevealObserver />
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
        <Faq />
        <DividerStrip side="left" seedIndex={8} />
        <Cta />
      </main>
    </>
  );
}
