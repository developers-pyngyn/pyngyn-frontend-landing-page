import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "@/components/schema";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Founder Story · Why I built Pyngyn | Vivek Pandey",
  description:
    "The problem I lived. The insight I couldn't unsee. The conviction that drove me to build. Vivek Pandey, Founder & CEO of Pyngyn, on why he built the operating system for professional services firms.",
  alternates: { canonical: "/about/founder-story" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Founder Story · Why I built Pyngyn",
    description:
      "Six years inside Wrike, ClickUp and Meta watching PS firms fail to consolidate. Why Vivek Pandey built Pyngyn.",
    url: "/about/founder-story",
    type: "article",
  },
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const TIMELINE: { years: string; role: string; org: string; body: string }[] = [
  {
    years: "2019–2021",
    role: "Professional Services Consultant",
    org: "Wrike",
    body: "Implemented SaaS PM tools for enterprise PS clients. Watched knowledge fragment in real time.",
  },
  {
    years: "2021–2022",
    role: "Global Project Manager",
    org: "Meta (via Principle)",
    body: "Managed cross-functional global initiatives. Felt the cost of misalignment at scale.",
  },
  {
    years: "2021–2023",
    role: "Sr PM & Solutions Architect",
    org: "Wrike → ClickUp",
    body: "Built ClickUp's Template Center. Created knowledge-sharing systems. Saw every workaround fail.",
  },
  {
    years: "2025",
    role: "Founder & CEO",
    org: "Pyngyn",
    body: "Built the platform I wished existed while working at every one of the above.",
  },
];

const PROBLEM_STATS: { stat: string; title: string; body: string }[] = [
  {
    stat: "35%",
    title: "Of the day lost to tool-switching",
    body: "I watched this happen at every client I served at Wrike.",
  },
  {
    stat: "5+",
    title: "Platforms per engagement",
    body: "At ClickUp I built templates to paper over this, it wasn't enough.",
  },
  {
    stat: "95%",
    title: "Team misalignment",
    body: "Cross-functional projects at Meta showed me misalignment at scale.",
  },
  {
    stat: "0",
    title: "SOPs that surface when needed",
    body: "No tool I implemented ever solved the SOP activation problem.",
  },
];

const INSIGHTS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "I saw it from the inside",
    body: "At Wrike and ClickUp I watched firms add tools to fix coordination. Every tool made it worse. Knowledge scattered further. Consultants drowned in context-switching.",
  },
  {
    num: "02",
    title: "AI alone doesn't fix it",
    body: "Generic AI doesn't know your firm. It can't surface the right SOP at the right moment in the right workflow. I knew the answer had to be contextual, not generic.",
  },
  {
    num: "03",
    title: "The OS layer didn't exist",
    body: "Every tool I implemented was a point solution. Nobody had unified knowledge, tasks, SOPs, and AI into one operating layer built specifically for PS firms. So I built it.",
  },
];

const CONVICTIONS: { title: string; body: string }[] = [
  {
    title: "I built the tools I'm now replacing",
    body: "2+ years at Wrike implementing SaaS PM tools for PS firms. 1+ year at ClickUp building their knowledge-sharing infrastructure. I understand this category from the inside out.",
  },
  {
    title: "I know exactly why existing tools fail",
    body: "I didn't just use these platforms, I sold them, implemented them, and watched them fall short. I know the gap between what firms need and what every incumbent delivers.",
  },
  {
    title: "I'm building a compounding moat",
    body: "Every SOP built, every engagement logged, every task completed makes Pyngyn smarter for that firm. The platform compounds in value over time, that's why churn goes near zero after 6 months.",
  },
];

const UNFAIR_ADVANTAGES: string[] = [
  "6 yrs inside Wrike, ClickUp & Meta",
  "Implemented PS tools at 100+ firms",
  "MBA, MIS & Project Management",
  "Knows every competitor from the inside",
];

const RETENTION_LOOP: { step: string; title: string }[] = [
  { step: "1", title: "Firm adds knowledge, SOPs & engagements" },
  { step: "2", title: "AI learns the firm's context & patterns" },
  { step: "3", title: "Tasks surface the right SOP at the right time" },
  { step: "4", title: "Outcomes improve, more data added" },
];

const TAILWINDS: { title: string; body: string }[] = [
  {
    title: "AI adoption is accelerating in PS, but it's generic",
    body: "78% of consultants now use AI tools. But they're using tools that don't know their firm. I left ClickUp knowing the contextual AI layer for PS didn't exist. The window to build it is now.",
  },
  {
    title: "Firms are under margin pressure post-pandemic",
    body: "PS firms are being asked to do more with leaner teams. Fragmentation is no longer just annoying, it's a P&L problem. Every hour lost to tool-switching is a billable hour that never happened.",
  },
  {
    title: "Remote work permanently broke knowledge transfer",
    body: "The informal hallway knowledge transfer is gone forever. Firms are haemorrhaging institutional knowledge and every tool they try just adds another silo. The timing for a unified OS is perfect.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FounderStoryPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/about/founder-story",
            name: "Founder Story · Why I built Pyngyn",
            description:
              "Vivek Pandey on why he built Pyngyn, the operating system for professional services firms.",
            breadcrumbId: "/about/founder-story#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
              { name: "Founder Story", url: "/about/founder-story" },
            ],
            "/about/founder-story"
          ),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[30px] pt-[150px]">
          <span className="eyebrow">Founder story</span>
          <h1 className="mt-4 max-w-[900px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Why I built <span className="text-accent">Pyngyn.</span>
          </h1>
          <p className="lead mt-5 max-w-[720px]">
            The problem I lived. The insight I couldn&apos;t unsee. The conviction that drove me
            to build.
          </p>
          <div className="mt-5 text-[14px] text-muted">
            <span className="font-semibold text-ink">Vivek Pandey</span> · Founder &amp; CEO,
            Pyngyn ·{" "}
            <a
              className="text-accent hover:underline"
              href="mailto:vivek.pandey@pyngyn.com"
            >
              vivek.pandey@pyngyn.com
            </a>
          </div>
        </section>

        {/* ===== Pull quote =============================================== */}
        <section className="wrap py-[40px]">
          <div className="rounded-[24px] border border-line bg-white p-8 shadow-card md:p-12">
            <span className="eyebrow">The problem I lived</span>
            <p className="mt-4 max-w-[820px] font-display text-[clamp(24px,3.4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em]">
              I didn&apos;t find this problem.{" "}
              <span className="text-accent">I sold around it for 6 years.</span>
            </p>
            <p className="mt-4 max-w-[680px] text-[15.5px] leading-relaxed text-muted">
              From the inside of Wrike and ClickUp, I watched PS firms fail to consolidate, over
              and over again.
            </p>
          </div>
        </section>

        {/* ===== Career timeline ========================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">The path here</span>
          <h2 className="mt-3 font-display text-[26px] font-semibold tracking-[-0.01em]">
            Six years of context.
          </h2>

          <ol className="mt-7 space-y-4">
            {TIMELINE.map((t) => (
              <li
                key={t.years + t.org}
                className="rounded-2xl border border-line bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="rounded-full bg-accent-lt px-2.5 py-0.5 text-[11.5px] font-semibold uppercase tracking-wide text-accent-dk">
                    {t.years}
                  </span>
                  <span className="font-display text-[18px] font-semibold tracking-[-0.01em] text-ink">
                    {t.role}
                  </span>
                  <span className="text-[14px] text-muted">· {t.org}</span>
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ===== Problem stats ============================================ */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">What I saw, repeatedly</span>
          <h2 className="mt-3 max-w-[760px] font-display text-[26px] font-semibold leading-tight tracking-[-0.01em]">
            I spent years helping PS firms implement tools that didn&apos;t solve their real
            problem.
          </h2>

          <div className="mt-7 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEM_STATS.map((s) => (
              <div key={s.title} className="card h-full">
                <div className="font-display text-[34px] font-semibold leading-none tracking-[-0.02em] text-accent">
                  {s.stat}
                </div>
                <div className="mt-3 text-[15px] font-bold text-ink">{s.title}</div>
                <div className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== The insight ============================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">The insight</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(26px,3.4vw,36px)] font-semibold leading-tight tracking-[-0.02em]">
            The problem was never productivity.{" "}
            <span className="text-accent">It was always fragmentation.</span>
          </h2>

          <div className="mt-8 grid gap-[18px] md:grid-cols-3">
            {INSIGHTS.map((i) => (
              <div key={i.num} className="card h-full">
                <div className="index-num">{i.num}</div>
                <h3 className="mt-3 text-[17px] font-bold">{i.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{i.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== The conviction =========================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">The conviction</span>
          <h2 className="mt-3 font-display text-[26px] font-semibold tracking-[-0.01em]">
            Why I&apos;m the one to build this.
          </h2>

          <div className="mt-7 grid gap-[22px] md:grid-cols-3">
            {CONVICTIONS.map((c) => (
              <div key={c.title} className="card h-full">
                <h3 className="text-[17px] font-bold">{c.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[20px] border border-line bg-[#fbfbfd] p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
              My unfair advantage
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {UNFAIR_ADVANTAGES.map((u) => (
                <li
                  key={u}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-ink shadow-card"
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Retention moat =========================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">The retention moat</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(26px,3.4vw,36px)] font-semibold leading-tight tracking-[-0.02em]">
            Pyngyn gets smarter the more you use it.
          </h2>

          <ol className="mt-7 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {RETENTION_LOOP.map((s) => (
              <li
                key={s.step}
                className="rounded-2xl border border-line bg-white p-5 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-white font-mono text-[14px] font-bold">
                    {s.step}
                  </span>
                  <div className="text-[14.5px] font-semibold text-ink">{s.title}</div>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-5 max-w-[760px] text-[14.5px] leading-relaxed text-muted">
            <strong className="text-ink">Result:</strong> near-zero churn after 6 months, Pyngyn
            becomes the firm&apos;s institutional memory.
          </p>
        </section>

        {/* ===== Why now ================================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">Why now</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(26px,3.4vw,36px)] font-semibold leading-tight tracking-[-0.02em]">
            The tailwinds have never been stronger.
          </h2>

          <div className="mt-7 space-y-4">
            {TAILWINDS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-card"
              >
                <h3 className="text-[16.5px] font-bold leading-snug">{t.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Closing manifesto ======================================== */}
        <section className="wrap py-[40px]">
          <div className="rounded-[24px] border border-line bg-[#0b0d12] p-8 text-white shadow-art md:p-12">
            <span className="eyebrow-dark">In closing</span>
            <p className="mt-4 max-w-[820px] font-display text-[clamp(24px,3.4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em]">
              I spent 6 years inside the tools that failed PS firms.{" "}
              <span className="text-accent">Now I&apos;m building the one that doesn&apos;t.</span>
            </p>
            <p className="mt-5 max-w-[680px] text-[15.5px] leading-relaxed text-white/70">
              We&apos;re building the intelligence layer PS firms will run on. Seeking strategic
              partners who understand that the future of work is smarter integration.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link href={DEMO_URL} className="btn bg-white text-ink hover:bg-white/90">
                Book a 20-minute conversation →
              </Link>
              <Link
                href="/solutions/professional-services"
                className="btn border border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                See the platform
              </Link>
            </div>
            <div className="mt-6 text-[13px] text-white/55">
              <a className="hover:text-white" href="mailto:vivek.pandey@pyngyn.com">
                vivek.pandey@pyngyn.com
              </a>{" "}
              · pyngyn.ai
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
