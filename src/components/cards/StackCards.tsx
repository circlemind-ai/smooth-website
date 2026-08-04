import Image from "next/image";
import type { StackKind } from "@/lib/content";

/**
 * The four mock-browser bodies driven by the card stack. Each is a static
 * arrangement of grey bars — the storytelling is entirely in the CSS
 * animations, which are passed in as `anim` and restart when the parent
 * remounts the card.
 *
 * Every card is drawn at a fixed 645×363 and scaled to fit by the parent, so
 * all dimensions here are absolute.
 */

export type Anims = {
  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;
};

export const NO_ANIM: Anims = { a1: "none", a2: "none", a3: "none", a4: "none", a5: "none" };

/** Per-card animation sets, keyed to the shared keyframes in globals.css. */
export function animsFor(kind: StackKind): Anims {
  switch (kind) {
    case "login":
      return {
        a1: "v3cursor 4.8s ease-in-out 0s both",
        a2: "stktype12 0.7s steps(12) 0.9s both",
        a3: "stktype8 0.5s steps(8) 1.9s both",
        a4: "none",
        a5: "none",
      };
    case "blog":
      return {
        a1: "stkscan 3.5s linear 0s both",
        a2: "stkfadeout 3.5s linear 0s both",
        a3: "stkfadein 3.5s linear 0s both",
        a4: "none",
        a5: "none",
      };
    case "search":
      return {
        a1: "stkitem 0.4s ease 1.2s both",
        a2: "stkitem 0.4s ease 1.7s both",
        a3: "stkitem 0.4s ease 2.2s both",
        a4: "stkfadeout 3.6s linear 0.9s both",
        a5: "stkfadein 3.6s linear 0.9s both",
      };
    case "extract":
      return {
        a1: "stkselect 4.5s linear 0s both",
        a2: "stkfadeout 4.5s linear 0s both",
        a3: "stkfadein 4.5s linear 0s both",
        a4: "stkscan 1.3s linear 1.6s both",
        a5: "none",
      };
  }
}

const bar = (h: number, w: string, bg: string) => (
  <div style={{ height: h, width: w, background: bg }} />
);

/** An agent filling in and submitting a login form. */
function LoginCard({ anim }: { anim: Anims }) {
  const field =
    "mx-auto flex h-[22px] w-[52%] items-center border border-line bg-soft px-2 box-border";
  const typed = "inline-block w-0 overflow-hidden font-mono text-[10px] whitespace-nowrap text-ink";

  return (
    <>
      <div className="absolute inset-0 flex flex-col gap-2 px-[18px] py-3.5">
        <div className="mx-auto mt-2 mb-1 h-[9px] w-[26%] bg-card" />
        <div className={field}>
          <span className={typed} style={{ animation: anim.a2 }}>
            jane@acme.co
          </span>
        </div>
        <div className={field}>
          <span className={typed} style={{ animation: anim.a3 }}>
            ••••••••
          </span>
        </div>
        <div className="mx-auto mt-1 flex h-[22px] w-[52%] items-center justify-center bg-ink">
          <span className="font-mono text-[9.5px] text-paper">Log in</span>
        </div>
        <div className="mx-auto mt-[3px] h-[6px] w-[28%] bg-soft" />
      </div>

      <div
        className="pointer-events-none absolute top-0 left-0 z-[3] opacity-0"
        style={{ animation: anim.a1 }}
      >
        <Image src="/assets/cursor-arrow.svg" alt="" width={13} height={13} className="block" />
        <span className="absolute top-[11px] left-[11px] bg-accent px-1.5 py-px font-mono text-[8.5px] whitespace-nowrap text-paper">
          smooth
        </span>
      </div>
    </>
  );
}

/** A rendered page being scanned and turned into markdown. */
function BlogCard({ anim, color }: { anim: Anims; color: string }) {
  return (
    <>
      <div className="absolute inset-0 px-[18px] py-3.5" style={{ animation: anim.a2 }}>
        <div className="flex h-full gap-3.5">
          <div className="flex flex-[1.2] flex-col gap-2">
            {bar(11, "80%", "var(--color-card)")}
            {bar(6, "40%", "var(--color-soft)")}
            <div className="mt-1.5" />
            {bar(6, "100%", "var(--color-soft)")}
            {bar(6, "94%", "var(--color-soft)")}
            {bar(6, "97%", "var(--color-soft)")}
            {bar(6, "88%", "var(--color-soft)")}
            {bar(6, "58%", "var(--color-soft)")}
          </div>
          <div className="flex-1 border border-line bg-card" />
        </div>
      </div>

      <div
        className="absolute inset-0 px-[18px] py-3.5 font-mono text-[10px] leading-[1.9] text-ink opacity-0"
        style={{ animation: anim.a3 }}
      >
        <div style={{ color }}># Turn any page into clean data</div>
        <div className="text-mute">## Features</div>
        <div>- Real browser rendering, JS included</div>
        <div>- Markdown, JSON, screenshots</div>
        <div>- Smart wait</div>
      </div>

      <div
        className="absolute top-0 right-0 left-0 z-[3] h-0.5 opacity-0"
        style={{ animation: anim.a1, background: color, boxShadow: `0 0 10px ${color}` }}
      />
    </>
  );
}

/** A search box filling with ranked results, then the structured payload. */
function SearchCard({ anim, color }: { anim: Anims; color: string }) {
  const results = [
    { anim: anim.a1, title: "38%", sub: "76%" },
    { anim: anim.a2, title: "44%", sub: "68%" },
    { anim: anim.a3, title: "34%", sub: "72%" },
  ];

  return (
    <>
      <div className="absolute inset-0 px-[18px] py-3" style={{ animation: anim.a4 }}>
        <div className="box-border flex h-[24px] w-[64%] items-center border border-line bg-soft px-[9px]">
          <span className="font-mono text-[9.5px] text-dim">cheapest flight nyc → la</span>
        </div>
        <div>
          {results.map((r, i) => (
            <div key={i} className="opacity-0" style={{ animation: r.anim }}>
              <div
                className={i === 0 ? "mt-3" : "mt-2.5"}
                style={{ height: 7, width: r.title, background: color, opacity: 0.7 }}
              />
              <div
                className="mt-[5px]"
                style={{ height: 6, width: r.sub, background: "var(--color-soft)" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 px-[18px] py-2.5 opacity-0"
        style={{ animation: anim.a5 }}
      >
        <pre className="m-0 font-mono text-[10px] leading-[1.75] text-ink">
          <span className="text-mute">[</span>
          {"\n  {\n    "}
          <span style={{ color }}>&quot;url&quot;</span>
          {": "}
          <span className="text-mute">&quot;nyc-la.flights&quot;</span>
          {",\n    "}
          <span style={{ color }}>&quot;title&quot;</span>
          {": "}
          <span className="text-mute">&quot;NYC → LA from $128&quot;</span>
          {",\n    "}
          <span style={{ color }}>&quot;desc&quot;</span>
          {": "}
          <span className="text-mute">&quot;Nonstop, 7:05am, refundable&quot;</span>
          {"\n  },\n  {\n    "}
          <span style={{ color }}>&quot;url&quot;</span>
          {": "}
          <span className="text-mute">&quot;skyfare.io&quot;</span>
          {",\n    "}
          <span style={{ color }}>&quot;title&quot;</span>
          {": "}
          <span className="text-mute">&quot;LA deals today&quot;</span>
          {",\n    "}
          <span style={{ color }}>&quot;desc&quot;</span>
          {": "}
          <span className="text-mute">&quot;3 carriers compared&quot;</span>
          {"\n  }\n"}
          <span className="text-mute">]</span>
        </pre>
      </div>
    </>
  );
}

/** Three pricing cards selected and scanned into schema-validated JSON. */
function ExtractCard({ anim, color }: { anim: Anims; color: string }) {
  return (
    <>
      <div className="absolute inset-0 px-[18px] py-3.5" style={{ animation: anim.a2 }}>
        <div className="mx-auto mb-2.5 h-[9px] w-[30%] bg-card" />
        <div className="flex h-[calc(100%-30px)] gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`relative box-border flex flex-1 flex-col gap-1.5 border border-line p-2 ${
                i === 1 ? "bg-soft" : ""
              }`}
            >
              {bar(7, "50%", "var(--color-card)")}
              {bar(11, "36%", i === 1 ? "#DBDBDB" : "var(--color-soft)")}
              {bar(5, "88%", i === 1 ? "#DBDBDB" : "var(--color-soft)")}
              {bar(5, "78%", i === 1 ? "#DBDBDB" : "var(--color-soft)")}
              <div
                className="absolute -inset-1 border-2 border-dashed opacity-0"
                style={{ borderColor: color, animation: anim.a1 }}
              />
              <div
                className="absolute top-0 -right-0.5 -left-0.5 h-0.5 opacity-0"
                style={{ background: color, boxShadow: `0 0 8px ${color}`, animation: anim.a4 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 px-[18px] py-2.5 opacity-0" style={{ animation: anim.a3 }}>
        <pre className="m-0 font-mono text-[10px] leading-[1.75] text-ink">
          <span className="text-mute">{"{"}</span>{" "}
          <span style={{ color }}>&quot;plans&quot;</span>
          {": "}
          <span className="text-mute">[</span>
          {"\n  { "}
          <span style={{ color }}>&quot;name&quot;</span>
          {": "}
          <span className="text-mute">&quot;Free&quot;</span>
          {", "}
          <span style={{ color }}>&quot;price&quot;</span>
          {": "}
          <span className="text-mute">&quot;$0&quot;</span>
          {",\n    "}
          <span style={{ color }}>&quot;features&quot;</span>
          {": "}
          <span className="text-mute">[&quot;100 tasks/mo&quot;, &quot;community&quot;]</span>
          {" },\n  { "}
          <span style={{ color }}>&quot;name&quot;</span>
          {": "}
          <span className="text-mute">&quot;Pro&quot;</span>
          {", "}
          <span style={{ color }}>&quot;price&quot;</span>
          {": "}
          <span className="text-mute">&quot;$49&quot;</span>
          {",\n    "}
          <span style={{ color }}>&quot;features&quot;</span>
          {": "}
          <span className="text-mute">[&quot;10k tasks/mo&quot;, &quot;priority&quot;]</span>
          {" },\n  { "}
          <span style={{ color }}>&quot;name&quot;</span>
          {": "}
          <span className="text-mute">&quot;Scale&quot;</span>
          {", "}
          <span style={{ color }}>&quot;price&quot;</span>
          {": "}
          <span className="text-mute">&quot;custom&quot;</span>
          {",\n    "}
          <span style={{ color }}>&quot;features&quot;</span>
          {": "}
          <span className="text-mute">[&quot;unlimited&quot;, &quot;on-prem&quot;]</span>
          {" }\n"}
          <span className="text-mute">] {"}"}</span>
          {"  "}
          <span style={{ color: "#22B573" }}>✓ schema-validated</span>
        </pre>
      </div>
    </>
  );
}

export function StackCardBody({
  kind,
  anim,
  color,
}: {
  kind: StackKind;
  anim: Anims;
  color: string;
}) {
  switch (kind) {
    case "login":
      return <LoginCard anim={anim} />;
    case "blog":
      return <BlogCard anim={anim} color={color} />;
    case "search":
      return <SearchCard anim={anim} color={color} />;
    case "extract":
      return <ExtractCard anim={anim} color={color} />;
  }
}
