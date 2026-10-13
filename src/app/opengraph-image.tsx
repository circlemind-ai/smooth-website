import { ImageResponse } from "next/og";
import { TileStrip, loadOgFonts } from "@/lib/og";

/**
 * Site-wide share card (home, pricing, blog index — posts override it with
 * their own). Mirrors the hero: mono headline, Fuzzy Bubbles "smoothly",
 * and a strip of the canvas's pink/blue tiles along the bottom.
 */

export const alt = "smooth — build agents that use the web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            smooth.sh
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 64,
              fontSize: 84,
              lineHeight: 1.18,
              color: "#0c0835",
              letterSpacing: "-0.03em",
            }}
          >
            <div style={{ display: "flex" }}>build agents that</div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              use the web&nbsp;
              <span
                style={{
                  fontFamily: "Fuzzy Bubbles",
                  color: "#168aff",
                  fontSize: 94,
                }}
              >
                smoothly
              </span>
            </div>
          </div>
        </div>
        <TileStrip />
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
