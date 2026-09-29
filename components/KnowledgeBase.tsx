"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  BookOpen,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  Layout,
  Scale,
  Plug,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Monitor,
} from "lucide-react";
import { KB_ARTICLES, KB_CATEGORIES, type KbArticle } from "./kb-data";
import { KB_URL, SUPPORT_URL, DEMO_URL } from "./config";

const CATEGORY_META: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; badgeBg: string }
> = {
  "Client Management": { icon: Users, color: "text-blue-600", badgeBg: "bg-blue-50 text-blue-700 border-blue-200" },
  Compliance: { icon: ShieldCheck, color: "text-emerald-600", badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "Tax & GST": { icon: FileSpreadsheet, color: "text-amber-600", badgeBg: "bg-amber-50 text-amber-700 border-amber-200" },
  "Client Portal": { icon: Layout, color: "text-indigo-600", badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  "Quality & Governance": { icon: Scale, color: "text-purple-600", badgeBg: "bg-purple-50 text-purple-700 border-purple-200" },
  Integrations: { icon: Plug, color: "text-cyan-600", badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  "Practice Operations": { icon: Zap, color: "text-rose-600", badgeBg: "bg-rose-50 text-rose-700 border-rose-200" },
};

const SUGGESTIONS = [
  "GST Reconciliation",
  "4-Eye Review Gates",
  "WhatsApp API",
  "Tally Prime",
  "Aadhaar eSign",
  "Statutory Calendar",
];

function ArticleCard({ a }: { a: KbArticle }) {
  const meta = CATEGORY_META[a.category] || {
    icon: BookOpen,
    color: "text-accent",
    badgeBg: "bg-accent/10 text-accent border-accent/20",
  };
  const IconComp = meta.icon;

  return (
    <Link
      href={`${KB_URL}/${a.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-card-hover"
    >
      <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-slate-50 border-b border-line" aria-hidden="true">
        {a.cover ? (
          <Image
            src={a.cover}
            alt={a.title}
            width={960}
            height={540}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted/40">
            <BookOpen className="h-8 w-8" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Pyngyn ClientSpace</span>
          </div>
        )}
        <div className="absolute top-3.5 left-3.5">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-md bg-white/90 shadow-sm ${meta.badgeBg}`}>
            <IconComp className="h-3 w-3" />
            <span>{a.category}</span>
          </span>
        </div>
        <div className="absolute top-3.5 right-3.5">
          <span className="inline-flex items-center gap-1 rounded-md border border-slate-200/90 bg-white/95 px-2 py-0.5 text-[10.5px] font-mono font-medium text-slate-700 backdrop-blur-md shadow-xs">
            <Monitor className="h-2.5 w-2.5 text-accent" />
            <span>App Screen</span>
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between text-[12px] text-muted">
          <span className="font-mono text-muted/80">{a.date}</span>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-600">{a.readingTime} read</span>
        </div>
        <h3 className="mt-3 font-display text-[19px] sm:text-[20px] font-semibold leading-snug tracking-[-0.015em] text-ink group-hover:text-accent transition-colors">
          {a.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-muted">{a.excerpt}</p>
        <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-accent group-hover:translate-x-1 transition-transform">
          <span>Read implementation guide</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

function Grid({ items }: { items: KbArticle[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => (
        <ArticleCard key={a.slug} a={a} />
      ))}
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
      <section className="hero-dark relative overflow-hidden pb-[64px] pt-[140px] text-center">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="wrap relative">
          <span className="eyebrow-dark justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            ClientSpace Documentation · Practice Knowledge Base
          </span>
          <h1 className="mx-auto mt-4 max-w-[820px] font-display text-[clamp(32px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.025em] text-white">
            Everything you need to run your practice on Pyngyn.
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-[16.5px] sm:text-[17.5px] leading-relaxed text-white/70">
            Official operational guides, statutory workflow templates, ledger integration architectures, and 4-eye review standard operating procedures.
          </p>

          <div className="relative mx-auto mt-8 w-full max-w-[620px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, statutory form (GSTR-3B, Form 3CD, AOC-4), or integration..."
              aria-label="Search the knowledge base"
              className="w-full rounded-2xl border border-white/15 bg-white/95 backdrop-blur-md py-4 pl-12 pr-4 text-[15px] text-ink shadow-2xl outline-none transition-all placeholder:text-muted/70 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>

          {/* Quick pill suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[12.5px] text-white/60">
            <span className="font-medium text-white/40">Suggested:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap pb-[100px]">
        {/* Category tabs */}
        <div className="sticky top-[68px] z-30 -mx-4 overflow-x-auto border-b border-line bg-canvas/90 px-4 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            {KB_CATEGORIES.map((c) => {
              const count = c === "All" ? KB_ARTICLES.length : KB_ARTICLES.filter((a) => a.category === c).length;
              const isSelected = active === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${
                    isSelected
                      ? "border-ink bg-ink text-white shadow-sm"
                      : "border-line bg-white text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[11px] font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!searching ? (
          <>
            {/* Editor's Choice / Featured Architecture */}
            {editors.length > 0 && (
              <section className="mt-12">
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[13px] font-bold uppercase tracking-wider">Practice Architecture &amp; Review</span>
                </div>
                <h2 className="title text-[28px] mt-1">Core Operational Frameworks</h2>
                <p className="mb-7 mt-1.5 text-[15px] text-muted">
                  Essential architectural guides every CA and practice manager should review first.
                </p>
                <Grid items={editors} />
              </section>
            )}

            {/* Most popular */}
            <section className="mt-16">
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[13px] font-bold uppercase tracking-wider">Most Consulted</span>
              </div>
              <h2 className="title text-[28px] mt-1">Popular ClientSpace Playbooks</h2>
              <p className="mb-7 mt-1.5 text-[15px] text-muted">
                Frequently consulted guides on statutory filings, GSP sync, and client portal deployment.
              </p>
              <Grid items={popular} />
            </section>

            {/* All articles */}
            <section className="mt-16">
              <h2 className="title text-[28px]">Complete ClientSpace Catalog ({KB_ARTICLES.length} Articles)</h2>
              <p className="mb-7 mt-1.5 text-[15px] text-muted">
                Browse our comprehensive functional documentation across all practice disciplines.
              </p>
              <Grid items={KB_ARTICLES} />
            </section>
          </>
        ) : (
          <section className="mt-10">
            <div className="mb-6 flex items-center justify-between text-[14px] text-muted">
              <span>
                Showing <strong>{filtered.length}</strong> guide{filtered.length === 1 ? "" : "s"} for &ldquo;{query || active}&rdquo;
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActive("All");
                }}
                className="text-accent hover:underline text-[13px] font-medium"
              >
                Clear filters
              </button>
            </div>
            {filtered.length > 0 ? (
              <Grid items={filtered} />
            ) : (
              <div className="rounded-3xl border border-line bg-white p-12 text-center shadow-card">
                <BookOpen className="mx-auto h-12 w-12 text-muted/30" />
                <h3 className="mt-4 text-[18px] font-bold text-ink">No articles match &ldquo;{query}&rdquo;</h3>
                <p className="mx-auto mt-2 max-w-[420px] text-[14.5px] text-muted">
                  Try checking your spelling, using broader search terms, or explore our tailored practice walkthrough.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActive("All");
                    }}
                    className="btn btn-ghost"
                  >
                    View all guides
                  </button>
                  <a href={DEMO_URL} className="btn btn-accent">
                    Book a practice demo
                  </a>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
