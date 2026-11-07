import Link from "next/link";
import { ReferralJoin } from "@/components/ReferralJoin";
import { DEMO_URL, SUPPORT_URL, PRICING_URL, TERMS_URL, EMAIL_DOMAIN } from "@/components/config";
import { DEFAULT_PROGRAM, referralCopy, type ReferralProgram } from "@/lib/referralProgram";
import { Skeleton } from "./Skeleton";

const REFERRAL_EMAIL = `referrals@${EMAIL_DOMAIN}`;

const FOR_WHO = [
  { icon: "people", title: "Consultants & advisors", body: "Your clients trust your stack recommendations. Get rewarded for sharing what already works." },
  { icon: "spark", title: "Existing PYNGYN customers", body: "If you love how PYNGYN runs your firm, your peers will too. Earn while spreading the word." },
  { icon: "speaker", title: "Newsletter authors & creators", body: "Tools you actually use are the most credible. Monetize honest recommendations." },
  { icon: "office", title: "Agencies & integrators", body: "Plug PYNGYN into your client stack and build a recurring revenue line on top." },
];

/**
 * Reward text, or a skeleton about its size while the live values load. `text` is
 * always given (from the defaults while loading) only to size the skeleton; it is
 * never shown then. `cpl` is roughly how many characters fit on one line there.
 */
function Live({ loading, text, cpl = 60, inline = false }: { loading: boolean; text: string; cpl?: number; inline?: boolean }) {
  if (!loading) return <>{text}</>;
  if (inline) return <Skeleton inline width={`${Math.max(3, Math.round(text.length * 0.55))}em`} />;
  return <Skeleton lines={Math.max(1, Math.ceil(text.length / cpl))} />;
}

const hasNumber = (s: string) => /\d/.test(s);

/**
 * Everything inside the Refer and earn page's <main>, before the closing CTA.
 * Every reward it mentions comes from `program` (see lib/referralProgram.ts).
 * `program` is null until the live values arrive: every reward then shows a skeleton.
 */
export function ReferEarnContent({ program }: { program: ReferralProgram | null }) {
  const loading = !program;
  // While loading, the default copy only gives the shape (row names, questions, lengths).
  const copy = referralCopy(program ?? DEFAULT_PROGRAM);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" aria-busy={loading}>
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
                {loading && <span className="sr-only">Loading the current rewards.</span>}
                <Live loading={loading} text={copy.hero} cpl={50} />
              </p>

              {/* Twin reward callouts */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <RewardCard loading={loading} label="You earn" value={copy.youEarn.value} body={copy.youEarn.body} />
                <RewardCard loading={loading} label="They save" value={copy.theySave.value} body={copy.theySave.body} />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] font-medium text-muted">
                {copy.badges.map((b) => (
                  <span key={b} className="flex items-center gap-1.5"><Check /> <Live loading={loading} inline text={b} /></span>
                ))}
              </div>
            </div>

            <div>
              <ReferralJoin program={program} />
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
          {copy.steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-white p-7 shadow-card">
              <div className="font-mono text-[14px] font-semibold text-accent">{s.n}</div>
              <h3 className="mt-3 font-display text-[18px] font-semibold tracking-[-0.015em]">
                <Live loading={loading && s.live} inline text={s.title} />
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                <Live loading={loading && s.live} text={s.body} cpl={30} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reward breakdown */}
      <section className="mx-auto w-full max-w-content px-5 pb-12 sm:px-7 sm:pb-16">
        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
          <div className="grid lg:grid-cols-2">
            <RewardBreakdown loading={loading} side="referrer" title="What you earn" value={copy.referrer.value} rows={copy.referrer.rows} />
            <div className="border-t border-line lg:border-l lg:border-t-0">
              <RewardBreakdown loading={loading} side="friend" title="What your friend gets" value={copy.friend.value} rows={copy.friend.rows} />
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
          {copy.faq.map((f) => (
            <details key={f.q} className="group p-6 transition-colors open:bg-canvas/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em]">{f.q}</h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-none text-muted transition-transform group-open:rotate-180">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                <Live loading={loading && hasNumber(f.a)} text={f.a} cpl={90} />
              </p>
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
            {loading ? <Skeleton lines={Math.ceil(copy.terms.length / 130)} /> : copy.terms}
            Self-referrals, payments via prepaid/promotional credit, refunded subscriptions, and trial-only signups do
            not qualify. PYNGYN reserves the right to update, modify, or end the program
            at any time, and to disqualify activity it determines to be fraudulent, in
            violation of these terms, or otherwise abusive. Full terms apply, see our{" "}
            <Link href={TERMS_URL} className="font-semibold text-accent hover:underline">Terms</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

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

function RewardCard({ loading, label, value, body }: { loading: boolean; label: string; value: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</div>
      <div className="mt-1 font-display text-[36px] font-semibold leading-none tracking-[-0.03em] text-accent">
        <Live loading={loading} inline text={value} />
      </div>
      <p className="mt-2 text-[14px] leading-snug text-muted">
        <Live loading={loading} text={body} cpl={28} />
      </p>
    </div>
  );
}

function RewardBreakdown({
  loading,
  side,
  title,
  value,
  rows,
}: {
  loading: boolean;
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
        <span className="font-display text-[28px] font-semibold tracking-[-0.02em] text-accent">
          <Live loading={loading} inline text={value} />
        </span>
      </div>
      <dl className="mt-6 divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-3 text-[14.5px]">
            <dt className="text-muted">{k}</dt>
            <dd className="font-medium text-ink">
              <Live loading={loading} inline text={v} />
            </dd>
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
