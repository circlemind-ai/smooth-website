import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://smooth.sh", priority: 1 },
    { url: "https://smooth.sh/pricing", priority: 0.8 },
    { url: "https://smooth.sh/blog", priority: 0.6 },
    ...getAllPosts().map((post) => ({
      url: `https://smooth.sh/blog/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.6,
    })),
  ];
}
