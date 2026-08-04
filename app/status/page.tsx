import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Status | PYNGYN",
  description: "Live status of PYNGYN services.",
  alternates: { canonical: "/status" },
};

const systems: { name: string; status: string }[] = [
  { name: "Web app", status: "Operational" },
  { name: "API", status: "Operational" },
  { name: "AI planning", status: "Operational" },
  { name: "Integrations", status: "Operational" },
  { name: "Notifications", status: "Operational" },
];

export default function StatusPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/status",
            name: "System status | PYNGYN",
            description: "Live status of PYNGYN services.",
            breadcrumbId: "/status#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Status", url: "/status" },
            ],
            "/status"
          ),
          itemListSchema({
            url: "/status",
            name: "PYNGYN system components",
            items: systems.map((s) => ({
              name: s.name,
              description: s.status,
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main" className="wrap pb-[104px] pt-[150px]">
        <span className="eyebrow">Status</span>
        <h1 className="mt-3 font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
          System status.
        </h1>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-line bg-[#e6f5ee] px-5 py-4">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-positive text-white" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[16px] font-semibold text-positive">All systems operational</span>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          {systems.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-center justify-between px-5 py-4 ${
                i < systems.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span className="text-[16px] font-medium">{s.name}</span>
              <span className="flex items-center gap-2 text-[14px] font-semibold text-positive">
                <span className="h-2 w-2 rounded-full bg-positive" aria-hidden="true" />
                {s.status}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[15px] text-muted">
          For incident history or to subscribe to updates, contact support@pyngyn.com.
        </p>
      </main>
      <Footer />
    </>
  );
}
