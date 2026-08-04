import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { ThemeRegistrationRaw } from "shiki";

/**
 * Syntax theme derived from the site palette rather than a stock Shiki theme,
 * so code blocks read as part of the design instead of as a foreign widget.
 *
 * Highlighting runs at build time — no Shiki reaches the browser.
 */
const tokens: NonNullable<ThemeRegistrationRaw["settings"]> = [
  {
    scope: ["comment", "punctuation.definition.comment"],
    settings: { foreground: "#929292", fontStyle: "italic" },
  },
  {
    scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator.new"],
    settings: { foreground: "#1063B6" },
  },
  {
    scope: ["string", "string.quoted", "constant.other.symbol", "punctuation.definition.string"],
    settings: { foreground: "#1063B6" },
  },
  {
    scope: ["constant.numeric", "constant.language", "constant.character"],
    settings: { foreground: "#168AFF" },
  },
  {
    scope: ["entity.name.type", "support.type", "support.class", "entity.name.class"],
    settings: { foreground: "#22B573" },
  },
  {
    scope: ["entity.name.function", "support.function", "meta.function-call"],
    settings: { foreground: "#0C0835" },
  },
  {
    scope: ["variable", "meta.definition.variable", "variable.parameter"],
    settings: { foreground: "#0C0835" },
  },
];

/**
 * The token list is declared under both keys on purpose. Shiki's
 * `ThemeRegistrationRaw` requires `settings`, while rehype-pretty-code decides
 * whether it's been handed an inline theme by testing for `tokenColors` — with
 * only `settings` present it treats the object as a *map* of named themes and
 * fails with "Theme `smooth-light` is not included in this bundle".
 */
const smoothLight: ThemeRegistrationRaw = {
  name: "smooth-light",
  type: "light",
  colors: {
    "editor.background": "#F7F9FC",
    "editor.foreground": "#0C0835",
  },
  settings: tokens,
  tokenColors: tokens,
};

const prettyCode: PrettyCodeOptions = {
  theme: smoothLight,
  // The <pre> mapping in mdx-components already paints the surface; letting
  // Shiki set its own would double up and defeat the token.
  keepBackground: false,
  defaultLang: "text",
};

/**
 * Passed to compileMDX in the article route.
 *
 * `blockJS: false` is load-bearing. next-mdx-remote defaults it to true, which
 * injects a remark plugin that strips every JavaScript expression from the
 * document — the right default for rendering untrusted MDX from a CMS, but it
 * silently swallows props like `<Benchmark rows={[…]} />`, leaving the
 * component to render with them undefined and no error to explain why.
 * Our posts are first-party and version-controlled, so the guard buys nothing.
 *
 * `blockDangerousJS` stays on, so calls like eval/fetch are still rejected.
 */
export const mdxOptions = {
  blockJS: false,
  blockDangerousJS: true,
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, prettyCode]] as never,
  },
};
