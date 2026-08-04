import { Button } from "@/components/ui/Button";
import { AgentsPanel } from "@/components/sections/AgentsPanel";
import { Rail } from "@/components/ui/Rail";

/** Y Combinator mark — a 16px orange tile, drawn rather than shipped as an asset. */
function YcMark() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center bg-[#F26522] text-[10.5px] leading-4 font-bold text-white [text-indent:0.5px]">
      Y
    </span>
  );
}

export function Hero() {
  return (
    <header className="relative">
      <Rail className="px-8 pt-[72px] pb-14">
        <h1 className="m-0 max-w-[700px] font-mono text-[clamp(30px,3.8vw,48px)] leading-[1.15] font-semibold tracking-[-0.03em]">
          <span className="whitespace-nowrap">build agents that</span>{" "}
          <span className="whitespace-nowrap">use the web</span>
        </h1>

        <p className="mt-[18px] max-w-[540px] text-[16.5px] leading-[1.6] text-pretty text-dim">
          we handle the infra so you can focus on building agents that{" "}
          <br className="max-md:hidden" />
          search, scrape, and interact&nbsp;with the web at scale
        </p>

        <div className="mt-7 flex items-center gap-3 max-md:flex-col max-md:items-start">
          <Button href="#" variant="primary">
            Start for free
          </Button>
          <Button href="#" variant="secondary">
            Talk to us
          </Button>
          <span className="ml-2.5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-dim uppercase max-md:ml-0">
            Backed by <YcMark /> Combinator
          </span>
        </div>

        <AgentsPanel />
      </Rail>
    </header>
  );
}
