"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Story / social-proof side of the /demo page.
//
// Sits next to the booking widget and is responsible for the parts
// that actually convert: a human host card, a narrative tab strip (About /
// Experience / FAQs), and a testimonial carousel underneath. Pure presentation
// — no fetches, no side effects beyond a small client-only carousel.
// ---------------------------------------------------------------------------

type Tab = "About" | "Experience" | "FAQs";

type Testimonial = {
  quote: string;
  role: string;
};

const HOST = {
  name: "Vivek Pandey",
  role: "Founder & CEO",
  company: "PYNGYN",
  photo: "/team/vivek-pandey.png",
  blurb:
    "I&apos;ve spent years close to how services teams actually deliver work. On this call we won&apos;t pitch slides, we&apos;ll open your workflow, find the things quietly costing you hours each week, and show how PYNGYN would absorb them.",
};

const ABOUT_BULLETS = [
  "Map your real workflow live, not a generic demo flow.",
  "See PYNGYN turn a goal into tasks, owners, timelines, and status.",
  "Leave with a tailored rollout plan and a written summary.",
];

const EXPERIENCE = [
  {
    year: "10+ yrs",
    title: "Delivery leadership",
    body: "Ran PMO and client services for fast-growing consulting and professional-services firms.",
  },
  {
    year: "300+",
    title: "Onboarding sessions",
    body: "Walked teams from 5 to 500 through workflow redesigns and tool migrations.",
  },
  {
    year: "PS-native",
    title: "Built for services",
    body: "Specialised in professional services, agencies, and operations-heavy orgs.",
  },
];

const FAQS = [
  {
    q: "Is this really free? What&apos;s the catch?",
    a: "Yes, free. 30 minutes, live, no obligation. We learn what your team needs; you learn whether PYNGYN fits.",
  },
  {
    q: "Will I have to install anything before the call?",
    a: "No. We share screens over Google Meet. If you want a sandbox after, we can spin one up in minutes.",
  },
  {
    q: "What if my team uses Notion, ClickUp, Jira, or Linear?",
    a: "Great, we&apos;ll talk through how PYNGYN sits alongside or replaces those, and what migration would look like.",
  },
  {
    q: "Can I bring my team?",
    a: "Absolutely. Founders, ops leads, delivery managers, the more the merrier. Add their emails in the notes field.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We came in wanting to see one thing: could it turn our messy intake into a plan without rebuilding everything. The call walked through exactly that.",
    role: "Founder, mid-market consulting firm",
  },
  {
    quote:
      "The useful part was mapping it to our actual delivery flow, not a generic demo. We left knowing what a rollout would involve.",
    role: "Head of delivery, creative studio",
  },
  {
    quote:
      "What we wanted to understand was where our process leaks time. The session was specific and practical, with no fluff.",
    role: "Operations lead, advisory firm",
  },
  {
    quote:
      "We asked how it sits alongside the tools we already use. The answer was honest about what it replaces and what it does not.",
    role: "COO, IT services firm",
  },
];

const GALLERY = [
  {
    title: "Plan view",
    label: "Live project board",
    accent: "from-accent/15 to-accent/5",
  },
  {
    title: "Status digest",
    label: "Weekly auto-summary",
    accent: "from-emerald-200/40 to-emerald-100/10",
  },
  {
    title: "Risk radar",
    label: "Owners + blockers",
    accent: "from-amber-200/40 to-amber-100/10",
  },
];

// ---------------------------------------------------------------------------

export function DemoStory() {
  const [tab, setTab] = useState<Tab>("About");

  return (
    <section aria-label="About this demo" className="flex flex-col gap-6">
      <HostCard />
      <Tabs current={tab} onChange={setTab} />
      <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
        {tab === "About" && <AboutPanel />}
        {tab === "Experience" && <ExperiencePanel />}
        {tab === "FAQs" && <FaqPanel />}
      </div>
      <GalleryStrip />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Host card
// ---------------------------------------------------------------------------

function HostCard() {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6">
      <Avatar name={HOST.name} size={64} photo={HOST.photo} />
      <div className="min-w-0">
        <p className="truncate font-display text-[20px] font-semibold leading-tight text-ink">
          {HOST.company}
        </p>
        <p className="truncate text-[13px] text-muted">
          {HOST.name} · {HOST.role}
        </p>
      </div>
      <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Booking
      </span>
    </div>
  );
}

function Avatar({ name, size = 56, photo }: { name: string; size?: number; photo?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover shadow-card"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-dk font-display text-[18px] font-bold text-white shadow-card"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab strip + panels
// ---------------------------------------------------------------------------

function Tabs({ current, onChange }: { current: Tab; onChange: (t: Tab) => void }) {
  const tabs: Tab[] = ["About", "Experience", "FAQs"];
  return (
    <div
      role="tablist"
      aria-label="More about this session"
      className="inline-flex flex-wrap items-center gap-1 self-start rounded-full border border-line bg-white p-1 shadow-card"
    >
      {tabs.map((t) => {
        const active = current === t;
        return (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t)}
            className={[
              "rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors",
              active
                ? "bg-ink text-white shadow-cta"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {t === "About" && (
              <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-accent" />
            )}
            {t}
          </button>
        );
      })}
    </div>
  );
}

function AboutPanel() {
  return (
    <div>
      <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">
        Hey, I&apos;m {HOST.name.split(" ")[0]}.
      </h3>
      <p
        className="mt-3 text-[15px] leading-relaxed text-muted"
        // The blurb contains an apostrophe entity; render trusted constant.
        dangerouslySetInnerHTML={{ __html: HOST.blurb }}
      />
      <ul className="mt-5 flex flex-col gap-2.5">
        {ABOUT_BULLETS.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[14px] text-ink">
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-lt text-accent">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12l5 5L20 6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div>
      <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">
        Who&apos;s on the other side of the call
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        You&apos;re not getting a junior SDR with a deck. You&apos;re getting a
        practitioner who has lived this problem.
      </p>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {EXPERIENCE.map((e) => (
          <li
            key={e.title}
            className="rounded-2xl border border-line bg-canvas/40 p-4"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {e.year}
            </p>
            <p className="mt-2 text-[15px] font-semibold text-ink">{e.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{e.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqPanel() {
  return (
    <div>
      <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">
        Common questions
      </h3>
      <ul className="mt-4 divide-y divide-line">
        {FAQS.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
        ))}
      </ul>
    </div>
  );
}

function FaqItem({
  q,
  a,
  defaultOpen,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <li className="py-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span
          className="text-[14px] font-semibold text-ink"
          dangerouslySetInnerHTML={{ __html: q }}
        />
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform ${
            open ? "rotate-45 border-ink/40 text-ink" : ""
          }`}
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <p
          className="mt-2 text-[14px] leading-relaxed text-muted"
          dangerouslySetInnerHTML={{ __html: a }}
        />
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Gallery strip — pure CSS micro-previews (no images required)
// ---------------------------------------------------------------------------

function GalleryStrip() {
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Gallery
          </p>
          <h3 className="mt-1 font-display text-[18px] font-semibold text-ink">
            What you&apos;ll see in the call
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {GALLERY.map((g) => (
          <div
            key={g.title}
            className={`relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br ${g.accent} p-3 transition-transform hover:-translate-y-0.5`}
          >
            <div className="aspect-[4/3] w-full rounded-xl bg-white/80 backdrop-blur">
              {/* Stylised mini "screen" with rows */}
              <div className="flex h-full flex-col gap-1.5 p-2">
                <div className="h-1.5 w-1/3 rounded-full bg-ink/15" />
                <div className="h-1.5 w-2/3 rounded-full bg-ink/10" />
                <div className="mt-auto flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
                </div>
              </div>
            </div>
            <p className="mt-2 text-[12px] font-semibold text-ink">{g.title}</p>
            <p className="text-[11px] text-muted">{g.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Testimonials carousel (exported separately so the page can place it under
// the two-column section, not next to the booking widget)
// ---------------------------------------------------------------------------

export function DemoTestimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const prev = () =>
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section
      aria-label="What teams raise on a demo call"
      className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            From discovery calls
          </p>
          <h2 className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink sm:text-[30px]">
            What teams raise on the call.
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/40"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-ink text-white transition-colors hover:bg-black"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Featured large quote */}
        <figure className="rounded-3xl border border-line bg-canvas/40 p-6 md:col-span-2">
          <QuoteMark />
          <blockquote
            className="mt-3 font-display text-[20px] leading-snug text-ink sm:text-[24px]"
            // quote contains apostrophe entity
            dangerouslySetInnerHTML={{ __html: TESTIMONIALS[idx].quote }}
          />
          <figcaption className="mt-5 border-t border-line pt-3.5 text-[13px] text-muted">
            <span className="font-semibold text-ink">From a discovery call</span> ·{" "}
            {TESTIMONIALS[idx].role}
          </figcaption>
        </figure>

        {/* Side stack of secondary quotes (next two) */}
        <div className="flex flex-col gap-3">
          {[1, 2].map((offset) => {
            const t = TESTIMONIALS[(idx + offset) % TESTIMONIALS.length];
            return (
              <figure
                key={t.role}
                className="rounded-2xl border border-line bg-white p-4"
              >
                <blockquote
                  className="text-[13px] leading-relaxed text-ink"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                />
                <figcaption className="mt-3 text-[12px] text-muted">
                  <span className="font-semibold text-ink">From a discovery call</span> · {t.role}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* dots */}
      <div className="mt-6 flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-muted/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function QuoteMark() {
  return (
    <span
      aria-hidden
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-lt text-accent"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
      </svg>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Conversion strip — used at the bottom of the page to close the deal
// ---------------------------------------------------------------------------

export function DemoConversionBar() {
  return (
    <section className="rounded-3xl border border-line bg-ink p-7 text-white shadow-soft sm:p-9">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            Ready when you are
          </p>
          <h2 className="mt-2 font-display text-[24px] font-semibold leading-tight sm:text-[28px]">
            One 30-minute call. A clearer plan, either way.
          </h2>
          <p className="mt-2 max-w-xl text-[14px] text-white/70">
            If PYNGYN&apos;s the right fit, we&apos;ll show you exactly how to roll
            it out. If not, you&apos;ll still walk away with a sharper view of
            your workflow.
          </p>
        </div>
        <a
          href="#booking"
          className="btn btn-accent shrink-0"
        >
          Pick a time →
        </a>
      </div>
    </section>
  );
}
