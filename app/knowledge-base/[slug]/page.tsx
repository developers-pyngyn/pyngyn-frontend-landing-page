import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContextualCTA } from "@/components/ContextualCTA";
import { KB_ARTICLES, getArticle, relatedArticles, defaultBody } from "@/components/kb-data";
import { KB_URL, SUPPORT_URL } from "@/components/config";
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
  if (!a) return { title: "Article not found | PYNGYN" };
  return {
    title: `${a.title} | PYNGYN Knowledge base`,
    description: a.excerpt,
    alternates: { canonical: `/knowledge-base/${a.slug}` },
  };
}

export default function KbArticlePage({ params }: { params: Params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const body = a.body && a.body.length > 0 ? a.body : defaultBody(a);
  const related = relatedArticles(a.slug);
  const slugUrl = `/knowledge-base/${a.slug}`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: slugUrl,
            name: a.title,
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
            keywords: [a.category, "PYNGYN", "knowledge base", "how-to"],
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <article className="wrap max-w-[760px] pb-[60px] pt-[120px]">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[13px] text-muted" aria-label="Breadcrumb">
            <Link href={KB_URL} className="hover:text-accent">Knowledge base</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{a.category}</span>
          </nav>

          <div className="flex items-center gap-2 text-[13px] text-muted">
            <span>{a.date}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-accent">{a.category}</span>
            <span aria-hidden="true">·</span>
            <span>{a.readingTime} read</span>
          </div>

          <h1 className="mt-3 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            {a.title}
          </h1>
          <p className="mt-4 text-[18px] leading-relaxed text-muted">{a.excerpt}</p>

          {/* Featured image: real cover if set, else placeholder slot */}
          {a.cover ? (
            <div className="mt-7 overflow-hidden rounded-[18px] border border-line">
              <Image
                src={a.cover}
                alt={a.title}
                width={1280}
                height={720}
                className="h-auto w-full"
              />
            </div>
          ) : (
            <div className="mt-7 flex aspect-[16/9] w-full items-center justify-center rounded-[18px] border border-line bg-[#f1f2f5]" aria-hidden="true">
              <div className="flex flex-col items-center gap-2 text-muted/50">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 17l4.5-4.5a2 2 0 012.8 0L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Featured image</span>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="mt-9 flex flex-col gap-7">
            {body.map((sec, i) => (
              <section key={i}>
                {sec.heading && (
                  <h2 className="mb-2.5 font-display text-[22px] font-semibold tracking-[-0.015em]">{sec.heading}</h2>
                )}
                {sec.paragraphs.map((p, j) => (
                  <p key={j} className="mb-3 text-[16.5px] leading-relaxed text-[#3a3a42]">{p}</p>
                ))}
                {sec.bullets && (
                  <ul className="mt-1 flex flex-col gap-2">
                    {sec.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-3 text-[16px] text-[#3a3a42]">
                        <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-lt text-accent" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Help callout */}
          <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-line bg-[#fbfbfd] p-6">
            <h2 className="font-display text-[18px] font-semibold">Still need help?</h2>
            <p className="text-[15px] text-muted">Our team is happy to walk you through anything in PYNGYN.</p>
            <a href={SUPPORT_URL} className="btn btn-primary mt-1">Contact support →</a>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="wrap pb-[80px]">
            <h2 className="title mb-6 text-[24px]">Related articles</h2>
            <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`${KB_URL}/${r.slug}`}
                  className="group flex h-full flex-col rounded-[16px] border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="flex items-center gap-2 text-[12px] text-muted">
                    <span>{r.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-accent">{r.category}</span>
                  </div>
                  <h3 className="mt-2 font-display text-[16px] font-semibold leading-snug group-hover:text-accent">{r.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{r.excerpt}</p>
                  <span className="mt-3 text-[13px] font-semibold text-accent">Read more →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ContextualCTA category={a.category} />
      </main>
      <Footer />
    </>
  );
}
