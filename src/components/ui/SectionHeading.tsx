/**
 * The full-width title block that introduces a major section — a large mono
 * heading over a short line of body copy, closed by a dashed rule.
 *
 * Sits inside a Rail and spans it, so the rule meets the vertical rails on
 * both sides.
 */
export function SectionHeading({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div className="border-b border-dashed border-line px-8 py-[72px]">
      <h3 className="m-0 font-mono text-[clamp(26px,3vw,38px)] font-semibold tracking-[-0.03em]">
        {title}
      </h3>
      <p className="mt-3 mb-0 max-w-[480px] text-[15px] leading-[1.6] text-pretty text-dim">
        {children}
      </p>
    </div>
  );
}
