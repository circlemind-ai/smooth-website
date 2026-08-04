/**
 * All copy and link data for the marketing site.
 *
 * Every `#` below is a placeholder carried over from the design — the source
 * never resolved them. Centralising them here means wiring up real
 * destinations later is a one-line change per link rather than a hunt
 * through JSX.
 */

export type Link = { label: string; href: string };

export const platformLinks: Link[] = [
  { label: "web agents", href: "#" },
  { label: "serverless browsers", href: "#" },
  { label: "fetch & search", href: "#" },
  { label: "stealth browsing", href: "#" },
  { label: "persistent sessions", href: "#" },
  { label: "structured extraction", href: "#" },
];

export const navLinks: Link[] = [
  { label: "docs", href: "#" },
  { label: "pricing", href: "/pricing" },
  { label: "blog", href: "/blog" },
];

export const footerColumns: { title: string; links: Link[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Web Agents", href: "#" },
      { label: "Serverless Browsers", href: "#" },
      { label: "Fetch API", href: "#" },
      { label: "Search API", href: "#" },
      { label: "Stealth Browsing", href: "#" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "#" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Web Scraping", href: "#" },
      { label: "Automated Testing", href: "#" },
      { label: "Data Extraction", href: "#" },
      { label: "Form Filling", href: "#" },
      { label: "Price Monitoring", href: "#" },
      { label: "AI Agents", href: "#" },
      { label: "Market Research", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Dashboard", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
      { label: "Python SDK", href: "#" },
      { label: "TypeScript SDK", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Benchmarks", href: "/#benchmarks" },
      { label: "Case Studies", href: "#" },
      { label: "Smooth vs browser-use", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Videos", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Subprocessors", href: "#" },
      { label: "SLA", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Team Email", href: "#" },
      { label: "Sales", href: "#" },
      { label: "Support", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X.com", href: "#" },
    ],
  },
];

export const footerBottomLinks: Link[] = [
  { label: "Legal", href: "#" },
  { label: "Trust Center", href: "#" },
  { label: "Privacy Policy", href: "#" },
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
  {
    kind: "search",
    title: "search",
    desc: "finds relevant pages from the live web",
    win: "google",
    color: "#59ABFF",
    bg: "#DEEEFF",
    hold: 5500,
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
    href: "#",
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
    href: "#",
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
    href: "#",
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
    href: "#",
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
