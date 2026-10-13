import type { Metadata } from "next";
import { Fuzzy_Bubbles, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { DividerStrip } from "@/components/chrome/DividerStrip";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Only used by the hero's "smoothly" — one weight keeps the payload small. */
const fuzzyBubbles = Fuzzy_Bubbles({
  variable: "--font-fuzzy-bubbles",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smooth.sh"),
  title: {
    default: "smooth — build agents that use the web",
    template: "%s — smooth",
  },
  description:
    "We handle the infra so you can focus on building agents that search, scrape, and interact with the web at scale.",
  openGraph: {
    title: "smooth — build agents that use the web",
    description:
      "We handle the infra so you can focus on building agents that search, scrape, and interact with the web at scale.",
    url: "https://smooth.sh",
    siteName: "smooth",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

/** Organization markup: the smooth brand, operated by Circlemind Inc. */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "smooth",
  legalName: "Circlemind Inc",
  url: "https://smooth.sh",
  logo: "https://smooth.sh/assets/smooth-symbol.jpg",
  sameAs: [
    "https://github.com/circlemind-ai",
    "https://www.linkedin.com/company/circlemindai",
    "https://x.com/smoothdotsh",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${jetbrainsMono.variable} ${fuzzyBubbles.variable} antialiased`}
    >
      <body className="min-h-screen bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Nav />
        {children}
        <DividerStrip side="right" seedIndex={9} />
        <Footer />
        <DividerStrip side="left" seedIndex={10} />
      </body>
    </html>
  );
}
