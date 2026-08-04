import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { ReferralJoin } from "@/components/ReferralJoin";
import { DEMO_URL, SUPPORT_URL, PRICING_URL, TERMS_URL, EMAIL_DOMAIN } from "@/components/config";

const REFERRAL_EMAIL = `referrals@${EMAIL_DOMAIN}`;

export const metadata: Metadata = {
  title: "Refer and earn | PYNGYN",
  description:
    "Refer PYNGYN to your network and earn 20% on every paid referral. The friend you refer also gets 20% off their annual plan.",
  alternates: { canonical: "/refer-and-earn" },
};

const STEPS = [
  { n: "01", title: "Join in 30 seconds", body: "Drop your email and we'll generate your unique referral link. No application, no minimums." },
  { n: "02", title: "Share with your network", body: "Send your link to peers, post it on LinkedIn, or include it in your newsletter." },
  { n: "03", title: "They get 20% off", body: "Anyone who buys an annual plan through your link gets 20% off their first year, automatically." },
  { n: "04", title: "You earn 20%", body: "You earn 20% of every referred annual plan, paid out monthly once they're billed." },
];

const FOR_WHO = [
  { icon: "people", title: "Consultants & advisors", body: "Your clients trust your stack recommendations. Get rewarded for sharing what already works." },
  { icon: "spark", title: "Existing PYNGYN customers", body: "If you love how PYNGYN runs your firm, your peers will too. Earn while spreading the word." },
  { icon: "speaker", title: "Newsletter authors & creators", body: "Tools you actually use are the most credible. Monetize honest recommendations." },
  { icon: "office", title: "Agencies & integrators", body: "Plug PYNGYN into your client stack and build a recurring revenue line on top." },
];

const FAQ: { q: string; a: string }[] = [
  { q: "How much do I earn per referral?", a: "You earn 20% of the first year's annual subscription for every paid referral. Payouts are sent monthly after the customer is billed." },
  { q: "How much does my friend save?", a: "Anyone who signs up through your link gets a 20% discount on their first year of any annual plan. The discount is applied automatically at checkout." },
  { q: "Is there a cap on what I can earn?", a: "No cap. The more firms you refer, the more you earn. We do reserve the right to review unusually large or unusual patterns to make sure everything is genuine." },
  { q: "How long does my link stay attributed?", a: "When someone clicks your link, the attribution lasts for 90 days. If they sign up within that window, the referral counts to you." },
  { q: "When and how do I get paid?", a: "Payouts go out monthly via bank transfer or PayPal, once the referred customer's first invoice is paid and clears the standard refund window." },
  { q: "Does this work with monthly plans?", a: "Today the program rewards annual plan subscriptions only, that's how we can offer both sides 20%. Monthly customers can always upgrade later to qualify." },
  { q: "Can I refer my own company or use my own link?", a: "Self-referrals don't qualify. The program is for genuine third-party referrals, your peers, network, or audience." },
  { q: "What about taxes?", a: "Referral earnings are income. We'll send any tax documentation required in your country once you cross the relevant threshold." },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    people: "M16 18v-2a4 4 0 00-8 0v2M12 11a3 3 0 100-6 3 3 0 000 6M21 18v-1.5a3.5 3.5 0 00-3-3.4",
    spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
    speaker: "M3 10v4h3l5 4V6L6 10H3zM16 8a4 4 0 010 8M19 5a8 8 0 010 14",
    office: "M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01",
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ReferEarnPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-content px-5 pb-12 pt-[140px] sm:px-7 sm:pb-16 sm:pt-[160px]">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <span className="eyebrow">
                  <span className="eyebrow-dot" aria-hidden="true" />
                  Refer & earn
                </span>
                <h1 className="mt-4 max-w-[680px] font-display text-[clamp(36px,5.8vw,60px)] font-semibold leading-[1.02] tracking-[-0.035em]">
                  Share PYNGYN.{" "}
                  <span className="bg-gradient-to-r from-accent to-accent-dk bg-clip-text text-transparent">Everyone wins.</span>
                </h1>
                <p className="mt-5 max-w-[520px] text-[18px] leading-relaxed text-muted">
                  Refer a firm to PYNGYN and earn <strong className="text-ink">20%</strong> of their
                  annual plan. The firm you refer gets <strong className="text-ink">20% off</strong> their
                  first year. No cap, no catch.
                </p>

                {/* Twin reward callouts */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <RewardCard
                    label="You earn"
                    value="20%"
                    body="of every annual plan you refer, paid monthly."
                  />
                  <RewardCard
                    label="They save"
                    value="20%"
                    body="off their first year on any annual plan."
                  />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] font-medium text-muted">
                  <span className="flex items-center gap-1.5"><Check /> No cap on earnings</span>
                  <span className="flex items-center gap-1.5"><Check /> 90-day attribution</span>
                  <span className="flex items-center gap-1.5"><Check /> Monthly payouts</span>
                </div>
              </div>

              <div>
                <ReferralJoin />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-content px-5 pb-12 pt-6 sm:px-7 sm:pb-16">
          <div className="mb-2 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-semibold tracking-[-0.025em]">
              How it works.
            </h2>
            <span className="hidden font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted sm:block">
              4 steps · 30 seconds
            </span>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <div className="font-mono text-[14px] font-semibold text-accent">{s.n}</div>
                <h3 className="mt-3 font-display text-[18px] font-semibold tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reward breakdown */}
        <section className="mx-auto w-full max-w-content px-5 pb-12 sm:px-7 sm:pb-16">
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
            <div className="grid lg:grid-cols-2">
              <RewardBreakdown
                side="referrer"
                title="What you earn"
                value="20%"
                rows={[
                  ["Commission", "20% of first-year annual subscription"],
                  ["Cap", "No cap on referrals or earnings"],
                  ["Attribution", "90 days from first click"],
                  ["Payout", "Monthly, bank transfer or PayPal"],
                  ["Eligibility", "Open to anyone, free to join"],
                ]}
              />
              <div className="border-t border-line lg:border-l lg:border-t-0">
                <RewardBreakdown
                  side="friend"
                  title="What your friend gets"
                  value="20% off"
                  rows={[
                    ["Discount", "20% off first year on any annual plan"],
                    ["Applies to", "All paid tiers, billed annually"],
                    ["How it works", "Discount auto-applied at checkout"],
                    ["Combinable", "Cannot stack with other promos"],
                    ["After year 1", "Renews at standard list price"],
                  ]}
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[13px] text-muted">
            See current pricing on the <Link href={PRICING_URL} className="font-semibold text-accent hover:underline">pricing page</Link>.
          </p>
        </section>

        {/* Who it's for */}
        <section className="mx-auto w-full max-w-content px-5 pb-12 sm:px-7 sm:pb-16">
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-semibold tracking-[-0.025em]">
            Who this is for.
          </h2>
          <p className="mt-3 max-w-[560px] text-[16px] text-muted">
            Anyone can join. The program works especially well for these folks.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FOR_WHO.map((w) => (
              <div key={w.title} className="flex gap-4 rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-accent-lt text-accent">
                  <Icon name={w.icon} />
                </div>
                <div>
                  <h3 className="font-display text-[18px] font-semibold tracking-[-0.015em]">{w.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-content px-5 pb-16 sm:px-7 sm:pb-20">
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-semibold tracking-[-0.025em]">
            Common questions.
          </h2>
          <div className="mx-auto mt-8 max-w-[820px] divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-6 transition-colors open:bg-canvas/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em]">{f.q}</h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-none text-muted transition-transform group-open:rotate-180">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[820px] text-[13.5px] text-muted">
            Have a different question?{" "}
            <a href={`mailto:${REFERRAL_EMAIL}`} className="font-semibold text-accent hover:underline">{REFERRAL_EMAIL}</a>
            {" "}or{" "}
            <Link href={SUPPORT_URL} className="font-semibold text-accent hover:underline">contact support</Link>.
          </p>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto w-full max-w-content px-5 pb-16 sm:px-7 sm:pb-20">
          <div className="hero-dark relative overflow-hidden rounded-[28px] p-9 text-center sm:p-14">
            <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h2 className="mx-auto max-w-[640px] font-display text-[clamp(26px,3.8vw,40px)] font-semibold leading-tight tracking-[-0.02em] text-white">
                Ready to start earning?
              </h2>
              <p className="mx-auto mt-3 max-w-[480px] text-[16px] leading-relaxed text-white/65">
                Grab your link, share it, and we&apos;ll handle the rest.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href="#main" className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5 hover:bg-accent-dk">
                  Get my referral link ↑
                </a>
                <a href={DEMO_URL} className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10">
                  See PYNGYN first
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="mx-auto w-full max-w-content px-5 pb-20 sm:px-7">
          <div className="mx-auto max-w-[820px] text-[12.5px] leading-relaxed text-muted">
            <p className="font-semibold text-ink">Program terms (summary):</p>
            <p className="mt-2">
              The PYNGYN referral program pays a 20% commission on the first-year annual
              subscription value of qualifying paid referrals. The referred customer
              receives a 20% discount on their first year. Self-referrals, payments via
              prepaid/promotional credit, refunded subscriptions, and trial-only signups do
              not qualify. PYNGYN reserves the right to update, modify, or end the program
              at any time, and to disqualify activity it determines to be fraudulent, in
              violation of these terms, or otherwise abusive. Full terms apply, see our{" "}
              <Link href={TERMS_URL} className="font-semibold text-accent hover:underline">Terms</Link>.
            </p>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

function RewardCard({ label, value, body }: { label: string; value: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</div>
      <div className="mt-1 font-display text-[36px] font-semibold leading-none tracking-[-0.03em] text-accent">{value}</div>
      <p className="mt-2 text-[14px] leading-snug text-muted">{body}</p>
    </div>
  );
}

function RewardBreakdown({
  side,
  title,
  value,
  rows,
}: {
  side: "referrer" | "friend";
  title: string;
  value: string;
  rows: [string, string][];
}) {
  return (
    <div className={`p-8 sm:p-10 ${side === "referrer" ? "" : "lg:bg-[#fbfbfd]"}`}>
      <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
        {side === "referrer" ? "For you" : "For your friend"}
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <h3 className="font-display text-[22px] font-semibold tracking-[-0.015em]">{title}</h3>
        <span className="font-display text-[28px] font-semibold tracking-[-0.02em] text-accent">{value}</span>
      </div>
      <dl className="mt-6 divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-3 text-[14.5px]">
            <dt className="text-muted">{k}</dt>
            <dd className="font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
