import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, SIGNUP_URL } from "@/components/config";
import { GUIDES, getGuide, CATEGORY_COLOR } from "@/components/guides-data";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
  articleSchema,
} from "@/components/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return { title: "Guide Not Found | Pyngyn" };

  return {
    title: `${guide.title} | CA Practice Playbooks | Pyngyn`,
    description: guide.excerpt,
    alternates: { canonical: `/guides/${guide.slug}` },
  };
}

export default function GuideDetailPage({ params }: { params: Params }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const currentIndex = GUIDES.findIndex((g) => g.slug === guide.slug);
  const prevGuide = currentIndex > 0 ? GUIDES[currentIndex - 1] : null;
  const nextGuide = currentIndex < GUIDES.length - 1 ? GUIDES[currentIndex + 1] : null;

  const guideUrl = `/guides/${guide.slug}`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: guideUrl,
            name: guide.title,
            description: guide.excerpt,
            breadcrumbId: `${guideUrl}#breadcrumb`,
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Guides", url: "/guides" },
              { name: guide.category, url: `/guides#cat-${guide.category.toLowerCase()}` },
              { name: guide.title, url: guideUrl },
            ],
            guideUrl
          ),
          articleSchema({
            url: guideUrl,
            headline: guide.title,
            description: guide.excerpt,
            datePublished: "2026-05-15",
            dateModified: "2026-09-28",
            authorName: "Pyngyn Practice Solutions Team",
          }),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* Header */}
        <section className="wrap pb-8 pt-[130px] sm:pt-[150px] max-w-[820px]">
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/guides"
              className="font-semibold text-accent hover:underline flex items-center gap-1"
            >
              &larr; All Practice Playbooks
            </Link>
            <span className="text-muted">&bull;</span>
            <span
              className="font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[11px]"
              style={{
                backgroundColor: `${CATEGORY_COLOR[guide.category]}15`,
                color: CATEGORY_COLOR[guide.category],
              }}
            >
              {guide.category}
            </span>
            <span className="text-muted">&bull;</span>
            <span className="text-muted">{guide.readingTime} read</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(28px,4.5vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] text-slate-950">
            {guide.title}
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-slate-600 border-b border-line pb-8">
            {guide.excerpt}
          </p>
        </section>

        {/* Content Body */}
        <section className="wrap pb-16 max-w-[820px]">
          <div className="space-y-10">
            {guide.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-display text-[22px] sm:text-[25px] font-bold text-slate-900 tracking-[-0.015em]">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[15.5px] leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="my-4 space-y-2 rounded-xl bg-slate-50 border border-slate-200/80 p-5">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-[14.5px] text-slate-800">
                        <span className="text-accent font-bold mt-0.5">&bull;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Practice Callout Box */}
          <div className="mt-14 rounded-2xl border border-accent/20 bg-accent/[0.03] p-7 sm:p-9 shadow-sm">
            <span className="eyebrow">Practice Implementation</span>
            <h3 className="mt-2 font-display text-[20px] font-bold text-ink">
              Put this playbook to work in your practice.
            </h3>
            <p className="mt-2 text-[14.5px] text-muted leading-relaxed">
              Pyngyn ClientSpace comes pre-configured with standardized statutory templates, PBC checklist automations, and multi-tier partner review gates designed for CA and accounting firms.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={DEMO_URL} className="btn btn-accent text-sm">
                Book a 30-min practice demo &rarr;
              </a>
              <a href={SIGNUP_URL} className="btn btn-primary text-sm">
                Start 7-day free trial
              </a>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-line pt-8">
            {prevGuide ? (
              <Link
                href={`/guides/${prevGuide.slug}`}
                className="card group flex flex-col p-5 hover:border-accent transition-all"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  &larr; Previous Playbook
                </span>
                <span className="mt-1.5 font-bold text-[14.5px] text-ink group-hover:text-accent transition-colors line-clamp-1">
                  {prevGuide.title}
                </span>
              </Link>
            ) : <div />}

            {nextGuide ? (
              <Link
                href={`/guides/${nextGuide.slug}`}
                className="card group flex flex-col p-5 text-right hover:border-accent transition-all sm:ml-auto w-full"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Next Playbook &rarr;
                </span>
                <span className="mt-1.5 font-bold text-[14.5px] text-ink group-hover:text-accent transition-colors line-clamp-1">
                  {nextGuide.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
