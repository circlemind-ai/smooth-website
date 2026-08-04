import { cellColor, compareColumns, compareRows } from "@/lib/content";

/**
 * Feature comparison across the three paid tiers.
 *
 * A real `<table>` rather than the prototype's nested divs on
 * `grid-template-columns` — it's a genuine tabular dataset, and `table-layout:
 * fixed` reproduces the same column proportions while letting screen readers
 * announce row and column headers. The wrapper scrolls horizontally rather than
 * letting the columns crush on narrow screens.
 */
export function CompareTable() {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full min-w-[560px] table-fixed border-collapse">
        <colgroup>
          <col className="w-[38%] min-w-[200px]" />
          {compareColumns.map((c) => (
            <col key={c} className="w-[20.66%]" />
          ))}
        </colgroup>

        <thead>
          <tr className="border-b border-line bg-soft font-mono text-xs">
            <th scope="col" className="px-[18px] py-3 text-left font-normal">
              <span className="sr-only">Feature</span>
            </th>
            {compareColumns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-3.5 py-3 text-center font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {compareRows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-soft transition-colors last:border-b-0 hover:bg-soft"
            >
              <th
                scope="row"
                className="px-[18px] py-[11px] text-left text-[13px] font-normal text-ink"
              >
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td
                  key={compareColumns[i]}
                  className="px-3.5 py-[11px] text-center font-mono text-[12.5px]"
                  style={{ color: cellColor(value) }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
