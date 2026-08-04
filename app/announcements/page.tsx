import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { ROADMAP_URL, CHANGELOG_URL } from "@/components/config";
import {
  JsonLd,
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Announcements | PYNGYN",
  description: "Product news, launches, and updates from the PYNGYN team.",
  alternates: { canonical: "/announcements" },
};

type Announcement = {
  date: string;
  tag: "Launch" | "Update" | "Company" | "Event";
  title: string;
  body: string;
};

const TAG_COLOR: Record<Announcement["tag"], string> = {
  Launch: "#4f46e5",
  Update: "#0d9488",
  Company: "#9333ea",
  Event: "#f97316",
};

// Edit these entries to post new announcements.
const ANNOUNCEMENTS: Announcement[] = [
  { date: "May 22, 2026", tag: "Launch", title: "AI risk detection is now generally available", body: "PYNGYN now watches workload, deadlines, and dependencies across every engagement and flags what threatens your dates, before they slip. Available on all plans today." },
  { date: "May 9, 2026", tag: "Update", title: "Faster imports from other tools", body: "Bringing your existing projects into PYNGYN is now up to 3x faster, with smarter field mapping that gets owners and statuses right the first time." },
  { date: "Apr 28, 2026", tag: "Update", title: "New: shareable read-only client views", body: "Give clients and stakeholders a clean, always-current view of progress without giving them edit access or a seat." },
  { date: "Apr 14, 2026", tag: "Company", title: "PYNGYN raises to accelerate its operating system for professional-services firms", body: "We're investing in the team and the product so growing firms can run every project with less overhead. Thank you to our customers for getting us here." },
  { date: "Mar 30, 2026", tag: "Event", title: "Join our live walkthrough webinar", body: "See how teams go from a one-line goal to a living plan in minutes. We host a live demo and Q&A every other week, register from the demo page." },
];

export default function AnnouncementsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/announcements",
            name: "Announcements | PYNGYN",
            description:
              "Product news, launches, and updates from the PYNGYN team.",
            breadcrumbId: "/announcements#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Announcements", url: "/announcements" },
            ],
            "/announcements"
          ),
          itemListSchema({
            url: "/announcements",
            name: "PYNGYN announcements",
            items: ANNOUNCEMENTS.map((a) => ({
              name: `${a.title} (${a.date})`,
              description: a.body,
              url: "/announcements",
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[10px] pt-[150px] text-center">
          <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Announcements</span>
          <h1 className="mx-auto mt-3 max-w-[720px] font-display text-[clamp(34px,4.8vw,54px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            What&apos;s new at PYNGYN.
          </h1>
          <p className="lead mx-auto mt-5">
            Launches, product updates, and news from the team. Looking for granular release
            notes? See the{" "}
            <a href={CHANGELOG_URL} className="font-semibold text-accent">changelog</a>.
          </p>
        </section>

        <div className="wrap max-w-[760px] pb-[70px] pt-[40px]">
          <ol className="flex flex-col gap-5">
            {ANNOUNCEMENTS.map((a) => (
              <li key={a.title} className="rounded-[18px] border border-line bg-white p-6 shadow-card sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[12px] font-semibold"
                    style={{ backgroundColor: `${TAG_COLOR[a.tag]}1a`, color: TAG_COLOR[a.tag] }}
                  >
                    {a.tag}
                  </span>
                  <span className="text-[13px] text-muted">{a.date}</span>
                </div>
                <h2 className="mt-3 font-display text-[22px] font-semibold tracking-[-0.015em]">{a.title}</h2>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{a.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-line bg-[#fbfbfd] p-7 text-center">
            <h2 className="font-display text-[20px] font-semibold">Curious what&apos;s coming next?</h2>
            <p className="mx-auto mt-2 max-w-[440px] text-[15px] text-muted">
              See what the team is planning and building on our public roadmap.
            </p>
            <a href={ROADMAP_URL} className="btn btn-primary mt-4">View the roadmap →</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
