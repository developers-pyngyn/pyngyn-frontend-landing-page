import React from "react";

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection({
  title = "Frequently asked questions.",
  eyebrow = "FAQ",
  description,
  faqs,
  className = "",
  columns = 1,
  id = "faq",
  theme = "light",
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
  faqs: FaqItem[];
  className?: string;
  columns?: 1 | 2;
  id?: string;
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <section id={id} className={`section ${isDark ? "bg-[#0b0d12] text-white" : "bg-[#fbfbfd] text-ink"} ${className}`}>
      <div className={`wrap ${columns === 1 ? "max-w-[880px]" : ""}`}>
        <div className="text-center">
          <span className={isDark ? "eyebrow-dark" : "eyebrow"}>
            <span className={isDark ? "h-1.5 w-1.5 rounded-full bg-accent" : "eyebrow-dot"} aria-hidden="true" />
            {eyebrow}
          </span>
          <h2
            className={`mt-3 font-display text-[clamp(26px,3.4vw,40px)] font-bold tracking-[-0.025em] ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`lead mx-auto mt-3 max-w-[640px] ${
                isDark ? "text-white/65" : "text-muted"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {columns === 2 ? (
          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
            {faqs.map((f, idx) => (
              <details
                key={f.q}
                open={idx === 0}
                className={`group rounded-[18px] border p-5 sm:p-6 transition-all duration-200 ${
                  isDark
                    ? "border-white/10 bg-white/[0.03] hover:border-white/20"
                    : "border-slate-200/80 bg-white shadow-card hover:shadow-card-hover"
                }`}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-[16px] font-bold list-none">
                  <h3
                    className={`text-[16px] font-bold leading-snug ${
                      isDark ? "text-white" : "text-ink"
                    }`}
                  >
                    {f.q}
                  </h3>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-open:rotate-180 ${
                      isDark
                        ? "bg-white/10 text-white group-open:bg-accent/20 group-open:text-accent"
                        : "bg-slate-100 text-slate-500 group-open:bg-accent/10 group-open:text-accent"
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p
                  className={`mt-3 text-[14.5px] leading-relaxed border-t pt-3 ${
                    isDark
                      ? "border-white/10 text-white/70"
                      : "border-slate-100 text-muted"
                  }`}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {faqs.map((f, idx) => (
              <details
                key={f.q}
                open={idx === 0}
                className={`group rounded-[18px] border p-5 sm:p-6 transition-all duration-200 ${
                  isDark
                    ? "border-white/10 bg-white/[0.03] hover:border-white/20"
                    : "border-slate-200/80 bg-white shadow-card hover:shadow-card-hover"
                }`}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-[16.5px] font-bold list-none">
                  <h3
                    className={`text-[16.5px] font-bold leading-snug ${
                      isDark ? "text-white" : "text-ink"
                    }`}
                  >
                    {f.q}
                  </h3>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-open:rotate-180 ${
                      isDark
                        ? "bg-white/10 text-white group-open:bg-accent/20 group-open:text-accent"
                        : "bg-slate-100 text-slate-500 group-open:bg-accent/10 group-open:text-accent"
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p
                  className={`mt-3 text-[14.5px] leading-relaxed border-t pt-3 ${
                    isDark
                      ? "border-white/10 text-white/70"
                      : "border-slate-100 text-muted"
                  }`}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
