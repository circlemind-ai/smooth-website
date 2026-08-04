import { Button } from "@/components/ui/Button";
import { Rail } from "@/components/ui/Rail";
import { urls } from "@/lib/content";

export function Cta() {
  return (
    <section className="relative overflow-hidden">
      <Rail className="relative flex flex-col items-center gap-6 px-8 py-24 text-center">
        <h2 className="m-0 font-mono text-[clamp(26px,3.4vw,42px)] leading-[1.15] font-semibold tracking-[-0.025em]">
          build reliable web agents
        </h2>
        <div className="flex gap-3 max-md:flex-col max-md:items-start">
          <Button href={urls.app} variant="primary">
            Start for free
          </Button>
          <Button href={urls.booking} variant="secondary" target="_blank" rel="noopener noreferrer">
            Talk to us
          </Button>
        </div>
      </Rail>
    </section>
  );
}
