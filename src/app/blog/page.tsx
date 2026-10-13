import type { Metadata } from "next";
import Link from "next/link";
import { Rail } from "@/components/ui/Rail";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the team, benchmarks, engineering, and the occasional postmortem.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="border-b border-dashed border-line">
        <Rail className="px-8 pt-16 pb-12">
          <h1 className="m-0 font-mono text-[clamp(28px,3.2vw,40px)] font-semibold tracking-[-0.03em]">
            blog
          </h1>
          <p className="mt-3 mb-0 max-w-[520px] text-[15.5px] leading-[1.6] text-pretty text-dim">
            notes from the team, benchmarks, engineering, and the occasional
            postmortem
          </p>
        </Rail>
      </header>

      <main>
        <Rail className="min-h-[40vh]">
          {posts.length === 0 ? (
            <p className="px-8 py-10 font-mono text-[13px] text-dim">
              nothing published yet.
            </p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[170px_1fr] gap-8 border-b border-dashed border-line px-8 py-10 transition-colors hover:bg-soft max-md:grid-cols-1 max-md:gap-2"
              >
                <div className="font-mono text-xs leading-[1.9] text-dim">
                  <time dateTime={post.date}>{post.date}</time>
                  {post.draft && <div className="text-accent">draft</div>}
                </div>
                <div>
                  <h2 className="m-0 font-mono text-[clamp(18px,2vw,24px)] leading-[1.3] font-semibold tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
                    {post.title}
                  </h2>
                </div>
              </Link>
            ))
          )}
        </Rail>
      </main>
    </>
  );
}
