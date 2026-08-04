"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Looping silent video inside a spec tooltip — the replacement for what the
 * prototype shipped as a 2.5MB GIF. The same footage is ~330KB as VP9 and
 * ~370KB as H.264.
 *
 * Two behaviours matter here:
 *
 * Nothing is fetched until the tooltip is first opened. The panel is hidden by
 * CSS `:hover`, but a mounted `<video>` with sources still downloads, so the
 * `<source>` elements aren't rendered until the enclosing `.spec-tip` is first
 * entered. No poster for the same reason — browsers fetch it eagerly
 * regardless of `preload`, which would defeat the point.
 *
 * It restarts on every open. The tooltip is never unmounted, so without this a
 * second look would resume mid-clip. Unlike a GIF this needs no remount —
 * seeking to zero and replaying is enough.
 *
 * `aspectRatio` reserves the box up front so the panel doesn't jump when the
 * first frame arrives.
 */
export function TipVideo({
  src,
  label,
  aspectRatio,
  className = "",
}: {
  /** path without extension; .webm and .mp4 are both offered */
  src: string;
  label: string;
  aspectRatio: number;
  className?: string;
}) {
  const [armed, setArmed] = useState(false);
  const armedRef = useRef(false);
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);

  const open = useCallback(() => {
    // First open: mount the sources and let the effect below load them.
    // Appending <source> to a live <video> does nothing on its own — the
    // element only reads them on initial parse or an explicit load().
    if (!armedRef.current) {
      armedRef.current = true;
      setArmed(true);
      return;
    }

    const video = ref.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!armed) return;
    const video = ref.current;
    if (!video) return;
    video.load();
    // Autoplay can be refused (low power mode, a user setting) — the box just
    // stays empty in that case, which is an acceptable degradation.
    void video.play().catch(() => {});
  }, [armed]);

  useEffect(() => {
    const tip = wrap.current?.closest(".spec-tip");
    if (!tip) return;
    tip.addEventListener("mouseenter", open);
    return () => tip.removeEventListener("mouseenter", open);
  }, [open]);

  return (
    // `display: contents` keeps the wrapper out of the layout; closest() is
    // DOM traversal, so it still finds the .spec-tip ancestor.
    <span ref={wrap} className="contents">
      <video
        ref={ref}
        className={className}
        style={{ aspectRatio }}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
      >
        {armed && (
          <>
            <source src={`${src}.webm`} type="video/webm" />
            <source src={`${src}.mp4`} type="video/mp4" />
          </>
        )}
      </video>
    </span>
  );
}
