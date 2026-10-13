"use client";

import { useEffect, useRef, useState } from "react";
import { TileStage } from "@/components/ui/TileStage";
import { TitleBar } from "@/components/ui/BrowserWindow";
import {
  StackCardBody,
  animsFor,
  NO_ANIM,
} from "@/components/cards/StackCards";
import { stackItems } from "@/lib/content";
import { Rail } from "@/components/ui/Rail";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Cards are authored at this size and scaled down to fit the column. */
const CARD_W = 645;
const CARD_H = 363;

export function CardStackV3() {
  const [step, setStep] = useState(0);
  // Bumping this remounts the active card, which restarts its CSS animations
  // from zero — the React-native equivalent of the source's toggle-a-flag-and-
  // wait-90ms trick. The stack does not advance on its own; only a click
  // changes the selection.
  const [cycle, setCycle] = useState(0);

  const hostRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const active = stackItems[step];

  // Replay the active card once its animation finishes. The stack never
  // advances on its own — only a click changes which card is showing — but the
  // one on screen loops so the section is never sitting still.
  useEffect(() => {
    const id = setTimeout(() => setCycle((c) => c + 1), active.hold);
    return () => clearTimeout(id);
  }, [step, cycle, active.hold]);

  // Scale the fixed-size card layer to whatever width the column ends up with.
  useEffect(() => {
    const host = hostRef.current;
    const layer = layerRef.current;
    if (!host || !layer) return;

    const fit = () => {
      const scale = host.clientWidth / CARD_W;
      layer.style.transform = `scale(${scale})`;
      host.style.height = `${Math.round(CARD_H * scale)}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  function pick(i: number) {
    if (i === step) return;
    setStep(i);
    setCycle((c) => c + 1);
  }

  return (
    <Rail>
      <SectionHeading title="all in one">
        anything on the web, accessible and actionable at scale
      </SectionHeading>

      <div className="grid grid-cols-[minmax(260px,1fr)_1.7fr] max-md:grid-cols-1">
        {/* selector */}
        <div className="flex flex-col justify-center px-9 py-8">
          {stackItems.map((item, i) => {
            const on = i === step;
            return (
              <div
                key={item.kind}
                onClick={() => pick(i)}
                className={`cursor-pointer py-[18px] ${
                  i === 0 ? "" : "border-t border-dashed border-line"
                }`}
              >
                <h3
                  className="m-0 flex items-center gap-3 font-mono text-[clamp(17px,1.8vw,21px)] font-semibold tracking-[-0.02em] transition-colors duration-[400ms]"
                  style={{ color: on ? item.color : "#929292" }}
                >
                  <span
                    className="box-border inline-block h-4 w-4 shrink-0 border p-0.5 transition-colors duration-[400ms]"
                    style={{ borderColor: on ? item.color : "#C8C8C8" }}
                  >
                    <span
                      className="block h-full w-full"
                      style={{
                        backgroundImage: `conic-gradient(${
                          on ? item.color : "#C8C8C8"
                        } 25%, transparent 0 50%, ${on ? item.color : "#C8C8C8"} 0 75%, transparent 0)`,
                        backgroundSize: "2px 2px",
                      }}
                    />
                  </span>
                  {item.title}
                </h3>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ maxHeight: on ? 160 : 0, opacity: on ? 1 : 0 }}
                >
                  <p className="mt-3 mb-0 text-sm leading-[1.65] text-pretty text-dim">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* stage */}
        <div className="min-w-0 border-l border-dashed border-line max-md:border-t max-md:border-l-0">
          <div
            data-mosaic
            className="relative h-full overflow-hidden transition-colors duration-500"
            style={{ background: active.bg }}
          >
            <TileStage seed={1} light hue={active.color} />

            <div className="relative flex items-center px-8 py-10">
              <div
                ref={hostRef}
                className="relative mx-auto w-[645px] max-w-full"
                style={{ height: CARD_H }}
              >
                <div
                  ref={layerRef}
                  className="absolute top-0 left-0 origin-top-left"
                  style={{ width: CARD_W, height: CARD_H }}
                >
                  {stackItems.map((item, i) => {
                    const on = i === step;
                    return (
                      <div
                        key={item.kind}
                        className="absolute inset-0 transition-opacity duration-[450ms]"
                        style={{
                          opacity: on ? 1 : 0,
                          pointerEvents: on ? "auto" : "none",
                        }}
                      >
                        <div className="absolute inset-0 flex flex-col border border-ink bg-paper shadow-[8px_8px_0_var(--color-card)]">
                          <TitleBar title={item.win} size="sm" />
                          <div className="relative flex-1 overflow-hidden">
                            <StackCardBody
                              key={on ? cycle : "idle"}
                              kind={item.kind}
                              color={item.color}
                              anim={on ? animsFor(item.kind) : NO_ANIM}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Rail>
  );
}
