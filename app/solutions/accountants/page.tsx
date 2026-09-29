import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  Calendar,
  CheckSquare,
  ShieldCheck,
  Zap,
  Users,
  FileCheck,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, SIGNUP_URL, PRICING_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Practice Management Software for Chartered Accountants & CA Firms | Pyngyn ClientSpace",
  description:
    "The practice operating system for Chartered Accountants and multi-partner CA firms. Manage article staff workload, partner review gates, client entity hierarchies, and retainer profitability.",
  alternates: { canonical: "/solutions/accountants" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Practice Management Software for Chartered Accountants & CA Firms | Pyngyn ClientSpace",
    description:
      "Purpose-built practice management for Chartered Accountants. Balance partner & article workloads, enforce quality control gates, and track retainer realization.",
    url: "/solutions/accountants",
    type: "website",
  },
};

const PROBLEMS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Partner review bottlenecks during peak signing weeks",
    body: "Senior partners spend 60% of their day reviewing fragmented article draft calculations and unversioned spreadsheets instead of strategic advisory and client acquisition.",
  },
  {
    num: "02",
    title: "Article trainee turnover & lost engagement context",
    body: "When article assistants complete their tenure, unstandardized working papers leave new joiners in the dark, setting multi-year audit and advisory engagements back weeks.",
  },
  {
    num: "03",
    title: "Unbilled partner effort on fixed-fee advisory retainers",
    body: "Fixed monthly retainers get consumed by relentless out-of-scope client requests because practice teams lack live meters comparing logged effort against fee caps.",
  },
  {
    num: "04",
    title: "Multi-state client entity records scattered across branches",
    body: "Client files, state GSTINs, director DIN profiles, and assessment orders remain isolated in branch drives and personal WhatsApp chats without centralized governance.",
  },
  {
    num: "05",
    title: "Peer-review compliance & documentation deficiency risks",
    body: "Lack of timestamped reviewer annotations and unalterable audit trails creates severe compliance vulnerabilities during ICAI peer reviews and quality audits.",
  },
  {
    num: "06",
    title: "Zero real-time visibility into branch and team capacity",
    body: "Partners have no live visibility into which article cohorts or managers are overloaded until critical statutory deadlines or client deliverables are already at risk.",
  },
];

const PRACTICE_FEATURES = [
  {
    icon: Users,
    title: "Multi-Partner Practice Governance",
    body: "Allocate client portfolios by partner-in-charge, maintain cross-partner oversight, and manage branch offices from a unified firm command center.",
  },
  {
    icon: Scale,
    title: "Article Trainee & Staff Workload Cockpit",
    body: "Track article trainee assignments, monitor budgeted effort hours, and rebalance practice capacity across teams before deadline crunch hits.",
  },
  {
    icon: CheckSquare,
    title: "ICAI SQC-1 Aligned Quality Review Gates",
    body: "Enforce strict maker-checker approval gates where workpapers flow from article assistant to audit manager to signing partner before release.",
  },
  {
    icon: ShieldCheck,
    title: "Client Entity Group Hierarchy (PAN / GSTIN / DIN)",
    body: "Map parent holding companies, Indian & overseas subsidiaries, LLPs, and individual director profiles with linked statutory portfolios.",
  },
  {
    icon: FileSpreadsheet,
    title: "Retainer Effort vs Fee Realization Meters",
    body: "Live visual meters comparing logged staff hours against agreed monthly retainer fees, preventing unbilled write-offs and quantifying scope changes.",
  },
  {
    icon: FileCheck,
    title: "Standardized CA Engagement Letters & Onboarding",
    body: "Pre-configured engagement letter templates, automated client KYC collection, and digital mandate acceptance for smooth client onboarding.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How does Pyngyn support multi-partner CA firms and branch offices?",
    a: "Pyngyn enables multi-partner governance with partner-level client partitioning, role-based access permissions, and firm-wide capacity dashboards across headquarters and regional branch offices.",
  },
  {
    q: "Can we track article assistants' billable effort and balance their workload?",
    a: "Yes. The Practice Workload Cockpit gives partners real-time visibility into article trainee allocations, task completion rates, and logged hours against engagement budgets.",
  },
  {
    q: "How does Pyngyn help CA firms maintain ICAI quality control standards?",
    a: "Pyngyn incorporates multi-tier review gates (preparer, manager, signing partner) with tamper-evident audit logs and version-controlled working papers aligned with SQC-1 guidelines.",
  },
  {
    q: "How does Pyngyn prevent unbilled write-offs on fixed retainers?",
    a: "Every engagement tracks logged staff hours against agreed retainer caps in real time. When out-of-scope work or excessive hours accumulate, partners receive immediate alerts.",
  },
  {
    q: "How quickly can a CA firm migrate existing client portfolios?",
    a: "Most CA firms migrate within 48 hours. You can import client master lists via CSV, auto-populate PAN and GSTIN structures, and deploy standard workflow templates immediately.",
  },
];

export default function AccountantsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/accountants",
            name: "PYNGYN for Accountants & CA Firms | Audit & Tax Workflows",
            description:
              "The practice operating system for accounting firms and Chartered Accountants. Automate statutory due dates, PBC document collection, and partner review gates.",
            breadcrumbId: "/solutions/accountants#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/accountants" },
              { name: "Accountants & CAs", url: "/solutions/accountants" },
            ],
            "/solutions/accountants"
          ),
          faqPageSchema(FAQS, "/solutions/accountants"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Chartered Accountants Practice Operating System · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Run your CA practice with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">partner-level governance &amp; fee realization.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            PYNGYN ClientSpace powers modern CA firms: multi-partner client portfolios, article trainee capacity
            allocation, ICAI SQC-1 quality review gates, and live retainer realization tracking.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href={DEMO_URL} className="btn btn-accent">
              Book a practice demo
            </a>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
            <Link href={PRICING_URL} className="btn btn-ghost">
              View practice pricing
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Pro starts at ₹499/mo ($29/mo) · Built for Indian CA &amp; global accounting practices · No credit card required
          </p>
        </section>

        {/* ===== Metric Highlights ===================================== */}
        <section className="wrap pb-12">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-white p-6 shadow-card sm:grid-cols-4 sm:p-8">
            <div className="text-center">
              <div className="font-display text-[clamp(26px,3.5vw,38px)] font-bold text-accent">0</div>
              <div className="mt-1 text-[13px] font-medium text-muted">Missed Statutory Deadlines</div>
            </div>
            <div className="text-center">
              <div className="font-display text-[clamp(26px,3.5vw,38px)] font-bold text-accent">65%</div>
              <div className="mt-1 text-[13px] font-medium text-muted">Faster PBC Document Turnaround</div>
            </div>
            <div className="text-center">
              <div className="font-display text-[clamp(26px,3.5vw,38px)] font-bold text-accent">4-Eye</div>
              <div className="mt-1 text-[13px] font-medium text-muted">Partner Review Gate Assurance</div>
            </div>
            <div className="text-center">
              <div className="font-display text-[clamp(26px,3.5vw,38px)] font-bold text-accent">100%</div>
              <div className="mt-1 text-[13px] font-medium text-muted">Client Data Isolation</div>
            </div>
          </div>
        </section>

        {/* ===== Problems ============================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">The Practice Reality</span>
              <h2 className="mt-3 max-w-[760px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                The challenges every growing CA and accounting firm faces.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Why partner hours get consumed by administrative chaos instead of high-value advisory work.
              </p>
            </div>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {PROBLEMS.map((p) => (
                <div key={p.num} className="card h-full">
                  <div className="index-num">{p.num}</div>
                  <h3 className="mt-3 text-[17px] font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Features Grid ========================================= */}
        <section className="section">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Practice Operating System</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Everything your practice needs from intake to final sign-off.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Configured specifically for the workflows of Chartered Accountants, tax practitioners, and audit teams.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRACTICE_FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="card flex flex-col p-7 transition-all duration-200 hover:shadow-card-hover">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold text-ink">{f.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Static Practice Pricing Summary ======================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap text-center">
            <span className="eyebrow">Practice Pricing</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,38px)] font-semibold tracking-[-0.02em] text-ink">
              Transparent, practice-friendly plans.
            </h2>
            <p className="lead mx-auto mt-3 max-w-[580px]">
              No per-client penalty fees. No hidden implementation charges. Scale your firm with confidence.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[960px] mx-auto text-left">
              {/* Pro Card */}
              <div className="rounded-2xl border border-line bg-white p-7 shadow-card flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-ink">ClientSpace Pro</h3>
                  <p className="text-xs text-muted mt-1">Essential statutory task tracking &amp; client portal.</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-[32px] font-bold text-ink">₹499</span>
                    <span className="text-xs text-muted">/ user / mo (or $29 global)</span>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-[13.5px] text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>Statutory due date tracker</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>White-labeled client portal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>PBC document request checklists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>DSC expiry register</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-line">
                  <a href={SIGNUP_URL} className="btn btn-ghost w-full justify-center">
                    Start 7-day free trial
                  </a>
                </div>
              </div>

              {/* Business Card */}
              <div className="rounded-2xl border-2 border-accent bg-accent/5 p-7 shadow-soft flex flex-col justify-between relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                  Most Popular for CAs
                </span>
                <div>
                  <h3 className="text-lg font-bold text-accent">ClientSpace Business</h3>
                  <p className="text-xs text-muted mt-1">Full practice operating system &amp; review workflows.</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-[32px] font-bold text-accent">₹799</span>
                    <span className="text-xs text-muted">/ user / mo (or $49 global)</span>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-[13.5px] text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="font-semibold">Everything in Pro, plus:</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>Practice Workload Cockpit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>4-eye partner review gates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>WhatsApp automated document chase</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>Tally &amp; accounting software sync</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-accent/20">
                  <a href={SIGNUP_URL} className="btn btn-accent w-full justify-center">
                    Start 7-day free trial
                  </a>
                </div>
              </div>

              {/* Enterprise Card */}
              <div className="rounded-2xl border border-line bg-white p-7 shadow-card flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                <div>
                  <h3 className="text-lg font-bold text-ink">Enterprise</h3>
                  <p className="text-xs text-muted mt-1">Multi-branch CA partnerships &amp; large firms.</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-[32px] font-bold text-ink">Custom</span>
                    <span className="text-xs text-muted">annual agreement</span>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-[13.5px] text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>Multi-branch practice partitions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>Dedicated practice data migration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>Enterprise SSO &amp; SAML</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>99.9% uptime SLA &amp; account partner</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-line">
                  <a href={DEMO_URL} className="btn btn-primary w-full justify-center">
                    Book a demo
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href={PRICING_URL} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                <span>View full currency breakdown &amp; regional pricing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQs ================================================== */}
        <section className="section">
          <div className="wrap max-w-[840px]">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.02em]">
                Frequently asked questions from CA &amp; accounting practices.
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="card p-6">
                  <h3 className="text-[16.5px] font-bold text-ink">{faq.q}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA
          eyebrow="Modernize Your Practice"
          headline="Take command of your accounting firm's filings and client delivery."
          body="Book a 30-minute practice walkthrough. See how Pyngyn configures your statutory calendars, review gates, and client portals in minutes."
          primaryLabel="Book a practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to CA & accounting practices · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
