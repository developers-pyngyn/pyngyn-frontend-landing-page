import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, SIGNUP_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Reporting | PYNGYN",
  description:
    "Portfolio health, engagement status, and financials, live, in one dashboard. Not a spreadsheet someone rebuilds every Friday afternoon.",
  alternates: { canonical: "/benefits/reporting" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Reporting | PYNGYN",
    description: "Real-time reporting, not a Friday-afternoon export.",
    url: "/benefits/reporting",
    type: "website",
  },
};

const DETAILS: { title: string; body: string }[] = [
  { title: "Portfolio view across every engagement", body: "See health, progress, and risk across every client and project at once, not one project at a time." },
  { title: "Always current, not a snapshot", body: "Reports reflect live status from the work itself, not a manually updated deck that's out of date by the time anyone opens it." },
  { title: "Financials alongside delivery", body: "Revenue, margin, and utilization sit next to project status, so you see whether an engagement is on track and whether it's profitable, in the same view." },
  { title: "Export when you need to", body: "Share a report outside PYNGYN when a partner meeting or a client update calls for it, without losing the live version inside the product." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is reporting real-time?", a: "Yes. Reports reflect current status pulled from the work itself, not a manually maintained spreadsheet that goes stale between updates." },
  { q: "Can I see financials and delivery status together?", a: "Yes. Revenue, margin, and utilization sit alongside project and engagement status, so you can see whether work is on track and profitable in one view." },
  { q: "Is reporting part of Workspace or Client Space?", a: "Reporting is part of Workspace, your firm's internal operating layer. Clients see a simpler, relevant status view inside their own Client Space, not your internal reports." },
  { q: "Can I export reports?", a: "Yes, for sharing outside the product when a meeting calls for it. The live version inside PYNGYN stays current regardless." },
];

export default function ReportingPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/benefits/reporting",
            name: "Reporting | PYNGYN",
            description: "Portfolio health, engagement status, and financials, live, in one dashboard.",
            breadcrumbId: "/benefits/reporting#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Benefits", url: "/benefits" },
              { name: "Reporting", url: "/benefits/reporting" },
            ],
            "/benefits/reporting"
          ),
          faqPageSchema(FAQS, "/benefits/reporting"),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[56px] pt-[140px]">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <Link href="/benefits" className="hover:text-accent">Benefits</Link>
            <span className="mx-1 text-muted/50">/</span>
            Reporting
          </span>
          <h1 className="mt-4 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Real-time reporting.
            <br className="hidden sm:block" />
            <span className="text-accent">Not a Friday-afternoon export.</span>
          </h1>
          <p className="lead mt-5 max-w-[640px]">
            Portfolio health, engagement status, and financials, all live, in one
            dashboard, so you stop finding out how a quarter went after it's already over.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_URL} className="btn btn-accent">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-primary">Start free trial</a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Part of <Link href="/workspace" className="font-semibold text-accent">Workspace</Link>,
            from $9 per seat/month
          </p>
        </section>

        {/* ===== Details ==================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-3 max-w-[680px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
              One dashboard, every engagement.
            </h2>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2">
              {DETAILS.map((d) => (
                <div key={d.title} className="card h-full">
                  <h3 className="text-[16px] font-bold leading-snug">{d.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ========================================================= */}
        <section className="section">
          <div className="wrap max-w-[760px]">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">
              Common questions
            </h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {FAQS.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="text-[15.5px] font-bold">{f.q}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA
          headline="See portfolio health without building a deck for it."
          body="See live reporting running on a real engagement of yours in 30 minutes."
          note="30-minute walkthrough · Tailored to your team · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
