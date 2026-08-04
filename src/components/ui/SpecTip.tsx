import type { ReactNode } from "react";

/**
 * Dotted-underline term that reveals a hard-shadowed panel on hover.
 * Purely CSS (see `.spec-tip` in globals.css), so this stays a server
 * component.
 *
 * - `width` widens the panel for tips carrying an image.
 * - `align="right"` anchors the panel to the right edge, for terms near the
 *   end of a line where a left-anchored panel would overflow.
 * - `lines` keeps newlines in the tip text, for bulleted content.
 */
export function SpecTip({
  children,
  tip,
  width,
  align = "left",
  lines = false,
  className = "",
}: {
  children: ReactNode;
  tip: ReactNode;
  width?: number;
  align?: "left" | "right";
  lines?: boolean;
  className?: string;
}) {
  return (
    <span className={`spec-tip ${align === "right" ? "tip-right" : ""} ${className}`}>
      {children}
      <span
        className={`tipbox ${lines ? "tip-lines" : ""}`}
        style={width ? { width } : undefined}
      >
        {tip}
      </span>
    </span>
  );
}
