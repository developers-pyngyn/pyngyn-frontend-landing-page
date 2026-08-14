import { Reveal } from "./Reveal";
import { ClientSpaceShowcase } from "./showcase/ClientSpaceShowcase";
import { BusinessBrainShowcase } from "./showcase/BusinessBrainShowcase";

const ROWS: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  reverse?: boolean;
}[] = [
  {
    eyebrow: "Business Brain",
    title: "Grounded in your live ClientSpace, under your own permissions - sources on every answer",
    body: "Ask about workload, money, risk, the team, or deadlines - or tap a quick action. Answers use only what your role can see.",
    bullets: ["Weekly pulse", "At-risk work", "Collections", "Team load", "Deadlines"],
    reverse: true,
  },
];

export function ProductShowcase() {
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

        {/* Lead screen: the live, interactive Clientspace mockup (was a
            static /screens/clientspace-space.webp shot). Same frame as the
            <Screenshot> below it so the section is visually unchanged. */}
        <Reveal i={1}>
          <figure className="mx-auto mt-[46px] max-w-[1000px]">
            <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-art">
              <ClientSpaceShowcase />
            </div>
            <figcaption className="mt-3 text-center text-[13px] text-muted">
              Your client&apos;s Clientspace: engagements, approvals, and status in one branded portal.
            </figcaption>
          </figure>
        </Reveal>

        {/* Alternating feature rows */}
        <div className="mt-[72px] space-y-[72px]">
          {ROWS.map((row, i) => (
            <Reveal key={row.eyebrow} i={i}>
              {/* Copy left, mockup in the right column, flush to the section
                  container's right edge. The column — not a margin on the
                  child — is what sets the mockup's width and position. */}
              <div className="grid items-center gap-8 md:grid-cols-[1fr_520px] md:gap-12 xl:grid-cols-[1fr_620px]">
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {row.eyebrow}
                  </span>
                  <h3 className="mt-2.5 font-display text-[clamp(24px,3vw,32px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                    {row.title}
                  </h3>
                  <p className="mt-3 max-w-[480px] text-[16px] leading-relaxed text-muted">
                    {row.body}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {row.bullets.map((bullet) => (
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
                  {/* Live Business Brain mockup, in the slot that used to hold
                      the static /screens/smart-inbox.webp screenshot. The shell
                      inside is authored at 1600px and scaled down to fit this
                      column, so it reads as a real screenshot. */}
                  <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-art">
                    <BusinessBrainShowcase />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
