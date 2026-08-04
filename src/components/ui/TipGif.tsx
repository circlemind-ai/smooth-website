"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A GIF inside a spec tooltip, fetched only once the tooltip is first opened.
 *
 * This one is ~2.5MB. The tooltip is hidden until hover, but a rendered `<img>`
 * downloads regardless of whether its container is visible — so the `src` is
 * withheld until the enclosing `.spec-tip` is first entered. Most visitors
 * never open it and never pay for it.
 *
 * Opening it also restarts playback. The tooltip is revealed by CSS `:hover`,
 * so the image is never unmounted; without remounting on each open it would
 * resume from whatever frame it stopped on. The trigger is the ancestor rather
 * than the image itself, which is hidden at the point the pointer arrives.
 *
 * `aspectRatio` reserves the box up front so the panel doesn't jump when the
 * image finally arrives.
 */
export function TipGif({
  src,
  alt,
  aspectRatio,
  className = "",
}: {
  src: string;
  alt: string;
  /** width / height, used to reserve space before the first load */
  aspectRatio: number;
  className?: string;
}) {
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tip = ref.current?.closest(".spec-tip");
    if (!tip) return;
    const open = () => setRun((n) => n + 1);
    tip.addEventListener("mouseenter", open);
    return () => tip.removeEventListener("mouseenter", open);
  }, []);

  return (
    // `display: contents` so the wrapper doesn't affect layout — closest() is
    // DOM traversal, so it still resolves the .spec-tip ancestor.
    <span ref={ref} className="contents">
      {run === 0 ? (
        <span aria-hidden className={className} style={{ aspectRatio }} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={run}
          src={`${src}#${run}`}
          alt={alt}
          className={className}
          style={{ aspectRatio }}
        />
      )}
    </span>
  );
}
