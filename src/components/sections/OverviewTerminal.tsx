import { TileMosaic } from "@/components/ui/TileMosaic";
import { BrowserWindow } from "@/components/ui/BrowserWindow";
import { HatchBox } from "@/components/ui/HatchBox";
import { SpecTip } from "@/components/ui/SpecTip";
import { TipVideo } from "@/components/ui/TipVideo";
import { Rail } from "@/components/ui/Rail";

/** Inverted label that heads each block of the document. */
function Badge({ children }: { children: string }) {
  return (
    <span
      className="mb-1.5 inline-block bg-ink px-2.5 py-0.5 text-paper"
      style={{ fontWeight: 700 }}
    >
      {children}
    </span>
  );
}

const RULE = "h-[1.5px] w-4 shrink-0 bg-ink max-md:h-3.5 max-md:w-[1.5px]";

/** The observe/act feedback loop drawn between the agent and the browser. */
function LoopArrows() {
  return (
    <span className="-mx-0.5 inline-flex flex-1 flex-col gap-1.5 max-md:mx-0 max-md:h-[58px] max-md:flex-none max-md:flex-row max-md:justify-center max-md:gap-[30px]">
      <span className="inline-flex items-center max-md:flex-col">
        <span className="tri tri-back" />
        <span className="h-[1.5px] min-w-2.5 flex-1 bg-ink max-md:h-auto max-md:w-[1.5px] max-md:min-w-0" />
        <span className="px-[5px] text-accent">observe</span>
        <span className="h-[1.5px] min-w-2.5 flex-1 bg-ink max-md:h-auto max-md:w-[1.5px] max-md:min-w-0" />
      </span>
      <span className="inline-flex items-center max-md:flex-col">
        <span className="h-[1.5px] min-w-2.5 flex-1 bg-ink max-md:h-auto max-md:w-[1.5px] max-md:min-w-0" />
        <span className="px-[5px] text-accent">act</span>
        <span className="h-[1.5px] min-w-2.5 flex-1 bg-ink max-md:h-auto max-md:w-[1.5px] max-md:min-w-0" />
        <span className="tri tri-fwd" />
      </span>
    </span>
  );
}

export function OverviewTerminal() {
  return (
    <Rail>
      <div data-mosaic className="relative overflow-hidden bg-[#BCDEFF]">
        <TileMosaic seedIndex={0} />

        <div className="relative px-9 py-10">
          <BrowserWindow title="intro.md" className="mx-auto max-w-[780px]">
            <div className="overflow-x-auto px-8 pt-[26px] pb-[30px] max-md:px-4">
              <pre className="mx-auto my-0 w-max font-mono text-[clamp(9px,1.3vw,13px)] leading-none text-ink max-md:w-full max-md:text-[12.5px] max-md:whitespace-pre-wrap">
                <span className="mb-[34px] block leading-[1.6]">
                  <Badge>overview</Badge>
                  {`\nsmooth gives you cloud browsers + agents\nthat are `}
                  <SpecTip
                    width={420}
                    tip={
                      <>
                        we use small models specialized in web tasks instead of
                        giant general-purpose LLMs
                        <TipVideo
                          src="/assets/comparison"
                          label="Smooth vs alternatives — flight search comparison"
                          aspectRatio={800 / 450}
                          className="mt-2 block w-full border border-[rgba(222,238,255,0.25)]"
                        />
                      </>
                    }
                  >
                    5x faster and 10x cheaper
                  </SpecTip>
                  {`\n\nyou design the agent,\nwe run it reliably at `}
                  <SpecTip tip="run thousands of concurrent sessions, fully serverless">
                    massive scale
                  </SpecTip>
                </span>

                <span className="mb-4 block leading-[1.6]">
                  <Badge>architecture</Badge>
                  {`\nevery session is a sandboxed browser + an agent,\nco-located to minimize network latency`}
                </span>

                <span className="mt-7 flex items-center leading-[1.4] max-md:flex-col max-md:items-center">
                  <HatchBox className="flex items-center justify-center px-6 py-[22px]">
                    your code
                  </HatchBox>

                  {/* SDK connector — turns vertical on narrow screens */}
                  <span className="mx-2 -mr-px inline-flex items-center max-md:my-4 max-md:mx-0 max-md:flex-col max-md:self-center">
                    <span className={RULE} />
                    <span className="px-1.5 text-accent">SDK</span>
                    <span className={RULE} />
                    <span className="tri tri-fwd" />
                  </span>

                  <HatchBox
                    grow
                    className="block px-[22px] pt-[26px] pb-[22px]"
                  >
                    <span className="absolute -top-[0.7em] left-[18px] bg-paper px-2 font-bold text-accent">
                      smooth
                    </span>
                    <span className="flex items-center justify-center max-md:flex-col">
                      <span className="flex items-center justify-center border-2 border-ink bg-paper px-[18px] py-3.5 text-center">
                        agent
                        <br />
                        loop
                      </span>
                      <LoopArrows />
                      <span className="flex items-center justify-center border-2 border-ink bg-paper px-[18px] py-3.5 text-center">
                        Chromium
                        <br />+ stealth
                      </span>
                    </span>
                  </HatchBox>
                </span>
              </pre>
            </div>
          </BrowserWindow>
        </div>
      </div>
    </Rail>
  );
}
