/**
 * Benchmark results box, available to posts as `<Benchmark />`.
 *
 * Rows marked `highlight` render in accent and bold — that's how smooth's own
 * number is distinguished from the comparison set, rather than by position.
 */
export type BenchmarkRow = { label: string; value: string; highlight?: boolean };

export function Benchmark({
  caption,
  rows,
  source,
  sourceHref = "#",
}: {
  caption: string;
  rows: BenchmarkRow[];
  /** optional repro line in the footer, e.g. a repo name */
  source?: string;
  sourceHref?: string;
}) {
  return (
    <figure className="my-7 border border-line">
      <figcaption className="border-b border-line bg-soft px-4 py-2.5 font-mono text-[10.5px] tracking-[0.14em] text-dim uppercase">
        {caption}
      </figcaption>

      <div className="py-1.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1fr_90px] items-center gap-2 px-4 py-[9px] font-mono text-[13px] ${
              row.highlight ? "font-bold" : "text-dim"
            }`}
          >
            <span>{row.label}</span>
            <span className={`text-right ${row.highlight ? "text-accent" : ""}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {source && (
        <div className="border-t border-line px-4 py-2 font-mono text-[11px] text-mute">
          repro:{" "}
          <a
            href={sourceHref}
            className="text-dim underline decoration-dotted underline-offset-[3px] transition-colors hover:text-ink"
          >
            {source}
          </a>
        </div>
      )}
    </figure>
  );
}
