import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, KB_URL, BLOG_URL } from "@/components/config";
import { GUIDES, type Guide, CATEGORY_COLOR, type GuideCategory } from "@/components/guides-data";

export const metadata: Metadata = {
  title: "CA Practice Playbooks & Operational Guides | Pyngyn",
  description:
    "Practical playbooks for Chartered Accountants and accounting firms: statutory audit workflows, PBC checklists, 4-eye partner review gates, and firm scaling.",
  alternates: { canonical: "/guides" },
};

const CATEGORIES = ["All", "Planning", "Status", "Risk", "Rollout", "AI", "Workflows"] as const;

const featured = GUIDES.filter((g) => g.featured);
const byCategory = (cat: string) =>
  cat === "All" ? GUIDES : GUIDES.filter((g) => g.category === cat);

function GuideCard({ g, size = "default" }: { g: Guide; size?: "default" | "large" }) {
  const big = size === "large";
  return (
    <Link
      href={`/guides/${g.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden ${big ? "aspect-[16/8]" : "aspect-[16/9]"}`}
        style={{ background: `linear-gradient(135deg, ${CATEGORY_COLOR[g.category]}15, ${CATEGORY_COLOR[g.category]}05)` }}
        aria-hidden="true"
      >
        <div
          className="font-display text-[42px] font-bold opacity-25"
          style={{ color: CATEGORY_COLOR[g.category] }}
        >
          {g.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="font-mono font-semibold uppercase tracking-[0.12em]" style={{ color: CATEGORY_COLOR[g.category] }}>
            {g.category}
          </span>
          <span className="text-muted" aria-hidden="true">·</span>
          <span className="text-muted">{g.readingTime} read</span>
        </div>
        <h3 className={`mt-3 font-display font-semibold leading-snug tracking-[-0.015em] group-hover:text-accent ${big ? "text-[24px]" : "text-[20px]"}`}>
          {g.title}
        </h3>
        <p className={`mt-2.5 flex-1 leading-relaxed text-muted ${big ? "text-[16px]" : "text-[15px]"}`}>
          {g.excerpt}
        </p>
        <span className="mt-4 text-[13.5px] font-semibold text-accent">Read playbook →</span>
      </div>
    </Link>
  );
}

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="wrap pb-2 pt-[140px] sm:pt-[160px]">
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                CA &amp; Accounting Practice Playbooks
              </span>
              <h1 className="mt-4 max-w-[720px] font-display text-[clamp(34px,5vw,54px)] font-semibold leading-[1.04] tracking-[-0.025em]">
                Playbooks for modern CA &amp; accounting practices.
              </h1>
              <p className="lead mt-5 max-w-[600px]">
                Practical, opinionated guides on managing client PBC checklists, statutory compliance deadlines,
                4-eye partner review gates, and scaling your practice operations.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-line bg-white p-6 shadow-card lg:block">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Looking for something specific?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Browse by category below, or check the{" "}
                <Link href={KB_URL} className="font-semibold text-accent hover:underline">knowledge base</Link>{" "}
                for step-by-step how-tos and the{" "}
                <Link href={BLOG_URL} className="font-semibold text-accent hover:underline">blog</Link>{" "}
                for what we&apos;re thinking about.
              </p>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="wrap pt-12 sm:pt-16">
          <div className="mb-7 flex items-end justify-between gap-6">
            <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em]">Featured</h2>
            <span className="text-[13px] text-muted">Start with these</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map((g) => <GuideCard key={g.slug} g={g} />)}
          </div>
        </section>

        {/* Browse by category */}
        <section className="wrap pt-14">
          <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em]">Browse by topic</h2>
          <p className="mt-2 text-[15px] text-muted">From a one-line goal to firm-wide rollout, guides for every stage.</p>

          {/* Category badges (purely visual jumplinks, anchor to sections below) */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c !== "All").map((c) => (
              <a
                key={c}
                href={`#cat-${c.toLowerCase()}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                style={{ borderLeft: `3px solid ${CATEGORY_COLOR[c]}` }}
              >
                {c}
                <span className="ml-2 text-[12px] text-muted">
                  {byCategory(c).length}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Per-category sections */}
        {CATEGORIES.filter((c) => c !== "All").map((cat) => {
          const items = byCategory(cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} id={`cat-${cat.toLowerCase()}`} className="wrap pt-12 sm:pt-14">
              <div className="mb-7 flex items-baseline gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLOR[cat] }}
                  aria-hidden="true"
                />
                <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em]">{cat}</h2>
                <span className="text-[13px] text-muted">· {items.length} {items.length === 1 ? "guide" : "guides"}</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((g) => <GuideCard key={g.slug} g={g} />)}
              </div>
            </section>
          );
        })}

        {/* Closing CTA */}
        <section className="wrap pb-16 pt-16 sm:pb-20">
          <div className="hero-dark relative overflow-hidden rounded-[28px] p-9 text-center sm:p-12">
            <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h2 className="mx-auto max-w-[620px] font-display text-[clamp(24px,3.4vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-white">
                Want a guide built around your team?
              </h2>
              <p className="mx-auto mt-3 max-w-[480px] text-[16px] leading-relaxed text-white/65">
                Book a 30-minute walkthrough and we&apos;ll map our playbook onto how your firm actually runs.
              </p>
              <a href={DEMO_URL} className="mt-7 inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5 hover:bg-accent-dk">
                Book a demo →
              </a>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
