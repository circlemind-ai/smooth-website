/**
 * Post authors, keyed by the slug used in frontmatter (`author: antonio`).
 *
 * Bylines live here rather than in each post so a change of title updates
 * every article at once.
 */
export type Author = { name: string; role: string };

export const authors: Record<string, Author> = {
  antonio: { name: "Antonio Vespoli", role: "Co-founder & CEO" },
};

export const FALLBACK_AUTHOR: Author = { name: "The smooth team", role: "" };

export function getAuthor(key: string): Author {
  return authors[key] ?? FALLBACK_AUTHOR;
}

/** "Antonio Vespoli (Co-founder & CEO)" */
export function formatByline(author: Author): string {
  return author.role ? `${author.name} (${author.role})` : author.name;
}
