"use client";

import { useEffect } from "react";

/**
 * Shrinks the feature-grid illustrations to fit their column.
 *
 * Each illustration is drawn at a fixed pixel size (the private-network diagram
 * is 240px wide, the compliance chips wrap at their natural width, and so on).
 * Once three cards share a rail narrower than ~1100px those sizes overflow —
 * the diagram gets clipped by the card's `overflow: hidden` and the chip rows
 * spill past the dashed gutter.
 *
 * `zoom` rather than `transform: scale` on purpose: zoom shrinks the layout box
 * along with the paint, so the illustration keeps its centring and stops being
 * clipped. A transform would scale the pixels but leave a full-size box behind.
 */
export function FitContent() {
  useEffect(() => {
    const fit = () => {
      document.querySelectorAll<HTMLElement>(".fc").forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;

        // Illustrations with an explicit width declare their own base size;
        // the rest are measured once, unzoomed, and cached.
        let base = parseFloat(el.style.width);
        if (!base) {
          if (!el.dataset.baseWidth) {
            el.style.removeProperty("zoom");
            el.dataset.baseWidth = String(el.offsetWidth);
          }
          base = Number(el.dataset.baseWidth);
        }
        if (!base) return;

        const scale = Math.min(1, parent.clientWidth / base);
        if (scale < 0.999) el.style.setProperty("zoom", String(scale));
        else el.style.removeProperty("zoom");
      });
    };

    fit();

    const ro = new ResizeObserver(fit);
    document.querySelectorAll<HTMLElement>(".fc").forEach((el) => {
      if (el.parentElement) ro.observe(el.parentElement);
    });

    return () => ro.disconnect();
  }, []);

  return null;
}
