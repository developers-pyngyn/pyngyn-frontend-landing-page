"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DEMO_URL } from "./config";

type TaskState = "done" | "prog" | "todo" | "risk";
type BoardTask = { label: string; state: TaskState; tag: string };
type Industry = {
  id: string;
  label: string;
  headline: [string, string]; // [black line, muted line]
  description: string;
  bullets: string[];
  board: { title: string; tasks: BoardTask[]; insight: string };
};

const tagColor: Record<TaskState, string> = {
  done: "bg-[#e6f5ee] text-positive",
  prog: "bg-accent-lt text-accent-dk",
  todo: "bg-[#f3f4f7] text-muted",
  risk: "bg-[#fdecea] text-[#b9281f]",
};

const INDUSTRIES: Industry[] = [
  {
    id: "lawyers",
    label: "Lawyers",
    headline: ["Run every matter", "from intake to filing"],
    description:
      "Manage matters, deadlines, and client communication in one place, with PYNGYN tracking every filing date and deliverable.",
    bullets: ["Track matters and court deadlines", "Keep client documents and approvals in order", "Flag filings at risk before the deadline"],
    board: {
      title: "Acme Corp v. Dalton · Matter",
      tasks: [
        { label: "Open matter & conflicts check", state: "done", tag: "Done" },
        { label: "Draft complaint", state: "prog", tag: "In progress" },
        { label: "Compile evidence & exhibits", state: "prog", tag: "In progress" },
        { label: "File with court & serve", state: "risk", tag: "At risk" },
      ],
      insight: "PYNGYN flagged 1 task at risk: filing depends on client sign-off, which is 2 days behind.",
    },
  },
  {
    id: "accountants",
    label: "Accountants",
    headline: ["Close the books", "and never miss a deadline"],
    description:
      "Plan audits, tax filings, and month-end close across clients, with every statutory deadline tracked automatically.",
    bullets: ["Run audits and filings across clients", "Track statutory and tax deadlines", "Catch bottlenecks before the due date"],
    board: {
      title: "Northwind Pvt Ltd · FY Audit",
      tasks: [
        { label: "Engagement letter signed", state: "done", tag: "Done" },
        { label: "Collect financial records", state: "prog", tag: "In progress" },
        { label: "Audit fieldwork", state: "prog", tag: "In progress" },
        { label: "File tax return", state: "risk", tag: "At risk" },
      ],
      insight: "PYNGYN flagged 1 task at risk: the filing depends on fieldwork, which is 2 days behind.",
    },
  },
  {
    id: "marketing",
    label: "Marketing Consultants",
    headline: ["Run client campaigns", "without the chaos"],
    description:
      "Manage strategy, content, and deliverables across client accounts, so PYNGYN keeps every campaign on schedule.",
    bullets: ["Juggle multiple client retainers", "Keep content and approvals on track", "Surface bottlenecks before launch"],
    board: {
      title: "Nova Brand · Q3 Campaign",
      tasks: [
        { label: "Strategy approved", state: "done", tag: "Done" },
        { label: "Content calendar", state: "prog", tag: "In progress" },
        { label: "Creative production", state: "prog", tag: "In progress" },
        { label: "Client approval", state: "risk", tag: "At risk" },
      ],
      insight: "PYNGYN flagged 1 task at risk: approval is blocked on creative, which needs a revision.",
    },
  },
  {
    id: "creative",
    label: "Creative Services",
    headline: ["Deliver creative work", "on brief and on time"],
    description:
      "Manage briefs, revisions, and approvals across client projects, with PYNGYN tracking every round and deadline.",
    bullets: ["Track briefs, rounds, and approvals", "Keep feedback and assets in one place", "Flag projects slipping past deadline"],
    board: {
      title: "Lumen Studio · Rebrand",
      tasks: [
        { label: "Creative brief signed off", state: "done", tag: "Done" },
        { label: "Concept exploration", state: "prog", tag: "In progress" },
        { label: "Design production", state: "prog", tag: "In progress" },
        { label: "Client sign-off", state: "risk", tag: "At risk" },
      ],
      insight: "PYNGYN flagged 1 task at risk: sign-off depends on production, which is 2 days behind.",
    },
  },
  {
    id: "architecture",
    label: "Architects",
    headline: ["Move projects", "from concept to approval"],
    description:
      "Coordinate drawings, consultants, and approvals across projects, with milestones that update as work progresses.",
    bullets: ["Track design phases and submittals", "Coordinate consultants and approvals", "Surface permit delays before they cascade"],
    board: {
      title: "Riverside Residence · Design",
      tasks: [
        { label: "Concept design approved", state: "done", tag: "Done" },
        { label: "Design development", state: "prog", tag: "In progress" },
        { label: "Construction drawings", state: "prog", tag: "In progress" },
        { label: "Permit submission", state: "risk", tag: "At risk" },
      ],
      insight: "PYNGYN flagged 1 task at risk: the permit depends on construction drawings, which are 2 days behind.",
    },
  },
];

function MiniBoard({ board, boardId, done, onToggle }: {
  board: Industry["board"];
  boardId: string;
  done: Record<string, boolean>;
  onToggle: (boardId: string, label: string) => void;
}) {
  const tasks = board.tasks.map((t) =>
    done[`${boardId}:${t.label}`] ? { ...t, state: "done" as TaskState, tag: "Done" } : t
  );
  const hasRisk = tasks.some((t) => t.state === "risk");
  const insight = hasRisk ? board.insight : "PYNGYN re-planned automatically. Every task is on track.";

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 text-[12.5px] font-semibold text-[#9aa0ad]">{board.title}</span>
        <span className="ml-auto text-[10.5px] font-medium text-muted/70">Try it, click a task</span>
      </div>
      {tasks.map((t, idx) => (
        <motion.div
          key={t.label}
          className="flex items-center gap-3 border-b border-[#f1f1f5] px-4 py-2.5 text-[13.5px]"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + idx * 0.08, duration: 0.35 }}
        >
          <button
            type="button"
            role="checkbox"
            aria-checked={t.state === "done"}
            aria-label={t.label}
            onClick={() => onToggle(boardId, t.label)}
            className={`grid h-4 w-4 flex-none cursor-pointer place-items-center rounded border-2 transition-colors hover:border-accent ${
              t.state === "done" ? "border-positive bg-positive" : "border-line"
            }`}
          >
            {t.state === "done" && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12l5 5L20 6" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <button type="button" onClick={() => onToggle(boardId, t.label)} className="cursor-pointer text-left font-medium">
            {t.label}
          </button>
          <span className={`ml-auto rounded-full px-2 py-[2px] text-[10.5px] font-semibold ${tagColor[t.state]}`}>
            {t.tag}
          </span>
        </motion.div>
      ))}
      <div className={`flex items-start gap-2 px-4 py-3 text-[12px] ${hasRisk ? "bg-accent-lt text-accent-dk" : "bg-[#e6f5ee] text-positive"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-none">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        </svg>
        {insight}
      </div>
    </div>
  );
}

export function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const ind = INDUSTRIES[active];

  function toggle(boardId: string, label: string) {
    const key = `${boardId}:${label}`;
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <section className="section">
      <div className="wrap">
        <div className="text-center">
          <h2 className="title mx-auto max-w-[760px]">
            Built for every <span className="text-accent">professional-services firm</span>
          </h2>
          <p className="lead mx-auto mt-4">However your firm works, PYNGYN runs the engagement and keeps it on track.</p>
        </div>

        {/* Tabs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {INDUSTRIES.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`rounded-full border px-5 py-2.5 text-[15px] font-semibold transition-all ${
                i === active
                  ? "border-accent bg-white text-accent shadow-card"
                  : "border-line bg-white text-ink hover:border-ink/30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="mt-9 overflow-hidden rounded-[28px] bg-[#f6f7fb] p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              {/* Left */}
              <div>
                <h3 className="font-display text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.08] tracking-[-0.025em]">
                  {ind.headline[0]}
                  <br />
                  <span className="text-muted">{ind.headline[1]}</span>
                </h3>
                <p className="mt-5 max-w-[460px] text-[16px] leading-[1.6] text-muted">{ind.description}</p>
                <ul className="mt-7 flex flex-col gap-3">
                  {ind.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15.5px]">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-lt text-accent" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a href={DEMO_URL} className="btn btn-primary mt-8 w-fit">
                  Explore solution →
                </a>
              </div>

              {/* Right: mini product board */}
              <MiniBoard board={ind.board} boardId={ind.id} done={done} onToggle={toggle} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
