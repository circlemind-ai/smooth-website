import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // just a redirect to the SDK's skill file — not worth indexing
      disallow: "/skill.md",
    },
    sitemap: "https://smooth.sh/sitemap.xml",
  };
}
