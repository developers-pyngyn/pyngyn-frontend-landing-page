import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "@/components/schema";

export type ContentSection = { heading: string; body: string };

export function ContentPage({
  eyebrow,
  title,
  intro,
  sections,
  showCTA = true,
  url,
  metaTitle,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections?: ContentSection[];
  showCTA?: boolean;
  // Optional canonical URL for the page (e.g. "/brand"). When provided,
  // ContentPage emits a WebPage + BreadcrumbList JSON-LD block automatically.
  url?: string;
  // Optional override for the schema page name; defaults to `${eyebrow} | PYNGYN`.
  metaTitle?: string;
}) {
  return (
    <>
      {url && (
        <JsonLd
          data={[
            webPageSchema({
              url,
              name: metaTitle ?? `${eyebrow} | PYNGYN`,
              description: intro,
              breadcrumbId: `${url}#breadcrumb`,
            }),
            breadcrumbSchema(
              [
                { name: "Home", url: "/" },
                { name: eyebrow, url },
              ],
              url
            ),
          ]}
        />
      )}
      <Navbar />
      <main id="main">
        <section className="wrap pb-[40px] pt-[150px]">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-3 max-w-[760px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {title}
          </h1>
          <p className="lead mt-5">{intro}</p>
        </section>

        {sections && sections.length > 0 && (
          <section className="wrap pb-[60px]">
            <div className="grid gap-[22px] md:grid-cols-2">
              {sections.map((s) => (
                <div key={s.heading} className="card h-full">
                  <h2 className="text-[18px] font-bold">{s.heading}</h2>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {showCTA && <FinalCTA />}
      </main>
      <Footer />
    </>
  );
}
