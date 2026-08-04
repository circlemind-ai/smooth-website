"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Logo } from "@/components/chrome/Logo";
import { navLinks, platformLinks } from "@/lib/content";
import { Rail } from "@/components/ui/Rail";

/** The small rotated square that marks a disclosure. */
function Caret({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`-mt-[3px] inline-block h-[5px] w-[5px] rotate-45 border-r-[1.5px] border-b-[1.5px] border-current ${className}`}
    />
  );
}

export function Nav() {
  const [platformOpen, setPlatformOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const pathname = usePathname();

  // `/blog/some-post` should still light up the blog link, but `/` must not
  // match everything — so anchor on the first path segment.
  const isActive = (href: string) =>
    href.startsWith("/") && href !== "/" && pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-dashed border-line bg-paper/92 backdrop-blur-[12px]">
      <Rail className="flex h-[58px] items-center justify-between px-8">
        <Link href="/" aria-label="smooth — home" className="flex items-center">
          <Logo />
        </Link>

        {/* primary nav */}
        <div className="flex items-center gap-[30px] font-mono text-[12.5px] max-md:hidden">
          <div
            className="relative"
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
          >
            <button
              type="button"
              aria-expanded={platformOpen}
              className="inline-flex cursor-pointer items-center gap-2 py-[18px] text-dim transition-colors hover:text-ink"
            >
              <ScrambleText>platform</ScrambleText>
              <Caret />
            </button>

            {platformOpen && (
              <div className="absolute top-full -left-4 z-60 min-w-[236px] border border-ink bg-paper py-1.5 shadow-[4px_4px_0_var(--color-card)]">
                {platformLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex items-center gap-2.5 px-4 py-[9px] text-xs text-dim hover:bg-soft hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`inline-flex items-center gap-2 transition-colors hover:text-ink ${
                isActive(l.href) ? "font-semibold text-ink" : "text-dim"
              }`}
            >
              <ScrambleText>{l.label}</ScrambleText>
            </Link>
          ))}
        </div>

        {/* account actions */}
        <div className="flex items-center gap-2.5 max-md:hidden">
          <Link
            href="#"
            className="px-3.5 py-2 font-mono text-[12.5px] text-dim transition-colors hover:text-ink"
          >
            Sign In
          </Link>
          <Button href="#" variant="nav">
            Sign Up
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="menu"
          aria-expanded={mobileOpen}
          className="hidden cursor-pointer flex-col gap-[5px] px-0.5 py-2.5 max-md:flex"
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
        </button>
      </Rail>

      {mobileOpen && (
        <div className="border-t border-dashed border-line bg-paper pt-1.5 pb-2.5 md:hidden">
          <button
            type="button"
            onClick={() => setMobilePlatformOpen((v) => !v)}
            aria-expanded={mobilePlatformOpen}
            className="flex w-full cursor-pointer items-center gap-2.5 px-7 py-3 font-mono text-[13px] text-dim"
          >
            platform <Caret />
          </button>

          {mobilePlatformOpen &&
            platformLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-11 py-[9px] font-mono text-xs text-dim"
              >
                {l.label}
              </Link>
            ))}

          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`block px-7 py-3 font-mono text-[13px] ${
                isActive(l.href) ? "font-semibold text-ink" : "text-dim"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="flex gap-2.5 px-7 pt-2.5 pb-1.5">
            <Link
              href="#"
              className="border border-line px-3.5 py-2 font-mono text-[12.5px] text-dim"
            >
              Sign In
            </Link>
            <Button href="#" variant="nav">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
