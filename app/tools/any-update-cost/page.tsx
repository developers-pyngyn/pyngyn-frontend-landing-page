import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { AnyUpdateCostCalculator } from "@/components/AnyUpdateCostCalculator";
import { DEMO_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "\"Any Update?\" Cost Calculator | PYNGYN",
  description:
    "See what answering client status emails and calls costs your firm every year, and how much a branded client portal could win back. Free, no signup.",
  alternates: { canonical: "/tools/any-update-cost" },
  openGraph: {
    images: [OG_IMAGE],
    title: "\"Any Update?\" Cost Calculator | PYNGYN",
    description:
      "Put a number on the hours your team spends answering \"any update?\" Free, no signup.",
    type: "website",
    url: "/tools/any-update-cost",
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does this calculator measure?",
    a: "It estimates the annual cost of answering client status requests, emails, calls, and Slack pings asking where things stand, priced at your billable rate. It then shows how much of that you could win back with a client portal and the resulting return on investment.",
  },
  {
    q: "Where do the default numbers come from?",
    a: "The defaults (1.5 status touches per client per week, 12 minutes per touch) reflect a typical services firm. Every input, including your billable rate and client count, is yours to adjust so the result reflects your firm.",
  },
  {
    q: "Why does the tool cost default to a per-client price instead of per-seat?",
    a: "This calculator models Clientspace, which is priced and sold per client, standalone, not per internal seat. That's different from PYNGYN's other free tools, which model Workspace at its per-seat price.",
  },
  {
    q: "Is the self-serve recovery rate realistic?",
    a: "It's an assumption you control. The default of 70% is deliberately achievable, not every status question disappears, but most routine \"any update?\" asks do once clients can check their own portal. Lower it for a cautious estimate.",
  },
  {
    q: "Is the calculator free?",
    a: "Yes, free with no signup. Adjust the inputs as many times as you like and copy a summary of the result. To see Clientspace set up on a real engagement of yours, book a demo.",
  },
];

export default function AnyUpdateCostPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/tools/any-update-cost",
            name: "\"Any Update?\" Cost Calculator | PYNGYN",
            description:
              "See what answering client status requests costs your firm every year, and how much a client portal could win back.",
            breadcrumbId: "/tools/any-update-cost#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "\"Any Update?\" Cost Calculator", url: "/tools/any-update-cost" },
            ],
            "/tools/any-update-cost"
          ),
          faqPageSchema(FAQS, "/tools/any-update-cost"),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[10px] pt-[140px] text-center">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Free tool
          </span>
          <h1 className="mx-auto mt-3 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            What is &ldquo;any update?&rdquo; costing your firm?
          </h1>
          <p className="lead mx-auto mt-5">
            Every client email and call asking for status is billable time spent on something
            other than the work. Put a number on it, then see what a client portal could win
            back. Free, no signup.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            {["No signup", "USD or INR", "Priced like Clientspace, per client"].map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {b}
              </span>
            ))}
          </div>
        </section>

        <div className="pt-12">
          <AnyUpdateCostCalculator />
        </div>

        {/* Methodology + FAQ */}
        <section className="section-tight">
          <div className="wrap max-w-[820px]">
            <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />The method</span>
            <h2 className="title mt-3">Honest math, your inputs.</h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                Every status touch, an email, a call, a Slack ping asking where things stand,
                costs a few minutes to stop, check, and reply properly. Multiply that by how many
                clients you serve and how often each one asks, and it adds up to real billable
                hours spent on something other than the work.
              </p>
              <p>
                The recoverable figure applies a self-serve rate you set: the share of those asks
                that disappear once a client can check their own status instead of emailing you.
                It's deliberately not 100%, some questions always need a human. From there the
                calculator compares the recovered value against Clientspace's real per-client
                price to show net annual gain, return on investment, and payback period.
              </p>
              <p>
                Treat the output as a directional estimate, not a quote. The point is to make a
                hidden cost visible so you can decide whether it's worth fixing. When you want to
                model your firm properly,{" "}
                <a href={DEMO_URL} className="font-semibold text-accent hover:text-accent-dk">
                  book a demo
                </a>
                .
              </p>
            </div>

            <div className="mt-12">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />FAQ</span>
              <h2 className="title mt-3">Questions, answered.</h2>
              <dl className="mt-6 divide-y divide-line">
                {FAQS.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[17px] font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
