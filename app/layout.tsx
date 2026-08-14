/*
 * PYNGYN marketing site.
 * Designed and built by Nikunj Chugh.
 * (This credit is intentionally not rendered anywhere on the page.)
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import { FaviconScheme } from "@/components/FaviconScheme";
import { PromoPopupLazy } from "@/components/PromoPopupLazy";
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

/*
 * Favicon variants, named by the role they play rather than by filename —
 * the mapping was checked against the actual artwork, not the names:
 *   /icon.png       48×48   dark navy tile, white mark  → for LIGHT chrome
 *   /icon-dark.png  195×193 light grey tile, dark mark  → for DARK chrome
 * ("icon-dark" means "the icon to use in dark mode", and it is indeed the
 * light-coloured one, so no inversion is needed.)
 */
const faviconForLightMode = "/icon.png";
const faviconForDarkMode = "/icon-dark.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Nikunj Chugh" }],
  creator: "Nikunj Chugh",
  title: "PYNGYN: The operating system for professional-services firms",
  description:
    "PYNGYN gives every client a branded Clientspace (a standalone portal for status, documents, and approvals), with Workspace, your firm's back office, available on its own or bundled together. Built for professional-services firms. Book a demo.",
  // Reference static files in /public (not the app/icon route convention,
  // which next-on-pages rejects because it can't be an edge route).
  //
  // Order matters: Chrome resolves to the LAST icon link it accepts, and a
  // media-less link matches every condition — so the fallback goes first and
  // the dark variant goes last. Safari/Firefox (and JS-disabled visitors) get
  // the right icon on first paint from these links alone; components/
  // FaviconScheme.tsx carries Chrome, whose `media` handling is unreliable.
  // apple-touch-icon ignores `media` entirely, so it stays a single variant
  // (and keeps its solid background, since iOS draws it on the wallpaper).
  // Only apple-touch-icon is declared via Next metadata. The `rel="icon"`
  // links are rendered as raw <link>s in <head> below instead — see the note
  // there — so client-side navigation never re-reconciles them and collides
  // with FaviconScheme.
  icons: {
    apple: "/apple-icon.png",
  },
  // Google Search Console's "HTML tag" verification method: paste the
  // content value (just the code, not the whole <meta> tag) into
  // GOOGLE_SITE_VERIFICATION as a build-time env var in the Cloudflare
  // Pages project settings. Renders nothing if unset, so this is safe to
  // ship before you have a value.
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
        {/* Google Tag Manager and the Meta Pixel are no longer loaded here
            unconditionally. Per /cookie-policy ("Analytics & Performance"
            and "Marketing & Targeting" are "blocked/disabled until you
            consent"), both now load only after the visitor grants consent
            via the cookie banner — see components/ConsentScripts.tsx and
            components/CookieConsent.tsx, rendered in <body> below. */}

        {/* Favicon `rel="icon"` links live here as raw, persistent <head>
            elements — NOT via Next metadata — on purpose. Next resolves
            metadata per route, so metadata icon links get re-reconciled on
            every client-side navigation; FaviconScheme removes those links to
            take over the favicon in Chrome, and the two collide, crashing
            navigation with "Cannot read properties of null (reading
            'removeChild')". As layout-level <head> children they render once
            and persist across navigation, so nothing re-adds them mid-route
            and FaviconScheme can own them safely. (media-less fallback first,
            dark variant last — same ordering the old metadata used.) */}
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
        {/* No noscript fallbacks for GTM/Meta Pixel here on purpose: a
            noscript <iframe>/<img> fires unconditionally for visitors with
            JS disabled, with no way to check consent first. Keeping them
            would silently defeat the consent gate below for that slice of
            visitors, so both trackers are JS-gated only. */}
        <ConsentScripts />
        {/* Repaints the tab icon when the OS scheme flips; the static links
            above already handle first load with no JS. */}
        <FaviconScheme />
        {/* Shows the overlay scrollbar thumb only while scrolling */}
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
