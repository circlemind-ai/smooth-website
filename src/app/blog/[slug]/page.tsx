import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Rail } from "@/components/ui/Rail";
import { PostCta } from "@/components/blog/PostCta";
import { mdxComponents } from "@/mdx-components";
import { formatByline, getAuthor } from "@/lib/authors";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx-options";

/** Every post is prerendered — the route never hits the filesystem at runtime. */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [getAuthor(post.author).name],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
    options: mdxOptions,
  });

  return (
    <>
      <main>
        <Rail className="px-8">
          <article className="mx-auto max-w-[720px] pt-14 pb-20">
            <Link
              href="/blog"
              className="font-mono text-xs text-dim underline decoration-dotted underline-offset-[3px] transition-colors hover:text-ink"
            >
              ← blog
            </Link>

            <div>
              <h1 className="mt-7 mb-0 font-mono text-[clamp(26px,3.2vw,38px)] leading-[1.2] font-semibold tracking-[-0.03em] text-pretty">
                {post.title}
              </h1>
              <div className="mt-[18px] font-mono text-xs text-dim">
                <time dateTime={post.date}>{formatDate(post.date)}</time> •{" "}
                {formatByline(author)}
              </div>
            </div>

            <div className="my-9 border-t border-dashed border-line" />

            <div className="text-[15.5px] leading-[1.75] text-ink">
              {content}
            </div>

            <PostCta />
          </article>
        </Rail>
      </main>
    </>
  );
}
