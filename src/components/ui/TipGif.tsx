"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A GIF inside a spec tooltip. The tooltip is revealed by CSS `:hover`, so the
 * image is never unmounted — without this it would sit frozen on whatever frame
 * it reached the first time and resume from there on every subsequent open.
 *
 * The trigger is hovering the enclosing `.spec-tip`, not the image itself
 * (which is hidden until the tooltip opens), so the listener binds to that
 * ancestor. Bumping `key` remounts the element and restarts playback from frame
 * one; the cache-busting fragment resets the decode without a network round
 * trip, matching the source's `img.src = base + '#' + Date.now()`.
 */
export function TipGif({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tip = ref.current?.closest(".spec-tip");
    if (!tip) return;
    const restart = () => setRun((n) => n + 1);
    tip.addEventListener("mouseenter", restart);
    return () => tip.removeEventListener("mouseenter", restart);
  }, []);

  // A plain <img> on purpose: next/image would optimise the GIF down to a
  // single static frame.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={run} ref={ref} src={run ? `${src}#${run}` : src} alt={alt} className={className} />
  );
}
