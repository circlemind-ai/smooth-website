import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Benchmark } from "@/components/blog/Benchmark";
import { PostCta } from "@/components/blog/PostCta";

/**
 * Maps markdown onto the site's typography so posts can be written as plain
 * prose and still come out looking designed. Anything an author would
 * otherwise have to hand-style belongs here, not in the MDX.
 *
 * Body copy is 15.5px / 1.75 on ink; the article template sets that on the
 * wrapper, so these only handle spacing and per-element treatment.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="mt-8 mb-3 font-mono text-[17px] font-bold tracking-[-0.01em] first:mt-0"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-6 mb-2 font-mono text-[15px] font-bold tracking-[-0.01em]"
    />
  ),
  p: (props) => <p {...props} className="mt-0 mb-4 text-pretty" />,
  ul: (props) => (
    <ul {...props} className="mt-0 mb-4 list-disc pl-[22px] leading-[1.75]" />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="mt-0 mb-4 list-decimal pl-[22px] leading-[1.75]"
    />
  ),
  li: (props) => <li {...props} className="mb-2 last:mb-0" />,
  strong: (props) => <strong {...props} className="font-semibold" />,
  hr: () => <hr className="my-8 border-0 border-t border-dashed border-line" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-line pl-4 text-dim italic"
    />
  ),

  a: ({ href = "#", ...props }) => (
    <Link
      href={href}
      {...props}
      className="text-accent underline decoration-dotted underline-offset-[3px] transition-colors hover:text-accent-deep"
    />
  ),

  // Inline code only — fenced blocks arrive already wrapped in <pre> by Shiki,
  // which sets its own colours on the nested <code>.
  code: (props) => (
    <code
      {...props}
      className="bg-soft px-1 py-0.5 font-mono text-[0.9em] [pre_&]:bg-transparent [pre_&]:p-0"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="my-7 overflow-x-auto border border-line bg-soft px-5 py-4 font-mono text-[12.5px] leading-[1.8]"
    />
  ),

  // Components posts can call directly.
  Benchmark,
  Cta: PostCta,
};

/** Required export for the MDX toolchain to pick up the mapping. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components };
}
