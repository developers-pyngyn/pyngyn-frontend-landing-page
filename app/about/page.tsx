import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Metrics } from "@/components/Sections";
import { FinalCTA, Footer } from "@/components/Footer";
import {
  JsonLd,
  aboutPageSchema,
  breadcrumbSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "About | PYNGYN",
  description:
    "PYNGYN builds Clientspace, a standalone branded client portal, and Workspace, the firm's back office, for professional-services firms. Learn why we're building it and what we believe.",
  alternates: { canonical: "/about" },
};

const values: [string, string][] = [
  ["Client experience over admin", "The best firms spend their time serving clients, not chasing updates and reporting. Clientspace removes the busywork that gets in the way of that relationship."],
  ["AI as a teammate", "Our AI drafts the plan and keeps it honest, but you stay in control. It assists; it never overrides."],
  ["Clarity by default", "Everyone should be able to see what's on track and what's at risk, without a meeting to find out."],
  ["Trust is earned", "Your data is yours. We're transparent about how PYNGYN works and how we handle your information."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageSchema({
            url: "/about",
            name: "About PYNGYN",
            description:
              "PYNGYN builds Clientspace and Workspace for professional-services firms. Our mission, story, and what we believe.",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ],
            "/about"
          ),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[20px] pt-[150px]">
          <span className="eyebrow">About</span>
          <h1 className="mt-3 max-w-[820px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            We&apos;re building the operating system for professional-services firms.
          </h1>
          <p className="lead mt-5 max-w-[680px]">
            That&apos;s two products: Clientspace, a standalone branded portal your clients log
            into, and Workspace, the back office your team runs on. PYNGYN started from a simple
            frustration, services firms spend more time feeding their tools than doing the
            client work those tools are supposed to track. We thought AI could flip that, so the
            system does the planning, status, and risk-watching, and people get back to serving
            clients.
          </p>
        </section>

        <section className="wrap py-[60px]">
          <div className="grid gap-[22px] md:grid-cols-2">
            <div className="card">
              <h2 className="font-display text-[22px] font-semibold">Our mission</h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-muted">
                Give every firm the clarity of a great operations team without the overhead.
                Workspace turns plain-language intent into a living plan that stays current on
                its own, and Clientspace shows the client that same picture without anyone
                writing a status update.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-[22px] font-semibold">Our story</h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-muted">
                Founded by people who&apos;d run too many projects across spreadsheets, chat
                threads, and trackers that went stale by Monday, and clients who found out about
                delays by asking. Workspace and Clientspace are the tools we wished we&apos;d
                had, now built with AI at their core.
              </p>
              <p className="mt-4">
                <Link
                  href="/about/founder-story"
                  className="text-[14.5px] font-semibold text-accent hover:underline"
                >
                  Read the founder story →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="wrap pb-[60px]">
          <h2 className="font-display text-[26px] font-semibold tracking-[-0.01em]">What we believe</h2>
          <div className="mt-7 grid gap-[22px] md:grid-cols-2">
            {values.map(([title, body]) => (
              <div key={title} className="card h-full">
                <h3 className="text-[18px] font-bold">{title}</h3>
                <p className="mt-2.5 text-[15px] text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <Metrics />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
