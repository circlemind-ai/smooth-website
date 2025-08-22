import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import smoothLogo from "@/assets/images/smooth.svg";
import ycLogo from "@/assets/images/yc.png";
import benchmarkImage from "@/assets/images/benchmark.png";
import fiveXImage from "@/assets/images/5x.png";
import sevenXImage from "@/assets/images/7x.png";
import secureImage from "@/assets/images/secure.png";
import prodImage from "@/assets/images/prod.png";
import scalableImage from "@/assets/images/scalable.png";

import BrowserAgentShowcase from "@/components/BrowserAgentShowcase";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Smooth — Reliable, blazing fast browser agent API</title>
        <meta content="Fast, simple, reliable browser agent API. Serverless browser automation that's 5x faster and 7x cheaper than alternatives." name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Smooth" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Smooth — Reliable, blazing fast browser agent API" />
        <meta property="og:description" content="Fast, simple, reliable browser agent API. Serverless browser automation that's 5x faster and 7x cheaper than alternatives." />
        <meta property="og:url" content="https://smooth.sh" />
        <meta property="og:image" content="social-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:site" content="@circlemind_ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smooth — Reliable, blazing fast browser agent API" />
        <meta name="twitter:description" content="Fast, simple, reliable browser agent API. Serverless browser automation that's 5x faster and 7x cheaper than alternatives." />
        <meta name="twitter:image" content="social-image.png" />
        <meta name="twitter:url" content="https://smooth.sh" />

        <link rel="icon" href="images/favicon/favicon.ico" sizes="32x32" />
        <link rel="icon" href="images/favicon/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="images/favicon/apple-touch-icon.png" />

        {/* <link rel="preload" href="fonts/InterVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
        {/* <link href="vendor/font-awesome-6.7.2/css/all.min.css" rel="stylesheet" /> */}
      </Head>
      <Script src="/lib/js/main.js" />
      <div>
        <div className="background-gradient"></div>
        <div className="page-container">
          <header className="nav-container">
            <Link href="/" className="nav-brand">
              <Image
                src={smoothLogo}
                width={132}
                height={28}
                alt="Logo Template"
              />
            </Link>
            <nav role="navigation" className="nav-menu" data-navigation>
              <Link href="pricing" className="nav-link">Pricing</Link>
              <Link href="https://docs.circlemind.co/performance" className="nav-link">Benchmarks</Link>
              <Link href="https://docs.circlemind.co" className="nav-link">Docs ↗</Link>
              <div className="button-group stacked margin-top-l mobile-only">
                <Link href="https://zero.circlemind.co/developer" className="button tertiary">Sign In</Link>
                <Link href="https://zero.circlemind.co/developer" className="button primary">Sign Up</Link>
              </div>
            </nav>
            <div className="button-group">
              <Link href="https://zero.circlemind.co/developer" className="button tertiary compact hide-on-mobile">Sign In</Link>
              <Link href="https://zero.circlemind.co/developer" className="button primary compact">Sign Up</Link>
              <button className="button ghost compact nav-hamburger" data-mobile-toggle aria-label="Show menu">
                <span className="fa-solid fa-bars icon m"></span>
              </button>
            </div>
          </header>
          <main>
            <section>
              <div className="heading hero centered">
                <Link href="https://circlemind.co" className="eyebrow">No-code? Check out Zero</Link>
                <h1 className="balanced">
                  Fast, simple, reliable browser agent
                </h1>
                <p className="paragraph m secondary balanced">
                  Serverless browser agent API built from first principles: reliable, secure, 5x faster, 7x cheaper, and extremely scalable
                </p>
                <div className="button-group margin-paragraph centered">
                  <Link href="https://zero.circlemind.co/developer" className="button primary">Start for free</Link>
                  <Link href="https://calendly.com/circlemind/circlemind-demo" className="button tertiary">Request a Demo</Link>
                </div>
              </div>
              <div className="image-wide">
                <BrowserAgentShowcase />
              </div>
            </section>
            <section>
              <p className="paragraph l bold text-centered">
                Backed by
              </p>
              <div className="clients-container">
                <Image
                  src={ycLogo}
                  width={300}
                  alt="Backed by Y Combinator"
                />
              </div>
            </section>
            <section>
              <div className="heading">
                <h2 className="no-top-margin">Start automating now</h2>
                <p className="paragraph m secondary">
                  Smooth is a browser agent that can go to the web and perform tasks autonomously.
                  It&apos;s the most reliable browser agent yet while also being 7x cheaper and 5x faster.
                </p>
              </div>
              <div className="grid">
                <div className="feature-card">
                  <div className="feature-heading">
                    <h3 className="color-accent no-top-margin">
                      The most reliable browser agent yet
                    </h3>
                    <p className="paragraph m secondary">
                      Smooth outperforms all leading alternatives.
                      Whether scraping, testing, or automating workflows - it runs without flaking.
                    </p>
                  </div>
                  <Image
                    src={benchmarkImage}
                    width={800}
                    height={450}
                    style={{ width: "100%", height: "auto" }}
                    alt="Screenshot of a feature 16 by 9"
                  />
                </div>
              </div>
              <div className="grid columns-2">
                <div className="feature-card">
                  <div className="feature-heading">
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={fiveXImage}
                        width={200}
                        height={100}
                        style={{ width: "80%", height: "auto" }}
                        alt="5x faster"
                      />
                    </div>
                    <h3 className="color-accent no-top-margin">
                      Blazing fast
                    </h3>
                    <p className="paragraph s secondary">
                      Smooth is exceptionally fast. It can perform many tasks in superhuman time, and it&apos;s 5x faster then browser-use.
                    </p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-heading">
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={sevenXImage}
                        width={200}
                        height={100}
                        style={{ width: "80%", height: "auto" }}
                        alt="7x cheaper"
                      />
                    </div>
                    <h3 className="color-accent no-top-margin">
                      Massively cheaper
                    </h3>
                    <p className="paragraph s secondary">
                      Smooth uses small and efficient AI models, making it 7x more affordable than browser-use.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid columns-3">
                <div className="feature-card">
                  <div className="feature-heading">
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={secureImage}
                        width={200}
                        height={100}
                        style={{ width: "80%", height: "auto" }}
                        alt="Enterprise grade security"
                      />
                    </div>
                    <h3 className="color-accent no-top-margin">
                      Enterprise-grade security
                    </h3>
                    <p className="paragraph s secondary">
                      End-to-end encryption, enterprise-grade standards, and zero-trust access controls keep your data protected in transit and at rest.
                    </p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-heading">
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={prodImage}
                        width={200}
                        height={100}
                        style={{ width: "80%", height: "auto" }}
                        alt="Production ready"
                      />
                    </div>
                    <h3 className="color-accent no-top-margin">
                      Production-ready
                    </h3>
                    <p className="paragraph s secondary">
                      Engineered for stability, monitored in real time, and battle-tested under load so you can ship to production with zero guesswork.
                    </p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-heading">
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={scalableImage}
                        width={200}
                        height={100}
                        style={{ width: "80%", height: "auto" }}
                        alt="Scalable"
                      />
                    </div>
                    <h3 className="color-accent no-top-margin">
                      Infinitely scalable & serverless
                    </h3>
                    <p className="paragraph s secondary">
                      From one-off runs to millions of executions, Smooth scales instantly with zero infrastructure management.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="heading centered">
                <h2 className="no-top-margin">Plug & play</h2>
                <p className="paragraph m secondary balanced">
                  Get your API key and integrate seamlessly into your application.
                </p>
              </div>
              <div className="cards-with-icons-container">
                <div className="card-with-icon horizontal">
                  <div className="fa-solid fa-key icon xl color-accent"></div>
                  <div className="feature-heading">
                    <p className="paragraph m bold">Get your free API key</p>
                    <p className="paragraph m secondary">
                      Sign up, grab your API key, and you&apos;re ready to go — no credit card required.
                    </p>
                  </div>
                </div>
                <div className="card-with-icon horizontal">
                  <div className="fa-solid fa-bolt icon xl color-accent"></div>
                  <div className="feature-heading">
                    <p className="paragraph m bold">Launch a task</p>
                    <p className="paragraph m secondary">
                      Fire off a task in seconds with a single API call.
                    </p>
                  </div>
                </div>
                <div className="card-with-icon horizontal">
                  <div className="fa-solid fa-fire icon xl color-accent"></div>
                  <div className="feature-heading">
                    <p className="paragraph m bold">
                      Watch your agent work
                    </p>
                    <p className="paragraph m secondary">
                      Sitback and relax while Smooth does all the legwork.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="heading">
                <h2 className="no-top-margin balanced">We handle the hard stuff, so that you don&apos;t have to</h2>
                <p className="paragraph m secondary">
                  Instant browser spin-up, proxy rotation, persistent sessions, auto-CAPTCHA solvers, and more.
                </p>
                <div className="button-group margin-paragraph">
                  <a href="#" className="button secondary">Start for free</a>
                </div>
              </div>
              <div className="image-wide">
                <div style={{ textAlign: "center", marginTop: "64px" }}>
                  <video
                    src="/videos/demo.mp4"
                    className="w-full h-full object-cover rounded-2xl"
                    autoPlay
                    muted
                    controls
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="grid columns-1/2-1 gap-xl">
                <div className="heading">
                  <h2 className="no-top-margin">Built for developers</h2>
                  <p className="paragraph m secondary">
                    No fluff, no lock-in — just a clean API, clear docs, and tooling that plays nice with your existing stack. Run your first browser task in 4 lines of code.
                  </p>
                </div>
                <div className="card-code-block dark">
                  <pre className="shiki github-dark" style={{ backgroundColor: "#24292e", color: "#e1e4e8", padding: "1em" }} tabIndex={0}><code><span className="line"><span style={{ color: "#F97583" }}>from</span><span style={{ color: "#E1E4E8" }}> smooth </span><span style={{ color: "#F97583" }}>import</span><span style={{ color: "#E1E4E8" }}> SmoothClient</span><br/></span>
                    <span className="line"><br/></span>
                    <span className="line"><span style={{ color: "#E1E4E8" }}>smooth_client </span><span style={{ color: "#F97583" }}>=</span><span style={{ color: "#E1E4E8" }}> SmoothClient(</span><span style={{ color: "#FFAB70" }}>api_key</span><span style={{ color: "#F97583" }}>=</span><span style={{ color: "#9ECBFF" }}>&ldquo;cmzr-YOUR_API_KEY&ldquo;</span><span style={{ color: "#E1E4E8" }}>)</span><br/></span>
                    <span className="line"><span style={{ color: "#E1E4E8" }}>task </span><span style={{ color: "#F97583" }}>=</span><span style={{ color: "#E1E4E8" }}> smooth_client.run(</span><span style={{ color: "#9ECBFF" }}>&ldquo;Go to google flights and find the cheapest flight from London to Paris today&ldquo;</span><span style={{ color: "#E1E4E8" }}>)</span><br/></span>
                    <span className="line"><br/></span>
                    <span className="line"><span style={{ color: "#79B8FF" }}>print</span><span style={{ color: "#E1E4E8" }}>(</span><span style={{ color: "#F97583" }}>f</span><span style={{ color: "#9ECBFF" }}>&ldquo;Live URL: </span><span style={{ color: "#79B8FF" }}>{'{'}</span><span style={{ color: "#E1E4E8" }}>task.live_url()</span><span style={{ color: "#79B8FF" }}>{'}'}</span><span style={{ color: "#9ECBFF" }}>&ldquo;</span><span style={{ color: "#E1E4E8" }}>)</span><br/></span>
                    <span className="line"><span style={{ color: "#79B8FF" }}>print</span><span style={{ color: "#E1E4E8" }}>(</span><span style={{ color: "#F97583" }}>f</span><span style={{ color: "#9ECBFF" }}>&ldquo;Agent response: </span><span style={{ color: "#79B8FF" }}>{'{'}</span><span style={{ color: "#E1E4E8" }}>task.result()</span><span style={{ color: "#79B8FF" }}>{'}'}</span><span style={{ color: "#9ECBFF" }}>&ldquo;</span><span style={{ color: "#E1E4E8" }}>)</span><br/></span></code></pre>
                </div>
              </div>
            </section>
            <section>
              <div className="heading centered">
                <h2 className="no-top-margin">Frequently Asked</h2>
                <p className="paragraph m secondary">
                  If you have any questions, please do not hesitate to reach to our team.
                </p>
              </div>
              <div className="accordion-container">
                <details className="accordion-item" name="faq">
                  <summary className="accordion-toggle">
                    <p className="paragraph m bold">How is Smooth different from other browser agents?</p>
                    <span className="accordion-chevron fa-solid fa-chevron-down"></span>
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Smooth uses small and efficient models that make it faster and cheaper to run, while also being more reliable.
                    </p>
                    <p>
                      It leads the leaderboard of WebVoyager (92%) while also being 5x faster and 7x cheaper than Browser Use.
                    </p>
                  </div>
                </details>

                <details className="accordion-item" name="faq">
                  <summary className="accordion-toggle">
                    <p className="paragraph m bold">
                      How fast is Smooth?
                    </p>
                    <span className="accordion-chevron fa-solid fa-chevron-down"></span>
                  </summary>
                  <div className="accordion-content">
                    <p>Smooth is 5x faster than Browser Use and it&apos;s faster than humans at many tasks. </p>
                    <p>The average task duration of a WebVoyager task is 1.4 min with Smooth vs 7.5 min with Browser Use. We are actively making Smooth even faster, stay tuned. </p>
                  </div>
                </details>

                <details className="accordion-item" name="faq">
                  <summary className="accordion-toggle">
                    <p className="paragraph m bold">How much cheaper is Smooth?</p>
                    <span className="accordion-chevron fa-solid fa-chevron-down"></span>
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Smooth is 7x cheaper than Browser Use.
                    </p>
                    <p>
                      The cost to run the full WebVoyager benchmark is $38 vs $250 with Browser Use. This is because we use small and efficient models that reduce costs and increase speed, while also increasing reliability.
                    </p>
                  </div>
                </details>

                <details className="accordion-item" name="faq">
                  <summary className="accordion-toggle">
                    <p className="paragraph m bold">Can I test the Smooth APIs before subscribing to a paid plan?</p>
                    <span className="accordion-chevron fa-solid fa-chevron-down"></span>
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Yes! We have a free plan that includes free welcome credits. Just sign up, and get your free API key.
                    </p>
                  </div>
                </details>

                <details className="accordion-item" name="faq">
                  <summary className="accordion-toggle">
                    <p className="paragraph m bold">What level of support do you provide?</p>
                    <span className="accordion-chevron fa-solid fa-chevron-down"></span>
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Users on the Free and Starter plans can join the Discord server for community support. Growth and Enterprise users have access to 24/7 dedicated support and direct connection with the founders.
                    </p>
                  </div>
                </details>

                <details className="accordion-item" name="faq">
                  <summary className="accordion-toggle">
                    <p className="paragraph m bold">Can we deploy Smooth on-prem?</p>
                    <span className="accordion-chevron fa-solid fa-chevron-down"></span>
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Yes! Depending on requirements, we can deploy single-tenant clusters, BYOC, or on-prem.
                    </p>
                  </div>
                </details>

                <details className="accordion-item" name="faq">
                  <summary className="accordion-toggle">
                    <p className="paragraph m bold">How can I contact you?</p>
                    <span className="accordion-chevron fa-solid fa-chevron-down"></span>
                  </summary>
                  <div className="accordion-content">
                    <p>
                      Reach out at contact@circlemind.co
                    </p>
                  </div>
                </details>
              </div>
            </section>
            <section className="promo-cta">
              <div className="heading centered balanced">
                <h2>Start for free, scale easily.</h2>
                <div className="button-group margin-paragraph centered">
                  <Link href="https://zero.circlemind.co/developer" className="button primary">Start for free</Link>
                  <Link href="https://calendly.com/circlemind/circlemind-demo" className="button tertiary">Request a Demo</Link>
                </div>
              </div>
            </section>
          </main>
          <footer className="footer">
            <div className="footer-menu">
              <div>
                <p className="paragraph s">
                  © 2025 Circlemind Inc.<br />San Francisco, CA<br />
                </p>
              </div>
              <div>
                <div className="link-list">
                  <Link href="pricing" className="ui s">Pricing</Link>
                  <Link href="https://docs.circlemind.co/performance" className="ui s">Benchmarks</Link>
                  <Link href="https://docs.circlemind.co" className="ui s" target="_blank">Docs ↗</Link>
                  <Link href="https://zero.circlemind.co/developer" className="ui s" target="_blank">Dashboard ↗</Link>
                </div>
              </div>
              <div>
                <div className="link-list">
                  <Link href="https://github.com/circlemind-ai" className="icon-link ui s" target="_blank">
                    <div className="fa-brands fa-github icon m color-accent"></div>
                    <div className="pseudo-link">GitHub</div>
                  </Link>
                  <Link href="https://www.linkedin.com/company/circlemindai" className="icon-link ui s" target="_blank">
                    <div className="fa-brands fa-linkedin icon m color-accent"></div>
                    <div className="pseudo-link">LinkedIn</div>
                  </Link>
                  <Link href="https://x.com/circlemind_ai" className="icon-link ui s" target="_blank">
                    <div className="fa-brands fa-x-twitter icon m color-accent"></div>
                    <div className="pseudo-link">X.com</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="link-list-horizontal">
              <Link href="https://zero.circlemind.co/privacy" className="ui s tertiary">Privacy Policy</Link>
              <Link href="https://zero.circlemind.co/terms" className="ui s tertiary">Terms of Service</Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
