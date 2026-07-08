import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, SOCIAL_LINKEDIN, EMAIL_DOMAIN } from "@/components/config";

const INVESTOR_EMAIL = `investors@${EMAIL_DOMAIN}`;

export const metadata: Metadata = {
  title: "Investors | PYNGYN",
  description:
    "PYNGYN is building the AI operating system for professional-services firms. Learn about the opportunity and request investor materials.",
  alternates: { canonical: "/investors" },
};

// Qualitative highlights only — no confidential figures. Detailed financials,
// cap table, and forward plan are shared privately with qualified investors.
const HIGHLIGHTS: { label: string; value: string; note: string }[] = [
  { label: "Category", value: "Professional services OS", note: "An operating system for how services firms deliver work" },
  { label: "Market", value: "Professional services", note: "A large, underserved segment still run on generic tools" },
  { label: "Stage", value: "Scaling", note: "500+ professional-services firms live on the platform" },
  { label: "Approach", value: "Vertical-first", note: "Built deep for one vertical, then expand" },
];

const WHY: { title: string; body: string }[] = [
  {
    title: "A real, expensive problem",
    body: "Past ~20 people, services firms lose time, margin, and knowledge to fragmented tools and manual coordination. The cost is hidden in unbilled hours and slipped deadlines, not a line item, which is exactly why it goes unsolved.",
  },
  {
    title: "AI-native, not AI-added",
    body: "PYNGYN turns a goal into a living plan, keeps status current automatically, and flags risk early. The AI is grounded in how a firm actually delivers engagements, not bolted onto a generic tracker.",
  },
  {
    title: "A wedge that compounds",
    body: "Winning one vertical deeply creates referral density inside a tight professional community, and an operating layer that's hard to rip out once a firm runs on it.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="wrap pb-[10px] pt-[150px]">
          <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Investors</span>
          <h1 className="mt-3 max-w-[820px] font-display text-[clamp(34px,5vw,56px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            The operating system for professional-services firms.
          </h1>
          <p className="lead mt-5 max-w-[640px]">
            PYNGYN unifies knowledge, tasks, and SOPs with AI that understands how a
            firm actually delivers work. We&apos;re building toward the default way
            growing services teams run, and we partner with a small number of
            aligned investors who get the space.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${INVESTOR_EMAIL}`} className="btn btn-primary">Request investor materials →</a>
            <a href={DEMO_URL} className="btn btn-ghost">See the product</a>
          </div>
        </section>

        {/* Qualitative highlights */}
        <section className="wrap pt-[48px]">
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{h.label}</div>
                <div className="mt-3 font-display text-[24px] font-semibold tracking-[-0.02em]">{h.value}</div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{h.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why now / thesis */}
        <section className="wrap pt-[64px]">
          <h2 className="title max-w-[560px]">Why we think this wins.</h2>
          <div className="mt-8 grid gap-[18px] md:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.015em]">{w.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Private materials callout, replaces the public financials */}
        <section className="wrap pt-[64px] pb-[20px]">
          <div className="hero-dark relative overflow-hidden rounded-[28px] p-9 sm:p-12">
            <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative max-w-[640px]">
              <span className="eyebrow-dark"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />Shared privately</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3.2vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-white">
                The detailed numbers are for qualified investors.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/65">
                Our financial model, cap table, traction metrics, and forward plan are
                confidential. We share them directly with qualified investors under a
                mutual conversation, not on a public page. Reach out and we&apos;ll set up time.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${INVESTOR_EMAIL}`} className="btn btn-accent">Email {INVESTOR_EMAIL}</a>
                <a href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-ghost border-white/20 bg-white/5 text-white hover:bg-white/10">
                  Connect on LinkedIn
                </a>
              </div>
              <p className="mt-5 text-[13px] text-white/45">
                Please don&apos;t share confidential materials onward without permission.
              </p>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
