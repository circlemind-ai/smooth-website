import Link from "next/link";
import { Logo } from "@/components/chrome/Logo";
import { footerBottomLinks, footerColumns } from "@/lib/content";
import { Rail } from "@/components/ui/Rail";

export function Footer() {
  // Placeholder entries (href "#") are hidden until their pages exist —
  // give one a real destination in content.ts and it reappears, as does a
  // fully-placeholder column (use cases, at the time of writing).
  const columns = footerColumns
    .map((col) => ({ ...col, links: col.links.filter((l) => l.href !== "#") }))
    .filter((col) => col.links.length > 0);

  return (
    <footer className="bg-paper">
      <Rail className="px-8 pt-14">
        <div
          className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-8 max-md:grid-cols-1"
          style={{ "--cols": columns.length } as React.CSSProperties}
        >
          {columns.map((col) => (
            <div
              key={col.title}
              className="flex flex-col gap-3 font-mono text-xs max-md:border-l-0"
            >
              <div className="mb-1 text-[10.5px] tracking-[0.14em] text-mute uppercase">
                {col.title}
              </div>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="text-dim transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="h-12" />
      </Rail>

      <div className="border-t border-dashed border-line" />

      <Rail className="px-8">
        <div className="flex items-start justify-between gap-6 py-5 max-md:flex-col max-md:items-start">
          <div className="flex flex-col items-start gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.1em] text-mute">
              © 2026 circlemind inc
            </span>
            <Logo height={20} />
          </div>
          <div className="flex flex-col items-end gap-3 font-mono text-[11px] max-md:items-start">
            <span className="inline-flex items-center gap-5">
              {footerBottomLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="text-mute transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </span>
          </div>
        </div>
      </Rail>
    </footer>
  );
}
