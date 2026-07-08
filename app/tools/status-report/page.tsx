import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { StatusReportGenerator } from "@/components/StatusReportGenerator";
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
  title: "Free Status Report Generator | PYNGYN",
  description:
    "Turn rough weekly notes into a clean client-ready status report in seconds: status colour, TL;DR, completed, in-flight, blockers, asks, and next week. Free, no signup. Export to Markdown, email, or Slack.",
  alternates: { canonical: "/tools/status-report" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Free Status Report Generator | PYNGYN",
    description:
      "Paste your raw weekly notes. Get a clean, client-ready status update in 30 seconds. Free, no signup.",
    type: "website",
    url: "/tools/status-report",
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does the status report generator do?",
    a: "It takes the messy notes you'd normally turn into a Friday client update (bullets, headers, half-sentences), and returns a clean, structured report with a status colour, TL;DR, what's done, what's in flight, blockers, asks, and next week. You can copy it as Markdown, an email, a Slack message, or plain text.",
  },
  {
    q: "Will the AI invent things that aren't in my notes?",
    a: "No. The system prompt explicitly tells the AI to restructure and clean up only what you wrote. If a section has no input, it stays empty. If something is ambiguous in your notes, the report keeps it ambiguous rather than guessing.",
  },
  {
    q: "How does the green/yellow/red status get set?",
    a: "It's inferred from the notes you provide. Green means no significant issues raised. Yellow means at least one blocker or risk that is recoverable. Red means multiple blockers or material risk to dates. You can always edit the status colour after generation.",
  },
  {
    q: "Does the audience setting change the facts?",
    a: "No, only the tone. Client mode reads more formally and focuses on outcomes and asks. Internal mode is more candid and includes team-side details. Exec mode trims aggressively to status colour, TL;DR, and asks.",
  },
  {
    q: "Is the tool free?",
    a: "Yes. It is free with no signup. Generate as many reports as you like and export to Markdown, email, Slack, or plain text.",
  },
  {
    q: "How is this different from PYNGYN itself?",
    a: "This tool cleans up notes you've already gathered. In PYNGYN, the weekly status drafts itself from the actual work (commits, tasks, calendar, threads), so the update is already written by Friday morning. Book a demo to see it run.",
  },
];

export default function StatusReportToolPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/tools/status-report",
            name: "Free Status Report Generator | PYNGYN",
            description:
              "Turn rough weekly notes into a clean client-ready status report in seconds.",
            breadcrumbId: "/tools/status-report#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "Status Report Generator", url: "/tools/status-report" },
            ],
            "/tools/status-report"
          ),
          faqPageSchema(FAQS, "/tools/status-report"),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[10px] pt-[140px] text-center">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Free tool
          </span>
          <h1 className="mx-auto mt-3 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Paste your week. Send a clean update.
          </h1>
          <p className="lead mx-auto mt-5">
            Drop your raw notes from the week. PYNGYN turns them into a clean,
            client-ready status report, status colour, TL;DR, completed, blockers, asks,
            next week. Free, no signup, export to Markdown, email, or Slack.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            {["No signup", "Nothing invented", "Markdown / email / Slack"].map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {b}
              </span>
            ))}
          </div>
        </section>

        <div className="pt-12">
          <StatusReportGenerator />
        </div>

        {/* Method + FAQ */}
        <section className="section-tight">
          <div className="wrap max-w-[820px]">
            <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />The method</span>
            <h2 className="title mt-3">Cleanup, not creativity.</h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                A weekly status update is usually a thirty-minute job that nobody
                enjoys. You stare at Slack, your task board, and your calendar, and
                try to translate a week of work into a clean message that respects
                the reader. Most of that work is structural, reformatting what you
                already know into a shape your audience can scan in twenty seconds.
              </p>
              <p>
                That structural work is what this tool automates. You paste your
                rough notes, the AI groups them into the standard shape of a weekly
                update, sets a sensible status colour based on what you wrote, and
                returns text that is ready to send. It does not interview your team,
                check your repo, or guess at numbers. It only restructures what is in
                your notes. If your notes are sparse, the report is sparse.
              </p>
              <p>
                For the real automation, a status that drafts itself from the work,
                without you typing the notes in the first place,{" "}
                <a href={DEMO_URL} className="font-semibold text-accent hover:text-accent-dk">
                  book a demo
                </a>{" "}
                and see how PYNGYN does it inside a real engagement.
              </p>
            </div>

            <div className="mt-12">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />FAQ</span>
              <h2 className="title mt-3">Questions, answered.</h2>
              <dl className="mt-6 divide-y divide-line">
                {FAQS.map((f) => (
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
          title="Skip the copy-paste. Your client sees this status without you sending it."
          body="This tool turns your notes into an update you still have to send. Clientspace shows clients live status, deliverables, and approvals in their own branded portal, updated automatically as your team works in Workspace, no weekly write-up required."
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
