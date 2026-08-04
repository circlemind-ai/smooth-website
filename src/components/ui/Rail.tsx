import type { ReactNode } from "react";

/**
 * The page's vertical rails: a centred column bounded by dashed hairlines that
 * run the full height of the site. Nearly every block sits inside one.
 *
 * Width needs care. The source is content-box, so its two container sizes —
 * `max-width: 1140px` with `padding: 0 32px` for text blocks, and
 * `max-width: 1204px` with no padding for full-bleed blocks — both come out at
 * the same 1206px outer edge, which is what makes the rails line up down the
 * page. Tailwind is border-box, so encoding those numbers directly would make
 * every padded rail 66px too narrow. Instead the rail owns the outer 1206px and
 * callers add `px-8` when they want the 1140px text measure.
 *
 * Below 1240px it stops centring and pins to an 18px page gutter so the
 * hairlines stay on screen rather than sliding off-canvas.
 */
export function Rail({
  className = "",
  id,
  children,
}: {
  className?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div
      id={id}
      className={`mx-auto max-w-[1206px] border-x border-dashed border-line max-[1240px]:mx-[18px] ${className}`}
    >
      {children}
    </div>
  );
}
