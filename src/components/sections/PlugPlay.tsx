import { Rail } from "@/components/ui/Rail";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Three-step getting-started strip: key → task → watch. */

export const plugPlaySteps: { title: string; desc: string }[] = [
  {
    title: "get your free API key",
    desc: "sign up, grab your API key, and you're ready to go — no credit card required",
  },
  {
    title: "launch a task",
    desc: "fire off a task in seconds with a single API call",
  },
  {
    title: "watch your agent work",
    desc: "sit back and relax while smooth does all the legwork",
  },
];

const heading =
  "m-0 font-mono text-[clamp(17px,1.8vw,21px)] font-semibold tracking-[-0.02em]";
const body = "m-0 text-sm leading-[1.65] text-pretty text-dim";
const cell = "flex min-w-0 flex-col gap-4 px-8 pt-9 pb-10";

export function PlugPlay() {
  return (
    <Rail>
      <SectionHeading title="plug & play">
        get your API key and integrate seamlessly into your application
      </SectionHeading>

      <div className="grid grid-cols-3 max-md:grid-cols-1 max-md:[&>div+div]:border-t max-md:[&>div+div]:border-dashed max-md:[&>div+div]:border-line">
        {plugPlaySteps.map((s, i) => (
          <div
            key={s.title}
            className={`${cell} ${
              i > 0 ? "border-l border-dashed border-line max-md:border-l-0" : ""
            }`}
          >
            <span className="font-mono text-[12.5px] font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={heading}>{s.title}</h3>
            <p className={body}>{s.desc}</p>
          </div>
        ))}
      </div>
    </Rail>
  );
}
