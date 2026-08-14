import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ClientSpaceShowcase } from "./showcase/ClientSpaceShowcase";
import { BusinessBrainShowcase } from "./showcase/BusinessBrainShowcase";

/*
 * The "feature row" beneath the lead Clientspace screen. Its mockup + copy are
 * overridable via the `brain` prop so different pages can show a different
 * PYNGYN surface in the same slot: the homepage shows the Business Brain
 * assistant (the default), and /workspace shows the Smart Inbox.
 */
export type FeatureRow = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  mockup: ReactNode;
};

const DEFAULT_BRAIN: FeatureRow = {
  eyebrow: "Business Brain",
  title:
    "Grounded in your live ClientSpace, under your own permissions - sources on every answer",
  body: "Ask about workload, money, risk, the team, or deadlines - or tap a quick action. Answers use only what your role can see.",
  bullets: ["Weekly pulse", "At-risk work", "Collections", "Team load", "Deadlines"],
  mockup: <BusinessBrainShowcase />,
};

export function ProductShowcase({ brain = DEFAULT_BRAIN }: { brain?: FeatureRow } = {}) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[680px] text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Inside PYNGYN
            </span>
            <h2 className="title mt-3">The actual product. Not a mockup.</h2>
            <p className="lead mx-auto mt-4">
              Real screens from Clientspace and Workspace, the two products your firm and clients use every day.
            </p>
          </div>
        </Reveal>

        {/* Lead screen: the live, interactive Clientspace mockup. variant="screenshot"
            keeps the full desktop layout at every width — on mobile it scales down
            instead of reflowing, so visitors always see the real desktop product. */}
        <Reveal i={1}>
          <figure className="mx-auto mt-[46px] max-w-[1000px]">
            <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-art">
              <ClientSpaceShowcase variant="screenshot" />
            </div>
            <figcaption className="mt-3 text-center text-[13px] text-muted">
              Your client&apos;s Clientspace: engagements, approvals, and status in one branded portal.
            </figcaption>
          </figure>
        </Reveal>

        {/* Feature row — copy left, live mockup in the right column, flush to the
            section container's right edge. The column sets the mockup's width. */}
        <Reveal i={2}>
          <div className="mt-[72px] grid items-center gap-8 md:grid-cols-[1fr_520px] md:gap-12 xl:grid-cols-[1fr_620px]">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                {brain.eyebrow}
              </span>
              <h3 className="mt-2.5 font-display text-[clamp(24px,3vw,32px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                {brain.title}
              </h3>
              <p className="mt-3 max-w-[480px] text-[16px] leading-relaxed text-muted">
                {brain.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {brain.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-ink"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:justify-self-end">
              <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-art">
                {brain.mockup}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
