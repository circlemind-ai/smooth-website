"use client";

import { useEffect } from "react";

/**
 * Drives every `[data-reveal]` on the page from a single observer, mounted
 * once at the root. Sections therefore stay server components — they only
 * need to emit the attribute, not own any client state.
 *
 * `data-delay` (ms) staggers siblings. Elements are unobserved once revealed,
 * so this is a one-shot animation, not a scroll-linked one. A MutationObserver
 * picks up nodes that mount later (the card stack swaps its cards in and out)
 * — the source polled every 800ms for this.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${el.dataset.delay ?? 0}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    const observeAll = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    observeAll(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.hasAttribute("data-reveal")) io.observe(node);
          observeAll(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
