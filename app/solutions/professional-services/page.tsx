import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  BarChart3,
  Calendar,
  Clock,
  Zap,
  Users,
  Lock,
  CheckCircle2,
  FileCheck,
  Building2,
  Target,
  Briefcase,
  UserCheck,
  FileSpreadsheet,
  Search,
  Shield,
  ArrowRight,
  type LucideIcon,
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
  title: "Practice Management Solutions for Accounting & CA Firms | Pyngyn ClientSpace",
  description:
    "Explore Pyngyn ClientSpace practice management solutions for Chartered Accountants, corporate tax teams, statutory audit firms, and secretarial compliance practices.",
  alternates: { canonical: "/solutions/professional-services" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Practice Management Solutions for Accounting & CA Firms | Pyngyn ClientSpace",
    description:
      "Purpose-built practice management for CA, accounting, tax, and audit teams. Eliminate missed deadlines, automate PBC document collection, and maintain 4-eye partner review gates.",
    url: "/solutions/professional-services",
    type: "website",
  },
};

const PRACTICE_AREAS: { label: string; href: string; icon: LucideIcon; blurb: string }[] = [
  { label: "For CA Firms", href: "/solutions/accountants", icon: Scale, blurb: "Statutory deadlines, 4-eye review gates, and audit pipelines for CA partnerships." },
  { label: "For Accounting Firms", href: "/solutions/accountants", icon: BarChart3, blurb: "Monthly retainers, client bookkeeping, and year-end close collaboration." },
  { label: "For Tax Teams", href: "/solutions/tax-teams", icon: FileSpreadsheet, blurb: "Corporate tax filings, advance tax estimations, GST reconciliations & notice tracking." },
  { label: "For Audit Teams", href: "/solutions/audit-teams", icon: Search, blurb: "Statutory audits, Form 3CD, CARO working papers, and partner review gates." },
  { label: "For Compliance Teams", href: "/solutions/compliance-teams", icon: Shield, blurb: "ROC/MCA schedules, secretarial compliance, and director DSC registers." },
];

const PROBLEMS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Statutory status lives across WhatsApp & email", body: "Updates scatter across messaging apps and personal spreadsheets. Nobody has the full picture before a client review, risking missed statutory deadlines." },
  { num: "02", title: "Unbilled partner hours spent chasing records", body: "Partners and managers spend days chasing clients for missing bank statements, trial balances, and PBC documents instead of doing billable advisory work." },
  { num: "03", title: "Practice knowledge locked in people", body: "Audit programmes and client nuances live only in a manager's head. When they leave, onboarding successors sets the engagement back weeks." },
  { num: "04", title: "Clients lack real-time filing visibility", body: "Clients constantly email asking for status updates. Your team wastes hours giving manual status reports that could be automated via a client portal." },
  { num: "05", title: "Review bottlenecks at deadline time", body: "Unversioned working paper drafts circulate via email attachments. Partner sign-offs get delayed, creating last-minute scrambles." },
  { num: "06", title: "Unbalanced team and article capacity", body: "Some staff drown in compliance volume while others are under-utilized. Partner visibility into weekly team bandwidth is non-existent." },
];

const CLIENTSPACE_FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Building2, title: "White-labeled client portal", body: "Branded with your firm's domain, logo, and colors. Clients log in to an experience that looks and feels like yours." },
  { icon: Lock, title: "100% Client data isolation", body: "Each client sees only their own engagements, filing status, and document checklists. Zero risk of data cross-contamination." },
  { icon: CheckCircle2, title: "Automated PBC document checklists", body: "Set required file types and due dates. Automated WhatsApp and email chasers follow up with clients on your schedule." },
  { icon: FileCheck, title: "4-Eye partner review gates", body: "Working papers move from preparer to reviewer to partner sign-off before presentations reach client portals." },
  { icon: Calendar, title: "Statutory compliance master calendar", body: "Pre-configured recurring schedules for GST, TDS, advance tax, corporate filings, and statutory audits." },
  { icon: Zap, title: "Tally & accounting integrations", body: "Connect Tally Prime, Computax, QuickBooks, and Zoho Books with frictionless two-way sync." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Who is PYNGYN ClientSpace built for?", a: "PYNGYN ClientSpace is designed specifically for Chartered Accountants, corporate tax practitioners, statutory audit firms, and accounting practices. Every feature is configured around how modern practices deliver client work." },
  { q: "How does pricing work?", a: "ClientSpace Pro starts at ₹499/user/month (or $29/user/month globally) for essential statutory task tracking and white-labeled client portals. ClientSpace Business is ₹799/user/month ($49 globally) and adds the Workload Cockpit, 4-eye review gates, and WhatsApp chasers." },
  { q: "How is PYNGYN different from generic PM tools like Asana or ClickUp?", a: "Generic tools have no concept of statutory tax deadlines, DSC registers, client PBC checklists, or 4-eye partner review gates. PYNGYN is purpose-built for accounting and CA practice workflows." },
  { q: "How long does setup take?", a: "Most firms are up and running within 48 hours. Import your client lists via CSV, apply standard statutory workflow templates, and invite your team immediately." },
];

export default function ProfessionalServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/professional-services",
            name: "Practice Management Solutions for Accounting & CA Firms | Pyngyn ClientSpace",
            description:
              "Purpose-built practice management solutions for Chartered Accountants, tax teams, and audit practices.",
            breadcrumbId: "/solutions/professional-services#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/accountants" },
              { name: "Practice Solutions", url: "/solutions/professional-services" },
            ],
            "/solutions/professional-services"
          ),
          faqPageSchema(FAQS, "/solutions/professional-services"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Practice Operating System · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[940px] font-display text-[clamp(34px,5.4vw,62px)] font-semibold leading-[1.03] tracking-[-0.027em]">
            The practice operating system for
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">accounting, tax, and audit practices.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[720px]">
            Pyngyn ClientSpace unifies client portals, statutory compliance calendars, automated PBC document chasers,
            and 4-eye partner review gates across all your practice areas.
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
            Pro starts at ₹499/mo ($29/mo) · Built for Indian CA &amp; global accounting practices · 7-day free trial
          </p>
        </section>

        {/* ===== Practice Areas Grid =================================== */}
        <section className="wrap pb-16">
          <div className="text-center mb-10">
            <span className="eyebrow">Practice Specializations</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3.2vw,36px)] font-semibold tracking-[-0.02em]">
              Tailored solutions for every practice vertical.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREAS.map((v) => {
              const Icon = v.icon;
              return (
                <Link
                  key={v.label}
                  href={v.href}
                  className="card flex flex-col p-6 transition-all duration-200 hover:shadow-card-hover hover:border-accent/40 group"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-[17px] font-bold text-ink group-hover:text-accent transition-colors flex items-center justify-between">
                    <span>{v.label}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{v.blurb}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===== Problems ============================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">The Practice Reality</span>
              <h2 className="mt-3 max-w-[760px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Why accounting firms lose margin to administrative chaos.
              </h2>
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
              <span className="eyebrow">ClientSpace Platform</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Everything your practice needs to deliver client work smoothly.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CLIENTSPACE_FEATURES.map((f) => {
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

        {/* ===== FAQs ================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap max-w-[840px]">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.02em]">
                Practice management questions, answered.
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
          eyebrow="Modernize Your Accounting Firm"
          headline="Take command of statutory deadlines, client delivery, and partner review gates."
          body="Book a 30-minute practice walkthrough. See how Pyngyn configures your statutory calendars and client portals in minutes."
          primaryLabel="Book a practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to CA & accounting practices · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
