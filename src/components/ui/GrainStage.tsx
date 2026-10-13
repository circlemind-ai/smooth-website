"use client";

import { useEffect, useRef, useState } from "react";
import { GrainGradient, MeshGradient } from "@paper-design/shaders-react";

/**
 * Animated shader backdrop, ported from agentcard.sh's "GrainStage" pattern.
 * Under the hood it's @paper-design/shaders-react: the GrainGradient shader
 * for the shaped looks, and MeshGradient for the flowing "silk" look.
 *
 * Absolutely positioned to fill its parent — the parent needs
 * `position: relative`, `overflow: hidden`, and a background colour so the
 * first paint (before the canvas mounts) isn't a hole.
 *
 * The canvas only mounts while the stage is within a viewport's distance of
 * the screen, so off-screen sections don't hold WebGL contexts. `seed`
 * offsets the animation clock so two stages never move in lockstep.
 */

type Look = "glow" | "wave" | "ripple" | "truchet" | "silk";

/* Shape presets lifted verbatim from agentcard's bundle. */
const LOOKS = {
  glow: { shape: "corners", softness: 0.7, intensity: 0.35, noise: 0.3, scale: 1 },
  wave: { shape: "wave", softness: 0.6, intensity: 0.35, noise: 0.45, scale: 0.6 },
  ripple: { shape: "ripple", softness: 0.7, intensity: 0.4, noise: 0.35, scale: 1 },
  truchet: { shape: "truchet", softness: 0.6, intensity: 0.35, noise: 0.4, scale: 0.8 },
} as const;

/* Brand default: our accent blues over the usual #BCDEFF stage fill. */
const BRAND_BACK = "#BCDEFF";
const BRAND_COLORS = ["#168aff", "#59abff", "#deeeff", "#1063b6"];

function usePrefersReducedMotion() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const onChange = () => setStill(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return still;
}

export function GrainStage({
  seed = 0,
  look = "glow",
  colorBack = BRAND_BACK,
  colors = BRAND_COLORS,
  className = "",
}: {
  seed?: number;
  look?: Look;
  colorBack?: string;
  colors?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const still = usePrefersReducedMotion();

  // Render nothing on the server and on the hydration pass — the canvas is
  // pure decoration, and the parent's background covers the first paint.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { position: "absolute", inset: 0 } as const;
  const frame = 6000 * seed;

  let canvas = null;
  if (mounted && inView) {
    if (look === "silk") {
      canvas = (
        <MeshGradient
          style={style}
          colors={colors}
          distortion={1}
          swirl={0.2}
          rotation={90}
          grainMixer={0.25}
          grainOverlay={0.35}
          speed={still ? 0 : 0.35}
          frame={frame}
        />
      );
    } else {
      const p = LOOKS[look];
      canvas = (
        <GrainGradient
          style={style}
          colorBack={colorBack}
          colors={colors}
          shape={p.shape}
          softness={p.softness}
          intensity={p.intensity}
          noise={p.noise}
          scale={p.scale}
          speed={still ? 0 : 0.5}
          frame={frame}
        />
      );
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {canvas}
    </div>
  );
}
