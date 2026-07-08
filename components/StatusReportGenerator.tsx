"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_URL, SIGNUP_URL } from "./config";

// ---- Types ---------------------------------------------------------------

type Audience = "client" | "internal" | "exec";
type Status = "green" | "yellow" | "red";
type OutputFormat = "markdown" | "email" | "slack" | "plain";

type Blocker = { title: string; detail: string };

type StatusReport = {
  subject: string;
  status: Status;
  statusReason: string;
  tldr: string;
  shipped: string[];
  inFlight: string[];
  blockers: Blocker[];
  asks: string[];
  nextWeek: string[];
  source: "ai" | "template";
};

type FormState = {
  projectName: string;
  period: string;
  notes: string;
  audience: Audience;
};

// ---- Date helper (default period to the current Mon–Sun week) ----------

function currentWeekLabel(): string {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(monday)} – ${fmt(sunday)}`;
}

const EXAMPLE_NOTES = `Northwind Pvt Ltd · FY Audit

Done this week:
- fieldwork completed, all accounts reviewed and signed off by senior
- draft accounts sent to client monday, client acknowledged receipt
- review queries raised and logged, 8 of 11 cleared by friday
- engagement letter addendum signed for additional advisory scope

In flight:
- 3 outstanding review queries with the client finance team
- draft tax computation in progress, due to partner by wednesday
- final audit report being prepared pending query clearance

Blockers:
- client has not provided the fixed asset register despite two follow-ups
- partner review scheduled for thursday but one query still open

Asks:
- need client to confirm depreciation rates used for the year
- need partner sign-off on the materiality threshold before report is finalised

Next week:
- clear remaining review queries
- partner review of final audit report
- file accounts with the registrar once approved`;

// ---- Formatters: report -> output text in each format -------------------

function statusEmoji(s: Status): string {
  return s === "green" ? "🟢" : s === "yellow" ? "🟡" : "🔴";
}
function statusLabel(s: Status): string {
  return s === "green" ? "Green" : s === "yellow" ? "Yellow" : "Red";
}

function asMarkdown(r: StatusReport, form: FormState): string {
  const lines: string[] = [];
  lines.push(`# ${r.subject}`, "");
  lines.push(`**Status:** ${statusEmoji(r.status)} ${statusLabel(r.status)}, ${r.statusReason}`, "");
  lines.push(`> ${r.tldr}`, "");

  if (r.shipped.length) {
    lines.push("## What we shipped this week");
    r.shipped.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  }
  if (r.inFlight.length) {
    lines.push("## In flight");
    r.inFlight.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  }
  if (r.blockers.length) {
    lines.push("## Blockers");
    r.blockers.forEach((b) => lines.push(`- **${b.title}.** ${b.detail}`));
    lines.push("");
  }
  if (r.asks.length) {
    lines.push("## We need from you");
    r.asks.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  }
  if (r.nextWeek.length) {
    lines.push("## Next week");
    r.nextWeek.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  }
  lines.push("---");
  lines.push(
    `Generated with PYNGYN's free Status Report Generator. Want this written for you automatically every week? https://pyngyn.ai/demo`
  );
  void form; // form available if we ever want to add greeting/signoff customization
  return lines.join("\n").trim();
}

function asEmail(r: StatusReport, form: FormState): string {
  const isClient = form.audience === "client";
  const lines: string[] = [];
  lines.push(`Subject: ${r.subject}`, "");
  lines.push(`Hi${isClient ? " team" : ""},`, "");
  lines.push(
    `Status: ${statusEmoji(r.status)} ${statusLabel(r.status)}, ${r.statusReason}`,
    ""
  );
  lines.push(r.tldr, "");

  if (r.shipped.length) {
    lines.push("What we shipped this week");
    r.shipped.forEach((b) => lines.push(`  • ${b}`));
    lines.push("");
  }
  if (r.inFlight.length) {
    lines.push("In flight");
    r.inFlight.forEach((b) => lines.push(`  • ${b}`));
    lines.push("");
  }
  if (r.blockers.length) {
    lines.push("Blockers");
    r.blockers.forEach((b) => lines.push(`  • ${b.title}. ${b.detail}`));
    lines.push("");
  }
  if (r.asks.length) {
    lines.push("We need from you");
    r.asks.forEach((b) => lines.push(`  • ${b}`));
    lines.push("");
  }
  if (r.nextWeek.length) {
    lines.push("Next week");
    r.nextWeek.forEach((b) => lines.push(`  • ${b}`));
    lines.push("");
  }
  lines.push("Happy to dig into any of this on a call.");
  lines.push("", "Thanks,");
  return lines.join("\n").trim();
}

function asSlack(r: StatusReport): string {
  const lines: string[] = [];
  lines.push(`*${r.subject}*`);
  lines.push(`${statusEmoji(r.status)} *${statusLabel(r.status)}*, ${r.statusReason}`);
  lines.push("");
  lines.push(`> ${r.tldr}`, "");

  const section = (title: string, items: string[]) => {
    if (!items.length) return;
    lines.push(`*${title}*`);
    items.forEach((b) => lines.push(`• ${b}`));
    lines.push("");
  };
  section("Completed", r.shipped);
  section("In flight", r.inFlight);
  if (r.blockers.length) {
    lines.push("*Blockers*");
    r.blockers.forEach((b) => lines.push(`• *${b.title}.* ${b.detail}`));
    lines.push("");
  }
  section("We need", r.asks);
  section("Next week", r.nextWeek);
  return lines.join("\n").trim();
}

function asPlain(r: StatusReport): string {
  return asMarkdown(r, { projectName: "", period: "", notes: "", audience: "client" })
    .replace(/^#+\s*/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^>\s?/gm, "");
}

// ---- Download helper -----------------------------------------------------

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function slugify(s: string): string {
  return (s || "status-report")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "status-report";
}

// =========================================================================
// Component
// =========================================================================

export function StatusReportGenerator() {
  const [form, setForm] = useState<FormState>({
    projectName: "",
    period: "",
    notes: "",
    audience: "client",
  });
  const [report, setReport] = useState<StatusReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("markdown");
  const [copied, setCopied] = useState<string | null>(null);

  // Default the period to the current week on first render (client-only so
  // we don't trip Next's server/client mismatch on the date string).
  useEffect(() => {
    setForm((f) => (f.period ? f : { ...f, period: currentWeekLabel() }));
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const valid = useMemo(() => form.notes.trim().length >= 30, [form.notes]);

  const formatted = useMemo(() => {
    if (!report) return "";
    if (outputFormat === "email") return asEmail(report, form);
    if (outputFormat === "slack") return asSlack(report);
    if (outputFormat === "plain") return asPlain(report);
    return asMarkdown(report, form);
  }, [report, outputFormat, form]);

  async function generate() {
    setError(null);
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch("/api/status-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.error === "notes_too_short") {
          throw new Error("notes_too_short");
        }
        throw new Error(`api_${res.status}`);
      }
      const data = (await res.json()) as { report?: StatusReport };
      if (!data.report) throw new Error("no_report");
      setReport(data.report);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      if (msg === "notes_too_short") {
        setError("Add a bit more detail to your notes (at least a couple of bullets).");
      } else {
        // Don't try to client-side fallback — without LLM the parsing is best done server-side.
        // The server already returns a template fallback when GROQ_API_KEY is missing.
        setError(
          "Could not reach the AI engine. Try again in a moment, or paste your notes and we can model this together on a demo."
        );
      }
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById("report-output")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  function flash(label: string) {
    setCopied(label);
    setTimeout(() => setCopied(null), 1600);
  }

  async function copyOutput() {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(formatted);
      flash("Copied");
    } catch {
      download(`${slugify(form.projectName)}.md`, formatted, "text/markdown");
      flash("Downloaded");
    }
  }

  function downloadOutput() {
    if (!report) return;
    const isEmail = outputFormat === "email";
    const ext = isEmail ? "txt" : outputFormat === "markdown" ? "md" : "txt";
    const mime = isEmail || outputFormat === "plain" ? "text/plain" : outputFormat === "slack" ? "text/plain" : "text/markdown";
    download(`${slugify(form.projectName)}.${ext}`, formatted, mime);
    flash("Downloaded");
  }

  function openMailto() {
    if (!report) return;
    const subject = encodeURIComponent(report.subject);
    const body = encodeURIComponent(asEmail(report, form).split("\n").slice(2).join("\n"));
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  }

  return (
    <div className="wrap pb-[80px]">
      <div className="grid gap-7 lg:grid-cols-[420px_1fr]">
        {/* ---- Form ---- */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Drop in your notes
            </div>
            <h2 className="mt-2 font-display text-[24px] font-semibold tracking-[-0.02em]">
              We turn rough notes into a clean update.
            </h2>

            <div className="mt-5 space-y-4">
              <Field label="Project name" hint="What is this update about?">
                <input
                  type="text"
                  value={form.projectName}
                  onChange={(e) => set("projectName", e.target.value)}
                  placeholder="e.g. Northwind Pvt Ltd · FY Audit"
                  maxLength={120}
                  className="input"
                />
              </Field>

              <Field label="Reporting period" hint="Auto-filled to this week">
                <input
                  type="text"
                  value={form.period}
                  onChange={(e) => set("period", e.target.value)}
                  placeholder="e.g. Apr 15 – 21"
                  maxLength={60}
                  className="input"
                />
              </Field>

              <Field label="Audience" hint="Adjusts tone, not content">
                <div className="grid grid-cols-3 gap-2">
                  {(["client", "internal", "exec"] as Audience[]).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => set("audience", a)}
                      className={`rounded-xl border px-3 py-2 text-[13px] font-semibold capitalize transition-colors ${
                        form.audience === a
                          ? "border-accent bg-accent-lt text-accent"
                          : "border-line bg-white text-muted hover:border-accent hover:text-ink"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </Field>

              <Field
                label="Notes"
                hint={`${form.notes.length}/6000 characters`}
              >
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value.slice(0, 6000))}
                  placeholder="Paste your rough notes. Bullets, headers, stream of consciousness all work. PYNGYN will only restructure what you write, it won't invent anything."
                  rows={10}
                  className="input resize-y font-mono text-[13px] leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => set("notes", EXAMPLE_NOTES)}
                  className="mt-2 text-[12px] font-semibold text-muted underline-offset-2 hover:text-accent hover:underline"
                >
                  Fill with an example
                </button>
              </Field>

              <button
                type="button"
                disabled={!valid || loading}
                onClick={generate}
                className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Writing your update..." : report ? "Regenerate" : "Generate report →"}
              </button>

              {!valid && (
                <p className="text-[12px] text-muted">
                  Paste at least a couple of bullets and we&apos;ll do the rest.
                </p>
              )}
            </div>

            <div className="mt-6 border-t border-line pt-5 text-[12px] text-muted">
              <div className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none text-accent" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <span>
                  PYNGYN never invents facts. The AI restructures and tightens what
                  you wrote, nothing more.
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* ---- Output ---- */}
        <section id="report-output" className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingSkeleton key="loading" />
            ) : report ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <ReportResult
                  report={report}
                  form={form}
                  outputFormat={outputFormat}
                  setOutputFormat={setOutputFormat}
                  formatted={formatted}
                  copied={copied}
                  onCopy={copyOutput}
                  onDownload={downloadOutput}
                  onEmail={openMailto}
                />
              </motion.div>
            ) : (
              <EmptyState key="empty" error={error} />
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Convert CTA */}
      <div className="mt-16 overflow-hidden rounded-[22px] border border-line bg-gradient-to-br from-accent-lt via-white to-canvas p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Friday status, without the Friday
            </div>
            <h3 className="mt-2 font-display text-[28px] font-semibold tracking-[-0.02em] lg:text-[32px]">
              Want this written for you, every week?
            </h3>
            <p className="mt-2 max-w-[560px] text-[15px] text-muted">
              In PYNGYN, status drafts itself from the work, commits, tasks, calendar,
              and threads, so the update is already written by Friday morning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={DEMO_URL} className="btn btn-primary">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-ghost">Start free</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Sub-components
// =========================================================================

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function EmptyState({ error }: { error: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid h-full min-h-[420px] place-items-center rounded-[22px] border border-dashed border-line bg-white p-10 text-center"
    >
      <div className="max-w-[460px]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-lt text-accent">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 3h7l4 4v14H7zM14 3v4h4M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-[22px] font-semibold tracking-[-0.02em]">
          {error ? "Something went sideways." : "Your status report will appear here."}
        </h3>
        <p className="mt-2 text-[15px] text-muted">
          {error ?? "Paste raw notes on the left. We'll return a clean, client-ready update with a status colour, TL;DR, shipped/in-flight, blockers, asks, and next week."}
        </p>
        {!error && (
          <ul className="mt-5 grid gap-2 text-left text-[13.5px] text-muted">
            {[
              "Bullets, headers, or stream of consciousness all work",
              "Output is editable Markdown, email, Slack, or plain text",
              "Nothing invented, only what's in your notes",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1 grid h-4 w-4 flex-none place-items-center rounded-full bg-accent-lt text-accent">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="rounded-[22px] border border-line bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Structuring your update...
          </span>
        </div>
        <div className="mt-4 space-y-2.5">
          <div className="h-4 w-3/4 animate-pulse rounded bg-canvas" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-canvas" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-canvas" />
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-[22px] border border-line bg-white p-6">
          <div className="h-5 w-1/3 animate-pulse rounded bg-canvas" />
          <div className="mt-4 grid gap-2">
            <div className="h-3 w-full animate-pulse rounded bg-canvas" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-canvas" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-canvas" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// Visual styles for the status colour pill
function statusPillStyles(s: Status): { bg: string; text: string; dot: string; border: string; label: string } {
  if (s === "green")
    return { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-100", label: "Green" };
  if (s === "yellow")
    return { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", border: "border-amber-100", label: "Yellow" };
  return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-100", label: "Red" };
}

function ReportResult({
  report,
  form,
  outputFormat,
  setOutputFormat,
  formatted,
  copied,
  onCopy,
  onDownload,
  onEmail,
}: {
  report: StatusReport;
  form: FormState;
  outputFormat: OutputFormat;
  setOutputFormat: (f: OutputFormat) => void;
  formatted: string;
  copied: string | null;
  onCopy: () => void;
  onDownload: () => void;
  onEmail: () => void;
}) {
  const s = statusPillStyles(report.status);
  void form;

  return (
    <div className="space-y-4">
      {/* Header card with status + subject */}
      <div className="rounded-[22px] border border-line bg-white p-6 shadow-card lg:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>{report.source === "ai" ? "AI-generated" : "Template-generated"}</span>
              <span className="text-line">•</span>
              <span>{report.shipped.length} completed</span>
              <span className="text-line">•</span>
              <span>{report.inFlight.length} in flight</span>
              <span className="text-line">•</span>
              <span>{report.blockers.length} {report.blockers.length === 1 ? "blocker" : "blockers"}</span>
            </div>
            <h2 className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] lg:text-[28px]">
              {report.subject}
            </h2>

            <div className={`mt-4 inline-flex items-center gap-2.5 rounded-full border ${s.border} ${s.bg} px-3.5 py-2`}>
              <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} aria-hidden="true" />
              <span className={`text-[13px] font-semibold ${s.text}`}>Status: {s.label}</span>
              <span className={`text-[13px] ${s.text} opacity-80`}>· {report.statusReason}</span>
            </div>

            <p className="mt-4 border-l-2 border-accent/30 pl-4 text-[15px] italic leading-relaxed text-muted">
              {report.tldr}
            </p>
          </div>
        </div>
      </div>

      {/* Body sections */}
      <div className="grid gap-4 lg:grid-cols-2">
        {report.shipped.length > 0 && (
          <SectionCard num="01" title="What we completed" tone="accent">
            <ul className="space-y-2.5">
              {report.shipped.map((b, i) => (
                <BulletRow key={i} tone="emerald">{b}</BulletRow>
              ))}
            </ul>
          </SectionCard>
        )}

        {report.inFlight.length > 0 && (
          <SectionCard num="02" title="In flight" tone="accent">
            <ul className="space-y-2.5">
              {report.inFlight.map((b, i) => (
                <BulletRow key={i} tone="accent">{b}</BulletRow>
              ))}
            </ul>
          </SectionCard>
        )}
      </div>

      {report.blockers.length > 0 && (
        <SectionCard num="03" title="Blockers" tone="warn">
          <ul className="grid gap-3">
            {report.blockers.map((b, i) => (
              <li key={i} className="rounded-xl border border-amber-100 bg-amber-50/60 p-3.5">
                <div className="text-[14px] font-semibold text-amber-800">{b.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-amber-900/80">{b.detail}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {report.asks.length > 0 && (
          <SectionCard num="04" title="We need from you" tone="accent">
            <ul className="space-y-2.5">
              {report.asks.map((b, i) => (
                <BulletRow key={i} tone="accent">{b}</BulletRow>
              ))}
            </ul>
          </SectionCard>
        )}

        {report.nextWeek.length > 0 && (
          <SectionCard num="05" title="Next week" tone="accent">
            <ul className="space-y-2.5">
              {report.nextWeek.map((b, i) => (
                <BulletRow key={i} tone="accent">{b}</BulletRow>
              ))}
            </ul>
          </SectionCard>
        )}
      </div>

      {/* Export panel */}
      <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Send it</div>
            <h3 className="mt-1 font-display text-[18px] font-semibold tracking-[-0.02em]">
              Copy in the format you actually send.
            </h3>
          </div>

          {/* Format tabs */}
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-canvas p-1">
            {(["markdown", "email", "slack", "plain"] as OutputFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setOutputFormat(f)}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold capitalize transition-colors ${
                  outputFormat === f ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mt-4 max-h-[320px] overflow-auto rounded-xl border border-line bg-canvas p-4 font-mono text-[12.5px] leading-relaxed text-ink">
          <pre className="whitespace-pre-wrap break-words">{formatted}</pre>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <ActionButton onClick={onCopy} flashed={copied === "Copied"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="8" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M3 21V8a2 2 0 012-2h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            Copy
          </ActionButton>
          <ActionButton onClick={onDownload} flashed={copied === "Downloaded"}>
            <DownloadIcon />
            Download
          </ActionButton>
          {outputFormat === "email" && (
            <ActionButton onClick={onEmail}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Open in mail
            </ActionButton>
          )}
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                className="inline-flex items-center gap-2 rounded-full bg-positive/10 px-3 py-1.5 text-[12px] font-semibold text-positive"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                {copied}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  num,
  title,
  tone,
  children,
}: {
  num: string;
  title: string;
  tone: "accent" | "warn";
  children: React.ReactNode;
}) {
  void tone;
  return (
    <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span className="mr-2 text-accent">{num}</span>
        {title}
      </div>
      <h3 className="mt-1 font-display text-[18px] font-semibold tracking-[-0.02em]">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BulletRow({ children, tone }: { children: React.ReactNode; tone: "emerald" | "accent" }) {
  const cls = tone === "emerald" ? "bg-emerald-100 text-emerald-700" : "bg-accent-lt text-accent";
  return (
    <li className="flex items-start gap-2.5">
      <span className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full ${cls}`}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[14px] leading-relaxed text-ink">{children}</span>
    </li>
  );
}

function ActionButton({
  children,
  onClick,
  flashed,
}: {
  children: React.ReactNode;
  onClick: () => void;
  flashed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all ${
        flashed
          ? "border-positive bg-positive/10 text-positive"
          : "border-line bg-white text-ink hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v12M6 12l6 6 6-6M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
