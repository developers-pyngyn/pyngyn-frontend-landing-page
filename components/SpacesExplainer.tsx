import { Reveal } from "./Reveal";
import Link from "next/link";

/**
 * Explains PYNGYN's product model: Clientspace is the standalone, flagship
 * client portal (shown first, accent treatment); Workspace is a separate
 * standalone internal back office. Either works alone; bundling is optional.
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
            <h2 className="title mt-3">A portal for clients. An engine for your firm.</h2>
            <p className="lead mx-auto mt-4">
              Clientspace is what your clients log into, a complete, standalone product on its
              own. Workspace is a separate back office for your team. Use either on its own, or
              bundle both to replace the email threads and status calls that eat your week.
            </p>
          </div>
        </Reveal>

        <div className="mt-[46px] grid items-stretch gap-5 md:grid-cols-2">
          {/* Clientspace: the hero product (accent treatment, first) */}
          <Reveal>
            <div className="flex h-full flex-col rounded-[20px] border border-accent/25 bg-accent-lt p-7 shadow-card">
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

          {/* Workspace: standalone internal back office (neutral treatment, second) */}
          <Reveal i={1}>
            <div className="flex h-full flex-col rounded-[20px] border border-line bg-white p-7 shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  The internal back office
                </span>
              </div>
              <h3 className="mt-5 font-display text-[24px] font-semibold tracking-[-0.02em]">Workspace</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
                A standalone back office for your firm. Your team runs projects, tracks finances,
                logs billable time, and lets AI keep plans and status current, all internal, never
                seen by clients.
              </p>
              <ul className="mt-5 space-y-2 text-[14px] text-ink/80">
                {["Projects, finances, and billable time", "Business Brain AI: plans, status, risk", "Roles for directors, managers, and ICs"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Dot className="text-ink" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/workspace" className="btn btn-ghost mt-6 self-start">
                Explore Workspace
              </Link>
            </div>
          </Reveal>
        </div>

        {/* How they integrate */}
        <Reveal i={2}>
          <div className="mt-5 flex flex-col items-center gap-4 rounded-[20px] border border-line bg-canvas px-7 py-6 text-center sm:flex-row sm:text-left">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-white text-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 8h10l-2.5-2.5M17 16H7l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-[15px] leading-relaxed text-muted">
              <span className="font-semibold text-ink">Two standalone products. Better together.</span>{" "}
              Use Clientspace on its own for client-facing work, Workspace on its own to run your
              firm internally, or bundle both so work in Workspace flows straight into your
              clients&apos; portals automatically.
            </p>
          </div>
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
