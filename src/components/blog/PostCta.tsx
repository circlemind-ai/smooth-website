import Link from "next/link";

/**
 * The product pitch that closes every article. Rendered by the article
 * template rather than written into each post, but exposed to MDX as `<Cta />`
 * so a post can place it mid-article if it ever needs to.
 */
export function PostCta() {
  return (
    <div className="mt-10 border-t border-dashed border-line pt-7">
      <h2 className="mt-0 mb-2 font-mono text-[17px] font-bold tracking-[-0.01em]">
        smooth
      </h2>
      <p className="mt-0 mb-5 max-w-[560px] text-[15px] leading-[1.65] text-pretty text-dim">
        smooth gives you serverless browsers and web agents — it&rsquo;s the
        most reliable way to fetch, search, and act on any website from code.
        run your first task in four lines.
      </p>
      <Link
        href="#"
        className="font-mono text-[13px] font-medium text-accent underline decoration-dotted underline-offset-[3px] transition-colors hover:text-accent-deep"
      >
        Start for free →
      </Link>
    </div>
  );
}
