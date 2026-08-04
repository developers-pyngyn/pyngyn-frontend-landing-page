import { Reveal } from "./Reveal";
import Link from "next/link";

/**
 * Homepage focus is Clientspace, PYNGYN's flagship, standalone client
 * portal. Workspace is a separate, additional product (see /workspace) —
 * deliberately not given equal billing here, just a brief link at the
 * bottom for firms that also want an internal back office.
 */
export function SpacesExplainer() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[680px] text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              How PYNGYN works
            </span>
            <h2 className="title mt-3">A branded portal for every client.</h2>
            <p className="lead mx-auto mt-4">
              Clientspace is what your clients log into: a complete, standalone product that
              replaces the email threads and status calls that eat your week.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-[46px] max-w-[720px]">
          <Reveal>
            <div className="flex h-full flex-col rounded-[20px] border border-accent/25 bg-accent-lt p-7 shadow-card sm:p-9">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3.5 19c0-3 2.5-4.6 5.5-4.6s5.5 1.6 5.5 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M16 5.5a3.2 3.2 0 010 5M18.5 19c0-2.2-1-3.8-2.6-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="rounded-full border border-accent/30 bg-white/60 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                  The client portal
                </span>
              </div>
              <h3 className="mt-5 font-display text-[24px] font-semibold tracking-[-0.02em] text-ink">Clientspace</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink/70">
                A branded, secure portal for every client. They see their status, documents,
                approvals, and invoices 24/7, so they stop emailing you for updates and start
                self-serving, while you stay fully in control of what they see.
              </p>
              <ul className="mt-5 space-y-2 text-[14px] text-ink/80">
                {["Branded as your firm, one space per client", "Live status, documents, and approvals", "One-click access, no password for clients", "Clients see only their own engagement"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Dot className="text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/clientspace" className="btn btn-accent mt-6 self-start">
                Explore Clientspace
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Brief, secondary mention only — Workspace is a separate add-on
            product, not given equal billing on this page. */}
        <Reveal i={1}>
          <p className="mx-auto mt-6 max-w-[680px] text-center text-[14px] text-muted">
            Also want to run projects and billable time internally?{" "}
            <Link href="/workspace" className="font-semibold text-accent hover:underline">
              Workspace
            </Link>{" "}
            is available as an add-on.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`mt-0.5 flex-none ${className}`} aria-hidden="true">
      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
