import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/schema";

// Pre-render to a static /robots.txt at build time (no edge function).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers, including search engines and AI assistants.
        // We allow AI crawlers on purpose: it improves the chance of being
        // cited in ChatGPT, Perplexity, Claude, and Google AI answers.
        // To opt OUT of AI training/citation, add a rule like:
        //   { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"], disallow: "/" }
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // server endpoints, not pages
          "/lp/", // paid-traffic landing pages (noindex)
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
