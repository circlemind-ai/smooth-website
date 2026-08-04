import type { ReactNode } from "react";

/**
 * A box sitting on a hand-drawn-looking drop shadow: two strips of 4px
 * checkerboard hatching offset down and right, with the box itself double-ruled
 * (border plus an outline at 2px offset).
 */
const HATCH =
  "conic-gradient(#B6B6B6 25%, transparent 0 50%, #B6B6B6 0 75%, transparent 0)";

export function HatchBox({
  grow = false,
  className = "",
  children,
}: {
  grow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={`relative ${grow ? "min-w-0 flex-1" : "shrink-0"}`}>
      <span
        aria-hidden
        className="absolute top-full -right-2 left-1.5 h-3"
        style={{ backgroundImage: HATCH, backgroundSize: "4px 4px" }}
      />
      <span
        aria-hidden
        className="absolute top-3 bottom-0 left-full w-2"
        style={{ backgroundImage: HATCH, backgroundSize: "4px 4px" }}
      />
      <span
        className={`relative z-[1] m-[3px] border border-ink bg-paper outline-1 outline-ink outline-offset-2 ${className}`}
      >
        {children}
      </span>
    </span>
  );
}
