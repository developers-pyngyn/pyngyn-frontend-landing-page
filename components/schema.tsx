// Centralized JSON-LD / schema.org markup helpers for SEO.
//
// Every helper returns a plain object (or array of objects). Use the JsonLd
// component to render one or many graph nodes inside a page/layout.
//
// Reference: https://schema.org / https://developers.google.com/search/docs/appearance/structured-data
//
// All URLs are produced as absolute URLs based on SITE_URL so they validate
// in Google's Rich Results test, regardless of where the site is rendered.

import {
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_LINKEDIN,
  SOCIAL_REDDIT,
  SOCIAL_X,
  SOCIAL_YOUTUBE,
} from "./config";

// Canonical site URL. Override via NEXT_PUBLIC_SITE_URL when the site is
// deployed somewhere other than the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pyngyn.ai"
).replace(/\/+$/, "");

export const ORG_NAME = "PYNGYN";
// Legal entity that operates the PYNGYN brand.
export const ORG_LEGAL_NAME = "VIMOVI GlobalTech Private Limited";
const ORG_LOGO = `${SITE_URL}/logo.png`;
const ORG_ICON = `${SITE_URL}/icon.png`;

// Default 1200x630 social-share image, used as the Open Graph / Twitter card
// image across the site. Relative URL is resolved against `metadataBase`
// (set in app/layout.tsx). Pages can override with their own image.
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "PYNGYN: Clientspace, a standalone branded client portal, and Workspace, a standalone back office for professional-services firms",
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (!path) return SITE_URL + "/";
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// ---------------------------------------------------------------------------
// Renderer
// ---------------------------------------------------------------------------

// Strip undefined values so the JSON output is clean and validators don't
// stumble on `"key": null` for fields the page intentionally omitted.
function clean(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((v) => clean(v)).filter((v) => v !== undefined);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      const c = clean(v);
      if (c === undefined) continue;
      out[k] = c;
    }
    return out;
  }
  return value;
}

export function JsonLd({
  data,
  id,
}: {
  data: unknown;
  id?: string;
}) {
  // Normalize whatever the caller passes (single node or array of nodes) into
  // a single top-level JSON-LD object.
  //
  // - 1 node  -> emit that node as-is (keeps its own "@context")
  // - N nodes -> emit a single { "@context", "@graph": [...] } document.
  //   The @graph form is part of the JSON-LD spec and is what Google,
  //   Schema.org, and most third-party parsers expect when a page wants to
  //   describe multiple entities in one script tag. Emitting a bare JSON
  //   array works too, but trips up lightweight parsers in the wild that
  //   assume `parsed["@context"]` is a string (e.g. `r["@context"].toLowerCase`
  //   crashes when `r` is an array).
  const nodes = (Array.isArray(data) ? data : [data]).filter(
    (n) => n !== undefined && n !== null
  );
  let payload: unknown;
  if (nodes.length === 1) {
    payload = clean(nodes[0]);
  } else {
    const graph = nodes.map((n) => {
      const c = clean(n) as Record<string, unknown> | undefined;
      if (!c || typeof c !== "object") return c;
      // Drop per-node @context — the wrapper supplies it once for the graph.
      const { ["@context"]: _ctx, ...rest } = c;
      return rest;
    });
    payload = {
      "@context": "https://schema.org",
      "@graph": graph,
    };
  }
  // Prevent breaking out of the script tag in case any string contains "</".
  const json = JSON.stringify(payload, null, 0).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      id={id}
      // Schema markup is plain JSON; injecting via dangerouslySetInnerHTML
      // is the standard pattern for JSON-LD in React/Next.js.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

// ---------------------------------------------------------------------------
// Common entities
// ---------------------------------------------------------------------------

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL + "/",
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO,
      width: 512,
      height: 512,
    },
    image: ORG_ICON,
    description:
      "PYNGYN gives every client a branded Client Space (a standalone portal for status, documents, and approvals), with Workspace, the firm's back office for projects, finances, and billable time, available on its own or bundled together.",
    sameAs: [
      SOCIAL_X,
      SOCIAL_LINKEDIN,
      SOCIAL_REDDIT,
      SOCIAL_FACEBOOK,
      SOCIAL_YOUTUBE,
      SOCIAL_INSTAGRAM,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@pyngyn.com",
        url: absoluteUrl("/support"),
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@pyngyn.com",
        url: absoluteUrl("/demo"),
        availableLanguage: ["English"],
      },
    ],
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL + "/",
    name: ORG_NAME,
    description:
      "The operating system for professional-services firms. Run your firm and every client engagement in one place.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  } as const;
}

// Used as a base WebPage node. Pass breadcrumb/related ids to wire it up.
export function webPageSchema(opts: {
  url: string;
  name: string;
  description?: string;
  breadcrumbId?: string;
  primaryImageUrl?: string;
  isPartOfWebsite?: boolean;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf:
      opts.isPartOfWebsite === false
        ? undefined
        : { "@id": `${SITE_URL}/#website` },
    primaryImageOfPage: opts.primaryImageUrl
      ? { "@type": "ImageObject", url: opts.primaryImageUrl }
      : undefined,
    breadcrumb: opts.breadcrumbId
      ? {
          // Accept either an absolute @id or a "/path#breadcrumb" shorthand.
          "@id": opts.breadcrumbId.startsWith("http")
            ? opts.breadcrumbId
            : opts.breadcrumbId.startsWith("/")
              ? `${SITE_URL}${opts.breadcrumbId}`
              : opts.breadcrumbId,
        }
      : undefined,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "en",
  } as const;
}

// Build a BreadcrumbList from a list of [name, url] pairs.
// The first entry should be Home.
export function breadcrumbSchema(
  items: { name: string; url: string }[],
  pageUrl?: string
) {
  const breadcrumbId = pageUrl
    ? `${absoluteUrl(pageUrl)}#breadcrumb`
    : `${absoluteUrl(items[items.length - 1]?.url || "/")}#breadcrumb`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.url),
    })),
  } as const;
}

// ---------------------------------------------------------------------------
// Specialized page schemas
// ---------------------------------------------------------------------------

export function softwareApplicationSchema(opts?: {
  priceFromUsd?: number;
  ratingValue?: number;
  ratingCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "PYNGYN",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Project Management Software",
    operatingSystem: "Web, iOS, Android",
    url: SITE_URL + "/",
    description:
      "PYNGYN is an operating system for professional-services firms: a standalone branded client portal (Client Space) and a standalone back office for projects, finances, and billable time (Workspace), with AI that drafts plans, keeps status current, and flags risk before it slips.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      // Lowest standalone entry price (Workspace, $9/seat/month) — the
      // convention for a SoftwareApplication Offer. Matches the USD pricing
      // shown everywhere else on the site (pricing page, PricingTiers, etc).
      price: opts?.priceFromUsd ?? 9,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
    },
    featureList: [
      "AI-generated project plans from plain-language goals",
      "Automatic status updates from work activity",
      "Risk detection and slip prediction",
      "Timeline and Gantt views",
      "Task dependencies and owners",
      "One-click import from other trackers",
      "SSO / SAML and SOC 2 aligned controls",
    ],
    aggregateRating:
      opts?.ratingValue && opts?.ratingCount
        ? {
            "@type": "AggregateRating",
            ratingValue: opts.ratingValue,
            ratingCount: opts.ratingCount,
          }
        : undefined,
  } as const;
}

export function faqPageSchema(faqs: { q: string; a: string }[], url: string) {
  const pageUrl = absoluteUrl(url);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  } as const;
}

export function articleSchema(opts: {
  type?: "Article" | "BlogPosting" | "TechArticle" | "NewsArticle";
  url: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  articleSection?: string;
  keywords?: string[];
}) {
  const url = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "Article",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Organization",
      name: opts.authorName ?? "The PYNGYN Team",
      url: SITE_URL + "/",
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: opts.imageUrl ?? ORG_LOGO,
    articleSection: opts.articleSection,
    keywords: opts.keywords,
    inLanguage: "en",
  } as const;
}

export function blogSchema(opts: {
  url: string;
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    author?: string;
  }[];
}) {
  const url = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    url,
    name: "PYNGYN Blog",
    description:
      "Notes on running professional-services firms, client work, and operations, from the team building PYNGYN.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: opts.posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.date,
      dateModified: p.date,
      articleSection: p.category,
      author: {
        "@type": "Organization",
        name: p.author ?? "The PYNGYN Team",
      },
    })),
  } as const;
}

export function itemListSchema(opts: {
  url: string;
  name: string;
  items: { name: string; url?: string; description?: string }[];
}) {
  const pageUrl = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name: opts.name,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url ? absoluteUrl(it.url) : undefined,
      description: it.description,
    })),
  } as const;
}

export function collectionPageSchema(opts: {
  url: string;
  name: string;
  description?: string;
  hasPart?: { name: string; url: string; description?: string }[];
}) {
  const url = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    hasPart: opts.hasPart?.map((p) => ({
      "@type": "Article",
      name: p.name,
      url: absoluteUrl(p.url),
      description: p.description,
    })),
  } as const;
}

export function aboutPageSchema(opts: {
  url: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  } as const;
}

export function contactPageSchema(opts: {
  url: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en",
  } as const;
}

// Job postings — careers page list. The agent location is left generic
// because roles are remote.
export function jobPostingSchema(opts: {
  title: string;
  team: string;
  location: string;
  applyEmail: string;
  pageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opts.title,
    description: `${opts.title} on the ${opts.team} team at PYNGYN. ${opts.location}.`,
    employmentType: "FULL_TIME",
    hiringOrganization: { "@id": `${SITE_URL}/#organization` },
    datePosted: new Date().toISOString().slice(0, 10),
    industry: "Software",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Worldwide",
    },
    directApply: true,
    url: absoluteUrl(opts.pageUrl),
    applyContact: opts.applyEmail,
  } as const;
}

export function productSchema(opts: {
  url: string;
  name?: string;
  description?: string;
  offers: {
    name: string;
    priceMonthly?: number; // numeric amount in priceCurrency (default USD); pass undefined for "Custom"
    priceCurrency?: string;
    description: string;
    url: string;
    isCustom?: boolean;
  }[];
}) {
  const url = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: opts.name ?? "PYNGYN",
    description:
      opts.description ??
      "The operating system for professional-services firms. Run your firm and every client engagement in one place, with AI keeping plans, status, and risk current.",
    brand: { "@type": "Brand", name: ORG_NAME },
    image: ORG_LOGO,
    url,
    offers: opts.offers.map((o) =>
      o.isCustom
        ? {
            "@type": "Offer",
            name: o.name,
            description: o.description,
            url: absoluteUrl(o.url),
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 0,
              priceCurrency: o.priceCurrency ?? "USD",
              valueAddedTaxIncluded: false,
              description: "Custom pricing, contact sales",
            },
          }
        : {
            "@type": "Offer",
            name: o.name,
            description: o.description,
            url: absoluteUrl(o.url),
            availability: "https://schema.org/InStock",
            price: o.priceMonthly,
            priceCurrency: o.priceCurrency ?? "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: o.priceMonthly,
              priceCurrency: o.priceCurrency ?? "USD",
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: 1,
                unitText: "user",
              },
              billingIncrement: 1,
              unitText: "MON",
              description: "per member per month, billed annually",
            },
          }
    ),
  } as const;
}
