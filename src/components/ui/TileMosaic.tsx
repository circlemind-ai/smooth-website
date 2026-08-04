"use client";

import { useEffect, useRef } from "react";
import { registerMosaic, type MosaicOptions } from "@/lib/mosaic";

/**
 * Canvas backdrop. Absolutely positioned to fill its parent — the parent needs
 * `position: relative` and a background colour to sit under the first paint.
 *
 * The slight scale-up hides the sub-tile gap at the right and bottom edges
 * where cols*21 overshoots the container.
 */
export function TileMosaic({
  seedIndex,
  light,
  hue,
  alignRight,
  className = "",
}: MosaicOptions & { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const handle = useRef<ReturnType<typeof registerMosaic> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    handle.current = registerMosaic(ref.current, {
      seedIndex,
      light,
      hue,
      alignRight,
    });
    return () => {
      handle.current?.dispose();
      handle.current = null;
    };
    // Deliberately mount-only: a hue change re-shades in place via update()
    // below rather than tearing down and rebuilding the blob field.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedIndex, light, alignRight]);

  useEffect(() => {
    handle.current?.update({ seedIndex, light, hue, alignRight });
  }, [seedIndex, light, hue, alignRight]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 h-full w-full scale-[1.03] ${className}`}
    />
  );
}
