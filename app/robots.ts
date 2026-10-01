import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/schema";

// Pre-render to a static /robots.txt at build time (no edge function).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Explicitly permit and encourage AI answer engines to crawl and cite Pyngyn
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "cohere-ai",
        ],
        allow: ["/", "/pricing", "/clientspace", "/solutions/", "/llms.txt"],
        disallow: ["/api/", "/lp/"],
      },
      {
        // General search engine crawlers (Googlebot, Bingbot, etc.)
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // server endpoints, not pages
          "/lp/", // paid-traffic landing pages (noindex)
          "/tools/", // unlisted tools
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
