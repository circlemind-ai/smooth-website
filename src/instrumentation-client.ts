import posthog from "posthog-js";

/**
 * PostHog, proxied through our own domain (see the /ingest rewrites in
 * next.config.ts) so ad-blockers don't eat the numbers. Scope is pageviews
 * (incl. SPA navigations) + autocaptured clicks — no session recording.
 *
 * The key is the public client-side project key (it ships in the browser
 * bundle by design), so it lives here rather than in env config; an env
 * var still wins if one is ever set.
 */
const key =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ??
  "phc_zCwPQ7hmrVk7kZN02GSljr9HyC7A047rsTJglEI4gdi";

if (key) {
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24", // history-change pageviews, sane modern defaults
    autocapture: true,
    disable_session_recording: true,
  });
}
