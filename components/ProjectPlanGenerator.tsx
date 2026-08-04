"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_URL, SIGNUP_URL } from "./config";

// ----- Types -----

type Task = { name: string; effort: string; owner: string };

type Phase = {
  name: string;
  durationWeeks: number;
  owner: string;
  tasks: Task[];
  milestone: string;
};

type Risk = {
  title: string;
  mitigation: string;
  severity: "low" | "medium" | "high";
};

type TeamRole = { role: string; count: number; allocation: string };

type GeneratedPlan = {
  summary: string;
  phases: Phase[];
  team: TeamRole[];
  risks: Risk[];
  cadence: string[];
  source: "ai" | "template";
};

type FormState = {
  projectName: string;
  projectType: string;
  industry: string;
  weeks: number;
  teamSize: number;
  goals: string;
};

const DEFAULT_FORM: FormState = {
  projectName: "",
  projectType: "Client engagement",
  industry: "",
  weeks: 8,
  teamSize: 5,
  goals: "",
};

const PROJECT_TYPES = [
  "Client engagement",
  "Audit & assessment",
  "Advisory project",
  "Client onboarding",
  "Litigation matter",
  "Retainer / ongoing",
  "Internal initiative",
] as const;

const EXAMPLE_PROMPTS: { label: string; form: FormState }[] = [
  {
    label: "M&A due diligence for a client",
    form: {
      projectName: "Northwind acquisition · due diligence",
      projectType: "Advisory project",
      industry: "Legal",
      weeks: 8,
      teamSize: 4,
      goals:
        "Review the target's contracts, IP, and liabilities. Prepare disclosure schedules and a red-flag report. Deliver findings ahead of the signing date.",
    },
  },
  {
    label: "Year-end audit for a client",
    form: {
      projectName: "Northwind Pvt Ltd · FY audit",
      projectType: "Audit & assessment",
      industry: "Accounting",
      weeks: 6,
      teamSize: 5,
      goals:
        "Collect financial records, complete fieldwork, clear review queries, and file the audit report and tax return before the statutory deadline.",
    },
  },
  {
    label: "New client onboarding",
    form: {
      projectName: "Acme Corp · client onboarding",
      projectType: "Client onboarding",
      industry: "Consulting",
      weeks: 4,
      teamSize: 3,
      goals:
        "Run kickoff and scope sign-off, set up the client's branded portal, agree deliverables and milestones, and schedule the first review.",
    },
  },
];

// ----- Client-side fallback template -----
// Mirrors the server template so the tool ALWAYS produces a usable plan
// even when /api/plan is unreachable (e.g. local dev without GROQ_API_KEY).

function localTemplate(form: FormState): GeneratedPlan {
  const totalWeeks = Math.max(1, Math.min(52, Math.round(form.weeks || 8)));
  const size = Math.max(1, Math.min(50, Math.round(form.teamSize || 5)));
  const name = form.projectName.trim() || "Project";
  const type = form.projectType || "Engagement";
  const ind = form.industry ? ` for a ${form.industry.toLowerCase()} client` : "";

  const shares = [
    { name: "Discovery & alignment", share: 0.2, owner: "Engagement lead" },
    { name: "Design", share: 0.25, owner: "Solution architect" },
    { name: "Build", share: 0.35, owner: "Delivery lead" },
    { name: "Rollout & handover", share: 0.2, owner: "Engagement lead" },
  ];

  const tasksByPhase: Task[][] = [
    [
      { name: "Kickoff workshop with stakeholders", effort: "1-2 days", owner: "Engagement lead" },
      { name: "Map current state and constraints", effort: "3-4 days", owner: "Senior consultant" },
      { name: "Confirm success metrics and scope", effort: "2 days", owner: "Engagement lead" },
      { name: "Sign off on the work plan", effort: "1 day", owner: "Client sponsor" },
    ],
    [
      { name: "Draft target state design", effort: "1 week", owner: "Solution architect" },
      { name: "Validate with technical stakeholders", effort: "3 days", owner: "Solution architect" },
      { name: "Finalize architecture and decisions", effort: "2 days", owner: "Engagement lead" },
      { name: "Plan delivery sprints", effort: "1-2 days", owner: "Delivery lead" },
    ],
    [
      { name: "Configure core workflows", effort: "1-2 weeks", owner: "Delivery team" },
      { name: "Integrate with existing systems", effort: "1 week", owner: "Engineer" },
      { name: "Internal QA pass", effort: "3-4 days", owner: "QA" },
      { name: "Client checkpoint demo", effort: "1 day", owner: "Engagement lead" },
    ],
    [
      { name: "Run user training sessions", effort: "2-3 days", owner: "Trainer" },
      { name: "Production cutover", effort: "1-2 days", owner: "Delivery team" },
      { name: "Hypercare and issue triage", effort: "1 week", owner: "Support lead" },
      { name: "Final retrospective and handover", effort: "1 day", owner: "Engagement lead" },
    ],
  ];

  const phases: Phase[] = shares.map((p, i) => ({
    name: p.name,
    durationWeeks: Math.max(1, Math.round(totalWeeks * p.share)),
    owner: p.owner,
    tasks: tasksByPhase[i],
    milestone:
      i === 0
        ? "Signed scope, agreed metrics, named decision makers"
        : i === 1
        ? "Approved design and sprint plan"
        : i === 2
        ? "Working solution accepted in staging"
        : "Solution live with adoption baseline measured",
  }));

  return {
    summary: `A ${totalWeeks}-week ${type.toLowerCase()} for ${name}${ind}, delivered by a team of ${size}.${
      form.goals.trim() ? ` Focused on: ${form.goals.trim().slice(0, 160)}` : ""
    }`,
    phases,
    team: [
      { role: "Engagement lead", count: 1, allocation: "50% allocation" },
      { role: "Solution architect", count: 1, allocation: "Full-time" },
      { role: "Delivery team", count: Math.max(1, size - 3), allocation: "Full-time" },
      { role: "QA lead", count: 1, allocation: "50% allocation" },
    ],
    risks: [
      {
        title: "Scope creep from late stakeholder input",
        mitigation: "Lock scope at end of discovery, run a weekly change board",
        severity: "high",
      },
      {
        title: "Integration dependency delays",
        mitigation: "Map integrations in week one, pull dependent owners into kickoff",
        severity: "medium",
      },
      {
        title: "Adoption resistance at rollout",
        mitigation: "Recruit power users early, run training the week before cutover",
        severity: "medium",
      },
    ],
    cadence: [
      "Weekly status review with client sponsor",
      "Daily 15-minute standup for the delivery team",
      "Fortnightly steering committee with executive sponsor",
    ],
    source: "template",
  };
}

// ----- Export helpers -----

function planToMarkdown(form: FormState, plan: GeneratedPlan): string {
  const lines: string[] = [];
  lines.push(`# ${form.projectName || "Project plan"}`);
  lines.push("");
  lines.push(`> ${plan.summary}`);
  lines.push("");
  lines.push(`**Type:** ${form.projectType}  `);
  if (form.industry) lines.push(`**Industry:** ${form.industry}  `);
  lines.push(`**Timeline:** ${form.weeks} weeks  `);
  lines.push(`**Team size:** ${form.teamSize}`);
  lines.push("");

  lines.push("## Phases");
  plan.phases.forEach((p, i) => {
    lines.push("");
    lines.push(`### ${i + 1}. ${p.name} (${p.durationWeeks} weeks)`);
    lines.push(`Owner: ${p.owner}`);
    lines.push("");
    p.tasks.forEach((t) => {
      lines.push(`- ${t.name}  (${t.effort}, ${t.owner})`);
    });
    lines.push("");
    lines.push(`**Milestone:** ${p.milestone}`);
  });

  lines.push("");
  lines.push("## Suggested team");
  plan.team.forEach((t) => {
    lines.push(`- ${t.role} (${t.count}, ${t.allocation})`);
  });

  lines.push("");
  lines.push("## Top risks");
  plan.risks.forEach((r) => {
    lines.push(`- **${r.title}** (${r.severity})  `);
    lines.push(`  Mitigation: ${r.mitigation}`);
  });

  lines.push("");
  lines.push("## Cadence");
  plan.cadence.forEach((c) => lines.push(`- ${c}`));

  lines.push("");
  lines.push(`---`);
  lines.push(`Generated with PYNGYN's free AI Project Plan Generator. Build the live version: https://pyngyn.ai/demo`);
  return lines.join("\n");
}

function planToCsv(plan: GeneratedPlan): string {
  const rows: string[] = ["Phase,Task,Effort,Owner,Milestone"];
  plan.phases.forEach((p) => {
    p.tasks.forEach((t) => {
      const cells = [p.name, t.name, t.effort, t.owner, p.milestone].map((s) => {
        const escaped = String(s).replace(/"/g, '""');
        return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
      });
      rows.push(cells.join(","));
    });
  });
  return rows.join("\n");
}

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
  return (s || "project-plan")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "project-plan";
}

// ----- Component -----

export function ProjectPlanGenerator() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const valid = useMemo(() => {
    return form.projectName.trim().length >= 2 && form.goals.trim().length >= 10;
  }, [form]);

  const totalTasks = useMemo(() => {
    if (!plan) return 0;
    return plan.phases.reduce((acc, p) => acc + p.tasks.length, 0);
  }, [plan]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function generate() {
    setError(null);
    setLoading(true);
    setPlan(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`api_${res.status}`);
      const data = (await res.json()) as { plan?: GeneratedPlan };
      if (!data.plan) throw new Error("no_plan");
      setPlan(data.plan);
    } catch (e) {
      // Fall back to local template so the visitor still gets a useful plan.
      console.warn("[plan] Falling back to local template:", e);
      setPlan(localTemplate(form));
      setError(
        "We could not reach the AI engine, so this plan was built from our local template. The output is still a solid starting point."
      );
    } finally {
      setLoading(false);
      // Scroll the result into view on small screens
      setTimeout(() => {
        document.getElementById("plan-output")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  function flash(label: string) {
    setCopied(label);
    setTimeout(() => setCopied(null), 1600);
  }

  async function copyMarkdown() {
    if (!plan) return;
    const md = planToMarkdown(form, plan);
    try {
      await navigator.clipboard.writeText(md);
      flash("Copied as Markdown");
    } catch {
      // Fallback: download instead
      download(`${slugify(form.projectName)}.md`, md, "text/markdown");
      flash("Downloaded as Markdown");
    }
  }

  function downloadMarkdown() {
    if (!plan) return;
    download(`${slugify(form.projectName)}.md`, planToMarkdown(form, plan), "text/markdown");
    flash("Downloaded .md");
  }

  function downloadCsv() {
    if (!plan) return;
    download(`${slugify(form.projectName)}-tasks.csv`, planToCsv(plan), "text/csv");
    flash("Downloaded .csv");
  }

  return (
    <div className="wrap pb-[80px]">
      <div className="grid gap-7 lg:grid-cols-[420px_1fr]">
        {/* ---------- Form ---------- */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Describe your project
            </div>
            <h2 className="mt-2 font-display text-[24px] font-semibold tracking-[-0.02em]">
              Tell us about the work.
            </h2>

            <div className="mt-5 space-y-4">
              <Field label="Project name" hint="What is this engagement called?">
                <input
                  type="text"
                  value={form.projectName}
                  onChange={(e) => set("projectName", e.target.value)}
                  placeholder="e.g. Acme CRM rollout"
                  maxLength={120}
                  className="input"
                />
              </Field>

              <Field label="Engagement type">
                <select
                  value={form.projectType}
                  onChange={(e) => set("projectType", e.target.value)}
                  className="input select-chevron appearance-none bg-white pr-9"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Industry" hint="Optional, helps tailor language">
                <input
                  type="text"
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  placeholder="e.g. Financial services"
                  maxLength={80}
                  className="input"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Timeline" hint="Weeks">
                  <input
                    type="number"
                    value={form.weeks}
                    min={1}
                    max={52}
                    onChange={(e) => set("weeks", Number(e.target.value))}
                    className="input"
                  />
                </Field>
                <Field label="Team size" hint="People">
                  <input
                    type="number"
                    value={form.teamSize}
                    min={1}
                    max={50}
                    onChange={(e) => set("teamSize", Number(e.target.value))}
                    className="input"
                  />
                </Field>
              </div>

              <Field
                label="Goals & deliverables"
                hint={`${form.goals.length}/1200 characters`}
              >
                <textarea
                  value={form.goals}
                  onChange={(e) => set("goals", e.target.value.slice(0, 1200))}
                  placeholder="What does success look like? Any constraints, dependencies, or non-negotiable dates?"
                  rows={5}
                  className="input resize-y"
                />
              </Field>

              <button
                type="button"
                disabled={!valid || loading}
                onClick={generate}
                className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating plan..." : plan ? "Regenerate plan" : "Generate plan →"}
              </button>

              {!valid && (
                <p className="text-[12px] text-muted">
                  Add a project name and at least a sentence about goals.
                </p>
              )}
            </div>

            {/* Examples */}
            <div className="mt-6 border-t border-line pt-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Try an example
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {EXAMPLE_PROMPTS.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => setForm(ex.form)}
                    className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-left text-[13.5px] text-ink transition-colors hover:border-accent hover:bg-accent-lt"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ---------- Output ---------- */}
        <section id="plan-output" className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingSkeleton key="loading" />
            ) : plan ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <PlanResult
                  form={form}
                  plan={plan}
                  totalTasks={totalTasks}
                  error={error}
                  copied={copied}
                  onCopyMarkdown={copyMarkdown}
                  onDownloadMarkdown={downloadMarkdown}
                  onDownloadCsv={downloadCsv}
                />
              </motion.div>
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Convert CTA strip */}
      <div className="mt-16 overflow-hidden rounded-[22px] border border-line bg-gradient-to-br from-accent-lt via-white to-canvas p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Want this as a live, running project?
            </div>
            <h3 className="mt-2 font-display text-[28px] font-semibold tracking-[-0.02em] lg:text-[32px]">
              Build this plan in PYNGYN. Watch it stay current.
            </h3>
            <p className="mt-2 max-w-[560px] text-[15px] text-muted">
              In PYNGYN, the same plan becomes assignable tasks, owners, timelines, and live status,
              updated automatically as work happens.
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

// ----- Sub-components -----

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
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

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid h-full min-h-[420px] place-items-center rounded-[22px] border border-dashed border-line bg-white p-10 text-center"
    >
      <div className="max-w-[440px]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-lt text-accent">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-[22px] font-semibold tracking-[-0.02em]">
          Your plan will appear here.
        </h3>
        <p className="mt-2 text-[15px] text-muted">
          Fill in the form and tap Generate. We will return phases, tasks, owners, milestones,
          a suggested team, top risks, and a cadence.
        </p>
        <ul className="mt-5 grid gap-2 text-left text-[13.5px] text-muted">
          {[
            "Built for professional services and consulting work",
            "Outputs are editable Markdown, CSV, or copy-paste",
            "Free, no signup required",
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
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* shimmer */}
      <div className="rounded-[22px] border border-line bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Drafting your plan...
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

function severityStyles(sev: Risk["severity"]) {
  if (sev === "high") return "bg-red-50 text-red-700 border-red-100";
  if (sev === "medium") return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-emerald-50 text-emerald-700 border-emerald-100";
}

function PlanResult({
  form,
  plan,
  totalTasks,
  error,
  copied,
  onCopyMarkdown,
  onDownloadMarkdown,
  onDownloadCsv,
}: {
  form: FormState;
  plan: GeneratedPlan;
  totalTasks: number;
  error: string | null;
  copied: string | null;
  onCopyMarkdown: () => void;
  onDownloadMarkdown: () => void;
  onDownloadCsv: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>{plan.source === "ai" ? "AI-generated plan" : "Template plan"}</span>
              <span className="text-line">•</span>
              <span>{form.weeks} weeks</span>
              <span className="text-line">•</span>
              <span>{plan.phases.length} phases</span>
              <span className="text-line">•</span>
              <span>{totalTasks} tasks</span>
            </div>
            <h2 className="mt-2 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] lg:text-[30px]">
              {form.projectName || "Project plan"}
            </h2>
            <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-muted">
              {plan.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ActionButton onClick={onCopyMarkdown} flashed={copied === "Copied as Markdown"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="8" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3 21V8a2 2 0 012-2h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              Copy
            </ActionButton>
            <ActionButton onClick={onDownloadMarkdown} flashed={copied === "Downloaded .md"}>
              <DownloadIcon />
              .md
            </ActionButton>
            <ActionButton onClick={onDownloadCsv} flashed={copied === "Downloaded .csv"}>
              <DownloadIcon />
              .csv
            </ActionButton>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[13px] text-amber-800">
            {error}
          </div>
        )}

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-positive/10 px-3 py-1.5 text-[12px] font-semibold text-positive"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-positive" />
              {copied}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phases */}
      <div className="rounded-[22px] border border-line bg-white p-6 shadow-card lg:p-7">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="mr-2 text-accent">01</span>Phases
        </div>
        <h3 className="mt-1 font-display text-[20px] font-semibold tracking-[-0.02em]">
          A path from kickoff to handover.
        </h3>

        <ol className="mt-5 space-y-4">
          {plan.phases.map((p, idx) => (
            <li
              key={`${idx}-${p.name}`}
              className="relative rounded-[16px] border border-line bg-canvas/60 p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] font-semibold text-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display text-[18px] font-semibold tracking-[-0.01em]">
                    {p.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-muted">
                  <span className="rounded-full border border-line bg-white px-2.5 py-1 font-semibold text-ink">
                    {p.durationWeeks} {p.durationWeeks === 1 ? "week" : "weeks"}
                  </span>
                  <span>Owner: {p.owner}</span>
                </div>
              </div>

              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {p.tasks.map((t, i) => (
                  <li
                    key={`${i}-${t.name}`}
                    className="rounded-xl border border-line bg-white p-3.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border border-line text-[10px] font-bold text-muted">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-semibold leading-tight text-ink">
                          {t.name}
                        </div>
                        <div className="mt-1 text-[11.5px] text-muted">
                          {t.effort} • {t.owner}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/15 bg-accent-lt px-3.5 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none text-accent" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-[13px] text-ink">
                  <span className="font-semibold">Milestone:</span> <span className="text-muted">{p.milestone}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Team + Risks side by side */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="mr-2 text-accent">02</span>Suggested team
          </div>
          <h3 className="mt-1 font-display text-[20px] font-semibold tracking-[-0.02em]">
            Roles to staff.
          </h3>
          <ul className="mt-4 divide-y divide-line">
            {plan.team.map((t, i) => (
              <li key={i} className="flex items-center justify-between py-3 text-[14px]">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-lt text-accent">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M16 18v-2a4 4 0 00-8 0v2M12 11a3 3 0 100-6 3 3 0 000 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold text-ink">{t.role}</div>
                    <div className="text-[12px] text-muted">{t.allocation}</div>
                  </div>
                </div>
                <span className="rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[12px] font-semibold text-ink">
                  ×{t.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="mr-2 text-accent">03</span>Top risks
          </div>
          <h3 className="mt-1 font-display text-[20px] font-semibold tracking-[-0.02em]">
            What to watch.
          </h3>
          <ul className="mt-4 space-y-3">
            {plan.risks.map((r, i) => (
              <li key={i} className="rounded-xl border border-line bg-canvas/60 p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-[14px] font-semibold leading-tight text-ink">
                    {r.title}
                  </h4>
                  <span className={`flex-none rounded-full border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide ${severityStyles(r.severity)}`}>
                    {r.severity}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  <span className="font-semibold text-ink">Mitigation: </span>{r.mitigation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cadence */}
      <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="mr-2 text-accent">04</span>Cadence
        </div>
        <h3 className="mt-1 font-display text-[20px] font-semibold tracking-[-0.02em]">
          How the team stays in sync.
        </h3>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {plan.cadence.map((c, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-line bg-canvas/60 p-3.5 text-[13.5px]"
            >
              <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-lt text-accent">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-all ${
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
