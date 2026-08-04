import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  breadcrumbSchema,
  itemListSchema,
  jobPostingSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Careers | PYNGYN",
  description:
    "Join PYNGYN and help build the operating system for professional-services firms. See open roles.",
  alternates: { canonical: "/careers" },
};

const perks: [string, string][] = [
  ["Remote-first", "Work from wherever you do your best work, with flexible hours."],
  ["Real ownership", "Small team, big surface area. Your work ships and matters."],
  ["Build with AI", "Work at the frontier of applied AI in a product people use daily."],
  ["Health & time off", "Competitive benefits and a genuinely respected vacation policy."],
];

const roles: { title: string; team: string; location: string }[] = [
  { title: "Senior Full-Stack Engineer", team: "Engineering", location: "Remote" },
  { title: "Product Designer", team: "Design", location: "Remote" },
  { title: "Founding Account Executive", team: "Sales", location: "Remote / US" },
  { title: "Developer Advocate", team: "Marketing", location: "Remote" },
];

// Where applications go for now. Swap for your real careers inbox / ATS link.
const APPLY_EMAIL = "mailto:careers@pyngyn.com";

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/careers",
            name: "Careers | PYNGYN",
            description:
              "Open roles at PYNGYN. Help build the operating system for professional-services firms.",
            breadcrumbId: "/careers#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Careers", url: "/careers" },
            ],
            "/careers"
          ),
          itemListSchema({
            url: "/careers",
            name: "Open roles at PYNGYN",
            items: roles.map((r) => ({
              name: r.title,
              description: `${r.team} · ${r.location}`,
              url: "/careers",
            })),
          }),
          ...roles.map((r) =>
            jobPostingSchema({
              title: r.title,
              team: r.team,
              location: r.location,
              applyEmail: APPLY_EMAIL,
              pageUrl: "/careers",
            })
          ),
        ]}
      />
      <Navbar />
      <main id="main" className="wrap pb-[104px] pt-[150px]">
        <span className="eyebrow">Careers</span>
        <h1 className="mt-3 max-w-[760px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
          Help us give teams their time back.
        </h1>
        <p className="lead mt-5 max-w-[660px]">
          We&apos;re a small team building something a lot of people will use every day. If
          that sounds like your kind of problem, we&apos;d love to hear from you.
        </p>

        <div className="mt-[50px] grid gap-[22px] md:grid-cols-2 lg:grid-cols-4">
          {perks.map(([title, body]) => (
            <div key={title} className="card h-full">
              <h3 className="text-[17px] font-bold">{title}</h3>
              <p className="mt-2 text-[14.5px] text-muted">{body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-[72px] font-display text-[26px] font-semibold tracking-[-0.01em]">
          Open roles
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          {roles.map((r, i) => (
            <a
              key={r.title}
              href={APPLY_EMAIL}
              className={`flex flex-wrap items-center gap-3 px-5 py-4 transition-colors hover:bg-[#fbfbfd] ${
                i < roles.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span className="text-[16px] font-semibold">{r.title}</span>
              <span className="rounded-full bg-accent-lt px-2.5 py-0.5 text-[12px] font-semibold text-accent-dk">
                {r.team}
              </span>
              <span className="text-[14px] text-muted">{r.location}</span>
              <span className="ml-auto text-[14px] font-semibold text-accent">Apply →</span>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-[#fbfbfd] p-7">
          <h2 className="font-display text-[20px] font-semibold">Don&apos;t see your role?</h2>
          <p className="mt-2 text-[15px] text-muted">
            We&apos;re always glad to meet talented people. Tell us how you&apos;d help.
          </p>
          <a href={APPLY_EMAIL} className="btn btn-ghost mt-4">
            Get in touch
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
