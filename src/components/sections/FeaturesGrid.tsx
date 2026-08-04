import Image from "next/image";
import type { ReactNode } from "react";
import { SpecTip } from "@/components/ui/SpecTip";
import { Rail } from "@/components/ui/Rail";
import { FitContent } from "@/components/ui/FitContent";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Six feature cards, each with a bespoke illustration built from divs and one
 * inline SVG. Illustrations sit greyscale and paused until the card is hovered
 * — see `.featc` / `.fc` / `.fa` in globals.css. `fc` marks the artwork, `fa`
 * marks anything animated.
 */

/** A data packet in transit: dithered square in a white chip. */
function Packet({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <span
      className="fa absolute z-[1] box-border h-3 w-3 border border-hair bg-paper p-0.5"
      style={style}
    >
      <span
        className="block h-full w-full"
        style={{
          backgroundImage: `conic-gradient(${color} 25%, transparent 0 50%, ${color} 0 75%, transparent 0)`,
          backgroundSize: "2px 2px",
        }}
      />
    </span>
  );
}

/** Perforated track the packets ride along. */
function Track({ top, left, width }: { top: number; left: string; width: string }) {
  return (
    <div
      className="absolute h-[5px]"
      style={{
        top,
        left,
        width,
        backgroundImage: "radial-gradient(circle at 2.5px 2.5px, #B6B6B6 0.9px, transparent 1px)",
        backgroundSize: "5px 5px",
      }}
    />
  );
}

function Card({
  delay,
  title,
  featon,
  children,
}: {
  delay: number;
  title: ReactNode;
  featon?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`featc flex min-w-0 flex-col px-[26px] pt-[26px] pb-[22px] ${
        featon ? "featon" : ""
      }`}
    >
      <div
        data-reveal
        data-delay={delay}
        className="flex h-[180px] items-center justify-center overflow-hidden"
      >
        {children}
      </div>
      <h4 className="mt-3.5 mb-0 font-mono text-[14.5px] font-semibold tracking-[-0.01em]">
        {title}
      </h4>
    </div>
  );
}

/** Traffic converging on a single always-on box. */
function Serverless() {
  const tracks = [
    { top: 29, left: "20%", width: "60%", color: "#E58A3A", anim: "faslide 5s linear -1.5s infinite" },
    { top: 43, left: "10%", width: "80%", color: "#59ABFF", anim: "faslide 4.2s linear -3.1s infinite" },
    { top: 57, left: "0%", width: "100%", color: null, anim: null },
    { top: 71, left: "10%", width: "80%", color: "#7CB342", anim: "faslide 4.6s linear -0.9s infinite" },
    { top: 85, left: "20%", width: "60%", color: "#FF7BDF", anim: "faslide 5.4s linear -3.8s infinite" },
  ];

  return (
    <div className="fc relative" style={{ width: 250, height: 120 }}>
      {tracks.map((t) => (
        <div key={t.top} className="contents">
          <Track top={t.top} left={t.left} width={t.width} />
          {t.color && (
            <div className="absolute h-[5px]" style={{ top: t.top, left: t.left, width: t.width }}>
              <Packet
                color={t.color}
                style={{
                  top: "50%",
                  left: -14,
                  transform: "translateY(-50%)",
                  animation: t.anim!,
                }}
              />
            </div>
          )}
        </div>
      ))}
      <div className="absolute top-[18px] left-1/2 z-[2] flex h-[84px] w-[84px] -translate-x-1/2 items-center justify-center border border-hair bg-paper shadow-[0_0_0_8px_#FFFFFF]">
        <Image
          src="/assets/smooth-symbol.jpg"
          alt=""
          width={42}
          height={42}
          className="mb-1 object-contain grayscale"
        />
        <div className="absolute right-0 bottom-0 left-0 h-1.5 bg-shade" />
      </div>
    </div>
  );
}

/** Compliance chips, three of them ticking in sequence. */
function EnterpriseReady() {
  const rows: { label: string; tick?: number }[][] = [
    [{ label: "99.99% SLA", tick: 0 }, { label: "dpa" }],
    [{ label: "sso" }, { label: "on-prem", tick: 0.5 }, { label: "baa" }],
    [{ label: "zdr", tick: 1 }, { label: "soc-2 aligned" }],
  ];

  return (
    <div className="fc flex flex-col items-center gap-2.5">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2.5">
          {row.map((chip) => (
            <span
              key={chip.label}
              className="relative inline-flex items-center gap-[7px] border border-hair border-b-[6px] border-b-shade bg-paper px-3.5 pt-2 pb-1 font-mono text-xs text-ink"
            >
              {chip.label}
              {chip.tick !== undefined && (
                <span
                  className="fa inline-flex h-[15px] w-[15px] items-center justify-center rounded-full bg-accent text-[9px] text-paper"
                  style={{ animation: `fapop 3s ease ${chip.tick}s infinite` }}
                >
                  ✓
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** An agent typing credentials and submitting. */
function BehindLogins() {
  const label = "font-mono text-[9px] text-dim";
  const field = "relative h-3.5 border-b border-[#B6B6B6]";
  const typed =
    "fa absolute bottom-0.5 left-0 w-0 overflow-hidden font-mono text-[9.5px] whitespace-nowrap text-ink";

  return (
    <div className="fc relative" style={{ width: 150, height: 112 }}>
      <div className={label}>email</div>
      <div className={`${field} mb-2`}>
        <span className={typed} style={{ animation: "fatype1 4.2s steps(12, end) infinite" }}>
          dev@acme.com
        </span>
      </div>
      <div className={label}>password</div>
      <div className={`${field} mb-3`}>
        <span className={typed} style={{ animation: "fatype2 4.2s steps(8, end) infinite" }}>
          ••••••••
        </span>
      </div>
      <div
        className="fa mx-auto flex h-[22px] w-[74px] items-center justify-center bg-hair font-mono text-[10px] text-paper"
        style={{ animation: "fabtn 4.2s ease infinite" }}
      >
        log in
      </div>
      <Image
        src="/assets/cursor-arrow.svg"
        alt=""
        width={15}
        height={15}
        className="fa absolute top-0 left-0 z-[2] w-[15px]"
        style={{ animation: "facur3 4.2s ease-in-out infinite" }}
      />
    </div>
  );
}

/** Session replay plus the network and console panes beside it. */
function Observability() {
  const line = "fa font-mono text-[8.5px] whitespace-nowrap";

  return (
    <div className="fc" style={{ width: 220 }}>
      <div className="border border-hair bg-paper shadow-[0_2px_0_rgba(12,8,53,0.08)]">
        <div className="flex h-11 items-center justify-center border-b border-line">
          <span className="h-0 w-0 border-y-6 border-l-[9px] border-y-transparent border-l-accent" />
        </div>
        <div className="h-1 bg-shade">
          <div
            className="fa h-full w-0 bg-accent"
            style={{ animation: "faplay 3.6s linear infinite" }}
          />
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-[3px] border border-hair bg-paper px-2 py-1.5">
          <div className="font-mono text-[8px] tracking-[0.1em] text-mute">NETWORK</div>
          <div className={line} style={{ color: "#1063B6", animation: "faln1 3.6s linear infinite" }}>
            GET /pricing 200
          </div>
          <div className={line} style={{ color: "#1063B6", animation: "faln3 3.6s linear infinite" }}>
            POST /auth 201
          </div>
          <div className={line} style={{ color: "#1063B6", animation: "faln5 3.6s linear infinite" }}>
            GET /api/plans 200
          </div>
        </div>
        <div className="flex flex-col gap-[3px] border border-hair bg-paper px-2 py-1.5">
          <div className="font-mono text-[8px] tracking-[0.1em] text-mute">CONSOLE</div>
          <div className={`${line} text-dim`} style={{ animation: "faln2 3.6s linear infinite" }}>
            page loaded
          </div>
          <div className={`${line} text-dim`} style={{ animation: "faln4 3.6s linear infinite" }}>
            cookie set
          </div>
          <div className={line} style={{ color: "#7CB342", animation: "faln6 3.6s linear infinite" }}>
            task done ✓
          </div>
        </div>
      </div>
    </div>
  );
}

/** The "I am not a bot" checkbox, ticked by an agent cursor. */
function Captcha() {
  return (
    <div className="fc relative" style={{ width: 170, height: 66 }}>
      <div className="flex items-center gap-3 border border-hair border-b-[6px] border-b-shade bg-paper px-4 pt-3.5 pb-[9px]">
        <span className="relative h-[18px] w-[18px] shrink-0 border-[1.5px] border-mute">
          <span
            className="fa absolute inset-0 flex items-center justify-center text-sm font-bold text-accent opacity-0"
            style={{ animation: "fachk 3.4s ease infinite" }}
          >
            ✓
          </span>
        </span>
        <span className="font-mono text-[11.5px] text-ink">I am not a bot</span>
      </div>
      <Image
        src="/assets/cursor-arrow.svg"
        alt=""
        width={15}
        height={15}
        className="fa absolute top-0 left-0 z-[2] w-[15px]"
        style={{ animation: "fachkcur 3.4s ease-in-out infinite" }}
      />
    </div>
  );
}

const RETURN_PATH = "M212,72 L212,94 Q212,102 204,102 L36,102 Q28,102 28,94 L28,72";

/** Two isometric nodes trading packets over a private link. */
function PrivateNetwork() {
  return (
    <div className="fc relative" style={{ width: 240, height: 122 }}>
      <svg width="240" height="122" viewBox="0 0 240 122" className="absolute inset-0">
        <path
          d="M60,45 L180,45"
          stroke="#B6B6B6"
          strokeWidth="1.6"
          strokeDasharray="0.1 5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={RETURN_PATH}
          stroke="#B6B6B6"
          strokeWidth="1.6"
          strokeDasharray="0.1 5"
          strokeLinecap="round"
          fill="none"
        />
        <g transform="translate(0,20)">
          <path d="M28,0 L56,14 L28,28 L0,14 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="1" />
          <path d="M0,14 L28,28 L28,50 L0,36 Z" fill="#EDEDED" stroke="#C8C8C8" strokeWidth="1" />
          <path d="M28,28 L56,14 L56,36 L28,50 Z" fill="#DBDBDB" stroke="#C8C8C8" strokeWidth="1" />
        </g>
        <g transform="translate(184,20)">
          <path d="M28,0 L56,14 L28,28 L0,14 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="1" />
          <path d="M0,14 L28,28 L28,50 L0,36 Z" fill="#BCDEFF" stroke="#C8C8C8" strokeWidth="1" />
          <path d="M28,28 L56,14 L56,36 L28,50 Z" fill="#9BCDFF" stroke="#C8C8C8" strokeWidth="1" />
        </g>
      </svg>

      <div className="absolute" style={{ left: 60, width: 120, top: 39, height: 12 }}>
        <Packet
          color="#59ABFF"
          style={{
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            animation: "fatravA 3.4s linear infinite",
          }}
        />
      </div>
      <Packet
        color="#FF7BDF"
        style={{
          left: 0,
          top: 0,
          offsetPath: `path('${RETURN_PATH}')`,
          offsetRotate: "0deg",
          animation: "fatravP 3.4s linear infinite",
        }}
      />
    </div>
  );
}

const VLINES = [
  "calc((100% - 42px)/3)",
  "calc((100% - 42px)/3 + 21px)",
  "calc((100% - 42px)*2/3 + 21px)",
  "calc((100% - 42px)*2/3 + 42px)",
];

const row = "grid grid-cols-3 gap-[21px] max-md:grid-cols-1 max-md:gap-0 max-md:[&>div+div]:border-t max-md:[&>div+div]:border-dashed max-md:[&>div+div]:border-line";

export function FeaturesGrid() {
  return (
    <Rail>
      <FitContent />
      <SectionHeading title="production ready">
        you build the agent, we run it reliably at scale
      </SectionHeading>

      <div className="relative">
        <div className="h-[21px] border-b border-dashed border-line" />

        <div className={row}>
          <Card delay={0} title="fully serverless" featon>
            <Serverless />
          </Card>
          <Card delay={70} title="enterprise ready">
            <EnterpriseReady />
          </Card>
          <Card delay={140} title="access behind logins">
            <BehindLogins />
          </Card>
        </div>

        <div className="h-[21px] border-y border-dashed border-line" />

        <div className={row}>
          <Card delay={0} title="observability and video recordings">
            <Observability />
          </Card>
          <Card
            delay={70}
            title={
              <>
                <SpecTip
                  lines
                  tip={
                    "• stealth chromium fork\n• humanized movements\n• managed proxies\n• captcha solver"
                  }
                >
                  avoid captchas
                </SpecTip>{" "}
                and solve them
              </>
            }
          >
            <Captcha />
          </Card>
          <Card delay={140} title="access localhost and private networks">
            <PrivateNetwork />
          </Card>
        </div>

        <div className="h-[21px] border-t border-dashed border-line" />

        {/* The 21px gutters between cards read as double rules. */}
        {VLINES.map((left) => (
          <div
            key={left}
            className="pointer-events-none absolute top-0 bottom-0 border-l border-dashed border-line max-md:hidden"
            style={{ left }}
          />
        ))}
      </div>
    </Rail>
  );
}
