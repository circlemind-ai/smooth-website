import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The per-post share card renders on demand and reads the brand fonts
  // from disk — make sure they're traced into the serverless bundle.
  outputFileTracingIncludes: {
    "/blog/[slug]/opengraph-image": ["./src/fonts/*.ttf"],
  },
  redirects() {
    return [
      {
        // The "build with agents" prompt tells agents to read
        // https://smooth.sh/skill.md — send them to the SDK's skill file.
        source: "/skill.md",
        destination:
          "https://raw.githubusercontent.com/circlemind-ai/smooth-sdk/refs/heads/master/skills/smooth-sdk/SKILL.md",
        permanent: false,
      },
    ];
  },
  // PostHog reverse proxy: events leave from our own domain so ad-blockers
  // don't filter them (see src/instrumentation-client.ts).
  rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog's API endpoints use trailing slashes; don't strip them.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
