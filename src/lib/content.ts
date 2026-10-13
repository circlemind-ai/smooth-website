/**
 * All copy and link data for the marketing site.
 *
 * Every `#` below is a placeholder carried over from the design — the source
 * never resolved them. Centralising them here means wiring up real
 * destinations later is a one-line change per link rather than a hunt
 * through JSX.
 */

/**
 * Every off-site destination, in one place. Components reference these rather
 * than embedding URLs, so a domain move is a single edit here.
 */
export const urls = {
  /** dashboard / sign-in / sign-up */
  app: "https://app.smooth.sh",
  docs: "https://docs.smooth.sh",
  apiReference: "https://docs.smooth.sh/api-reference/introduction",
  status: "https://status.smooth.sh",
  sdk: "https://github.com/circlemind-ai/smooth-sdk",
  booking: "https://calendly.com/smooth-sh/talk-to-us",
  github: "https://github.com/circlemind-ai",
  linkedin: "https://www.linkedin.com/company/circlemindai",
  x: "https://x.com/smoothdotsh",
  privacy: "https://app.smooth.sh/privacy",
  terms: "https://app.smooth.sh/terms",
} as const;

/** `external` opens in a new tab and adds the rel guard. */
export type Link = { label: string; href: string; external?: boolean };

/**
 * Not currently surfaced — the platform dropdown is hidden from the nav.
 * Kept so restoring it is a UI change rather than a retyping exercise.
 */
export const platformLinks: Link[] = [
  { label: "web agents", href: "#" },
  { label: "serverless browsers", href: "#" },
  { label: "fetch & search", href: "#" },
  { label: "stealth browsing", href: "#" },
  { label: "persistent sessions", href: "#" },
  { label: "structured extraction", href: "#" },
];

export const navLinks: Link[] = [
  { label: "blog", href: "/blog" },
  { label: "pricing", href: "/pricing" },
  { label: "docs", href: urls.docs, external: true },
];

export const footerColumns: { title: string; links: Link[] }[] = [
  {
    title: "product",
    links: [
      { label: "web agents", href: "#" },
      { label: "serverless browsers", href: "#" },
      { label: "fetch api", href: "#" },
      { label: "search api", href: "#" },
      { label: "stealth browsing", href: "#" },
      { label: "security", href: "#" },
    ],
  },
  {
    title: "use cases",
    links: [
      { label: "web scraping", href: "#" },
      { label: "automated testing", href: "#" },
      { label: "data extraction", href: "#" },
      { label: "form filling", href: "#" },
      { label: "price monitoring", href: "#" },
      { label: "ai agents", href: "#" },
      { label: "market research", href: "#" },
    ],
  },
  {
    title: "developers",
    links: [
      { label: "documentation", href: urls.docs },
      { label: "dashboard", href: urls.app },
      { label: "changelog", href: "#" },
      { label: "status", href: urls.status, external: true },
      { label: "sdk", href: urls.sdk, external: true },
    ],
  },
  {
    title: "resources",
    links: [
      { label: "blog", href: "/blog" },
      { label: "benchmarks", href: "https://docs.smooth.sh/performance", external: true },
      { label: "pricing", href: "/pricing" },
      { label: "case studies", href: "#" },
      { label: "smooth vs browser-use", href: "#" },
      { label: "careers", href: "#" },
      { label: "videos", href: "#" },
    ],
  },
  {
    // Only entries with a real destination — the email/sales/support rows
    // this replaced had none.
    title: "social",
    links: [
      { label: "github", href: urls.github, external: true },
      { label: "linkedin", href: urls.linkedin, external: true },
      { label: "x.com", href: urls.x, external: true },
    ],
  },
];


export const footerBottomLinks: Link[] = [
  { label: "privacy policy", href: urls.privacy },
  { label: "terms of service", href: urls.terms },
];


export const faqs: { q: string; a: string }[] = [
  {
    q: "what is smooth?",
    a: "smooth is the production-grade setup to build and deploy web agents at scale",
  },
  {
    q: "can you help us build?",
    a: "yes, we work closely with our customers - tell us about your workload and we'll work with you to chart a path to production",
  },
  {
    q: "can I try it before subscribing?",
    a: "yes. free tier, no credit card. grab an API key and run your first task in minutes.",
  },
  {
    q: "what level of support do you provide?",
    a: "free and starter plans can join the discord server for community support, growth and enterprise customers have access to our support team and a direct channel with the founders",
  },
  {
    q: "can we deploy smooth on-prem?",
    a: "yes - depending on requirements, we can deploy single-tenant clusters, BYOC, or on-prem",
  },
  { q: "are you hiring?", a: "yes, get in touch!" },
];

/**
 * The four products shown in the card stack. `kind` keys both the animation
 * set and the card body; `hold` is how long that card stays front before the
 * stack advances (tuned per-card to match its animation length).
 */
export type StackKind = "login" | "extract" | "blog" | "search";

/** `search` is built but currently hidden — re-add its entry to bring it back. */
export const stackItems: {
  kind: StackKind;
  title: string;
  desc: string;
  /** window chrome title on the mock browser */
  win: string;
  color: string;
  /** mosaic backdrop tint while this card is front */
  bg: string;
  hold: number;
}[] = [
  {
    kind: "login",
    title: "interact",
    desc: "run any task from natural language",
    win: "login",
    color: "#168AFF",
    bg: "#BCDEFF",
    hold: 5800,
  },
  {
    kind: "extract",
    title: "extract",
    desc: "get schema-validated json data from any page",
    win: "pricing",
    color: "#22B573",
    bg: "#BFE8D2",
    hold: 5500,
  },
  {
    kind: "blog",
    title: "scrape",
    desc: "scrape pages as markdown, screenshots, or pdfs",
    win: "blog",
    color: "#FF7BDF",
    bg: "#FFD6F4",
    hold: 4500,
  },
];

export const agentPrompt = `read https://smooth.sh/skill.md, then install the smooth
SDK, and ask me what I want to build`;

/* ============================================================
   Pricing
   ============================================================ */

export type Plan = {
  name: string;
  tagline: string;
  price: string;
  /** billing period, blank for the plans that aren't monthly */
  per: string;
  features: string[];
  cta: string;
  href: string;
  variant: "primary" | "secondary";
  /** reveal stagger, ms */
  delay: number;
};

export const plans: Plan[] = [
  {
    name: "free",
    tagline: "basic features, limited usage",
    price: "free",
    per: "",
    features: ["free welcome credits", "2 concurrent browsers", "$0.005/step"],
    cta: "Start for free",
    href: urls.app,
    variant: "secondary",
    delay: 0,
  },
  {
    name: "starter",
    tagline: "ideal for small projects",
    price: "$50",
    per: "/month",
    features: [
      "includes $50 API credits each month",
      "10 concurrent browsers",
      "custom proxy",
      "persistent sessions",
      "stealth mode",
      "$0.005/step",
    ],
    cta: "Start for free",
    href: urls.app,
    variant: "primary",
    delay: 70,
  },
  {
    name: "growth",
    tagline: "scales with your success",
    price: "$500",
    per: "/month",
    features: [
      "everything in starter",
      "includes $500 API credits each month",
      "50 concurrent browsers",
      "24/7 support from the founders",
    ],
    cta: "Start for free",
    href: urls.app,
    variant: "secondary",
    delay: 140,
  },
  {
    // No feature list by design — the tagline carries the pitch.
    name: "enterprise",
    tagline: "custom solutions, security compliance, premium support",
    price: "custom",
    per: "",
    features: [],
    cta: "Talk to us",
    href: urls.booking,
    variant: "secondary",
    delay: 210,
  },
];

export const CHECK = "✓";
export const DASH = "—";

/** `free` is deliberately absent — the table only compares the paid tiers. */
export const compareColumns = ["starter", "growth", "enterprise"] as const;

export const compareRows: { label: string; values: [string, string, string] }[] = [
  { label: "credits included", values: ["$50", "$500", "unlimited"] },
  { label: "concurrent browsers", values: ["10", "50", "unlimited"] },
  { label: "custom proxy", values: [CHECK, CHECK, CHECK] },
  { label: "persistent sessions", values: [CHECK, CHECK, CHECK] },
  { label: "implementation team", values: [DASH, CHECK, CHECK] },
  { label: "24/7 support", values: [DASH, CHECK, CHECK] },
  { label: "single tenant", values: [DASH, DASH, CHECK] },
  { label: "BYOC", values: [DASH, DASH, CHECK] },
  { label: "BAA agreements", values: [DASH, DASH, CHECK] },
  { label: "SSO and SAML authentication", values: [DASH, DASH, CHECK] },
];

/** Cell colour is derived from the value rather than authored per cell. */
export function cellColor(value: string): string {
  if (value === CHECK) return "var(--color-accent)";
  if (value === DASH) return "#C8C8C8";
  return "var(--color-ink)";
}
