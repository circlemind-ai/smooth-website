import { Button } from "@/components/ui/Button";
import { Rail } from "@/components/ui/Rail";
import { urls } from "@/lib/content";

export function Cta() {
  return (
    <section className="relative overflow-hidden">
      <Rail className="relative flex flex-col items-center gap-6 px-8 py-24 text-center">
        <h2 className="m-0 font-mono text-[clamp(26px,3.4vw,42px)] leading-[1.15] font-semibold tracking-[-0.025em]">
          build{" "}
          {/* same treatment as the hero's "smoothly" */}
          <span className="relative inline-block font-fuzzy text-[1.12em] font-bold tracking-[-0.06em] text-accent">
            reliable
            <svg
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              aria-hidden
              className="absolute bottom-[0.02em] left-0 h-[0.2em] w-full"
            >
              <path
                d="M3 10 Q 50 1 97 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          web agents
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
