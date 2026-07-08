import Image from "next/image";
import { Reveal } from "./Reveal";

type Shot = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

// Real product screenshots (converted to WebP, served from /public/screens).
const LEAD: Shot = {
  src: "/screens/clientspace-space.webp",
  alt: "PYNGYN Clientspace showing a client's branded portal with needs-your-attention items, active engagements, engagement value, and upcoming sessions at a glance",
  w: 1909,
  h: 940,
};

const ROWS: { shot: Shot; eyebrow: string; title: string; body: string; reverse?: boolean }[] = [
  {
    shot: {
      src: "/screens/smart-inbox.webp",
      alt: "PYNGYN Smart Inbox, AI-triaged, sorting items into Needs response, FYI, and Low priority with a one-line reason and confidence score for each",
      w: 1920,
      h: 949,
    },
    eyebrow: "Business Brain",
    title: "AI triages everything that needs you.",
    body: "Smart Inbox sorts client replies, approvals, and updates into Needs response, FYI, and Low priority, each with a one-line reason, so partners spend their time deciding, not sifting through a feed.",
    reverse: true,
  },
];

function Screenshot({ shot, priority = false }: { shot: Shot; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-art">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 900px"
        className="h-auto w-full"
      />
    </div>
  );
}

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

        {/* Lead screenshot */}
        <Reveal i={1}>
          <figure className="mx-auto mt-[46px] max-w-[1000px]">
            <Screenshot shot={LEAD} />
            <figcaption className="mt-3 text-center text-[13px] text-muted">
              Your client&apos;s Clientspace: engagements, approvals, and status in one branded portal.
            </figcaption>
          </figure>
        </Reveal>

        {/* Alternating feature rows */}
        <div className="mt-[72px] space-y-[72px]">
          {ROWS.map((row, i) => (
            <Reveal key={row.shot.src} i={i}>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                <div className={row.reverse ? "md:order-2" : ""}>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {row.eyebrow}
                  </span>
                  <h3 className="mt-2.5 font-display text-[clamp(24px,3vw,32px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                    {row.title}
                  </h3>
                  <p className="mt-3 max-w-[480px] text-[16px] leading-relaxed text-muted">
                    {row.body}
                  </p>
                </div>
                <div className={row.reverse ? "md:order-1" : ""}>
                  <Screenshot shot={row.shot} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
