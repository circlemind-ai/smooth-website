import "@/lib/css/index.css";
import "@/lib/css/pricing.css";
import "@/lib/css/tablet.css";
import "@/lib/css/mobile.css";
import "@/assets/font-awesome-6.7.2/css/all.min.css";


import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
