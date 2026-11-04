import Link from "next/link";
import type { ReactNode } from "react";
import type { PostBlock } from "./posts";

// Turns "[text](/path)" into links; internal paths use next/link.
function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href} className="font-medium text-accent underline underline-offset-2">
          {label}
        </Link>
      ) : (
        <a
          key={m.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline underline-offset-2"
        >
          {label}
        </a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function PostBody({
  blocks,
  className = "mt-9 text-[17px] text-ink",
}: {
  blocks: PostBlock[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 leading-[1.7] ${className}`}>
      {blocks.map((block, i) => {
        if (typeof block === "string") return <p key={i}>{renderInline(block)}</p>;
        if ("h2" in block)
          return (
            <h2
              key={i}
              className="mt-6 font-display text-[clamp(22px,2.6vw,28px)] font-semibold leading-snug tracking-[-0.02em]"
            >
              {block.h2}
            </h2>
          );
        if ("h3" in block)
          return (
            <h3 key={i} className="mt-2 font-display text-[19px] font-semibold leading-snug">
              {block.h3}
            </h3>
          );
        return (
          <ul key={i} className="flex list-disc flex-col gap-2 pl-6 marker:text-accent">
            {block.list.map((item, j) => (
              <li key={j}>{renderInline(item)}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

// Plain text with link markup stripped, for meta tags and JSON-LD.
export function stripLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1");
}
