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
};

export default nextConfig;
