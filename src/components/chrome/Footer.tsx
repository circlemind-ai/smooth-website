import Link from "next/link";
import { Logo } from "@/components/chrome/Logo";
import { footerBottomLinks, footerColumns } from "@/lib/content";
import { Rail } from "@/components/ui/Rail";

export function Footer() {
  return (
    <footer className="bg-paper">
      <Rail className="px-8 pt-14">
        <div className="grid grid-cols-6 gap-8 max-md:grid-cols-1">
          {footerColumns.map((col) => (
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
              © 2026 CIRCLEMIND INC
            </span>
            <Logo height={20} />
          </div>
          <div className="flex flex-col items-end gap-3 font-mono text-[11px] max-md:items-start">
            <span className="inline-flex items-center gap-5">
              {footerBottomLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
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
