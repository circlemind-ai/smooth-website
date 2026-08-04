import { Button } from "@/components/ui/Button";
import { Rail } from "@/components/ui/Rail";

export function Cta() {
  return (
    <section className="relative overflow-hidden">
      <Rail className="relative flex flex-col items-center gap-6 px-8 py-24 text-center">
        <h2
          data-reveal
          className="m-0 font-mono text-[clamp(26px,3.4vw,42px)] leading-[1.15] font-semibold tracking-[-0.025em]"
        >
          build reliable web agents
        </h2>
        <div
          data-reveal
          data-delay="100"
          className="flex gap-3 max-md:flex-col max-md:items-start"
        >
          <Button href="#" variant="primary">
            Start for free
          </Button>
          <Button href="#" variant="secondary">
            Talk to us
          </Button>
        </div>
      </Rail>
    </section>
  );
}
