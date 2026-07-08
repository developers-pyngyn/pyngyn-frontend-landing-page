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
    title: `PYNGYN vs ${content.name} | PYNGYN`,
    description: `${content.intro} See a side-by-side comparison, key differences, migration steps, and FAQs.`,
    alternates: { canonical: `/compare/${content.slug}` },
  };
}

function CellMark({ v }: { v: Cell }) {
  if (v === true)
    return (
      <span
        className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-accent-lt text-accent"
        aria-label="Native"
        title="Native"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L20 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  if (v === "partial")
    return (
      <span
        className="mx-auto grid h-6 w-6 place-items-center rounded-full border border-line text-[#c8862a]"
        aria-label="Partial"
        title="Partial"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  return (
    <span
      className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-[#f3f4f7] text-muted"
      aria-label="Not available"
      title="Not available"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
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
            name: `PYNGYN vs ${content.name}`,
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
          <span className="eyebrow mt-6">PYNGYN vs {content.name}</span>
          <h1 className="mt-3 max-w-[860px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            The PS-native alternative to {content.name}.
          </h1>
          <p className="lead mt-5 max-w-[760px]">{content.intro}</p>
          <p className="mt-2 max-w-[760px] text-[14px] text-muted">
            <span className="font-medium text-ink">{content.name}:</span>{" "}
            {content.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={DEMO_URL} className="btn btn-primary">
              Book a demo →
            </a>
            <a href={SIGNUP_URL} className="btn btn-ghost">
              Start free
            </a>
          </div>
        </section>

        {/* TL;DR verdict */}
        <section className="wrap pb-[60px]">
          <div className="grid gap-[18px] md:grid-cols-2">
            <div className="card border-accent/30 bg-accent-lt/40">
              <span className="eyebrow">Pick PYNGYN if</span>
              <p className="mt-3 text-[16px] leading-relaxed text-ink">
                {content.verdict.pickPyngyn}
              </p>
            </div>
            <div className="card">
              <span className="eyebrow">Pick {content.name} if</span>
              <p className="mt-3 text-[16px] leading-relaxed text-ink">
                {content.verdict.pickThem}
              </p>
            </div>
          </div>
        </section>

        {/* Side-by-side capability matrix */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Capabilities side by side</span>
          <h2 className="title mt-3">
            What each tool does, and doesn&apos;t.
          </h2>
          <p className="lead mt-3">
            The same eight capabilities every PS firm asks about, scored
            honestly for PYNGYN and {content.name}.
          </p>
          <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-[#fbfbfd]">
                  <th className="px-5 py-4 text-[14px] font-semibold text-muted">
                    Capability
                  </th>
                  <th className="px-5 py-4 text-center text-[15px] font-bold text-accent">
                    PYNGYN
                  </th>
                  <th className="px-5 py-4 text-center text-[15px] font-bold text-ink">
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
                        ? "border-b border-line"
                        : ""
                    }
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="text-[15px] font-medium text-ink">
                        {r.label}
                      </div>
                      {r.detail && (
                        <div className="mt-1 text-[13px] leading-relaxed text-muted">
                          {r.detail}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center align-top">
                      <CellMark v={r.pyngyn} />
                    </td>
                    <td className="px-5 py-4 text-center align-top">
                      <CellMark v={r.competitor[content.slug] ?? false} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            {COMPARE_LEGEND} · {COMPARE_FOOTNOTE} Reflects PYNGYN&apos;s
            positioning and typical {content.name} capabilities; specific
            features may vary by plan. Last reviewed May 2026.
          </p>
          <p className="mt-3 text-[13px] text-muted">
            Want to see every tool at once?{" "}
            <Link href="/compare" className="text-accent hover:underline">
              View the full competitive landscape →
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
                  <h3 className="font-display text-[22px] font-semibold tracking-[-0.01em]">
                    {d.title}
                  </h3>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-accent/30 bg-accent-lt/40 p-5">
                    <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                      PYNGYN
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                      {d.pyngyn}
                    </p>
                  </div>
                  <div className="rounded-xl border border-line bg-[#fbfbfd] p-5">
                    <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted" />
                      {content.name}
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                      {d.them}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When competitor is the better choice + Pricing */}
        <section className="wrap pb-[60px]">
          <div className="grid gap-[18px] md:grid-cols-2">
            <div className="card">
              <span className="eyebrow">When {content.name} is the right call</span>
              <p className="mt-3 text-[14px] text-muted">
                We&apos;re not trying to be everything for everyone. {content.name}{" "}
                is a great fit for:
              </p>
              <ul className="mt-4 space-y-3">
                {content.bestFor.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-ink" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <span className="eyebrow">Pricing at a glance</span>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">
                {content.pricingNote}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/pricing" className="btn btn-ghost">
                  See PYNGYN pricing
                </Link>
                <a href={DEMO_URL} className="btn btn-primary">
                  Talk to sales →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Switcher quote (optional) */}
        {content.switcherQuote && (
          <section className="wrap pb-[60px]">
            <div className="card relative overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent-lt opacity-70 blur-3xl"
              />
              <span className="eyebrow relative">From a team that switched</span>
              <blockquote className="relative mt-4 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
                &ldquo;{content.switcherQuote.quote}&rdquo;
              </blockquote>
              <p className="relative mt-4 text-[14px] text-muted">
               , {content.switcherQuote.attribution}
              </p>
            </div>
          </section>
        )}

        {/* Migration steps */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Migration plan</span>
          <h2 className="title mt-3">
            Switching from {content.name} to PYNGYN.
          </h2>
          <p className="lead mt-3">
            Most teams move in a few short steps. No big-bang cutover required.
          </p>
          <ol className="mt-8 grid gap-[18px] md:grid-cols-2">
            {content.migrationSteps.map((s, i) => (
              <li key={s.title} className="card">
                <div className="flex items-baseline gap-3">
                  <span className="index-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em]">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQs */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">FAQ</span>
          <h2 className="title mt-3">
            Common questions when comparing to {content.name}.
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {content.faqs.map((f, i) => (
              <details
                key={f.q}
                className={`group ${
                  i < content.faqs.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-[16px] font-semibold text-ink transition-colors hover:bg-[#fbfbfd]">
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="mt-1 inline-grid h-6 w-6 flex-none place-items-center rounded-full bg-accent-lt text-accent transition-transform group-open:rotate-45"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[15px] leading-relaxed text-muted">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Other comparisons */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Compare more tools</span>
          <h2 className="title mt-3">PYNGYN vs the other tools you know.</h2>
          <div className="mt-7 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {otherCompetitors.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="card flex items-center justify-between"
              >
                <span className="text-[16px] font-bold">
                  PYNGYN vs {c.name}
                </span>
                <span className="text-accent">→</span>
              </Link>
            ))}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
