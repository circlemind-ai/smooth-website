import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `next build` and `next dev` both write to `.next` by default, so running a
   * build to verify something while the preview is up overwrites the dev
   * server's output and it quietly starts serving stale pages until restarted.
   *
   * Setting NEXT_DIST_DIR sends a build somewhere else — see the `build:check`
   * script, which is the one to use while `npm run dev` is running. Deploy
   * builds leave it unset and use `.next` as normal.
   */
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
