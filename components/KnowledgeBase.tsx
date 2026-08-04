"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KB_ARTICLES, KB_CATEGORIES, type KbArticle } from "./kb-data";
import { KB_URL, SUPPORT_URL } from "./config";

function ArticleCard({ a }: { a: KbArticle }) {
  return (
    <Link
      href={`${KB_URL}/${a.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-[#f1f2f5]" aria-hidden="true">
        {a.cover ? (
          <Image
            src={a.cover}
            alt=""
            width={960}
            height={540}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-muted/40">
            <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 17l4.5-4.5a2 2 0 012.8 0L19 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-2 text-[13px] text-muted">
          <span>{a.date}</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-accent">{a.category}</span>
        </div>
        <h3 className="mt-3 font-display text-[21px] font-semibold leading-snug tracking-[-0.015em] group-hover:text-accent">
          {a.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[15.5px] leading-relaxed text-muted">{a.excerpt}</p>
        <span className="mt-4 text-[13px] text-muted">{a.readingTime} read</span>
      </div>
    </Link>
  );
}

function Grid({ items }: { items: KbArticle[] }) {
  return (
    <div className="grid gap-[22px] sm:grid-cols-2">
      {items.map((a) => <ArticleCard key={a.slug} a={a} />)}
    </div>
  );
}

export function KnowledgeBase() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");

  const popular = useMemo(() => KB_ARTICLES.filter((a) => a.popular), []);
  const editors = useMemo(() => KB_ARTICLES.filter((a) => a.editorsPick), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return KB_ARTICLES.filter((a) => {
      const matchesCat = active === "All" || a.category === active;
      const matchesQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, active]);

  const searching = query.trim().length > 0 || active !== "All";

  return (
    <>
      {/* Hero with search */}
      <section className="hero-dark relative overflow-hidden pb-[60px] pt-[140px] text-center">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="wrap relative">
          <span className="eyebrow-dark justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Knowledge base
          </span>
          <h1 className="mx-auto mt-4 max-w-[680px] font-display text-[clamp(32px,4.6vw,52px)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
            How can we help?
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] text-white/65">
            Guides, how-tos, and answers to get the most out of PYNGYN.
          </p>
          <div className="relative mx-auto mt-7 w-full max-w-[560px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the knowledge base"
              aria-label="Search the knowledge base"
              className="w-full rounded-full border border-white/10 bg-white py-3.5 pl-12 pr-4 text-[15px] text-ink shadow-cta outline-none focus-visible:border-accent"
            />
          </div>
        </div>
      </section>

      <div className="wrap pb-[80px]">
        {/* Category tabs */}
        <div className="sticky top-[68px] z-30 -mx-4 overflow-x-auto border-b border-line bg-canvas/85 px-4 py-3 backdrop-blur">
          <div className="flex gap-2">
            {KB_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active === c ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {!searching ? (
          <>
            <section className="mt-10">
              <h2 className="title text-[26px]">Most popular</h2>
              <p className="mb-6 mt-1 text-[15px] text-muted">New to PYNGYN? Start with our most-viewed guides.</p>
              <Grid items={popular} />
            </section>

            {editors.length > 0 && (
              <section className="mt-14">
                <h2 className="title text-[26px]">Editor&apos;s picks</h2>
                <p className="mb-6 mt-1 text-[15px] text-muted">Hand-picked guides every team should read.</p>
                <Grid items={editors} />
              </section>
            )}

            <section className="mt-14">
              <h2 className="title text-[26px]">All articles</h2>
              <p className="mb-6 mt-1 text-[15px] text-muted">Browse everything, or filter by category above.</p>
              <Grid items={KB_ARTICLES} />
            </section>
          </>
        ) : (
          <section className="mt-8">
            <div className="mb-6 text-[14px] text-muted">{filtered.length} article{filtered.length === 1 ? "" : "s"}</div>
            {filtered.length > 0 ? (
              <Grid items={filtered} />
            ) : (
              <div className="rounded-2xl border border-line bg-white p-10 text-center">
                <p className="text-[16px] font-semibold">No articles match &ldquo;{query}&rdquo;</p>
                <p className="mt-2 text-[14px] text-muted">
                  Try a different search, or <Link href={SUPPORT_URL} className="font-semibold text-accent">contact support</Link>.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
