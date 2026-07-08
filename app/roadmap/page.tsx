import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { SUPPORT_URL, ANNOUNCEMENTS_URL } from "@/components/config";
import { RoadmapUpvote } from "@/components/RoadmapUpvote";
import {
  JsonLd,
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Roadmap | PYNGYN",
  description: "See what the PYNGYN team is planning, building, and has recently shipped.",
  alternates: { canonical: "/roadmap" },
};

type RoadmapItem = { title: string; body: string; tag?: string; votes: number };

const COLUMNS: { key: string; label: string; blurb: string; color: string; items: RoadmapItem[] }[] = [
  {
    key: "planned",
    label: "Planned",
    blurb: "On the way",
    color: "#6b7280",
    items: [
      { title: "Portfolio dashboards", body: "Roll up health, risk, and progress across every project in one view.", tag: "Reporting", votes: 312 },
      { title: "Custom fields", body: "Track the data your team cares about on any task or project.", tag: "Platform", votes: 268 },
      { title: "Workload balancing", body: "See who's overloaded and rebalance assignments in a click.", tag: "Resourcing", votes: 197 },
      { title: "More integrations", body: "Deeper connections with the tools you asked for most.", tag: "Integrations", votes: 154 },
    ],
  },
  {
    key: "in-progress",
    label: "In progress",
    blurb: "Building now",
    color: "#4f46e5",
    items: [
      { title: "Mobile app improvements", body: "A faster, fuller experience for managing work on the go.", tag: "Mobile", votes: 421 },
      { title: "Automations builder", body: "Trigger actions across PYNGYN and your stack without code.", tag: "Automation", votes: 389 },
      { title: "Advanced permissions", body: "Granular roles and access controls for larger teams.", tag: "Admin", votes: 203 },
    ],
  },
  {
    key: "shipped",
    label: "Completed",
    blurb: "Recently delivered",
    color: "#0b7a4b",
    items: [
      { title: "AI risk detection", body: "Catch slips before they happen, now on every plan.", tag: "AI", votes: 508 },
      { title: "Read-only client views", body: "Share progress with clients without giving up control.", tag: "Collaboration", votes: 276 },
      { title: "Faster imports", body: "Bring projects from other tools in up to 3x less time.", tag: "Onboarding", votes: 187 },
    ],
  },
];

export default function RoadmapPage() {
  const allItems = COLUMNS.flatMap((col) =>
    col.items.map((it) => ({
      name: `${it.title}, ${col.label}`,
      description: it.body,
      url: "/roadmap",
    }))
  );
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/roadmap",
            name: "Roadmap | PYNGYN",
            description:
              "What the PYNGYN team is planning, building, and has recently shipped.",
            breadcrumbId: "/roadmap#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Roadmap", url: "/roadmap" },
            ],
            "/roadmap"
          ),
          itemListSchema({
            url: "/roadmap",
            name: "PYNGYN public roadmap",
            items: allItems,
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[10px] pt-[150px] text-center">
          <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Roadmap</span>
          <h1 className="mx-auto mt-3 max-w-[720px] font-display text-[clamp(34px,4.8vw,54px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            What we&apos;re building next.
          </h1>
          <p className="lead mx-auto mt-5">
            A look at what&apos;s planned, in progress, and recently shipped. Priorities can
            shift, but this is where our heads are.
          </p>
        </section>

        <div className="wrap pb-[60px] pt-[44px]">
          <div className="grid gap-5 lg:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.key} className="rounded-[20px] border border-line bg-[#fbfbfd] p-4">
                <div className="flex items-center gap-2.5 px-2 pb-3 pt-1">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: col.color }} aria-hidden="true" />
                  <h2 className="text-[15px] font-bold">{col.label}</h2>
                  <span className="text-[13px] text-muted">· {col.blurb}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {col.items.map((it) => (
                    <div key={it.title} className="flex gap-3 rounded-[14px] border border-line bg-white p-4 shadow-card">
                      <RoadmapUpvote
                        id={`${col.key}:${it.title}`}
                        initialVotes={it.votes}
                        color={col.color}
                      />
                      <div>
                        {it.tag && (
                          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: col.color }}>
                            {it.tag}
                          </span>
                        )}
                        <h3 className="mt-1.5 font-display text-[16px] font-semibold tracking-[-0.01em]">{it.title}</h3>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{it.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Request a feature CTA */}
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-8 text-center shadow-card">
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em]">Have something to suggest?</h2>
            <p className="max-w-[460px] text-[15px] text-muted">
              The roadmap is shaped by what teams like yours need. Tell us what would make
              PYNGYN better and we&apos;ll take a look.
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-2.5">
              <a href={SUPPORT_URL} className="btn btn-primary">Request a feature →</a>
              <a href={ANNOUNCEMENTS_URL} className="btn btn-ghost">See what&apos;s new</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
