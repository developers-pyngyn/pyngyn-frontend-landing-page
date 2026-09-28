import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { COMPETITORS } from "@/components/config";
import {
  CAPABILITY_ROWS,
  COMPARE_CONTENT,
  COMPARE_FOOTNOTE,
  COMPARE_LEGEND,
  type Cell,
} from "@/components/compare-data";
import {
  JsonLd,
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Client Management for CA & Accounting Firms | Compare | PYNGYN",
  description:
    "Factual, transparent comparison of PYNGYN ClientSpace against Karbon, TaxDome, Canopy, Zoho Practice, and Spreadsheets. Built specifically for CA firms, tax practitioners, and accounting practices.",
  alternates: { canonical: "/compare" },
};

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

export default function CompareIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/compare",
            name: "Client Management for CA & Accounting Firms | PYNGYN",
            description:
              "PYNGYN ClientSpace vs Karbon, TaxDome, Canopy, Zoho Practice, and Spreadsheets. Practice management, client portals, statutory compliance radars, and Tally sync for CA firms.",
            breadcrumbId: "/compare#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Compare", url: "/compare" },
            ],
            "/compare"
          ),
          itemListSchema({
            url: "/compare",
            name: "PYNGYN practice management comparisons",
            items: COMPETITORS.map((c) => ({
              name: `PYNGYN vs ${c.name}`,
              url: `/compare/${c.slug}`,
              description: COMPARE_CONTENT[c.slug]?.tagline,
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="wrap pb-[40px] pt-[150px]">
          <span className="eyebrow">Client Management for CA & Accounting Firms</span>
          <h1 className="mt-3 max-w-[940px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Practice management built for CA firms.{" "}
            <span className="text-accent">Transparently compared.</span>
          </h1>
          <p className="lead mt-5 max-w-[820px]">
            CA firms and tax practices typically stitch together spreadsheets, generic task tools,
            personal WhatsApp chats, and disconnected desktop software. Compare PYNGYN ClientSpace
            against global accounting platforms, localized tools, and traditional spreadsheets across
            14 core practice capabilities.
          </p>
        </section>

        {/* Competitive landscape matrix */}
        <section className="wrap pb-[40px]">
          {/* Desktop / tablet: full capability table */}
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-white shadow-card md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-[#0c2a2a] text-white">
                    <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.06em] w-[28%]">
                      Practice Capability
                    </th>
                    <th className="bg-accent px-4 py-4 text-center text-[14px] font-bold text-white w-[14%]">
                      PYNGYN ClientSpace
                    </th>
                    {COMPETITORS.map((c) => (
                      <th
                        key={c.slug}
                        className="px-4 py-4 text-center text-[13px] font-semibold text-white/90"
                      >
                        {c.name}
                      </th>
                    ))}
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
                        <div className="text-[14px] font-semibold text-ink">
                          {r.label}
                        </div>
                        {r.detail && (
                          <div className="mt-1 text-[12px] leading-relaxed text-muted">
                            {r.detail}
                          </div>
                        )}
                      </td>
                      <td className="bg-accent-lt/40 px-4 py-4 text-center align-middle">
                        <CellMark v={r.pyngyn} />
                      </td>
                      {COMPETITORS.map((c) => (
                        <td
                          key={c.slug}
                          className="px-4 py-4 text-center align-middle"
                        >
                          <CellMark v={r.competitor[c.slug] ?? false} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile: one card per capability */}
          <div className="flex flex-col gap-3 md:hidden">
            {CAPABILITY_ROWS.map((r) => (
              <div
                key={r.label}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              >
                <div className="border-b border-line bg-[#0c2a2a] px-4 py-3 text-white">
                  <div className="text-[14px] font-semibold">{r.label}</div>
                  {r.detail && (
                    <div className="mt-1 text-[12px] leading-relaxed text-white/70">
                      {r.detail}
                    </div>
                  )}
                </div>
                <ul className="divide-y divide-line">
                  <li className="flex items-center justify-between gap-3 bg-accent-lt/40 px-4 py-3">
                    <span className="text-[13px] font-bold text-accent-dk">
                      PYNGYN ClientSpace
                    </span>
                    <CellMark v={r.pyngyn} />
                  </li>
                  {COMPETITORS.map((c) => (
                    <li
                      key={c.slug}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <span className="text-[13px] font-medium text-ink">
                        {c.name}
                      </span>
                      <CellMark v={r.competitor[c.slug] ?? false} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            {COMPARE_LEGEND} · {COMPARE_FOOTNOTE}
          </p>
        </section>

        {/* Per-competitor deep-dive entry points */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Practice Deep Dives</span>
          <h2 className="title mt-3">
            See PYNGYN against each tool in your firm&apos;s stack.
          </h2>
          <p className="lead mt-3 max-w-[760px]">
            Every comparison covers the 14 core accounting practice capabilities, key operational
            differences, migration roadmaps, and honest guidance on when each tool is the right fit.
          </p>
          <div className="mt-7 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {COMPETITORS.map((c) => {
              const content = COMPARE_CONTENT[c.slug];
              return (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="card group flex h-full flex-col hover:border-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-bold text-ink">
                      PYNGYN vs {c.name}
                    </span>
                    <span className="text-accent transition-transform group-hover:translate-x-0.5 font-bold">
                      →
                    </span>
                  </div>
                  {content && (
                    <>
                      <p className="mt-2 text-[12px] uppercase tracking-[0.08em] text-muted font-medium">
                        {content.tagline}
                      </p>
                      <p className="mt-4 text-[13.5px] leading-relaxed text-muted flex-1">
                        {content.verdict.pickPyngyn}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-muted">
                        <span className="rounded-full border border-line px-2.5 py-1 bg-slate-50">
                          14 Capabilities
                        </span>
                        <span className="rounded-full border border-line px-2.5 py-1 bg-slate-50">
                          Migration Steps
                        </span>
                        <span className="rounded-full border border-line px-2.5 py-1 bg-slate-50">
                          Practice FAQs
                        </span>
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* How we compare */}
        <section className="wrap pb-[60px]">
          <div className="card">
            <span className="eyebrow">Practice Philosophy</span>
            <h2 className="title mt-3 text-[clamp(26px,3vw,36px)]">
              Client Management for CA &amp; Accounting Firms.
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="font-display text-[17px] font-semibold text-ink">
                  Built for CA firm realities
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Statutory calendars (GSTR-1, GSTR-3B, Advance Tax, Form 3CD), Tally Prime sync,
                  and 4-eye partner review gates reflect how audit and tax practices operate every day.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[17px] font-semibold text-ink">
                  Zero client friction
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Clients receive branded portals with passwordless magic links and automated
                  WhatsApp document reminders. Unlimited client accounts at zero additional cost.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[17px] font-semibold text-ink">
                  Honest, transparent fit
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Every comparison page highlights where the alternative platform excels. We believe
                  in helping firms choose the right operating system for their specific client base.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
