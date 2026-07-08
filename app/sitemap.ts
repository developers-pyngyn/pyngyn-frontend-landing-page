import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/schema";
import { posts } from "@/components/posts";
import { KB_ARTICLES } from "@/components/kb-data";
import { COMPETITORS } from "@/components/config";

// Pre-render to a static /sitemap.xml at build time (no edge function).
export const dynamic = "force-static";

// The site is deployed with `trailingSlash: true`, so the URLs that return
// HTTP 200 (no redirect) carry a trailing slash. We emit those here so every
// entry in the sitemap is a direct 200, which is the single most important
// rule for sitemaps. Flip this if next.config.js trailingSlash changes.
const TRAILING_SLASH = true;

// A single date to stamp on pages without their own publish date. Bump this
// when you make broad content changes so crawlers see a fresh signal.
const SITE_UPDATED = "2026-05-28";

function url(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  const clean = path.replace(/\/+$/, "");
  return TRAILING_SLASH ? `${SITE_URL}${clean}/` : `${SITE_URL}${clean}`;
}

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string | Date;
};

// --- Static, indexable routes -------------------------------------------
// NOTE: /lp/professional-services is intentionally excluded (noindex, paid
// traffic only). /api/* routes are not pages and are excluded too.
const STATIC: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // High-intent product / conversion pages
  { path: "/clientspace", priority: 0.95, changeFrequency: "weekly" },
  { path: "/clientspace/branded-portal", priority: 0.7, changeFrequency: "monthly" },
  { path: "/clientspace/secure-documents", priority: 0.7, changeFrequency: "monthly" },
  { path: "/clientspace/approvals", priority: 0.7, changeFrequency: "monthly" },
  { path: "/workspace", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/benefits", priority: 0.9, changeFrequency: "monthly" },
  { path: "/benefits/risk-detection", priority: 0.7, changeFrequency: "monthly" },
  { path: "/benefits/reporting", priority: 0.7, changeFrequency: "monthly" },
  { path: "/benefits/admin-security", priority: 0.7, changeFrequency: "monthly" },
  { path: "/integrations", priority: 0.9, changeFrequency: "weekly" },
  { path: "/tools/ai-project-plan", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/any-update-cost", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/status-report", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/roi-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/team-utilization", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools/cost-margin-estimator", priority: 0.9, changeFrequency: "monthly" },

  // Solutions / social proof / tools hub
  { path: "/solutions/professional-services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/lawyers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/accountants", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/consultants", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/creative-services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/architects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/customers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/compare", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.8, changeFrequency: "monthly" },

  // Content hubs
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/knowledge-base", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/founder-story", priority: 0.6, changeFrequency: "yearly" },

  // Product news / programs
  { path: "/announcements", priority: 0.5, changeFrequency: "weekly" },
  { path: "/roadmap", priority: 0.5, changeFrequency: "weekly" },
  { path: "/changelog", priority: 0.5, changeFrequency: "weekly" },
  { path: "/refer-and-earn", priority: 0.5, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.5, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "weekly" },

  // Support / company
  { path: "/docs", priority: 0.4, changeFrequency: "monthly" },
  { path: "/support", priority: 0.4, changeFrequency: "monthly" },
  { path: "/status", priority: 0.4, changeFrequency: "daily" },
  { path: "/brand", priority: 0.4, changeFrequency: "yearly" },
  { path: "/investors", priority: 0.4, changeFrequency: "monthly" },
  { path: "/sales-pitch", priority: 0.4, changeFrequency: "monthly" },

  // Legal
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC.map((e) => ({
    url: url(e.path),
    lastModified: e.lastModified ?? SITE_UPDATED,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));

  // Blog posts (date is ISO, use it as lastModified)
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: p.date || SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Knowledge base articles (date is a display string, not reliably ISO,
  // so we stamp the site-updated date rather than risk an invalid lastmod)
  const kbEntries: MetadataRoute.Sitemap = KB_ARTICLES.map((a) => ({
    url: url(`/knowledge-base/${a.slug}`),
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Comparison pages (one per competitor)
  const compareEntries: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: url(`/compare/${c.slug}`),
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Keep `now` referenced so the build records generation time in the
  // default lastModified path if SITE_UPDATED is ever removed.
  void now;

  return [...staticEntries, ...blogEntries, ...kbEntries, ...compareEntries];
}
