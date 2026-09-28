import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { COMPETITORS, DEMO_URL, SIGNUP_URL } from "@/components/config";
import {
  CAPABILITY_ROWS,
  COMPARE_FOOTNOTE,
  COMPARE_LEGEND,
  getCompareContent,
  type Cell,
} from "@/components/compare-data";
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/components/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const content = getCompareContent(params.slug);
  if (!content) return { title: "Compare | PYNGYN" };
  return {
    title: `PYNGYN vs ${content.name} | Practice Management for CA Firms | PYNGYN`,
    description: `${content.intro} Factual side-by-side comparison, key differences, migration steps, and FAQs.`,
    alternates: { canonical: `/compare/${content.slug}` },
  };
}

function CellMark({ v }: { v: Cell }) {
  if (v === true) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[12px] font-bold text-emerald-700 border border-emerald-200 shadow-sm"
        aria-label="Supported"
        title="Full native support"
      >
        ✓
      </span>
    );
  }
  if (v === "limited" || v === "partial") {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200"
        aria-label="Limited"
        title="Partial or limited capability"
      >
        Limited
      </span>
    );
  }
  if (v === "integration") {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200"
        aria-label="Integration"
        title="Requires third-party integration"
      >
        Integration
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center text-[15px] font-medium text-slate-400"
      aria-label="Not available"
      title="Not available"
    >
      —
    </span>
  );
}

export default function ComparePage({ params }: { params: Params }) {
  const content = getCompareContent(params.slug);
  if (!content) notFound();

  const otherCompetitors = COMPETITORS.filter((c) => c.slug !== content.slug);
  const slugUrl = `/compare/${content.slug}`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: slugUrl,
            name: `PYNGYN vs ${content.name} | Practice Management Comparison`,
            description: content.intro,
            breadcrumbId: `${slugUrl}#breadcrumb`,
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Compare", url: "/compare" },
              { name: `vs ${content.name}`, url: slugUrl },
            ],
            slugUrl
          ),
          faqPageSchema(content.faqs, slugUrl),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="wrap pb-[40px] pt-[150px]">
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <Link href="/compare" className="hover:text-ink">
              Compare
            </Link>
            <span aria-hidden>›</span>
            <span className="text-ink">PYNGYN vs {content.name}</span>
          </div>
          <span className="eyebrow mt-6">Client Management for CA & Accounting Firms</span>
          <h1 className="mt-3 max-w-[860px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            The CA &amp; accounting practice alternative to {content.name}.
          </h1>
          <p className="lead mt-5 max-w-[760px]">{content.intro}</p>
          <p className="mt-2 max-w-[760px] text-[14px] text-muted">
            <span className="font-semibold text-ink">{content.name}:</span>{" "}
            {content.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={DEMO_URL} className="btn btn-primary">
              Book a practice demo →
            </a>
            <a href={SIGNUP_URL} className="btn btn-ghost">
              Start 7-day free trial
            </a>
          </div>
        </section>

        {/* TL;DR verdict */}
        <section className="wrap pb-[60px]">
          <div className="grid gap-[18px] md:grid-cols-2">
            <div className="card border-accent/30 bg-accent-lt/40">
              <span className="eyebrow">Pick PYNGYN if</span>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink font-medium">
                {content.verdict.pickPyngyn}
              </p>
            </div>
            <div className="card">
              <span className="eyebrow">Pick {content.name} if</span>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink">
                {content.verdict.pickThem}
              </p>
            </div>
          </div>
        </section>

        {/* Side-by-side capability matrix */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Capabilities side by side</span>
          <h2 className="title mt-3">
            What each platform delivers, transparently evaluated.
          </h2>
          <p className="lead mt-3">
            Core practice management capabilities evaluated objectively for PYNGYN ClientSpace and {content.name}.
          </p>
          <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-[#fbfbfd]">
                  <th className="px-5 py-4 text-[13px] font-semibold text-muted uppercase tracking-wider w-[50%]">
                    Practice Capability
                  </th>
                  <th className="px-5 py-4 text-center text-[14px] font-bold text-accent w-[25%] bg-accent-lt/20">
                    PYNGYN ClientSpace
                  </th>
                  <th className="px-5 py-4 text-center text-[14px] font-bold text-ink w-[25%]">
                    {content.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {CAPABILITY_ROWS.map((r, i) => (
                  <tr
                    key={r.label}
                    className={
                      i < CAPABILITY_ROWS.length - 1
                        ? "border-b border-line hover:bg-slate-50/50 transition-colors"
                        : "hover:bg-slate-50/50 transition-colors"
                    }
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="text-[14.5px] font-semibold text-ink">
                        {r.label}
                      </div>
                      {r.detail && (
                        <div className="mt-1 text-[12.5px] leading-relaxed text-muted">
                          {r.detail}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center align-middle bg-accent-lt/10">
                      <CellMark v={r.pyngyn} />
                    </td>
                    <td className="px-5 py-4 text-center align-middle">
                      <CellMark v={r.competitor[content.slug] ?? false} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            {COMPARE_LEGEND} · {COMPARE_FOOTNOTE}
          </p>
          <p className="mt-3 text-[13px] text-muted">
            Want to see all platforms at once?{" "}
            <Link href="/compare" className="text-accent hover:underline font-semibold">
              View the complete practice landscape table →
            </Link>
          </p>
        </section>

        {/* Key differences deep dive */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">The differences that matter</span>
          <h2 className="title mt-3">
            Where PYNGYN works differently than {content.name}.
          </h2>
          <div className="mt-8 grid gap-[18px]">
            {content.differences.map((d, i) => (
              <div key={d.title} className="card">
                <div className="flex items-baseline gap-3">
                  <span className="index-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em] text-ink">
                    {d.title}
                  </h3>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-accent/20 bg-accent-lt/30 p-4">
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-accent-dk">
                      PYNGYN ClientSpace
                    </span>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink">
                      {d.pyngyn}
                    </p>
                  </div>
                  <div className="rounded-xl border border-line bg-slate-50 p-4">
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-muted">
                      {content.name}
                    </span>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink">
                      {d.them}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where they shine */}
        <section className="wrap pb-[60px]">
          <div className="card">
            <span className="eyebrow">Honest perspective</span>
            <h2 className="title mt-3 text-[clamp(24px,2.6vw,32px)]">
              Where {content.name} is the better choice.
            </h2>
            <p className="lead mt-3">
              We believe in matching firms with the software that fits their exact workflow.
              Here is where {content.name} stands out:
            </p>
            <ul className="mt-6 space-y-3">
              {content.bestFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-ink">
                  <span className="mt-1 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 text-[13px] text-muted">
              <span className="font-semibold text-ink">Pricing context:</span>{" "}
              {content.pricingNote}
            </p>
          </div>
        </section>

        {/* Migration steps */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Migration Path</span>
          <h2 className="title mt-3">
            Moving from {content.name} to PYNGYN.
          </h2>
          <p className="lead mt-3">
            A structured 4-step transition plan designed to avoid practice disruptions during busy season.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.migrationSteps.map((s, i) => (
              <div key={s.title} className="card flex flex-col">
                <span className="index-num">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-[16px] font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted flex-1">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Switcher quote if present */}
        {content.switcherQuote && (
          <section className="wrap pb-[60px]">
            <div className="card border-accent/30 bg-accent-lt/20 text-center py-10 px-6 sm:px-12">
              <blockquote className="font-display text-[19px] sm:text-[22px] font-medium leading-relaxed text-ink italic">
                &ldquo;{content.switcherQuote.quote}&rdquo;
              </blockquote>
              <cite className="mt-4 block text-[13px] font-bold uppercase tracking-wider text-accent-dk not-italic">
                — {content.switcherQuote.attribution}
              </cite>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Common Questions</span>
          <h2 className="title mt-3">
            PYNGYN vs {content.name} FAQs.
          </h2>
          <div className="mt-8 space-y-4">
            {content.faqs.map((f) => (
              <div key={f.q} className="card">
                <h3 className="font-display text-[16px] font-semibold text-ink">
                  {f.q}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Other comparisons */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Other Comparisons</span>
          <h2 className="title mt-3">
            Compare PYNGYN with other practice software.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {otherCompetitors.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="btn btn-ghost text-[13px]"
              >
                vs {c.name} →
              </Link>
            ))}
            <Link href="/compare" className="btn btn-ghost text-[13px]">
              All comparisons →
            </Link>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
