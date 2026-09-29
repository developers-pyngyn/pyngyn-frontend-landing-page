import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContextualCTA } from "@/components/ContextualCTA";
import { KB_ARTICLES, getArticle, relatedArticles, defaultBody } from "@/components/kb-data";
import { KbFeaturePlatformShowcase } from "@/components/kb/KbFeaturePlatformShowcase";
import { KB_URL, SUPPORT_URL, DEMO_URL, SIGNUP_URL } from "@/components/config";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  webPageSchema,
  absoluteUrl,
} from "@/components/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return KB_ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const a = getArticle(params.slug);
  if (!a) return { title: "Article not found | Pyngyn" };
  return {
    title: `${a.title} | Pyngyn ClientSpace Knowledge Base`,
    description: a.excerpt,
    alternates: { canonical: `/knowledge-base/${a.slug}` },
  };
}

export default function KbArticlePage({ params }: { params: Params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const body = a.body && a.body.length > 0 ? a.body : defaultBody(a);
  const related = relatedArticles(a.slug, 3);
  const slugUrl = `/knowledge-base/${a.slug}`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: slugUrl,
            name: `${a.title} | Pyngyn ClientSpace Knowledge Base`,
            description: a.excerpt,
            breadcrumbId: `${slugUrl}#breadcrumb`,
            primaryImageUrl: a.cover ? absoluteUrl(a.cover) : undefined,
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Knowledge base", url: "/knowledge-base" },
              { name: a.category, url: "/knowledge-base" },
              { name: a.title, url: slugUrl },
            ],
            slugUrl
          ),
          articleSchema({
            type: "TechArticle",
            url: slugUrl,
            headline: a.title,
            description: a.excerpt,
            articleSection: a.category,
            imageUrl: a.cover ? absoluteUrl(a.cover) : undefined,
            keywords: [a.category, "Pyngyn ClientSpace", "CA Practice Management", "how-to", "compliance"],
          }),
        ]}
      />
      <Navbar />

      <main id="main" className="bg-[#fbfbfd]">
        <article className="wrap max-w-[840px] pb-[80px] pt-[130px]">
          {/* Breadcrumb & Back */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
            <nav className="flex items-center gap-2" aria-label="Breadcrumb">
              <Link href={KB_URL} className="flex items-center gap-1.5 font-medium hover:text-accent transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Knowledge Base</span>
              </Link>
              <span aria-hidden="true" className="text-muted/40">/</span>
              <span className="font-semibold text-accent">{a.category}</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>Verified ClientSpace SOP</span>
            </span>
          </div>

          {/* Article Header */}
          <div className="flex items-center gap-3 text-[13px] text-muted">
            <span className="font-mono">{a.date}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-accent">{a.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{a.readingTime} read</span>
            </span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(28px,4.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
            {a.title}
          </h1>
          <p className="mt-4 text-[17.5px] sm:text-[18.5px] leading-relaxed text-muted">{a.excerpt}</p>

          {/* Live Pyngyn Platform UI Showcase & Verified Screenshot */}
          <KbFeaturePlatformShowcase article={a} />

          {/* Body Content */}
          <div className="mt-10 flex flex-col gap-9 bg-white p-7 sm:p-10 rounded-3xl border border-line shadow-sm">
            {body.map((sec, i) => (
              <section key={i} className="border-b border-slate-100 pb-7 last:border-b-0 last:pb-0">
                {sec.heading && (
                  <h2 className="mb-3 font-display text-[22px] sm:text-[23px] font-semibold tracking-[-0.015em] text-ink flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent/10 text-accent text-[12px] font-mono font-bold">
                      {i + 1}
                    </span>
                    <span>{sec.heading}</span>
                  </h2>
                )}
                {sec.paragraphs.map((p, j) => (
                  <p key={j} className="mb-3.5 text-[16px] leading-[1.7] text-[#2c323f]">{p}</p>
                ))}
                {sec.bullets && (
                  <ul className="mt-3 flex flex-col gap-2.5 rounded-2xl bg-slate-50/70 p-5 border border-slate-100">
                    {sec.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#2c323f]">
                        <span className="mt-1 grid h-4 w-4 flex-none place-items-center rounded-full bg-accent/15 text-accent" aria-hidden="true">
                          <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Practice Pro-Tip / Implementation Alert */}
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-6">
            <Sparkles className="h-6 w-6 flex-none text-accent mt-0.5" />
            <div>
              <h3 className="font-bold text-[15.5px] text-ink">Need assistance configuring this module for your firm?</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">
                Our practice onboarding specialists provide 1-on-1 migration assistance, custom GSP bridge configuration, and team training for CA partnerships.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={DEMO_URL} className="btn btn-accent text-[13px] py-2 px-4">
                  Schedule practice walkthrough &rarr;
                </a>
                <a href={SUPPORT_URL} className="btn btn-ghost text-[13px] py-2 px-4">
                  Contact support team
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="wrap pb-[100px]">
            <div className="border-t border-line pt-12">
              <h2 className="title mb-7 text-[24px]">Related Practice Guides</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`${KB_URL}/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card-hover"
                  >
                    <div className="flex items-center gap-2 text-[12px] text-muted">
                      <span className="font-mono">{r.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-accent">{r.category}</span>
                    </div>
                    <h3 className="mt-2.5 font-display text-[17px] font-semibold leading-snug group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted line-clamp-3">{r.excerpt}</p>
                    <span className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-accent group-hover:gap-1.5 transition-all">
                      <span>Read guide</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContextualCTA category={a.category} />
      </main>
      <Footer />
    </>
  );
}
