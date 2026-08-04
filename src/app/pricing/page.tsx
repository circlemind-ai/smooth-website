import type { Metadata } from "next";
import { Rail } from "@/components/ui/Rail";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { PlanCard } from "@/components/sections/PlanCard";
import { CompareTable } from "@/components/sections/CompareTable";
import { plans } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start for free and scale easily. Free, starter, growth and enterprise plans for running web agents in production.",
};

export default function PricingPage() {
  return (
    <>
      <RevealObserver />

      <header className="border-b border-dashed border-line">
        <Rail className="px-8 pt-16 pb-12">
          <h1
            data-reveal
            className="m-0 font-mono text-[clamp(28px,3.2vw,40px)] font-semibold tracking-[-0.03em]"
          >
            plans that scale with you
          </h1>
          <p
            data-reveal
            data-delay="100"
            className="mt-3 mb-0 max-w-[520px] text-[15.5px] leading-[1.6] text-pretty text-dim"
          >
            start for free, scale easily
          </p>
        </Rail>
      </header>

      <main>
        <Rail>
          <div className="plan-grid border-b border-dashed border-line">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>

          <div className="px-8 pt-14 pb-[72px]">
            <h2
              data-reveal
              className="mt-0 mb-7 font-mono text-[clamp(18px,2vw,24px)] font-semibold tracking-[-0.02em]"
            >
              compare plans
            </h2>
            <CompareTable />
          </div>
        </Rail>
      </main>
    </>
  );
}
