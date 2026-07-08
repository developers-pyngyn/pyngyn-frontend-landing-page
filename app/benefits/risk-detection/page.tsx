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
  title: "Risk Detection | PYNGYN",
  description:
    "AI watches workload, dependencies, and deadlines across every engagement, and flags what threatens a date or margin, days before it becomes a problem.",
  alternates: { canonical: "/benefits/risk-detection" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Risk Detection | PYNGYN",
    description: "See the slip before it happens, not after.",
    url: "/benefits/risk-detection",
    type: "website",
  },
};

const DETAILS: { title: string; body: string }[] = [
  { title: "Watches dependencies, not just due dates", body: "A task doesn't exist in isolation. Risk detection looks at what a deadline depends on, an approval, a handoff, another task, and flags it when any of those slip." },
  { title: "Flags risk days earlier", body: "Instead of finding out a date is at risk the day before it's due, you see the warning while there's still time to act on it." },
  { title: "Surfaces in the dashboard your team already checks", body: "Risk flags show up where your team already looks, project boards, portfolio views, and status reports, not a separate tool nobody opens." },
  { title: "Tuned to how services firms actually slip", body: "Built around the patterns that cause professional-services engagements to run late: client sign-offs, resourcing conflicts, and scope creep, not generic project-management risk scoring." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does risk detection actually work?", a: "It watches task dependencies, workload, and deadlines across an engagement, and flags items where a slip is becoming likely, before the date is actually missed." },
  { q: "Is this a Workspace feature or a Client Space feature?", a: "Risk detection runs on Workspace, your firm's internal operating layer. It's built into every Workspace plan." },
  { q: "Will it flood my team with false alarms?", a: "Risk flags are based on real dependency and workload signals, not just \"this date is close.\" The goal is a small number of flags worth acting on, not a noisy list." },
  { q: "Can clients see risk flags in their portal?", a: "You control what's client-visible. Many firms keep raw risk flags internal and instead share the resulting status update in the client's Client Space." },
];

export default function RiskDetectionPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/benefits/risk-detection",
            name: "Risk Detection | PYNGYN",
            description: "AI watches workload, dependencies, and deadlines, and flags what threatens a date or margin, days earlier.",
            breadcrumbId: "/benefits/risk-detection#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Benefits", url: "/benefits" },
              { name: "Risk detection", url: "/benefits/risk-detection" },
            ],
            "/benefits/risk-detection"
          ),
          faqPageSchema(FAQS, "/benefits/risk-detection"),
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
            Risk detection
          </span>
          <h1 className="mt-4 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            See the slip before it happens.
            <br className="hidden sm:block" />
            <span className="text-accent">Not after.</span>
          </h1>
          <p className="lead mt-5 max-w-[640px]">
            AI watches workload, dependencies, and deadlines across every engagement, and
            flags what threatens a date or margin, days earlier than a status meeting would
            have caught it.
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
              Built to catch how services firms actually slip.
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
          headline="Catch the slip while there's still time to fix it."
          body="See risk detection running on a real engagement of yours in 30 minutes."
          note="30-minute walkthrough · Tailored to your team · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
