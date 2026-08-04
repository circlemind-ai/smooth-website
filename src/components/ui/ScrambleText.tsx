"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_/[]{}=+*^?#01";

/**
 * Nav links resolve out of noise on hover: every character is replaced with
 * junk, then the real text is revealed left-to-right over ~14 frames at 38ms.
 * Spaces are held so the label never changes width mid-run.
 */
export function ScrambleText({ children }: { children: string }) {
  const [text, setText] = useState(children);
  const [label, setLabel] = useState(children);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset during render if the label itself changes — cheaper and safer than
  // syncing in an effect, which would render once with the stale text first.
  if (label !== children) {
    setLabel(children);
    setText(children);
  }

  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);

  function start() {
    if (timer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const total = Math.max(14, children.length * 2.2);
    let frame = 0;

    timer.current = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / total) * children.length);

      setText(
        children
          .split("")
          .map((ch, i) =>
            ch === " "
              ? " "
              : i < revealed
                ? ch
                : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );

      if (frame >= total) {
        clearInterval(timer.current!);
        timer.current = null;
        setText(children);
      }
    }, 38);
  }

  return <span onMouseEnter={start}>{text}</span>;
}
