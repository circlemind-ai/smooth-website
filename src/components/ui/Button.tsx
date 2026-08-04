import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "nav";

/**
 * Renders as a next/link. Visual behaviour lives in the .btn-* classes in
 * globals.css — see the note there on why the hover treatment isn't utilities.
 *
 * `block` makes it fill its container and centre its label, for the pricing
 * plan CTAs. It composes with any variant rather than being one itself.
 */
export function Button({
  variant = "primary",
  block = false,
  className = "",
  children,
  ...props
}: { variant?: Variant; block?: boolean } & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`btn btn-${variant} ${block ? "btn-block" : ""} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
