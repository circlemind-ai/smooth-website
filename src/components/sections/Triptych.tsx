import Image from "next/image";
import { SpecTip } from "@/components/ui/SpecTip";
import { Rail } from "@/components/ui/Rail";

const rows: { label: string; src: string; size: number; score: number; self?: boolean }[] = [
  { label: "smooth", src: "/assets/smooth-symbol.jpg", size: 16, score: 92, self: true },
  { label: "openai operator", src: "/assets/logo-openai-trim.png", size: 14, score: 87 },
  { label: "claude computer use", src: "/assets/logo-anthropic.png", size: 16, score: 84 },
  { label: "gemini 2.5 computer use", src: "/assets/logo-gemini.png", size: 16, score: 79 },
];

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

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className="shrink-0 -mb-px">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const heading = "m-0 font-mono text-[clamp(17px,1.8vw,21px)] font-semibold tracking-[-0.02em]";
const body = "m-0 text-sm leading-[1.65] text-pretty text-dim";
const cell = "flex min-w-0 flex-col gap-4 px-8 pt-9 pb-10";

export function Triptych() {
  return (
    <Rail id="benchmarks">
      <div className="grid grid-cols-[1.25fr_1fr_1fr] max-md:grid-cols-1 max-md:[&>div+div]:border-t max-md:[&>div+div]:border-dashed max-md:[&>div+div]:border-line">
        {/* reliability bars */}
        <div data-reveal className={cell}>
          <div className="mt-1 flex flex-1 flex-col justify-center">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-3 py-2.5">
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
            <div className="mt-2 font-mono text-[11px] text-[#A4A4A4]">webvoyager pass@1</div>
          </div>
          <h3 className={heading}>sota reliability</h3>
          <p className={body}>
            more reliable at navigation than any frontier llm
            <br />
            <a
              href="https://github.com/circlemind-ai/smooth-benchmarks"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-[5px] font-mono text-[12.5px] text-dim underline decoration-dotted underline-offset-[3px] transition-colors hover:text-accent"
            >
              <GithubIcon />
              circlemind-ai/smooth-benchmarks
            </a>
          </p>
        </div>

        {/* speed */}
        <div data-reveal data-delay="100" className={`${cell} border-l border-dashed border-line max-md:border-l-0`}>
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
        <div data-reveal data-delay="200" className={`${cell} border-l border-dashed border-line max-md:border-l-0`}>
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
          <p className={body}>small models get the job done at a fraction of the cost</p>
        </div>
      </div>
    </Rail>
  );
}
