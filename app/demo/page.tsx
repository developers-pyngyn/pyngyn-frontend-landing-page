import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { DemoConversionBar, DemoStory, DemoTestimonials } from "@/components/DemoStory";
import { SIGNUP_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  webPageSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Book a demo | PYNGYN",
  description:
    "Book a free 30-minute live walkthrough. We set up a Clientspace on one of your real engagements, map pricing to your firm, and you leave with a written rollout plan.",
  alternates: { canonical: "/demo" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Book a demo | PYNGYN",
    description:
      "30 minutes, live, no slideshow. We set up a Clientspace on a real engagement of yours and leave you with a tailored rollout plan.",
    url: "/demo",
    type: "website",
  },
};

const STATS = [
  { value: "30 min", label: "Focused session" },
  { value: "Free", label: "No commitment" },
  { value: "1:1", label: "Real walkthrough" },
];

const TRUST = [
  "Partners & directors",
  "Practice managers",
  "Associates & ICs",
  "Client services",
  "Operations leads",
];

// Minute-by-minute agenda. Knowing exactly what happens removes the main
// hesitation before booking ("what am I signing up for?").
const AGENDA = [
  {
    time: "0–5 min",
    title: "Your firm, your workflow",
    body: "You talk, we listen: how engagements run today, where clients chase you for updates, and which tools are already in the mix.",
  },
  {
    time: "5–15 min",
    title: "Clientspace, set up live",
    body: "We create a branded Clientspace for one of your real engagements (your logo, your colors), so you see exactly what your client would see.",
  },
  {
    time: "15–25 min",
    title: "The fit for your firm",
    body: "Workspace for your internal ops if you want it, honest answers on what PYNGYN replaces vs. sits alongside, and pricing mapped to your team and client count.",
  },
  {
    time: "25–30 min",
    title: "Your rollout plan",
    body: "We agree concrete next steps. Within a day you get a written summary and a tailored rollout plan, whether or not you buy.",
  },
];

// Tangible takeaways: what the prospect owns after the call.
const TAKEAWAYS = [
  {
    icon: "🖥️",
    title: "A Clientspace you can show around",
    body: "The portal we configure on the call is yours to keep exploring, share it internally before you decide anything.",
  },
  {
    icon: "📋",
    title: "A written rollout plan",
    body: "A one-page summary of what we covered, what a rollout would look like for your firm, and honest effort estimates.",
  },
  {
    icon: "💰",
    title: "A pricing recommendation",
    body: "Clientspace standalone, Workspace standalone, or the bundle, we'll tell you which actually fits, including when the answer is \"start smaller.\"",
  },
];

// What happens between clicking "book" and the call itself.
const AFTER_BOOKING = [
  {
    step: "1",
    title: "Instant confirmation",
    body: "You get a calendar invite with a Google Meet link right away. Nothing to install, no account needed.",
  },
  {
    step: "2",
    title: "We prepare for your firm",
    body: "Tell us your industry and team size in the booking notes, and we'll come with a Clientspace template that matches how firms like yours deliver.",
  },
  {
    step: "3",
    title: "The call, then the plan",
    body: "30 focused minutes on Google Meet. Within one business day, your written summary and rollout plan land in your inbox.",
  },
];

// Objection-handling FAQ, surfaced on the page (not hidden in a tab) and
// emitted as FAQPage JSON-LD for search.
const DEMO_FAQS = [
  {
    q: "Is this a sales call?",
    a: "It's a working session. We spend the time setting up a Clientspace on one of your real engagements and mapping fit, not walking through slides. If PYNGYN isn't right for your firm, we'll say so.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No preparation required. If you want the most out of it, have one current engagement in mind, we'll use it to set up your Clientspace live on the call.",
  },
  {
    q: "Who should join from our side?",
    a: "Whoever owns the client relationship problem: partners, practice managers, operations or delivery leads. Bring the whole group if you like, add their emails in the booking notes.",
  },
  {
    q: "We already use Notion, ClickUp, Jira, or spreadsheets. Is this still useful?",
    a: "Yes, that's the most common starting point. We'll be honest about what PYNGYN replaces, what it sits alongside, and what migration actually involves.",
  },
  {
    q: "Can I just try the product instead?",
    a: "Absolutely. There's a 7-day free trial with no credit card, Clientspace is $19 per client/month standalone, Workspace is $9 per seat/month, or bundle both for $24.99/month. The demo is for teams who want a guided setup and a rollout plan.",
  },
  {
    q: "Is our data safe if we share our workflow on the call?",
    a: "The call is a conversation over Google Meet, nothing is uploaded anywhere. If we set up a trial Clientspace, it lives in your own account, isolated per client, and you can delete it any time.",
  },
];

export default function DemoPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/demo",
            name: "Book a demo | PYNGYN",
            description:
              "Book a free 30-minute live walkthrough. We set up a Clientspace on one of your real engagements and you leave with a written rollout plan.",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Book a demo", url: "/demo" },
          ]),
          faqPageSchema(DEMO_FAQS, "/demo"),
        ]}
      />
      <Navbar />
      <main id="main" className="text-ink antialiased">
        {/* Calendar-first: booking is the first thing visible, no scrolling needed. */}
        <section id="booking" className="bg-canvas pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="mx-auto w-full max-w-content px-5 sm:px-7">
            <div className="mb-8 text-center">
              <span className="eyebrow justify-center">
                <span className="eyebrow-dot" /> Live strategy walkthrough · 30 min
              </span>
              <h1 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(28px,4.4vw,48px)] font-semibold leading-[1.04] tracking-[-0.03em]">
                See your clients&apos; portal set up live, on a real engagement of yours.
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[16px]">
                A 30-minute Google Meet with our founder. No slide deck: we configure a
                Clientspace for your firm on the call and you leave with a written rollout plan.
              </p>

              {/* Reassurance stats, visible before the fold. */}
              <div className="mx-auto mt-6 grid max-w-md grid-cols-3 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center justify-center gap-1 px-2 py-3.5 text-center ${
                      i > 0 ? "border-l border-line" : ""
                    }`}
                  >
                    <span className="font-display text-[17px] font-semibold tracking-tight text-ink sm:text-[20px]">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
              <div className="lg:sticky lg:top-24">
                <CalendlyEmbed
                  url="https://calendly.com/founder-pyngyn/30min"
                  className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                  height={760}
                />

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    Built for
                  </span>
                  {TRUST.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-semibold text-ink"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-[12px] text-muted">
                  Prefer email? Reach the team at{" "}
                  <a
                    href="mailto:sales@pyngyn.com"
                    className="font-semibold text-accent hover:text-accent-dk"
                  >
                    sales@pyngyn.com
                  </a>
                  .
                </p>
              </div>

              <div id="what-you-get">
                <DemoStory />
              </div>
            </div>
          </div>
        </section>

        {/* Minute-by-minute agenda: removes "what am I signing up for?" anxiety. */}
        <section className="section bg-white">
          <div className="wrap">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">
                <span className="eyebrow-dot" /> The agenda
              </span>
              <h2 className="mt-3 font-display text-[clamp(26px,4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em]">
                How the 30 minutes runs.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted">
                Every call follows the same simple structure, tailored to your firm.
              </p>
            </div>
            <ol className="mx-auto mt-10 grid max-w-[1040px] gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {AGENDA.map((a) => (
                <li key={a.time} className="card h-full">
                  <span className="inline-block rounded-full bg-accent-lt px-3 py-1 font-mono text-[11.5px] font-bold text-accent">
                    {a.time}
                  </span>
                  <h3 className="mt-3.5 text-[16px] font-bold leading-snug">{a.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{a.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Product proof: the actual Clientspace a prospect's clients would see. */}
        <section className="relative overflow-hidden bg-[#f2ecff] py-16 sm:py-20">
          <div
            className="absolute left-[8%] top-28 h-56 w-56 rounded-full bg-white/70 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute right-[5%] top-36 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-content px-5 sm:px-7">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">
                <span className="eyebrow-dot" /> What we&apos;ll show you
              </span>
              <h2 className="mt-4 font-display text-[clamp(28px,4.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                The branded portal your clients will log into.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
                On the call, we&apos;ll set up a Clientspace for a real engagement of yours,
                your logo, your colors, so you leave knowing exactly what your clients see.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-[860px] overflow-hidden rounded-[22px] border border-line bg-white shadow-art">
              <Image
                src="/screens/clientspace-space.webp"
                alt="Clientspace portal showing needs-your-attention items, active engagements, engagement value, and upcoming sessions for a client logging in"
                width={1909}
                height={940}
                sizes="(max-width: 768px) 100vw, 860px"
                className="h-auto w-full"
              />
            </div>
            <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13.5px] text-muted">
              {[
                "Standalone, no Workspace required",
                "Branded to your firm",
                "Live in the call, not a slide deck",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-none text-positive">
                    <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tangible takeaways: what you own after the call, buy or not. */}
        <section className="section bg-white">
          <div className="wrap">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">
                <span className="eyebrow-dot" /> What you leave with
              </span>
              <h2 className="mt-3 font-display text-[clamp(26px,4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em]">
                Three things you keep, whether or not you buy.
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-[1040px] gap-[18px] md:grid-cols-3">
              {TAKEAWAYS.map((t) => (
                <div key={t.title} className="card h-full text-center">
                  <span className="text-[30px]" aria-hidden="true">{t.icon}</span>
                  <h3 className="mt-3 text-[16.5px] font-bold leading-snug">{t.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof: what other firms asked for on their calls. */}
        <section className="section bg-canvas">
          <div className="wrap">
            <div className="mx-auto max-w-[1040px]">
              <DemoTestimonials />
            </div>
          </div>
        </section>

        {/* After you book: removes uncertainty about the process. */}
        <section className="section bg-white">
          <div className="wrap">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">
                <span className="eyebrow-dot" /> After you book
              </span>
              <h2 className="mt-3 font-display text-[clamp(26px,4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em]">
                What happens next.
              </h2>
            </div>
            <ol className="mx-auto mt-10 grid max-w-[960px] gap-[18px] md:grid-cols-3">
              {AFTER_BOOKING.map((s) => (
                <li key={s.step} className="card h-full">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-[15px] font-bold text-white">
                    {s.step}
                  </span>
                  <h3 className="mt-3.5 text-[16px] font-bold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Objection-handling FAQ, visible on the page and in search. */}
        <section className="section bg-canvas">
          <div className="wrap">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">
                <span className="eyebrow-dot" /> Common questions
              </span>
              <h2 className="mt-3 font-display text-[clamp(26px,4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em]">
                Before you book.
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-[1040px] gap-[18px] md:grid-cols-2">
              {DEMO_FAQS.map((f) => (
                <div key={f.q} className="card h-full">
                  <h3 className="text-[15.5px] font-bold leading-snug">{f.q}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-xl text-center text-[14px] text-muted">
              Not ready for a call? You can{" "}
              <a href={SIGNUP_URL} className="font-semibold text-accent hover:text-accent-dk">
                start a 7-day free trial
              </a>{" "}
              instead, no credit card required.
            </p>
          </div>
        </section>

        {/* Final CTA back up to the calendar. */}
        <section className="wrap pb-20">
          <DemoConversionBar />
        </section>
      </main>
      <Footer />
      <ExitIntentModal
        ctaHref={SIGNUP_URL}
        ctaLabel="Start free trial"
        eyebrow="Before you go"
        title="Not ready for a 30-minute call?"
        body="Skip the calendar. Start a 7-day free trial and explore Client Space or Workspace yourself, no credit card required."
        dismissLabel="No thanks, I'll come back later"
      />
    </>
  );
}
