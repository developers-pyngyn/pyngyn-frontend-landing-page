import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "@/components/schema";

// ---------------------------------------------------------------------------
// Rich inline text: supports **bold**, [label](url) links, and bare emails —
// enough to render legal copy without needing raw JSX in every content array.
// ---------------------------------------------------------------------------
function renderRich(text: string) {
  const nodes: React.ReactNode[] = [];
  // Split on markdown-style links and bold markers, keeping delimiters.
  const tokenRe = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRe).filter((p) => p !== "");
  parts.forEach((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      nodes.push(
        isExternal ? (
          <a key={i} href={href} className="text-accent underline underline-offset-2 hover:text-ink">
            {label}
          </a>
        ) : (
          <Link key={i} href={href} className="text-accent underline underline-offset-2 hover:text-ink">
            {label}
          </Link>
        )
      );
    } else if (boldMatch) {
      nodes.push(<strong key={i}>{boldMatch[1]}</strong>);
    } else {
      nodes.push(<span key={i}>{part}</span>);
    }
  });
  return nodes;
}

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "contact"; heading?: string; lines: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
  /** Set true to suppress the auto "N." numbering prefix (e.g. for Annexes). */
  noNumber?: boolean;
};

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[16px] leading-[1.7] text-ink">{renderRich(block.text)}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[16px] leading-[1.6] text-ink">
              <span className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full bg-muted" aria-hidden="true" />
              <span>{renderRich(it)}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-[14px] border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="bg-[#fbfbfd]">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-line px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri !== block.rows.length - 1 ? "border-b border-line" : ""}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 align-top leading-[1.6] text-ink">
                      {renderRich(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "contact":
      return (
        <div className="rounded-[14px] border border-line bg-[#fbfbfd] p-5">
          {block.heading && <div className="mb-1.5 text-[14px] font-bold text-ink">{block.heading}</div>}
          <div className="flex flex-col gap-1 text-[14.5px] leading-[1.6] text-ink">
            {block.lines.map((l, i) => (
              <div key={i}>{renderRich(l)}</div>
            ))}
          </div>
        </div>
      );
  }
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
  url,
  readAlongside,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  // Optional canonical URL — when provided, emits WebPage + Breadcrumb JSON-LD.
  url?: string;
  // Optional "Read alongside our Privacy Policy and DPA" style line under the date.
  readAlongside?: string;
}) {
  let counter = 0;
  return (
    <>
      {url && (
        <JsonLd
          data={[
            webPageSchema({
              url,
              name: `${title} | PYNGYN`,
              description: intro,
              breadcrumbId: `${url}#breadcrumb`,
              dateModified: updated,
            }),
            breadcrumbSchema(
              [
                { name: "Home", url: "/" },
                { name: title, url },
              ],
              url
            ),
          ]}
        />
      )}
      <Navbar />
      <main id="main" className="wrap pb-[104px] pt-[150px]">
        <article className="mx-auto max-w-[820px]">
          <h1 className="font-display text-[clamp(32px,4.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em]">
            {title}
          </h1>
          <p className="mt-3 text-[14px] text-muted">Last updated: {updated}</p>
          {readAlongside && (
            <p className="mt-1.5 text-[14px] text-muted">{renderRich(readAlongside)}</p>
          )}
          <p className="mt-6 text-[17px] leading-[1.7] text-ink">{renderRich(intro)}</p>

          <div className="mt-10 flex flex-col gap-9">
            {sections.map((s, i) => {
              if (!s.noNumber) counter += 1;
              return (
                <section key={i}>
                  <h2 className="font-display text-[22px] font-semibold tracking-[-0.01em]">
                    {s.noNumber ? s.heading : `${counter}. ${s.heading}`}
                  </h2>
                  <div className="mt-3 flex flex-col gap-3.5">
                    {s.blocks.map((b, j) => (
                      <Block key={j} block={b} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
