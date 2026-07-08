import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, KB_URL, BLOG_URL } from "@/components/config";

export const metadata: Metadata = {
  title: "Guides | PYNGYN",
  description:
    "Practical, opinionated playbooks for planning work, keeping status honest, catching risk early, and rolling PYNGYN out across your team.",
  alternates: { canonical: "/guides" },
};

type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Planning" | "Status" | "Risk" | "Rollout" | "AI" | "Workflows";
  readingTime: string;
  featured?: boolean;
};

const GUIDES: Guide[] = [
  // Featured
  { slug: "plan-launch-in-an-afternoon", category: "Planning", readingTime: "8 min", featured: true,
    title: "Plan an engagement in an afternoon",
    excerpt: "Go from a one-line goal to a full plan with tasks, owners, and a realistic timeline. The framework we use to compress days of scoping into a single working session." },
  { slug: "kill-the-status-meeting", category: "Status", readingTime: "6 min", featured: true,
    title: "Kill the status meeting",
    excerpt: "How to let AI draft status from the actual work so your team reclaims the thirty minutes they spend reporting on it every week." },
  { slug: "spot-risk-before-it-bites", category: "Risk", readingTime: "7 min", featured: true,
    title: "Spot risk before it bites",
    excerpt: "Read the early signals (workload, deadlines, dependency shape), and act while there's still time to change the outcome instead of just announcing the slip." },

  // Planning
  { slug: "write-goals-ai-understands", category: "Planning", readingTime: "5 min",
    title: "Write a goal the AI actually understands",
    excerpt: "Small changes in how you phrase a goal produce dramatically better plans. A short reference with before-and-after examples." },
  { slug: "scope-without-padding", category: "Planning", readingTime: "6 min",
    title: "Scope without padding",
    excerpt: "Padding is what we add when we don't trust our estimates. Use signals from past engagements to plan tighter without burning the team." },
  { slug: "dependency-first-plans", category: "Planning", readingTime: "7 min",
    title: "Dependency-first planning",
    excerpt: "Map dependencies before tasks. It feels backwards, but it's the single biggest unlock for plans that don't unravel in week two." },

  // Status
  { slug: "make-status-self-update", category: "Status", readingTime: "5 min",
    title: "Make status self-update",
    excerpt: "Wire your work board to the work itself (email, calendar, deal stages), so the picture is always real without anyone touching it." },
  { slug: "the-2-line-update", category: "Status", readingTime: "4 min",
    title: "The 2-line update",
    excerpt: "A simple template for written updates that replace meetings, with examples from teams running real engagements." },

  // Risk
  { slug: "read-velocity-honestly", category: "Risk", readingTime: "6 min",
    title: "Read your throughput honestly",
    excerpt: "Throughput is a lagging indicator until you know what to compare it to. How to use it as an early warning rather than a vanity metric." },
  { slug: "the-friday-risk-review", category: "Risk", readingTime: "5 min",
    title: "The Friday risk review",
    excerpt: "A 15-minute weekly ritual that catches 80% of avoidable misses. What to look at, in what order, and how to act on it." },

  // Rollout
  { slug: "onboard-a-new-team", category: "Rollout", readingTime: "8 min",
    title: "Onboard a new team in week one",
    excerpt: "A simple sequence for moving an existing project into PYNGYN and getting everyone productive in the first week, not the first quarter." },
  { slug: "migrate-from-spreadsheets", category: "Rollout", readingTime: "7 min",
    title: "Migrate from spreadsheets without losing context",
    excerpt: "What to bring over, what to leave behind, and how to keep the institutional knowledge that was hiding in column J." },
  { slug: "rollout-across-multiple-pods", category: "Rollout", readingTime: "9 min",
    title: "Roll out across multiple teams or offices",
    excerpt: "A staged plan for going from one pilot team to firm-wide adoption without re-engineering everyone's workflow at once." },

  // AI
  { slug: "prompt-pyngyn-better", category: "AI", readingTime: "5 min",
    title: "Prompt PYNGYN better",
    excerpt: "The handful of phrasings that get sharper plans, better status drafts, and more useful risk callouts from the AI." },
  { slug: "when-to-override-the-ai", category: "AI", readingTime: "4 min",
    title: "When to override the AI",
    excerpt: "The AI is a great first draft, not a manager. Where it tends to be wrong, how to spot it, and how to correct it once." },

  // Workflows
  { slug: "client-engagement-workflow", category: "Workflows", readingTime: "8 min",
    title: "The client engagement workflow",
    excerpt: "End-to-end: intake → plan → execution → wrap-up → retro. The reference workflow we recommend for services firms." },
  { slug: "internal-initiative-workflow", category: "Workflows", readingTime: "6 min",
    title: "The internal initiative workflow",
    excerpt: "Internal projects fail differently from client work. A lighter workflow tuned for ambiguity, shifting priorities, and no external deadline pressure." },
];

const CATEGORIES = ["All", "Planning", "Status", "Risk", "Rollout", "AI", "Workflows"] as const;

const CATEGORY_COLOR: Record<string, string> = {
  Planning: "#4f46e5",
  Status: "#0d9488",
  Risk: "#dc2626",
  Rollout: "#9333ea",
  AI: "#f97316",
  Workflows: "#0ea5e9",
};

const featured = GUIDES.filter((g) => g.featured);
const byCategory = (cat: string) =>
  cat === "All" ? GUIDES : GUIDES.filter((g) => g.category === cat);

function GuideCard({ g, size = "default" }: { g: Guide; size?: "default" | "large" }) {
  const big = size === "large";
  return (
    <Link
      href={KB_URL}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden ${big ? "aspect-[16/8]" : "aspect-[16/9]"}`}
        style={{ background: `linear-gradient(135deg, ${CATEGORY_COLOR[g.category]}15, ${CATEGORY_COLOR[g.category]}05)` }}
        aria-hidden="true"
      >
        <div
          className="font-display text-[42px] font-bold opacity-25"
          style={{ color: CATEGORY_COLOR[g.category] }}
        >
          {g.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="font-mono font-semibold uppercase tracking-[0.12em]" style={{ color: CATEGORY_COLOR[g.category] }}>
            {g.category}
          </span>
          <span className="text-muted" aria-hidden="true">·</span>
          <span className="text-muted">{g.readingTime} read</span>
        </div>
        <h3 className={`mt-3 font-display font-semibold leading-snug tracking-[-0.015em] group-hover:text-accent ${big ? "text-[24px]" : "text-[20px]"}`}>
          {g.title}
        </h3>
        <p className={`mt-2.5 flex-1 leading-relaxed text-muted ${big ? "text-[16px]" : "text-[15px]"}`}>
          {g.excerpt}
        </p>
        <span className="mt-4 text-[13.5px] font-semibold text-accent">Read guide →</span>
      </div>
    </Link>
  );
}

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="wrap pb-2 pt-[140px] sm:pt-[160px]">
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                Guides
              </span>
              <h1 className="mt-4 max-w-[720px] font-display text-[clamp(34px,5vw,54px)] font-semibold leading-[1.04] tracking-[-0.025em]">
                Playbooks for professional-services firms.
              </h1>
              <p className="lead mt-5 max-w-[600px]">
                Practical, opinionated guides on planning work, keeping status honest, and
                catching risk early. Drawn from how high-performing teams actually run
                projects, not how the textbooks say they should.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-line bg-white p-6 shadow-card lg:block">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Looking for something specific?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Browse by category below, or check the{" "}
                <Link href={KB_URL} className="font-semibold text-accent hover:underline">knowledge base</Link>{" "}
                for step-by-step how-tos and the{" "}
                <Link href={BLOG_URL} className="font-semibold text-accent hover:underline">blog</Link>{" "}
                for what we&apos;re thinking about.
              </p>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="wrap pt-12 sm:pt-16">
          <div className="mb-7 flex items-end justify-between gap-6">
            <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em]">Featured</h2>
            <span className="text-[13px] text-muted">Start with these</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map((g) => <GuideCard key={g.slug} g={g} />)}
          </div>
        </section>

        {/* Browse by category */}
        <section className="wrap pt-14">
          <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em]">Browse by topic</h2>
          <p className="mt-2 text-[15px] text-muted">From a one-line goal to firm-wide rollout, guides for every stage.</p>

          {/* Category badges (purely visual jumplinks, anchor to sections below) */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c !== "All").map((c) => (
              <a
                key={c}
                href={`#cat-${c.toLowerCase()}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                style={{ borderLeft: `3px solid ${CATEGORY_COLOR[c]}` }}
              >
                {c}
                <span className="ml-2 text-[12px] text-muted">
                  {byCategory(c).length}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Per-category sections */}
        {CATEGORIES.filter((c) => c !== "All").map((cat) => {
          const items = byCategory(cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} id={`cat-${cat.toLowerCase()}`} className="wrap pt-12 sm:pt-14">
              <div className="mb-7 flex items-baseline gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLOR[cat] }}
                  aria-hidden="true"
                />
                <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em]">{cat}</h2>
                <span className="text-[13px] text-muted">· {items.length} {items.length === 1 ? "guide" : "guides"}</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((g) => <GuideCard key={g.slug} g={g} />)}
              </div>
            </section>
          );
        })}

        {/* Closing CTA */}
        <section className="wrap pb-16 pt-16 sm:pb-20">
          <div className="hero-dark relative overflow-hidden rounded-[28px] p-9 text-center sm:p-12">
            <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h2 className="mx-auto max-w-[620px] font-display text-[clamp(24px,3.4vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-white">
                Want a guide built around your team?
              </h2>
              <p className="mx-auto mt-3 max-w-[480px] text-[16px] leading-relaxed text-white/65">
                Book a 30-minute walkthrough and we&apos;ll map our playbook onto how your firm actually runs.
              </p>
              <a href={DEMO_URL} className="mt-7 inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5 hover:bg-accent-dk">
                Book a demo →
              </a>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
