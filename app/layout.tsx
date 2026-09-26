/*
 * PYNGYN marketing site.
 * Designed and built by Nikunj Chugh.
 * (This credit is intentionally not rendered anywhere on the page.)
 */
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PromoPopupLazy } from "@/components/PromoPopupLazy";
import { FaviconScheme } from "@/components/FaviconScheme";
import { ScrollbarActivity } from "@/components/ScrollbarActivity";
import { ConsentScripts } from "@/components/ConsentScripts";
import { CookieConsent } from "@/components/CookieConsent";

import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  SITE_URL,
  OG_IMAGE,
} from "@/components/schema";
import "./globals.css";

// Self-hosted, no runtime or build-time dependency on Google's font CDN.
// Font files are vendored in app/fonts/ (sourced from the Fontsource mirror
// of Google Fonts, same OFL-licensed files, safe to redistribute).
const display = localFont({
  src: [
    { path: "./fonts/bricolage-grotesque-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const jakarta = localFont({
  src: [
    { path: "./fonts/plus-jakarta-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/*
 * Favicon variants, named by the role they play rather than by filename:
 *   /icon.png       48x48   dark navy tile, white mark  -> for LIGHT chrome
 *   /icon-dark.png  195x193 light grey tile, dark mark  -> for DARK chrome
 */
const faviconForLightMode = "/icon.png";
const faviconForDarkMode = "/icon-dark.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Pyngyn" }],
  creator: "Pyngyn",
  title: "Pyngyn ClientSpace | Client Management for CA & Accounting Firms",
  description:
    "Manage clients, tasks, documents, deadlines and workflows in one connected workspace purpose-built for CA, accounting and tax practices.",
  icons: {
    apple: "/apple-icon.png",
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: "PYNGYN: The operating system for professional-services firms",
    description:
      "Run your firm and every client engagement in one place. The operating system for professional-services firms.",
    type: "website",
    url: SITE_URL,
    siteName: "PYNGYN",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Pyngyn_Official",
    creator: "@Pyngyn_Official",
    title: "PYNGYN: The operating system for professional-services firms",
    description:
      "Run your firm and every client engagement in one place. The operating system for professional-services firms.",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${jakarta.variable} ${mono.variable}`}>
      <head>
        {/* Favicon links rendered as raw <head> elements to prevent React
            removeChild crashes during client-side navigation. */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          media="(prefers-color-scheme: light)"
          href={faviconForLightMode}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="195x193"
          media="(prefers-color-scheme: dark)"
          href={faviconForDarkMode}
        />

        {/* Sitewide JSON-LD: Organization + WebSite. Per-page schema is added
            inside individual page components. */}
        <JsonLd
          id="ld-organization"
          data={organizationSchema()}
        />
        <JsonLd id="ld-website" data={websiteSchema()} />
      </head>
      <body className="font-sans">
        <ConsentScripts />
        <FaviconScheme />
        <ScrollbarActivity />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <PromoPopupLazy />
        <CookieConsent />
      </body>
    </html>
  );
}

