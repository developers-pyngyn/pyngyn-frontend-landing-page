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
  title: "Competitive Landscape | PYNGYN",
  description:
    "No one has built this for PS. The PYNGYN competitive landscape vs Notion, Sana Labs, Guru, Atlas, and ClickUp, capability matrix, key differences, migration plans, and FAQs.",
  alternates: { canonical: "/compare" },
};

function CellMark({ v }: { v: Cell }) {
  const base = "grid h-6 w-6 flex-none place-items-center rounded-full";
  if (v === true) {
    return (
      <span
        className={`${base} bg-accent-lt text-accent`}
        aria-label="Native"
        title="Native"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
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
  }
  if (v === "partial") {
    return (
      <span
        className={`${base} border border-line text-[#c8862a]`}
        aria-label="Partial"
        title="Partial"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span
      className={`${base} bg-[#f3f4f7] text-muted`}
      aria-label="Not available"
      title="Not available"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
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

export default function CompareIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/compare",
            name: "Competitive Landscape | PYNGYN",
            description:
              "PYNGYN vs Notion, Sana Labs, Guru, Atlas, and ClickUp, the PS-native, SMB, operationally deep platform.",
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
            name: "PYNGYN comparison pages",
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
          <span className="eyebrow">Competitive Landscape</span>
          <h1 className="mt-3 max-w-[940px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            No one has built this for PS.{" "}
            <span className="text-accent">That&apos;s the opportunity.</span>
          </h1>
          <p className="lead mt-5 max-w-[820px]">
            Professional-services and consulting firms stitch together a wiki,
            a tracker, an LMS, a chat bot, and an AI assistant, and still
            don&apos;t have an operating system for the firm. PYNGYN is
            PS-native, SMB, and operationally deep.
          </p>
        </section>

        {/* Competitive landscape matrix */}
        <section className="wrap pb-[40px]">
          {/* Desktop / tablet: full capability table. Hidden on phones so a
              760px-wide grid doesn't spill off-screen. */}
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-white shadow-card md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-[#0c2a2a] text-white">
                    <th className="px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.06em]">
                      Capability
                    </th>
                    <th className="bg-accent px-5 py-4 text-center text-[15px] font-bold text-white">
                      PYNGYN
                    </th>
                    {COMPETITORS.map((c) => (
                      <th
                        key={c.slug}
                        className="px-5 py-4 text-center text-[14px] font-semibold text-white/90"
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
                          ? "border-b border-line"
                          : ""
                      }
                    >
                      <td className="px-5 py-4 align-top">
                        <div className="text-[14.5px] font-medium text-ink">
                          {r.label}
                        </div>
                        {r.detail && (
                          <div className="mt-1 text-[12.5px] leading-relaxed text-muted">
                            {r.detail}
                          </div>
                        )}
                      </td>
                      <td className="bg-accent-lt/40 px-5 py-4 text-center align-middle">
                        <CellMark v={r.pyngyn} />
                      </td>
                      {COMPETITORS.map((c) => (
                        <td
                          key={c.slug}
                          className="px-5 py-4 text-center align-middle"
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

          {/* Mobile: one card per capability, each tool listed as a row.
              Renders the same data without forcing horizontal scroll. */}
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
                      PYNGYN
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
            {COMPARE_LEGEND} · {COMPARE_FOOTNOTE} Last reviewed May 2026.
          </p>
        </section>

        {/* Per-competitor deep-dive entry points */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Deep dives</span>
          <h2 className="title mt-3">
            See PYNGYN against each tool in your stack.
          </h2>
          <p className="lead mt-3 max-w-[760px]">
            Every comparison covers the same eight capabilities, the
            differences that matter, a migration plan, and FAQs.
          </p>
          <div className="mt-7 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {COMPETITORS.map((c) => {
              const content = COMPARE_CONTENT[c.slug];
              return (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="card group flex h-full flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-bold">
                      PYNGYN vs {c.name}
                    </span>
                    <span className="text-accent transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                  {content && (
                    <>
                      <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-muted">
                        {content.tagline}
                      </p>
                      <p className="mt-4 text-[14px] leading-relaxed text-muted">
                        {content.verdict.pickPyngyn}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2 text-[12px] text-muted">
                        <span className="rounded-full border border-line px-2.5 py-1">
                          Capability matrix
                        </span>
                        <span className="rounded-full border border-line px-2.5 py-1">
                          Migration plan
                        </span>
                        <span className="rounded-full border border-line px-2.5 py-1">
                          FAQs
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
            <span className="eyebrow">How we compare</span>
            <h2 className="title mt-3 text-[clamp(26px,3vw,36px)]">
              PS-native. SMB. Operationally deep.
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="font-display text-[18px] font-semibold">
                  Built for professional services
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  Engagements, utilization, SOWs, deliverables, and
                  methodologies are first-class, not adapted from a generic
                  doc or task tool.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] font-semibold">
                  Knowledge that drives action
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  SOPs execute inside the workflow with checklists, gates, and
                  AI assists. The playbook isn&apos;t a doc, it&apos;s how the
                  firm runs.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] font-semibold">
                  Honest about the fit
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  Every comparison page calls out where the other tool is the
                  better choice. PYNGYN isn&apos;t for every team.
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
