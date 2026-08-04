import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { ToolConversionBridge } from "@/components/ToolConversionBridge";
import { PLAN_GEN_URL, ROI_URL, STATUS_REPORT_URL, UTILIZATION_URL, COST_ESTIMATOR_URL, ANY_UPDATE_URL } from "@/components/config";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
  itemListSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Free Tools for Professional-Services Firms | PYNGYN",
  description:
    "Free, no-signup tools for professional-services firms. Start with the \"Any Update?\" Cost Calculator: see what answering client status requests costs your firm every year.",
  alternates: { canonical: "/tools" },
};

type Tool = {
  title: string;
  blurb: string;
  href?: string;
  tag: string;
  color: string;
  icon: string; // svg path, viewBox 0 0 24 24
  available: boolean;
};

const C = {
  pink: "#ec4899",
  indigo: "#4f46e5",
  blue: "#2563eb",
  green: "#0b7a4b",
  orange: "#f97316",
  teal: "#0d9488",
};

const TOOLS: Tool[] = [
  {
    title: "\"Any Update?\" Cost Calculator",
    blurb:
      "Put a number on the hours spent answering client status emails and calls, then see what a branded client portal could win back. Priced like Clientspace, per client.",
    href: ANY_UPDATE_URL,
    tag: "Client experience",
    color: C.teal,
    icon: "M4 4h16v12H8l-4 4z M8 9h8M8 12h5",
    available: true,
  },
  {
    title: "Engagement Plan Generator",
    blurb:
      "Describe a client engagement in plain English and get phases, tasks, owners, milestones, a suggested team, risks, and meeting cadence. Export to Markdown or CSV.",
    href: PLAN_GEN_URL,
    tag: "Planning",
    color: C.pink,
    icon: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
    available: true,
  },
  {
    title: "Cost of Chaos ROI Calculator",
    blurb:
      "Put a number on the billable hours lost to status-chasing and tool-switching, then see how much you could win back. Adjust every input, in INR or USD.",
    href: ROI_URL,
    tag: "ROI",
    color: C.indigo,
    icon: "M12 3v18M3 12h18M6 6l12 12M18 6L6 18",
    available: true,
  },
  {
    title: "Status Report Generator",
    blurb:
      "Paste your rough weekly notes. Get a clean, client-ready status update, status colour, TL;DR, completed, blockers, asks, and next week. Export to Markdown, email, or Slack.",
    href: STATUS_REPORT_URL,
    tag: "Status",
    color: C.blue,
    icon: "M7 3h7l4 4v14H7zM14 3v4h4M9 12h6M9 16h4",
    available: true,
  },
  {
    title: "Project Cost & Margin Estimator",
    blurb:
      "Estimate effort, blended rate, and gross margin for a fixed-fee engagement before you send the proposal. See your breakeven fee and how scope creep erodes margin.",
    href: COST_ESTIMATOR_URL,
    tag: "Pricing",
    color: C.green,
    icon: "M3 3h7l11 11-7 7L3 10z M7 7h.01",
    available: true,
  },
  {
    title: "Team Utilization Calculator",
    blurb:
      "Work out billable utilization across your bench, see what your current rate is worth, and find the revenue upside of hitting target. In INR or USD.",
    href: UTILIZATION_URL,
    tag: "Operations",
    color: C.orange,
    icon: "M5 20V10M10 20V4M15 20v-8M20 20V7",
    available: true,
  },
];

export default function ToolsHubPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/tools",
            name: "Free Tools for Professional-Services Firms | PYNGYN",
            description:
              "Free, no-signup tools for professional-services firms.",
            breadcrumbId: "/tools#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
            ],
            "/tools"
          ),
          itemListSchema({
            url: "/tools",
            name: "PYNGYN free tools",
            items: TOOLS.filter((t) => t.available).map((t) => ({
              name: t.title,
              description: t.blurb,
              url: t.href || "/tools",
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[10px] pt-[150px] text-center">
          <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Free tools</span>
          <h1 className="mx-auto mt-3 max-w-[760px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Tools for the way services teams actually work.
          </h1>
          <p className="lead mx-auto mt-5">
            Free, no signup. Practical utilities for scoping, reporting, and running client work.
            Built by the team behind PYNGYN.
          </p>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="grid gap-[18px] sm:grid-cols-2">
              {TOOLS.map((t) => {
                const inner = (
                  <>
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-2xl"
                        style={{ backgroundColor: `${t.color}1a`, color: t.color }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d={t.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          t.available ? "bg-accent-lt text-accent" : "bg-line text-muted"
                        }`}
                      >
                        {t.available ? t.tag : "Soon"}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-[21px] font-semibold tracking-[-0.02em]">
                      {t.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{t.blurb}</p>
                    {t.available ? (
                      <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-accent">
                        Open tool →
                      </span>
                    ) : (
                      <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-muted">
                        In the works
                      </span>
                    )}
                  </>
                );

                return t.available && t.href ? (
                  <Link
                    key={t.title}
                    href={t.href}
                    className="flex h-full flex-col rounded-[20px] border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={t.title}
                    className="flex h-full flex-col rounded-[20px] border border-line bg-white/70 p-6 shadow-card"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ToolConversionBridge
          eyebrow="One-off tools vs. the real thing"
          title="These tools are one calculation. Workspace and Clientspace run this permanently."
          body="Every tool above answers one question, once. Workspace tracks the plan, the margin, the utilization, and the status live, every week, without you opening a calculator. Clientspace shows your clients the result in their own branded portal, standalone or bundled with Workspace."
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
