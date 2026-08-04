"use client";

import { useState } from "react";
import { TileMosaic } from "@/components/ui/TileMosaic";
import { TitleBar } from "@/components/ui/BrowserWindow";
import { useCopy } from "@/hooks/useCopy";
import { Rail } from "@/components/ui/Rail";
import {
  pythonSample,
  pythonText,
  typescriptSample,
  typescriptText,
  type Line,
  type Token,
} from "@/lib/code-samples";

const files = [
  { name: "example.py", lines: pythonSample, text: pythonText },
  { name: "example.ts", lines: typescriptSample, text: typescriptText },
];

const tokenColor = { kw: "var(--color-dim)", str: "#1063B6" } as const;

function isToken(part: unknown): part is Token {
  return typeof part === "object" && part !== null && "t" in part;
}

function Code({ lines }: { lines: Line[] }) {
  return (
    <span className="block px-4 pt-3.5 pr-4 pb-[18px] pl-2.5">
      {lines.map((line, i) => (
        <span key={i} className="flex gap-3.5">
          <span className="w-4 shrink-0 text-right text-[#B6B6B6] select-none">
            {i + 1}
          </span>
          <span className="min-w-0">
            {line.length === 0
              ? " "
              : line.map((part, j) =>
                  isToken(part) ? (
                    <span
                      key={j}
                      style={part.c ? { color: tokenColor[part.c] } : undefined}
                    >
                      {part.t}
                    </span>
                  ) : (
                    part
                  ),
                )}
          </span>
        </span>
      ))}
    </span>
  );
}

export function ForDevsIde() {
  const [tab, setTab] = useState(0);
  const { copied, copy } = useCopy();
  const active = files[tab];

  return (
    <Rail>
      <div className="grid grid-cols-[minmax(260px,1fr)_1.7fr] max-md:grid-cols-1">
        <div className="flex flex-col justify-center gap-3.5 px-9 py-12">
          <h3 className="m-0 font-mono text-[clamp(26px,3vw,38px)] font-semibold tracking-[-0.02em]">
            for devs
          </h3>
          <p className="m-0 max-w-[300px] text-[14.5px] leading-[1.65] text-pretty text-dim">
            sane, simple SDKs
            <br />
            get started in minutes
          </p>
          <a
            href="#"
            className="self-start font-mono text-[12.5px] text-ink underline decoration-dotted underline-offset-[3px] transition-colors hover:text-accent"
          >
            see docs →
          </a>
        </div>

        <div className="min-w-0 border-l border-dashed border-line max-md:border-l-0 max-md:border-t">
          <div
            data-mosaic
            className="relative h-full overflow-hidden bg-[#BCDEFF]"
          >
            <TileMosaic seedIndex={2} />

            <div className="relative px-8 py-10">
              <div className="mx-auto max-w-[780px] border border-ink bg-paper shadow-[8px_8px_0_var(--color-card)]">
                <TitleBar
                  title={active.name}
                  right={
                    <button
                      type="button"
                      onClick={() => copy(active.text)}
                      className="cursor-pointer border border-accent bg-paper px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-accent transition-colors hover:bg-accent hover:text-paper active:translate-x-px active:translate-y-px"
                    >
                      {copied ? "copied!" : "copy"}
                    </button>
                  }
                />

                <div className="grid grid-cols-[150px_1fr] max-md:grid-cols-1">
                  <div className="border-r border-line bg-soft py-3 font-mono text-xs max-md:flex max-md:border-r-0 max-md:border-b max-md:px-1.5 max-md:py-0">
                    {files.map((f, i) => (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => setTab(i)}
                        className={`block w-full cursor-pointer px-4 py-1.5 text-left max-md:w-auto max-md:px-3 max-md:py-2.5 ${
                          tab === i
                            ? "bg-paper font-medium text-ink"
                            : "text-dim"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>

                  <div className="min-w-0 overflow-x-auto">
                    <pre className="m-0 font-mono text-[clamp(9px,1.25vw,12.5px)] leading-[1.6] text-ink max-md:text-xs">
                      <Code lines={active.lines} />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Rail>
  );
}
