import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import {
  JsonLd,
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Changelog | PYNGYN",
  description: "What's new in PYNGYN.",
  alternates: { canonical: "/changelog" },
};

type Entry = { date: string; tag: string; title: string; points: string[] };

const entries: Entry[] = [
  {
    date: "May 2026",
    tag: "New",
    title: "Industry solution views",
    points: [
      "Tailored planning templates for law firms, accounting and CA firms, consultancies, agencies, creative studios, and architecture practices.",
      "Each view comes with example boards so firms can start from something real.",
    ],
  },
  {
    date: "April 2026",
    tag: "Improved",
    title: "Smarter risk detection",
    points: [
      "Risk flags now factor in dependency shape, not just due dates.",
      "Fewer false alarms: PYNGYN surfaces the one or two things that actually threaten the date.",
    ],
  },
  {
    date: "March 2026",
    tag: "New",
    title: "Pyng, your AI assistant",
    points: [
      "Ask Pyng questions about your plan and PYNGYN right from the site.",
      "Powered by fast inference so answers come back quickly.",
    ],
  },
  {
    date: "February 2026",
    tag: "Improved",
    title: "One-click import",
    points: [
      "Bring projects across from common trackers with field mapping handled automatically.",
    ],
  },
];

const tagColor: Record<string, string> = {
  New: "bg-accent-lt text-accent-dk",
  Improved: "bg-[#e6f5ee] text-positive",
};

export default function ChangelogPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/changelog",
            name: "Changelog | PYNGYN",
            description:
              "Latest improvements, features, and fixes shipped to PYNGYN.",
            breadcrumbId: "/changelog#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Changelog", url: "/changelog" },
            ],
            "/changelog"
          ),
          itemListSchema({
            url: "/changelog",
            name: "PYNGYN changelog",
            items: entries.map((e) => ({
              name: `${e.title} (${e.date})`,
              description: e.points.join(" "),
              url: "/changelog",
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[40px] pt-[150px]">
          <span className="eyebrow">Changelog</span>
          <h1 className="mt-3 font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            What&apos;s new in PYNGYN.
          </h1>
          <p className="lead mt-5">The latest improvements, features, and fixes.</p>
        </section>

        <section className="wrap pb-[60px]">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5">
            {entries.map((e) => (
              <article key={e.title} className="card">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-muted">{e.date}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tagColor[e.tag] ?? "bg-line text-muted"}`}>
                    {e.tag}
                  </span>
                </div>
                <h2 className="mt-2 text-[20px] font-bold">{e.title}</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[15px] text-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
