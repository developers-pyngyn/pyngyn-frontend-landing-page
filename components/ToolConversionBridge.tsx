import { SIGNUP_URL, DEMO_URL } from "./config";

/**
 * Sits between a free tool's result/methodology and the generic <FinalCTA />.
 * Names the actual product (Clientspace and/or Workspace) and ties the CTA to
 * what the visitor just did on this specific tool, instead of leaving the
 * page to fall through to fully generic "book a demo" copy with no context.
 */
export function ToolConversionBridge({
  eyebrow = "From this tool to your firm",
  title,
  body,
  primaryLabel = "Start free trial",
  primaryHref = SIGNUP_URL,
  secondaryLabel = "Book a demo",
  secondaryHref = DEMO_URL,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section-tight">
      <div className="wrap max-w-[820px]">
        <div className="rounded-[22px] border border-accent/30 bg-accent-lt px-7 py-9 sm:px-9">
          <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />{eyebrow}</span>
          <h2 className="mt-3 font-display text-[22px] font-semibold leading-snug tracking-[-0.01em] sm:text-[26px]">
            {title}
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-muted">{body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={primaryHref} className="btn btn-accent">
              {primaryLabel} →
            </a>
            <a href={secondaryHref} className="btn btn-ghost bg-white">
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
