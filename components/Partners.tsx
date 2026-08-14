import Image from "next/image";
import { Reveal } from "./Reveal";

// Real logos from actual partners (agencies/vendors PYNGYN works with) — not
// a customer social-proof claim, so this is a separate, honest section from
// Proof (see Sections.tsx, which deliberately avoids a customer logo wall).
//
// hashtag-consultancy.png, remote-talent.png, and getreplies.png are
// dark-mode assets (white/light wordmark, transparent background), so this
// section renders on a dark strip rather than white — matches how they were
// originally designed and keeps every logo legible without re-coloring
// anyone's brand mark.
type ImagePartner = {
  kind?: "image";
  name: string;
  src: string;
  width: number;
  height: number;
  className: string;
};

// A partner without a supplied image asset — rendered as crisp inline
// markup (avatar + wordmark) instead of a rasterized/guessed-at PNG, so it
// stays sharp at any size and doesn't require font-matching a screenshot.
type MarkPartner = {
  kind: "mark";
  name: string;
  initials: string;
  tagline?: string;
};

const PARTNERS: (ImagePartner | MarkPartner)[] = [
  {
    name: "Hashtag Consultancy",
    src: "/partners/hashtag-consultancy.png",
    width: 600,
    height: 183,
    className: "h-11 w-auto",
  },
  {
    name: "GetReplies",
    src: "/partners/getreplies.png",
    width: 116,
    height: 26,
    className: "h-8 w-auto",
  },
  {
    name: "Zoem International",
    src: "/partners/zoem-international.png",
    width: 256,
    height: 256,
    className: "h-16 w-auto",
  },
  {
    name: "Remote Talent",
    src: "/partners/remote-talent.png",
    width: 828,
    height: 195,
    className: "h-9 w-auto",
  },
  // {
  //   name: "Tagioni School of Performing Arts",
  //   src: "/partners/tagioni.png",
  //   width: 256,
  //   height: 256,
  //   className: "h-16 w-auto",
  // },
  {
    kind: "mark",
    name: "BigBirdLuxe",
    initials: "BB",
    tagline: "Elevated Living",
  },
];

function LogoMark({ initials, name, tagline }: { initials: string; name: string; tagline?: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#f0b84b] text-[13px] font-bold text-black">
        {initials}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[16px] font-bold text-white">{name}</span>
        {tagline && <span className="text-[12px] text-white/50">{tagline}</span>}
      </span>
    </div>
  );
}

function LogoRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex h-16 w-max flex-none items-center gap-16 pr-16"
      aria-hidden={ariaHidden}
    >
      {PARTNERS.map((p, i) =>
        p.kind === "mark" ? (
          <LogoMark key={`${p.name}-${i}`} initials={p.initials} name={p.name} tagline={p.tagline} />
        ) : (
          <Image
            key={`${p.name}-${i}`}
            src={p.src}
            alt={ariaHidden ? "" : p.name}
            width={p.width}
            height={p.height}
            className={`${p.className} shrink-0 opacity-90 transition-opacity hover:opacity-100`}
          />
        )
      )}
    </div>
  );
}

export function Partners() {
  return (
    <section className="dark-panel relative overflow-hidden py-16">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="wrap relative">
        <Reveal>
          <p className="mb-10 text-center text-sm text-white/60">Our partners</p>
        </Reveal>
        <Reveal i={1}>
          <div
            className="relative h-16 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            {/* One live, real list (for accessibility/SEO) + one aria-hidden
                duplicate, both animated together as a single flex track.
                Fixed height (h-16, matching every logo's className) on this
                wrapper and each LogoRow means the row's layout height is
                never derived from an image's raw intrinsic size — two of
                the source files (Zoem, Tagioni) are ~850px square natively,
                and without an explicit cap here, a brief window before
                Tailwind's sizing class takes hold could reserve close to
                that full height, showing as a large blank gap on this dark
                background before it visually settles down to 64px. */}
            <div className="flex h-16 w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
              <LogoRow />
              <LogoRow ariaHidden />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
