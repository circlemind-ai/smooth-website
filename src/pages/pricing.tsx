import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import smoothLogo from "@/assets/images/smooth.svg";
import Script from "next/script";

export default function Pricing() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Pricing</title>
        <meta content="Smooth - Pricing" property="og:title" />
        <meta content="Smooth - Pricing" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="images/favicon/favicon.ico" sizes="32x32" />
        <link rel="icon" href="images/favicon/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="images/favicon/apple-touch-icon.png" />
      </Head>
      <Script src="/lib/js/main.js" strategy="beforeInteractive" />
      <Script src="/lib/js/pricing.js" strategy="beforeInteractive" />
      <div>
        <div className="background-gradient"></div>
        <div className="page-container">
          <header className="nav-container">
            <Link href="/" className="nav-brand"><Image
              src={smoothLogo}
              width={132}
              height={28}
              alt="Logo Template"
            /></Link>
            <nav role="navigation" className="nav-menu" data-navigation>
              <Link href="#" className="nav-link">Pricing</Link>
              <Link href="https://docs.smooth.sh/performance" className="nav-link">Benchmarks</Link>
              <Link href="https://docs.smooth.sh" className="nav-link">Docs ↗</Link>
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
              <div className="text-centered full-width">
                <h1>Flexible Pricing</h1>
                <p>Transparent pricing. No hidden fees.</p>
              </div>
              <div className="grid columns-3 margin-top-xl">
                <div className="feature-card justified-vertically">
                  <div>
                    <div className="feature-heading">
                      <p className="paragraph l bold no-top-margin">Free</p>
                      <p className="paragraph s secondary">Basic features, limited usage</p>
                      <div className="price-line">
                        <div className="paragraph l bold">Free</div>
                      </div>
                    </div>
                    <div className="feature-list">
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>Free welcome credits</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>2 concurrent browsers</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>
                          $0.005/step
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="https://zero.circlemind.co/developer" className="button tertiary full-width margin-top-l">Start for free</a>
                </div>
                <div className="feature-card justified-vertically">
                  <div>
                    <div className="feature-heading">
                      <p className="paragraph l bold no-top-margin">Starter</p>
                      <p className="paragraph s secondary">Ideal for small projects</p>
                      <div className="price-line">
                        <div className="paragraph l bold" data-pricing-monthly="NA" data-pricing-yearly="$48">
                          $50
                        </div>
                        <div className="paragraph m secondary" data-pricing-monthly="/month"
                          data-pricing-yearly="/month">
                          /month
                        </div>
                      </div>
                    </div>
                    <div className="feature-list">
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>
                          Includes $50 API credits each month

                        </div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>10 concurrent browsers</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>
                          Custom proxy
                        </div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>Persistent sessions</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>Stealth mode</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>$0.005/step</div>
                      </div>
                    </div>
                  </div>
                  <a href="https://zero.circlemind.co/developer" className="button primary full-width margin-top-l">Start for free</a>
                </div>
                <div className="feature-card justified-vertically">
                  <div>
                    <div className="feature-heading">
                      <p className="paragraph l bold no-top-margin">Growth</p>
                      <p className="paragraph s secondary">Scales with your success</p>
                      <div className="price-line">
                        <div className="paragraph l bold" data-pricing-monthly="NA" data-pricing-yearly="$500">
                          $500
                        </div>
                        <div className="paragraph m secondary" data-pricing-monthly="/month"
                          data-pricing-yearly="/month">
                          /month
                        </div>
                      </div>
                    </div>
                    <div className="feature-list">
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>Everything in Starter</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>Includes $500 API credits each month</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>50 concurrent browsers</div>
                      </div>
                      <div className="feature-item paragraph s">
                        <div className="fa-regular fa-square-check icon m"></div>
                        <div>24/7 support from the founders</div>
                      </div>
                    </div>
                  </div>
                  <a href="https://zero.circlemind.co/developer" className="button tertiary full-width margin-top-l">Start for free</a>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-heading">
                  <p className="paragraph l bold no-top-margin">Enterprise</p>
                  <p className="paragraph s secondary">
                    Custom solutions, security compliance, premium support.
                  </p>
                </div>
                <a href="https://calendly.com/circlemind/circlemind-demo" className="button tertiary">Request a demo</a>
              </div>
            </section>
            <section>
              <table className="pricing-table">
                <thead>
                  <tr className="pricing-table-row">
                    <th className="paragraph s bold"></th>
                    <th className="paragraph s bold">Starter</th>
                    <th className="paragraph s bold">Growth</th>
                    <th className="paragraph s bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">Credits included</td>
                    <td className="paragraph s">$50</td>
                    <td className="paragraph s">$500</td>
                    <td className="paragraph s">Unlimited</td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">Concurrent browsers</td>
                    <td className="paragraph s">10</td>
                    <td className="paragraph s">50</td>
                    <td className="paragraph s">Unlimited</td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">Custom proxy</td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">Persistent sessions</td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">Implementation team</td>
                    <td></td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">24/7 support</td>
                    <td></td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">Single tenant</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">BYOC</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">BAA agreements</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                  <tr className="pricing-table-row">
                    <td className="paragraph s">SSO and SAML authentication</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="fa-regular fa-square-check icon m"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                  <Link href="/pricing" className="ui s">Pricing</Link>
                  <Link href="https://docs.smooth.sh/performance" className="ui s">Benchmarks</Link>
                  <Link href="https://docs.smooth.sh" className="ui s" target="_blank">Docs ↗</Link>
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
