import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { ProjectPlanGenerator } from "@/components/ProjectPlanGenerator";
import { ToolConversionBridge } from "@/components/ToolConversionBridge";
import { DEMO_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Free Engagement Plan Generator | PYNGYN",
  description:
    "Describe your project in plain English and get a complete plan in seconds: phases, tasks, owners, milestones, a suggested team, risks, and cadence. Free, no signup. Export to Markdown or CSV.",
  alternates: { canonical: "/tools/ai-project-plan" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Free Engagement Plan Generator | PYNGYN",
    description:
      "Turn a plain-English brief into a structured project plan in seconds. Phases, tasks, owners, milestones, team, risks. Free, no signup.",
    type: "website",
    url: "/tools/ai-project-plan",
  },
};

const TOOL_FAQS: { q: string; a: string }[] = [
  {
    q: "Is the Engagement Plan Generator free?",
    a: "Yes. It is free to use with no signup or credit card. Generate as many plans as you like and export them to Markdown or CSV.",
  },
  {
    q: "What kind of plan does it produce?",
    a: "A structured plan with phases, tasks, effort estimates, owners by role, milestones, a suggested team composition, the top risks with mitigations, and a recommended meeting cadence.",
  },
  {
    q: "Who is this built for?",
    a: "It is tuned for professional-services and consulting work: client engagements, implementations, migrations, audits, and internal initiatives at mid-market firms.",
  },
  {
    q: "Can I edit or export the plan?",
    a: "Yes. Copy the plan as Markdown, download it as a Markdown file, or export the task list as a CSV you can open in any spreadsheet.",
  },
  {
    q: "How is this different from using PYNGYN?",
    a: "This tool gives you a static starting draft. In PYNGYN, the same plan becomes a living project: assignable tasks, owners, timelines, and status that update automatically as work happens. Book a demo to see it run.",
  },
];

export default function ProjectPlanToolPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/tools/ai-project-plan",
            name: "Free Engagement Plan Generator | PYNGYN",
            description:
              "Describe your project in plain English and get a complete plan in seconds: phases, tasks, owners, milestones, a suggested team, risks, and cadence.",
            breadcrumbId: "/tools/ai-project-plan#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "Engagement Plan Generator", url: "/tools/ai-project-plan" },
            ],
            "/tools/ai-project-plan"
          ),
          faqPageSchema(TOOL_FAQS, "/tools/ai-project-plan"),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* Light hero (dark hero is reserved for home + KB per design system) */}
        <section className="wrap pb-[10px] pt-[140px] text-center">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Free tool
          </span>
          <h1 className="mx-auto mt-3 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Turn a brief into a project plan in seconds.
          </h1>
          <p className="lead mx-auto mt-5">
            Describe the work in plain language. Get phases, tasks, owners, milestones, a
            suggested team, the top risks, and a meeting cadence. Free, no signup, export anywhere.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            {["No signup", "Export to Markdown / CSV", "Built for services firms"].map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {b}
              </span>
            ))}
          </div>
        </section>

        <div className="pt-12">
          <ProjectPlanGenerator />
        </div>

        {/* SEO content + FAQ */}
        <section className="section-tight">
          <div className="wrap max-w-[820px]">
            <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />How it works</span>
            <h2 className="title mt-3">From plain English to a working plan.</h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                Scoping a new engagement usually means a blank document, a few reference decks, and
                an hour of staring before the structure appears. This generator removes the blank-page
                problem. You tell it what the work is, how long you have, and who is on the team, and
                it returns a plan you can react to instead of one you have to invent.
              </p>
              <p>
                The output follows the shape professional-services teams already use: a discovery phase
                that locks scope, a design phase that earns sign-off, a build phase that does the work,
                and a rollout phase that lands adoption. Each phase carries tasks with effort estimates,
                an owning role, and a milestone that defines done. You also get a staffing suggestion,
                the three risks most likely to derail the work, and a cadence so the team stays aligned.
              </p>
              <p>
                Treat it as a first draft, not the final word. Edit the Markdown, drop the task CSV into
                your spreadsheet, or bring it into PYNGYN where the plan becomes a living project that
                updates itself as work moves.
              </p>
            </div>

            <div className="mt-12">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />FAQ</span>
              <h2 className="title mt-3">Questions, answered.</h2>
              <dl className="mt-6 divide-y divide-line">
                {TOOL_FAQS.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[17px] font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <ToolConversionBridge
          title="Turn this plan into tasks with owners, deadlines, and a client who can see it."
          body="Workspace turns this draft into a real project: owners, deadlines, and AI keeping status current as work moves. Add Clientspace and the client watching this engagement sees progress in their own branded portal, no separate update required."
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
