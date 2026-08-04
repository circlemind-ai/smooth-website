"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { Rail } from "@/components/ui/Rail";

export function Faq() {
  // -1 = all closed. The design opens the first item on load.
  const [open, setOpen] = useState(0);

  return (
    <section>
      <Rail className="grid grid-cols-[1fr_1.35fr] items-start gap-14 px-8 py-[88px] max-md:grid-cols-1">
        <div className="flex flex-col gap-3.5">
          <h2 className="m-0 font-mono text-[clamp(26px,3vw,38px)] leading-[1.25] font-semibold tracking-[-0.02em]">
            faq
          </h2>
          <p className="m-0 text-[14.5px] leading-[1.65] text-pretty text-dim">
            anything else?{" "}
            <a
              href="#"
              className="text-dim underline decoration-dotted underline-offset-[3px]"
            >
              reach out
            </a>
          </p>
        </div>

        <div>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={i === 0 ? "" : "border-t border-dashed border-line"}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 px-1 py-5 text-left font-mono text-[15px] font-medium tracking-[-0.01em]"
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-[17px] font-normal text-dim"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    maxHeight: isOpen ? 240 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="m-0 px-1 pb-[22px] text-sm leading-[1.7] text-pretty text-dim">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Rail>
    </section>
  );
}
