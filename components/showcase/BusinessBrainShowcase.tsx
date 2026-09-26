"use client";

/*
 * BusinessBrainShowcase — a live, component-built recreation of the PYNGYN
 * Business Brain screen for a finance team, used in place of a flat
 * screenshot on the home page.
 *
 * At rest it is deliberately a *screenshot*: the conversation panel holds the
 * hint callout and nothing else, the quick actions are single-line labels and
 * the lower third of the main column is empty. Everything still works when
 * clicked — the scripted answers, streaming and source chips are simply not on
 * screen until the visitor acts.
 *
 * Shares the cream canvas, sidebar, topbar and container-query fit/scale
 * machinery with ClientSpaceShowcase via ./shell/AppShell.
 *
 * There is no AI and no network here: every answer is assembled from the
 * figures in `mockData` below, so changing a number updates every answer that
 * quotes it.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig, useInView } from "framer-motion";
import {
  CircleButton,
  Rise,
  ShellFrame,
  ShellSidebar,
  ShellTopbar,
  Tile,
  buildShellCss,
  type ShellDesign,
  type ShellNavItem,
} from "./shell/AppShell";
import { CARD_CLASS, PANEL_CLASS, PANEL_SHADOW, T } from "./shell/tokens";
import {
  IconApprovals,
  IconArrowUp,
  IconBilling,
  IconCalendar,
  IconCheck,
  IconCopy,
  IconDocuments,
  IconKnowledge,
  IconPortal,
  IconProposals,
  IconRefresh,
  IconReports,
  IconSparkle,
  IconTasks,
  IconThumbDown,
  IconThumbUp,
  IconTime,
  IconWarning,
} from "./showcase-icons";

/* ────────────────────────────────────────────────────────────────────
   Mock data
   ──────────────────────────────────────────────────────────────────── */

/** Deterministic money formatting — no Intl, so SSR and client always agree. */
const money = (n: number) => `£${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

/** Ageing buckets are the source of the outstanding total, so the Collections
 *  breakdown and every answer that quotes the total can never disagree. */
const BUCKETS = { current: 18600, days31: 8900, days60: 4400 } as const;
const OUTSTANDING = BUCKETS.current + BUCKETS.days31 + BUCKETS.days60;

const org = {
  name: "Star Finance",
  role: "Finance Lead · 4 ClientSpaces",
  initials: "SF",
  lead: { firstName: "Alex", initials: "AM" },
  week: "3–9 Aug",
  cash: { onHand: 412600, weekChange: 38400, runwayMonths: 8.2 },
  billing: {
    invoiced: 68400,
    collected: 52100,
    shortOfPlan: 16300,
    margin: 34.2,
    marginDelta: 1.1,
  },
  receivables: {
    ...BUCKETS,
    outstanding: OUTSTANDING,
    unpaidInvoices: 9,
    currentInvoices: 5,
    dso: 41,
    dsoTarget: 35,
    oldestDays: 71,
    oldestValue: BUCKETS.days60,
    issuingTomorrow: { count: 2, total: 12750 },
    promiseToPay: { value: 6200, client: "Client C", due: "Mon 11 Aug" },
  },
  payables: { dueNext14: 27400, supplierCount: 6 },
  close: { step: 6, steps: 9, openRecs: 2, behindDays: 5, signOff: "Fri 8 Aug" },
  approvals: { queue: 8, averageAgeDays: 2.4 },
  risk: {
    items: 4,
    worstValue: 12400,
    worstDays: 47,
    overspend: 14200,
    overspendDays: 6,
    reminders: 2,
  },
  team: { people: 6, scheduled: 228, capacity: 240, atCapacity: 3 },
  unbilled: { hours: 96, advisoryHours: 38 },
  deadlines: { next14: 12, heaviestDay: 14 },
} as const;

/** `**…**` marks a figure, client or date for bolding in the answer. */
type Answer = {
  intro: string;
  lines: readonly string[];
  closing?: string;
  chips: readonly string[];
};

type QuickAction = { id: string; label: string; prompt: string; answer: Answer };

const QUICK_ACTIONS: readonly QuickAction[] = [
  {
    id: "pulse",
    label: "Weekly pulse",
    prompt: "Give me this week's pulse.",
    answer: {
      intro: `Week of **${org.week}**. Cash position, receivables, and close status.`,
      lines: [
        `Cash: **${money(org.cash.onHand)}** on hand, up **${money(org.cash.weekChange)}** on last week.`,
        `Collected: **${money(org.billing.collected)}** against **${money(org.billing.invoiced)}** invoiced. Net **${money(org.billing.shortOfPlan)}** short of plan.`,
        `Receivables: **${money(org.receivables.outstanding)}** outstanding across **${org.receivables.unpaidInvoices} invoices**, DSO at **${org.receivables.dso} days**.`,
        `Payables: **${money(org.payables.dueNext14)}** due in the next **14 days**, nothing overdue.`,
        `Close: July close is **${org.close.step} of ${org.close.steps}** steps complete, **${org.close.openRecs} reconciliations** outstanding.`,
        `Margin: **${org.billing.margin}%**, down **${org.billing.marginDelta} points** on June.`,
      ],
      closing: "Biggest movement — Client D slipped from current into the 31–60 day bucket.",
      chips: ["Invoices", "Bank", "Ledger", "Payables", "Close"],
    },
  },
  {
    id: "risk",
    label: "At-risk work",
    prompt: "What is at risk right now?",
    answer: {
      intro: `**${org.risk.items} items** need a decision this week.`,
      lines: [
        `**Client D** — **${money(org.risk.worstValue)}** now **${org.risk.worstDays} days** out, second reminder unanswered, no payment plan on file.`,
        `**Client A** — **${money(org.receivables.oldestValue)}** at **${org.receivables.oldestDays} days**, **${org.risk.reminders} reminders** sent. Only account past 60 days.`,
        `July close — bank reconciliation for the deposit account is **${org.close.behindDays} days** behind schedule.`,
        `**Client C** — approved spend exceeded by **${money(org.risk.overspend)}**, unresolved for **${org.risk.overspendDays} days** and not yet reflected in the forecast.`,
        `**Client B** — **${money(org.receivables.days31)}** invoice disputed on scope, unresolved **4 days**.`,
      ],
      closing:
        "Client D is the one to act on today — it is the only balance with no forward commitment attached.",
      chips: ["Invoices", "Clients", "Close", "Risks"],
    },
  },
  {
    id: "collections",
    label: "Collections",
    prompt: "Where does collections stand?",
    answer: {
      intro: `**${money(org.receivables.outstanding)}** outstanding across **${org.receivables.unpaidInvoices} invoices**. DSO **${org.receivables.dso} days**.`,
      lines: [
        `Current (0–30 days): **${money(org.receivables.current)}** — **${org.receivables.currentInvoices} invoices**, nothing to chase yet.`,
        `31–60 days: **${money(org.receivables.days31)}** — INV-2041 (**Client C**) and INV-2038 (**Client B**).`,
        `60+ days: **${money(org.receivables.days60)}** — INV-1994 (**Client A**), **${org.receivables.oldestDays} days** out, no reply to **${org.risk.reminders} reminders**.`,
        `Issuing tomorrow: **${org.receivables.issuingTomorrow.count} invoices** totalling **${money(org.receivables.issuingTomorrow.total)}**.`,
        `Promise-to-pay on file: **${money(org.receivables.promiseToPay.value)}** from **${org.receivables.promiseToPay.client}**, due **${org.receivables.promiseToPay.due}**.`,
      ],
      closing: `Clearing the two 31–60 day invoices this week would bring DSO back under ${org.receivables.dsoTarget}.`,
      chips: ["Invoices", "Clients", "Ledger"],
    },
  },
  {
    id: "team",
    label: "Team load",
    prompt: "How is the team loaded?",
    answer: {
      intro: `**${org.team.people} people**, **${org.team.scheduled} scheduled hours** next week against **${org.team.capacity} capacity**.`,
      lines: [
        "Over capacity: **Sam O.** (**46h / 40h**), carrying close and collections at the same time.",
        `At capacity: **${org.team.atCapacity} people** between **36 and 40 hours**.`,
        "Under capacity: **Dana K.** (**22h**) and **Ravi T.** (**19h**).",
        `Unbilled: **${org.unbilled.hours} hours** logged but not invoiced, **${org.unbilled.advisoryHours}h** of it on advisory work for **Client B**.`,
        `Approval queue: **${org.approvals.queue} items**, average age **${org.approvals.averageAgeDays} days**.`,
      ],
      closing:
        "Moving collections follow-ups to Dana would take Sam back under 40 hours this week.",
      chips: ["Time", "Team", "Invoices"],
    },
  },
  {
    id: "deadlines",
    label: "Deadlines",
    prompt: "What deadlines are coming up?",
    answer: {
      intro: `**${org.deadlines.next14} dated commitments** in the next **14 days**.`,
      lines: [
        "**Today** — Client C call at **10:30** on the overspend; Q3 forecast draft due.",
        `**Tomorrow** — **${org.receivables.issuingTomorrow.count} invoices** issue; supplier run of **${money(org.payables.dueNext14)}** clears.`,
        "**Fri 8 Aug** — July close sign-off.",
        `**Mon 11 Aug** — heaviest day of the fortnight, **${org.deadlines.heaviestDay} items** due.`,
        "**Thu 14 Aug** — VAT return submission.",
        "**Wed 20 Aug** — quarterly board pack to the directors.",
        "**Fri 22 Aug** — payroll cut-off for the August run.",
      ],
      closing: "The 14 Aug VAT return is the only deadline with a statutory penalty attached.",
      chips: ["Calendar", "Close", "Payables", "Reports"],
    },
  },
  {
    id: "cash",
    label: "Cash position",
    prompt: "Where does cash stand?",
    answer: {
      intro: `**${money(org.cash.onHand)}** on hand. **${money(org.payables.dueNext14)}** committed to suppliers in the next **14 days**, leaving **${money(org.cash.onHand - org.payables.dueNext14)}** free.`,
      lines: [
        `Runway at current burn: **${org.cash.runwayMonths} months**.`,
        `Inflows expected this week: **${money(org.receivables.issuingTomorrow.total)}**.`,
      ],
      chips: ["Bank", "Payables", "Invoices"],
    },
  },
  {
    id: "close",
    label: "Close status",
    prompt: "Where does the July close stand?",
    answer: {
      intro: `July close is **${org.close.step} of ${org.close.steps}** steps complete.`,
      lines: [
        `Outstanding: deposit account reconciliation (**${org.close.behindDays} days** behind), intercompany journals, and the fixed-asset roll-forward.`,
        `Sign-off due **${org.close.signOff}**.`,
      ],
      chips: ["Close", "Ledger", "Journals"],
    },
  },
];

const FALLBACK_ANSWER: Answer = {
  intro: "I can only answer from what your role can see. Here's the closest match:",
  lines: [
    `Collected: **${money(org.billing.collected)}** against **${money(org.billing.invoiced)}** invoiced. Net **${money(org.billing.shortOfPlan)}** short of plan.`,
    `Receivables: **${money(org.receivables.outstanding)}** outstanding across **${org.receivables.unpaidInvoices} invoices**, DSO at **${org.receivables.dso} days**.`,
  ],
  chips: ["Invoices", "Bank", "Ledger"],
};

const NAV: readonly ShellNavItem[] = [
  /* first row is cut by the top fade, so the rail reads as scrolled down */
  { id: "tasks", label: "Tasks", tint: T.green, Icon: IconTasks },
  { id: "time", label: "Time", tint: T.purple, Icon: IconTime },
  { id: "documents", label: "Documents", tint: T.blue, Icon: IconDocuments },
  { id: "approvals", label: "Approvals", tint: T.pink, Icon: IconApprovals },
  { id: "portal", label: "Client portal", tint: T.teal, Icon: IconPortal },
  { id: "billing", label: "Billing", tint: T.teal, Icon: IconBilling },
  { id: "reports", label: "Reports", tint: T.purple, Icon: IconReports },
  { id: "calendar", label: "Calendar", tint: T.blue, Icon: IconCalendar },
  { id: "brain", label: "Business Brain", tint: T.purple, Icon: IconSparkle },
  { id: "knowledge", label: "Knowledge base", tint: T.amber, Icon: IconKnowledge },
  { id: "risks", label: "Risks", tint: T.coral, Icon: IconWarning },
  { id: "proposals", label: "Proposals", tint: T.purple, Icon: IconProposals },
];

const mockData = {
  org,
  nav: NAV,
  header: {
    title: "Business Brain",
    subtitle:
      "Grounded in your live ClientSpace, under your own permissions - sources on every answer",
  },
  hint: "Ask about workload, money, risk, the team, or deadlines - or tap a quick action. Answers use only what your role can see.",
  composer: {
    placeholder: `Ask your ClientSpace anything, ${org.lead.firstName}...`,
    submit: "Ask",
    reset: "New question",
  },
  quickActions: QUICK_ACTIONS,
  fallback: FALLBACK_ANSWER,
  rail: {
    actionsHeading: "Quick actions",
    groundedHeading: "Grounded in",
    groundedRows: [
      "Invoices & AR",
      "Bank feeds",
      "Payables",
      "General ledger",
      "Unbilled time",
      "Close checklist",
      "Deadlines (14 days)",
      "Knowledge base",
    ],
    groundedFootnote: "Gathered fresh per question, under your own role's permissions.",
  },
  sourcesLabel: "Sources",
} as const;

/* ────────────────────────────────────────────────────────────────────
   Layout — authored at 1600×860 (≈16:9.5) and scaled to fit its column
   ──────────────────────────────────────────────────────────────────── */

const PREFIX = "bbs";

/*
 * Authored once at 1600×950 (16:9.5) and only ever *scaled* — never reflowed
 * and never cropped — so the FULL desktop layout (sidebar, conversation and the
 * right rail) always stays in frame and simply shrinks to fit. On a phone it
 * reads as a small desktop screenshot, exactly like the ClientSpace showcase.
 * wideFrom is dropped to 200 so the scaled desktop layout applies at every
 * width the mockup is ever placed in (down to a ~200px column).
 */
const DESIGN: ShellDesign = {
  wide: { w: 1600, h: 950 },
  mid: { w: 1600, h: 950 },
  midFrom: 200,
  wideFrom: 200,
};

/* Both rail cards are full-width children of one stretching column, so their
   left and right edges line up exactly. The conversation panel takes all the
   height the column has, which puts the composer flush against the bottom. */
const BODY_CSS = `
.bbs-body{display:flex;flex-direction:row;gap:14px;min-height:0;flex:1}
.bbs-main{display:flex;flex-direction:column;min-width:0;min-height:0;flex:1;gap:14px}
.bbs-panel-wrap{display:flex;flex-direction:column;min-width:0;min-height:0;flex:1}
.bbs-panel{display:flex;flex-direction:column;flex:1;min-height:0}
.bbs-rail{display:flex;flex-direction:column;align-items:stretch;gap:20px;width:300px;flex:none}
.bbs-rail>*{flex:none;width:100%}
.bbs-actions{display:flex;flex-direction:column;align-items:stretch;gap:10px}
.bbs-grounded{display:flex;flex-direction:column;gap:6px}

@keyframes bbs-flash{
  0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,0)}
  50%{box-shadow:0 0 0 4px rgba(139,92,246,.25)}
}
.bbs-flash{animation:bbs-flash 620ms ease-in-out}
`;

const SHOWCASE_CSS = buildShellCss(PREFIX, DESIGN, BODY_CSS);

/* ────────────────────────────────────────────────────────────────────
   Transcript model
   ──────────────────────────────────────────────────────────────────── */

type Phase = "thinking" | "streaming" | "done";
type Turn = {
  id: string;
  question: string;
  answer: Answer;
  time: string;
  phase: Phase;
  shown: number;
};

/** intro + one unit per line + closing */
const unitCount = (a: Answer) => 1 + a.lines.length + (a.closing ? 1 : 0);

const plainText = (a: Answer) =>
  [a.intro, ...a.lines.map((line) => `- ${line}`), a.closing ?? ""]
    .filter(Boolean)
    .join("\n")
    .replace(/\*\*/g, "");

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function clockLabel() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `Today, ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

/* ── idle demo loop ──────────────────────────────────────────────── */

/** The three actions the resting-state loop cycles through. */
const DEMO_ACTIONS = ["pulse", "collections", "cash"]
  .map((id) => QUICK_ACTIONS.find((a) => a.id === id))
  .filter((a): a is QuickAction => Boolean(a));

type DemoPhase = "pulse" | "typing" | "answering" | "hold";
type DemoState = { round: number; phase: DemoPhase; typed: number };

const DEMO_TIMING = { pulse: 620, keystroke: 30, submit: 380, hold: 2500, clear: 120 } as const;

/** The one exchange shown instead of the loop under reduced motion. */
function staticTurn(): Turn {
  const action = DEMO_ACTIONS[0];
  return {
    id: "static",
    question: action.prompt,
    answer: action.answer,
    time: "Today, 09:41",
    phase: "done",
    shown: unitCount(action.answer),
  };
}

/* ────────────────────────────────────────────────────────────────────
   Pieces
   ──────────────────────────────────────────────────────────────────── */

/** Renders `**figure**` spans in bold. */
function RichText({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-[#1A1A1A]">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function SourceChips({ chips }: { chips: readonly string[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="mr-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A39D95]">
        {mockData.sourcesLabel}
      </span>
      {chips.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E7E1D9] bg-white px-2 py-[3px] text-[12px] font-medium text-[#57534E]"
        >
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{ background: T.green }}
            aria-hidden="true"
          />
          {chip}
        </span>
      ))}
    </div>
  );
}

function AssistantTurn({ turn }: { turn: Turn }) {
  const [copied, setCopied] = useState(false);
  const a = turn.answer;

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard?.writeText(plainText(a));
      setCopied(true);
    } catch {
      /* clipboard unavailable (insecure context) — leave the icon alone */
    }
  }, [a]);

  const visible = (unit: number) => turn.shown >= unit;

  return (
    <div className="group relative flex gap-3">
      <Tile Icon={IconSparkle} tint={T.purple} size={32} icon={16} />

      <div className="min-w-0 flex-1">
        {turn.phase === "thinking" ? (
          <p className="flex items-center gap-1.5 py-1 text-[15px] text-[#7A756E]">
            <span className="bbs-pulse h-[6px] w-[6px] rounded-full bg-[#8B5CF6]" />
            Thinking…
          </p>
        ) : (
          <>
            <p
              className="text-[15px] leading-[1.6] text-[#57534E] transition-opacity duration-300"
              style={{ opacity: visible(1) ? 1 : 0 }}
            >
              <RichText text={a.intro} />
            </p>

            <ul className="mt-2 space-y-2 text-[15px] leading-[1.6] text-[#57534E]">
              {a.lines.map((line, i) => (
                <li
                  key={line}
                  className="flex gap-2 transition-opacity duration-300"
                  style={{ opacity: visible(2 + i) ? 1 : 0 }}
                >
                  <span
                    className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#A39D95]"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <RichText text={line} />
                  </span>
                </li>
              ))}
            </ul>

            {a.closing ? (
              <p
                className="mt-2.5 text-[15px] leading-[1.6] text-[#57534E] transition-opacity duration-300"
                style={{ opacity: visible(2 + a.lines.length) ? 1 : 0 }}
              >
                <RichText text={a.closing} />
              </p>
            ) : null}

            {turn.phase === "done" ? <SourceChips chips={a.chips} /> : null}
          </>
        )}
      </div>

      {/* row actions, revealed on hover or keyboard focus */}
      <div className="absolute right-0 top-0 flex items-center gap-1 opacity-0 transition-opacity duration-150 focus-within:opacity-100 group-hover:opacity-100">
        <CircleButton
          label={copied ? "Answer copied" : "Copy answer"}
          size={26}
          className="text-[#A39D95] hover:bg-[#F8F5F0] hover:text-[#1A1A1A]"
          onClick={copy}
        >
          {copied ? (
            <IconCheck style={{ width: 14, height: 14, color: T.green }} />
          ) : (
            <IconCopy style={{ width: 14, height: 14 }} />
          )}
        </CircleButton>
        <CircleButton
          label="Good answer"
          size={26}
          className="text-[#A39D95] hover:bg-[#F8F5F0] hover:text-[#1A1A1A]"
        >
          <IconThumbUp style={{ width: 14, height: 14 }} />
        </CircleButton>
        <CircleButton
          label="Bad answer"
          size={26}
          className="text-[#A39D95] hover:bg-[#F8F5F0] hover:text-[#1A1A1A]"
        >
          <IconThumbDown style={{ width: 14, height: 14 }} />
        </CircleButton>
      </div>
    </div>
  );
}

function RailCard({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className={`${PANEL_CLASS} p-4`} style={{ boxShadow: PANEL_SHADOW }}>
      <h3 className="border-b border-[#F0EBE4] pb-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A39D95]">
        {heading}
      </h3>
      <div className="pt-3">{children}</div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Root
   ──────────────────────────────────────────────────────────────────── */

export function BusinessBrainShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(rootRef, { amount: 0.25 });

  const [activeId, setActiveId] = useState("brain");
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  /* resting state is the empty screenshot */
  const [turns, setTurns] = useState<readonly Turn[]>([]);
  const [demo, setDemo] = useState<DemoState | null>(null);
  const [takenOver, setTakenOver] = useState(false);
  const [reduced, setReduced] = useState(false);

  const canAsk = draft.trim().length > 0;
  const pending = useMemo(() => turns.some((t) => t.phase !== "done"), [turns]);
  const demoAction = demo ? DEMO_ACTIONS[demo.round % DEMO_ACTIONS.length] : null;

  /* Ctrl/Cmd+K focuses the mock search only while the mockup is on screen. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const input = searchRef.current;
      if (!input) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        if (!onScreen) return;
        event.preventDefault();
        input.focus();
      } else if (event.key === "Escape" && document.activeElement === input) {
        input.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onScreen]);

  /* Drives the thinking → streaming → done progression of the newest turn.
     One timeout at a time, cleared on unmount or when the turn advances. */
  useEffect(() => {
    const turn = turns[turns.length - 1];
    if (!turn || turn.phase === "done") return;

    const advance = (t: Turn): Turn => {
      const total = unitCount(t.answer);
      if (t.phase === "thinking") return { ...t, phase: "streaming", shown: 1 };
      const next = t.shown + 1;
      return next >= total ? { ...t, shown: total, phase: "done" } : { ...t, shown: next };
    };

    if (prefersReducedMotion()) {
      setTurns((list) =>
        list.map((t) =>
          t.id === turn.id ? { ...t, phase: "done", shown: unitCount(t.answer) } : t,
        ),
      );
      return;
    }

    const id = setTimeout(
      () => {
        /* a quick-action prompt sits in the composer while we "think" */
        if (turn.phase === "thinking") setDraft("");
        setTurns((list) => list.map((t) => (t.id === turn.id ? advance(t) : t)));
      },
      turn.phase === "thinking" ? 700 : 130,
    );
    return () => clearTimeout(id);
  }, [turns]);

  /* Newest message stays in view. */
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  const ask = useCallback((question: string, answer: Answer) => {
    setTurns((list) => [
      ...list,
      {
        id: `${question}-${list.length}`,
        question,
        answer,
        time: clockLabel(),
        phase: "thinking",
        shown: 0,
      },
    ]);
  }, []);

  const submitDraft = useCallback(() => {
    const question = draft.trim();
    if (!question) return;
    const match = mockData.quickActions.find(
      (action) => action.prompt.toLowerCase() === question.toLowerCase(),
    );
    setDraft("");
    ask(question, match ? match.answer : mockData.fallback);
  }, [draft, ask]);

  const runQuickAction = useCallback(
    (action: QuickAction) => {
      /* fills the composer; it clears again when the answer starts streaming */
      setDraft(action.prompt);
      ask(action.prompt, action.answer);
    },
    [ask],
  );

  /* ── idle demo loop ───────────────────────────────────────────── */

  useEffect(() => setReduced(prefersReducedMotion()), []);

  /* Reduced motion gets one finished exchange instead of the loop. */
  useEffect(() => {
    if (takenOver || !reduced) return;
    setDemo(null);
    setTurns((list) => (list.length ? list : [staticTurn()]));
  }, [reduced, takenOver]);

  /* Starts once the mockup is on screen; never restarts after a takeover. */
  useEffect(() => {
    if (takenOver || reduced || demo || !onScreen) return;
    setDemo({ round: 0, phase: "pulse", typed: 0 });
  }, [onScreen, takenOver, reduced, demo]);

  /* One timer at a time, so unmounting or a takeover cancels cleanly. */
  useEffect(() => {
    if (!demo || !demoAction || takenOver || !onScreen) return;
    const last = turns[turns.length - 1];
    let id: ReturnType<typeof setTimeout>;

    if (demo.phase === "pulse") {
      id = setTimeout(
        () => setDemo({ ...demo, phase: "typing", typed: 0 }),
        DEMO_TIMING.pulse,
      );
    } else if (demo.phase === "typing" && demo.typed < demoAction.prompt.length) {
      id = setTimeout(() => {
        setDraft(demoAction.prompt.slice(0, demo.typed + 1));
        setDemo({ ...demo, typed: demo.typed + 1 });
      }, DEMO_TIMING.keystroke);
    } else if (demo.phase === "typing") {
      id = setTimeout(() => {
        ask(demoAction.prompt, demoAction.answer);
        setDemo({ ...demo, phase: "answering" });
      }, DEMO_TIMING.submit);
    } else if (demo.phase === "answering") {
      /* wait for the streaming effect above to finish this turn */
      if (!last || last.phase !== "done") return;
      id = setTimeout(
        () => setDemo({ round: demo.round + 1, phase: "hold", typed: 0 }),
        DEMO_TIMING.hold,
      );
    } else {
      id = setTimeout(() => {
        setTurns([]);
        setDemo({ round: demo.round, phase: "pulse", typed: 0 });
      }, DEMO_TIMING.clear);
    }

    return () => clearTimeout(id);
  }, [demo, demoAction, takenOver, onScreen, turns, ask]);

  /* Any real interaction inside the mockup ends the loop for good. */
  useEffect(() => {
    if (!demo) return;
    const stop = (event: Event) => {
      const root = rootRef.current;
      if (root && event.target instanceof Node && root.contains(event.target)) {
        setTakenOver(true);
        setDemo(null);
      }
    };
    const events: (keyof DocumentEventMap)[] = ["pointerdown", "keydown", "focusin"];
    events.forEach((name) => document.addEventListener(name, stop, true));
    return () => events.forEach((name) => document.removeEventListener(name, stop, true));
  }, [demo]);

  return (
    <MotionConfig reducedMotion="user">
      <ShellFrame
        prefix={PREFIX}
        css={SHOWCASE_CSS}
        label="Interactive preview of PYNGYN Business Brain"
        rootRef={rootRef}
        collapsed={collapsed}
      >
        <ShellSidebar
          prefix={PREFIX}
          workspace={{ name: org.name, role: org.role, initials: org.initials }}
          nav={mockData.nav}
          navLabel="Workspace sections"
          activeId={activeId}
          onSelect={setActiveId}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          mask="top"
          activeRing={T.green}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <ShellTopbar
            prefix={PREFIX}
            workspaceName={org.name}
            userInitials={org.lead.initials}
            searchRef={searchRef}
            query={search}
            onQuery={setSearch}
          />

          <div className="bbs-body">
            <main className="bbs-main">
              {/* header row */}
              <Rise i={0} className="min-w-0">
                <h1 className="text-[30px] font-bold leading-none tracking-[-0.03em] text-[#1A1A1A]">
                  {mockData.header.title}
                </h1>
                <p className="mt-1.5 max-w-[620px] text-[13px] text-[#7A756E]">
                  {mockData.header.subtitle}
                </p>
              </Rise>

              {/* conversation */}
              <Rise i={1} className="bbs-panel-wrap">
                <section
                  className={`bbs-panel ${CARD_CLASS} min-w-0 p-4`}
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,.03)" }}
                >
                  {/* hint callout */}
                  <div className="flex shrink-0 items-start gap-3 border-b border-[#F0EBE4] pb-3.5">
                    <Tile Icon={IconSparkle} tint={T.purple} />
                    <p className="min-w-0 flex-1 text-[13px] leading-[1.55] text-[#7A756E]">
                      {mockData.hint}
                    </p>
                    {demo ? (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                        style={{ background: T.field, color: T.mute }}
                      >
                        Demo
                      </span>
                    ) : null}
                    {/* only offered once there is a transcript to clear */}
                    {!demo && turns.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setTurns([])}
                        className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-medium text-[#A39D95] transition-colors hover:bg-[#F8F5F0] hover:text-[#1A1A1A]"
                      >
                        <IconRefresh style={{ width: 13, height: 13 }} />
                        {mockData.composer.reset}
                      </button>
                    ) : null}
                  </div>

                  {/* transcript — empty at rest */}
                  <div
                    ref={transcriptRef}
                    aria-live="polite"
                    className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1 pt-4"
                  >
                    {turns.map((turn) => (
                      <article key={turn.id} className="space-y-3">
                        <div className="flex justify-end">
                          <p
                            className="max-w-[70%] rounded-2xl border px-3.5 py-2 text-[15px] leading-[1.5] text-[#1A1A1A]"
                            style={{ background: T.bubble, borderColor: T.bubbleBorder }}
                          >
                            {turn.question}
                          </p>
                        </div>
                        <AssistantTurn turn={turn} />
                        <p className="text-[11px] text-[#A39D95]">{turn.time}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </Rise>

              {/* composer */}
              <div className="flex shrink-0 items-end gap-2">
                <textarea
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submitDraft();
                    }
                  }}
                  placeholder={mockData.composer.placeholder}
                  aria-label={mockData.composer.placeholder}
                  className="min-h-[44px] w-full flex-1 resize-none rounded-2xl border border-[#E7E1D9] bg-white px-3.5 py-3 text-[14px] leading-[1.3] text-[#1A1A1A] outline-none transition-shadow placeholder:text-[#A39D95] focus:border-[#17A67B] focus:ring-2 focus:ring-[#17A67B]/20"
                />
                <button
                  type="button"
                  onClick={submitDraft}
                  disabled={!canAsk || pending}
                  className="h-[44px] shrink-0 rounded-2xl px-5 text-[14px] font-semibold transition-colors"
                  style={
                    canAsk
                      ? { background: T.coral, color: "#FFFFFF" }
                      : { background: "#FBEEEA", color: T.mute }
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {mockData.composer.submit}
                    <IconArrowUp style={{ width: 14, height: 14 }} />
                  </span>
                </button>
              </div>
            </main>

            {/* rail */}
            <aside className="bbs-rail">
              <Rise i={2} className="min-w-0">
                <RailCard heading={mockData.rail.actionsHeading}>
                  <ul className="bbs-actions">
                    {mockData.quickActions.map((action) => (
                      <li key={action.id}>
                        <button
                          type="button"
                          onClick={() => runQuickAction(action)}
                          className={`flex h-[48px] w-full items-center rounded-xl border border-[#E7E1D9] bg-white px-3 text-left text-[13px] font-semibold text-[#1A1A1A] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-px hover:border-[#D8D0C6] hover:shadow-[0_4px_12px_-8px_rgba(0,0,0,.25)] ${
                            demo?.phase === "pulse" && demoAction?.id === action.id
                              ? "bbs-flash"
                              : ""
                          }`}
                        >
                          <span className="truncate">{action.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </RailCard>
              </Rise>

              <Rise i={3} className="min-w-0">
                <RailCard heading={mockData.rail.groundedHeading}>
                  <ul className="bbs-grounded">
                    {mockData.rail.groundedRows.map((row) => (
                      <li key={row} className="flex items-center gap-2">
                        <span
                          className="h-[6px] w-[6px] shrink-0 rounded-full"
                          style={{ background: T.green }}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1 truncate text-[13px] text-[#57534E]">
                          {row}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 border-t border-[#F0EBE4] pt-2.5 text-[13px] leading-[1.45] text-[#A39D95]">
                    {mockData.rail.groundedFootnote}
                  </p>
                </RailCard>
              </Rise>
            </aside>
          </div>
        </div>
      </ShellFrame>
    </MotionConfig>
  );
}
