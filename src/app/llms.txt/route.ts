import { getAllPosts } from "@/lib/blog";

/**
 * llms.txt — a plain-markdown orientation page for AI crawlers and agents
 * (the general-purpose sibling of /skill.md, which carries the SDK skill).
 * Regenerated from the blog index so new posts show up automatically.
 */
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts()
    .map(
      (p) =>
        `- [${p.title}](https://smooth.sh/blog/${p.slug}): ${p.excerpt}`,
    )
    .join("\n");

  const body = `# smooth

> smooth (smooth.sh, by Circlemind Inc) is cloud browser + web agent
> infrastructure for AI: sandboxed Chromium sessions co-located with small
> specialized models that navigate, scrape, and act on the web reliably and
> at scale. You design the agent; smooth runs it — serverless, from one-off
> runs to millions of executions.

smooth uses small models specialized in web tasks instead of giant
general-purpose LLMs, which makes agents faster and cheaper than
computer-use frontier models, with state-of-the-art reliability on
web-navigation benchmarks (WebVoyager).

## Docs

- [Documentation](https://docs.smooth.sh): quickstart, guides, concepts
- [Dashboard](https://app.smooth.sh): sign up, API keys (free tier, no credit card)
- [Python SDK](https://github.com/circlemind-ai/smooth-sdk): client library and examples
- [Agent skill](https://smooth.sh/skill.md): drop-in instructions for coding agents using the SDK
- [Status](https://status.smooth.sh): uptime and incidents

## Product

- [Pricing](https://smooth.sh/pricing): free, starter, growth and enterprise plans
- [Talk to us](https://calendly.com/smooth-sh/talk-to-us): demos and enterprise

## Blog

${posts}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
