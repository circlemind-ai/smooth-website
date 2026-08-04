import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog posts are MDX files on disk — one file per post, filename is the slug
 * is the URL. Adding a post means dropping a file in `content/blog/`; nothing
 * here or in the routes needs touching.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO yyyy-mm-dd, the single source for both date renderings */
  date: string;
  author: string;
  excerpt: string;
  draft: boolean;
};

export type Post = PostMeta & { body: string };

/**
 * Frontmatter is validated rather than trusted: a typo should fail the build
 * with the offending filename, not ship a page reading "undefined". Kept as a
 * hand-rolled check because there are only five fields — worth swapping for a
 * schema library if that grows.
 */
function parsePost(filename: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const where = `content/blog/${filename}`;

  const str = (key: keyof PostMeta) => {
    const value = data[key];
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`${where}: frontmatter "${key}" is required and must be a non-empty string`);
    }
    return value.trim();
  };

  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : str("date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(`${where}: frontmatter "date" must be a valid yyyy-mm-dd date, got "${date}"`);
  }

  return {
    slug: filename.replace(/\.mdx?$/, ""),
    title: str("title"),
    date,
    author: str("author"),
    excerpt: str("excerpt"),
    draft: data.draft === true,
    body: content,
  };
}

function readAll(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parsePost);
}

/** Newest first. Drafts are visible in dev and excluded from production builds. */
export function getAllPosts(): Post[] {
  const showDrafts = process.env.NODE_ENV !== "production";
  return readAll()
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/** "March 05, 2026" — the article byline form. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  });
}
