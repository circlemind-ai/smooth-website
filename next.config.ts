import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
