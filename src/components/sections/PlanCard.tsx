import { Button } from "@/components/ui/Button";
import type { Plan } from "@/lib/content";

/**
 * One pricing tier. The tagline carries a `min-height` so the price rows line
 * up across cards regardless of how long each tagline wraps, and the feature
 * list takes the remaining height so every CTA sits flush at the bottom.
 */
export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      data-reveal
      data-delay={plan.delay}
      className="flex flex-col px-7 pt-[34px] pb-[30px]"
    >
      <h2 className="m-0 font-mono text-[17px] font-semibold tracking-[-0.01em]">
        {plan.name}
      </h2>

      <p className="mt-2 mb-0 min-h-[42px] text-[13.5px] leading-[1.55] text-pretty text-dim">
        {plan.tagline}
      </p>

      <div className="mt-3.5 mb-[18px] font-mono">
        <span className="text-[30px] font-semibold tracking-[-0.03em]">{plan.price}</span>
        {plan.per && <span className="text-[12.5px] text-dim">{plan.per}</span>}
      </div>

      <ul className="m-0 flex flex-1 list-none flex-col gap-[9px] p-0">
        {plan.features.map((f) => (
          <li key={f} className="flex items-baseline gap-[9px] text-[13.5px] leading-[1.5] text-ink">
            <span aria-hidden className="shrink-0 font-mono text-[11px] text-accent">
              +
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Button href={plan.href} variant={plan.variant} block className="mt-6">
        {plan.cta}
      </Button>
    </div>
  );
}
