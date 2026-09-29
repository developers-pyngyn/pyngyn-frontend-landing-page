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
  title: "PYNGYN for Accountants & CA Firms | Audit & Tax Workflows",
  description:
    "The practice operating system for accounting firms, Chartered Accountants, and tax practitioners. Run audit pipelines, statutory filing calendars, PBC checklists, and 4-eye partner review gates.",
  alternates: { canonical: "/solutions/accountants" },
  openGraph: {
    images: [OG_IMAGE],
    title: "PYNGYN for Accountants & CA Firms | Audit & Tax Workflows",
    description:
      "Purpose-built practice management for accounting firms and CAs. Stop chasing documents, balance partner & article workload, and secure client sign-offs.",
    url: "/solutions/accountants",
    type: "website",
  },
};

const PROBLEMS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Statutory deadline chaos in peak season",
    body: "Statutory due dates for dozens of client entities live across spreadsheets and personal calendars. One missed GST or advance tax date triggers penalties and client friction.",
  },
  {
    num: "02",
    title: "Partner status-chasing during review cycles",
    body: "Partners and managers spend days chasing article assistants for working paper status. Without real-time visibility, the review meeting is the only source of truth.",
  },
  {
    num: "03",
    title: "Client records scattered across channels",
    body: "Client-provided financial records arrive haphazardly via email, WhatsApp, and Google Drive links. Reconciling what is missing wastes billable hours.",
  },
  {
    num: "04",
    title: "Knowledge locked in individual staff",
    body: "Audit programmes and client nuances live only in the manager's memory. When seniors leave, onboarding successors sets the engagement back weeks.",
  },
  {
    num: "05",
    title: "4-eye review quality bottlenecks",
    body: "Filing drafts pass back and forth via unversioned attachments. Partner sign-offs get delayed, risking last-minute filing rushes.",
  },
  {
    num: "06",
    title: "Unbalanced team and article capacity",
    body: "Some team members drown in compliance volume while others are under-utilized. Partner visibility into weekly capacity is virtually non-existent.",
  },
];

const PRACTICE_FEATURES = [
  {
    icon: Calendar,
    title: "Statutory Due Date Calendar",
    body: "Automated compliance calendar tracking GST (GSTR-1, 3B), Advance Tax, TDS, Form 3CD, and ROC filings across every client entity.",
  },
  {
    icon: Users,
    title: "Practice Workload Cockpit",
    body: "Real-time visibility into staff, article trainee, and manager workload. Balance engagement capacity before filing deadlines slip.",
  },
  {
    icon: CheckSquare,
    title: "4-Eye Partner Review Gates",
    body: "Rigorous quality assurance gates. Working papers flow from preparer to manager to signing partner before client presentation.",
  },
  {
    icon: Zap,
    title: "Automated WhatsApp Document Chasers",
    body: "Gentle, automated follow-ups chase missing bank statements, trial balances, and PBC documents on your firm's schedule.",
  },
  {
    icon: ShieldCheck,
    title: "DSC & Key Expiry Register",
    body: "Centralized register tracking client Digital Signature Certificates (DSC) and statutory portal credentials with automated expiry notices.",
  },
  {
    icon: FileCheck,
    title: "Branded Client Collaboration Portal",
    body: "Provide clients with an isolated, white-labeled portal to view compliance status, upload PBC records, and authorize approvals.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does PYNGYN track statutory deadlines across GST, Income Tax, and ROC?",
    a: "Yes. Statutory due dates are first-class items in Pyngyn ClientSpace. The system tracks recurring compliance deadlines, auto-assigns preparation tasks, and alerts partners when dependencies are at risk.",
  },
  {
    q: "How does the client portal work for accounting clients?",
    a: "Every client gets an isolated, white-labeled portal accessible via passwordless magic links. Clients see their pending PBC document checklists, active filing status, and can approve returns and accounts with a single click.",
  },
  {
    q: "Can we manage article assistants and multi-tiered partner reviews?",
    a: "Absolutely. Pyngyn includes 4-eye partner review gates. Work moves through preparer (article assistant/junior), review (manager), and final sign-off (partner) before anything is submitted or shared with clients.",
  },
  {
    q: "How does Pyngyn handle busy tax season volume?",
    a: "Pyngyn is purpose-built for the high-volume crunch of Indian CA and global accounting practices. The Workload Cockpit rolls up hundreds of concurrent filings into a single unified capacity board.",
  },
  {
    q: "How quickly can our firm get onboarded?",
    a: "Most CA firms are up and running within 48 hours. You can import existing client master lists via CSV, apply standard statutory workflow templates, and invite your team immediately.",
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
            Built for CA &amp; Accounting Practices · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Run your accounting practice with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">statutory clarity &amp; zero missed deadlines.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            PYNGYN ClientSpace unites client portals, statutory due date tracking, automated PBC document chasers,
            and 4-eye partner review gates in one seamless practice operating system.
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
