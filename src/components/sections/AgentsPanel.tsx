"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/hooks/useCopy";
import { agentPrompt } from "@/lib/content";

const agentIcons: { src: string; alt: string; w: number; h: number }[] = [
  { src: "/assets/icon-claude.svg", alt: "Claude", w: 15, h: 15 },
  // Codex's glyph only fills ~79% of its 24x24 viewBox, so it needs a
  // bigger box to read at the same optical size as the other two.
  { src: "/assets/icon-codex.svg", alt: "Codex", w: 19, h: 19 },
  { src: "/assets/icon-cursor.svg", alt: "Cursor", w: 14, h: 15 },
];

/**
 * "build with agents" — reveals a prompt you can paste into a coding agent to
 * scaffold a smooth project. Closes on any click outside itself.
 */
export function AgentsPanel() {
  const [open, setOpen] = useState(false);
  const { copied, copy } = useCopy();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <div ref={root} data-reveal data-delay="320" className="relative mt-[26px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex cursor-pointer items-center gap-2.5 py-1 font-mono text-[12.5px] text-dim transition-colors hover:text-ink"
      >
        <span className="inline-flex items-center gap-1.5">
          {agentIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={icon.w}
              height={icon.h}
              className="block"
            />
          ))}
        </span>
        build with agents
        <span
          aria-hidden
          className="-mt-[3px] inline-block h-[5px] w-[5px] rotate-45 border-r-[1.5px] border-b-[1.5px] border-current"
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+10px)] left-0 z-[45] w-[620px] max-w-[84vw] border border-ink bg-paper shadow-[8px_8px_0_var(--color-card)]">
          <div className="flex items-center justify-between border-b border-line bg-soft px-4 py-2.5 font-mono text-[11px] text-dim">
            <span className="font-semibold text-ink">prompt</span>
            <button
              type="button"
              onClick={() => copy(agentPrompt)}
              className="cursor-pointer border border-accent bg-paper px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-accent transition-colors hover:bg-accent hover:text-paper active:translate-x-px active:translate-y-px"
            >
              {copied ? "copied!" : "copy"}
            </button>
          </div>
          <pre className="m-0 px-[18px] pt-4 pb-5 font-mono text-xs leading-[1.8] whitespace-pre-wrap text-dim">
            <span className="font-semibold text-ink"># new smooth project</span>
            {`\n\n${agentPrompt}`}
          </pre>
        </div>
      )}
    </div>
  );
}
