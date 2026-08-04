import Image from "next/image";

/** Intrinsic viewBox of the lockup — used to keep the aspect ratio exact. */
const RATIO = 560.71 / 127.13;

/**
 * The full lockup: symbol plus wordmark, as one SVG. Sourced from the brand
 * delivery kit ("complete logo, Bleu Nuit Insolent wordmark + Bleu Électrique
 * Dynamique symbol") — 5 KB of vector, versus the ~200 KB PNG the prototype
 * shipped.
 */
export function Logo({ height = 25 }: { height?: number }) {
  return (
    <Image
      src="/assets/smooth-logo.svg"
      alt="smooth"
      width={Math.round(height * RATIO)}
      height={height}
      priority={height > 20}
      className="block w-auto"
      style={{ height }}
    />
  );
}
