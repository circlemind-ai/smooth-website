import { ImageResponse } from "next/og";
import { TileStrip, loadOgFonts } from "@/lib/og";
import { formatDate, getPost } from "@/lib/blog";
import { getAuthor } from "@/lib/authors";

/** Share card for a blog post: its title over the brand tile strip. */

export const alt = "smooth blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "smooth blog";
  const byline = post
    ? `${getAuthor(post.author).name} · ${formatDate(post.date)}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "72px 88px 0",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#5b5b5b" }}>
            smooth.sh/blog
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 56,
              fontSize: title.length > 40 ? 64 : 76,
              lineHeight: 1.22,
              color: "#0c0835",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          {byline && (
            <div
              style={{
                display: "flex",
                marginTop: 36,
                fontSize: 28,
                color: "#168aff",
              }}
            >
              {byline}
            </div>
          )}
        </div>
        <TileStrip />
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
