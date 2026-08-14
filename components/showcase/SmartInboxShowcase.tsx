"use client";

/*
 * SmartInboxShowcase — a live, component-built recreation of the PYNGYN
 * "Smart Inbox / Business Brain" screen for a finance team (Star Finance),
 * used in place of a flat screenshot on the /workspace page.
 *
 * Business Brain triages every incoming message and sorts it into
 * Needs response / FYI only / Low priority, with a one-line reason on each.
 * The category tabs filter the list — the only interaction; there is no AI and
 * no network here, every mail and count comes from MAILS below.
 *
 * Shares the app chrome (cream canvas, sidebar, topbar) and the container-query
 * fit/scale machinery with the other mockups via ./shell/AppShell, so on a
 * phone it shrinks the full desktop layout to fit rather than reflowing.
 */

import { useMemo, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import {
  Rise,
  ShellFrame,
  ShellSidebar,
  ShellTopbar,
  Tile,
  buildShellCss,
  type ShellDesign,
  type ShellNavItem,
} from "./shell/AppShell";
import { CARD_CLASS, T, alpha } from "./shell/tokens";
import {
  IconApprovals,
  IconBell,
  IconBilling,
  IconCalendar,
  IconChevronRight,
  IconClients,
  IconDashboard,
  IconDocuments,
  IconInvoices,
  IconKnowledge,
  IconMessage,
  IconRefresh,
  IconReports,
  IconSparkle,
  IconTasks,
  IconTime,
  IconWarning,
} from "./showcase-icons";

/* ────────────────────────────────────────────────────────────────────
   Mock data — the same Star Finance team as the other mockups.
   ──────────────────────────────────────────────────────────────────── */

const org = {
  name: "Star Finance",
  role: "Finance Lead · 4 ClientSpaces",
  initials: "SF",
  lead: { firstName: "Alex", initials: "AM" },
} as const;

const NAV: readonly ShellNavItem[] = [
  { id: "dashboard", label: "Global Dashboard", tint: T.green, Icon: IconDashboard },
  { id: "inbox", label: "Smart Inbox", tint: T.purple, Icon: IconSparkle },
  { id: "tasks", label: "My Tasks", tint: T.blue, Icon: IconTasks },
  { id: "clients", label: "Clients", tint: T.pink, Icon: IconClients },
  { id: "invoices", label: "Invoices", tint: T.amber, Icon: IconInvoices },
  { id: "approvals", label: "Approvals", tint: T.coral, Icon: IconApprovals },
  { id: "billing", label: "Billing", tint: T.teal, Icon: IconBilling },
  { id: "reports", label: "Reports", tint: T.purple, Icon: IconReports },
  { id: "documents", label: "Documents", tint: T.blue, Icon: IconDocuments },
  { id: "calendar", label: "Calendar", tint: T.green, Icon: IconCalendar },
  { id: "knowledge", label: "Knowledge base", tint: T.amber, Icon: IconKnowledge },
];

type Priority = "needs" | "fyi" | "low";

type Mail = {
  id: string;
  sender: string;
  initials: string;
  tint: string;
  subject: string;
  snippet: string;
  reason: string;
  time: string;
  priority: Priority;
  unread?: boolean;
};

const MAILS: readonly Mail[] = [
  {
    id: "inv-1994",
    sender: "Client A · Accounts",
    initials: "CA",
    tint: T.coral,
    subject: "INV-1994 is now 71 days overdue",
    snippet: "We still haven't received payment on the £4,400 invoice from May — can someone confirm?",
    reason: "Receivables · 60+ days · 2 reminders unanswered",
    time: "9:12 AM",
    priority: "needs",
    unread: true,
  },
  {
    id: "hsbc-run",
    sender: "HSBC Business",
    initials: "HB",
    tint: T.blue,
    subject: "Authorise supplier payment run — £27,400",
    snippet: "6 suppliers are queued for release. Approval is required before the 2:00 PM cut-off.",
    reason: "Approval needed · payment run cut-off 2 PM",
    time: "8:40 AM",
    priority: "needs",
    unread: true,
  },
  {
    id: "client-d-audit",
    sender: "Client D · Priya N.",
    initials: "PN",
    tint: T.purple,
    subject: "Can we move the audit sign-off to next week?",
    snippet: "Our board meeting shifted to the 15th, so we'd like a few more days on the year-end pack.",
    reason: "Deadline change · affects Fri close",
    time: "Yesterday",
    priority: "needs",
    unread: true,
  },
  {
    id: "vat",
    sender: "HMRC · Companies House",
    initials: "HM",
    tint: T.green,
    subject: "VAT return submitted successfully",
    snippet: "Your Q2 VAT submission for Star Finance has been received. No further action is required.",
    reason: "Statutory · confirmation only",
    time: "7:05 AM",
    priority: "fyi",
  },
  {
    id: "client-c-pack",
    sender: "Client C · Maya R.",
    initials: "MR",
    tint: T.pink,
    subject: "Thanks for the Q2 management pack",
    snippet: "Really useful — the margin-by-engagement view especially. We'll circulate it to the board.",
    reason: "Positive · no reply required",
    time: "Yesterday",
    priority: "fyi",
  },
  {
    id: "payroll",
    sender: "BrightPay",
    initials: "BP",
    tint: T.teal,
    subject: "August payroll processed — 6 employees",
    snippet: "Net pay of £18,240 is scheduled for 28 Aug. Payslips are available in the portal.",
    reason: "Payroll · confirmation",
    time: "Yesterday",
    priority: "fyi",
  },
  {
    id: "xero-receipt",
    sender: "Xero",
    initials: "XO",
    tint: T.blue,
    subject: "Your July subscription receipt",
    snippet: "£33.00 was charged to the card ending 6411. A copy has been filed to Documents.",
    reason: "Receipt · auto-filed",
    time: "2 days ago",
    priority: "low",
  },
  {
    id: "linkedin",
    sender: "LinkedIn",
    initials: "IN",
    tint: T.blue,
    subject: "You appeared in 12 searches this week",
    snippet: "See who's been looking at Star Finance and your team's profiles.",
    reason: "Newsletter",
    time: "2 days ago",
    priority: "low",
  },
  {
    id: "accountingweb",
    sender: "AccountingWEB",
    initials: "AW",
    tint: T.amber,
    subject: "5 changes to R&D tax relief you should know",
    snippet: "The latest guidance on qualifying costs and the merged scheme, in a 4-minute read.",
    reason: "Newsletter",
    time: "3 days ago",
    priority: "low",
  },
  {
    id: "slack-digest",
    sender: "Slack",
    initials: "SL",
    tint: T.purple,
    subject: "Your weekly activity digest",
    snippet: "14 messages you may have missed across #close, #clients and #advisory.",
    reason: "Digest",
    time: "3 days ago",
    priority: "low",
  },
];

type Category = { id: Priority; label: string; blurb: string; tint: string; Icon: typeof IconWarning };

const CATEGORIES: readonly Category[] = [
  { id: "needs", label: "Needs response", blurb: "Waiting on a decision or reply from you", tint: T.coral, Icon: IconWarning },
  { id: "fyi", label: "FYI only", blurb: "Worth knowing, nothing to action", tint: T.blue, Icon: IconMessage },
  { id: "low", label: "Low priority", blurb: "Receipts, digests and newsletters", tint: T.mute, Icon: IconBell },
];

const priorityTint = (p: Priority) => CATEGORIES.find((c) => c.id === p)!.tint;
const count = (p: Priority) => MAILS.filter((m) => m.priority === p).length;

/* ────────────────────────────────────────────────────────────────────
   Layout — authored at 1600×950 and scaled to fit its column.
   ──────────────────────────────────────────────────────────────────── */

const PREFIX = "sib";
const DESIGN: ShellDesign = {
  wide: { w: 1600, h: 950 },
  mid: { w: 1600, h: 950 },
  // Scaled full-desktop layout at every width (down to a ~200px column), so a
  // phone shows a shrunk desktop screenshot rather than a reflow.
  midFrom: 200,
  wideFrom: 200,
};

const BODY_CSS = `
.sib-body{display:flex;flex-direction:column;min-height:0;flex:1}
.sib-main{display:flex;flex-direction:column;min-width:0;min-height:0;flex:1;gap:16px}
.sib-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.sib-tabs{display:flex;flex-wrap:wrap;gap:8px}
.sib-list{display:flex;flex-direction:column;min-height:0;flex:1;overflow:hidden}
@keyframes sib-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.sib-row{animation:sib-fade 320ms cubic-bezier(.2,.7,.3,1) both}
`;

const SHOWCASE_CSS = buildShellCss(PREFIX, DESIGN, BODY_CSS);

/* ────────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────────── */

export function SmartInboxShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("inbox");
  const [filter, setFilter] = useState<Priority | "all">("needs");
  const [query, setQuery] = useState("");

  const shown = useMemo(
    () => (filter === "all" ? MAILS : MAILS.filter((m) => m.priority === filter)),
    [filter],
  );

  const needsCount = count("needs");

  return (
    <MotionConfig reducedMotion="user">
      <ShellFrame
        prefix={PREFIX}
        css={SHOWCASE_CSS}
        label="Interactive preview of the PYNGYN Smart Inbox for a finance team"
        rootRef={rootRef}
        collapsed={collapsed}
      >
        <ShellSidebar
          prefix={PREFIX}
          workspace={{ name: org.name, role: org.role, initials: org.initials }}
          nav={NAV}
          navLabel="Workspace sections"
          activeId={activeId}
          onSelect={setActiveId}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          activeRing={T.green}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <ShellTopbar
            prefix={PREFIX}
            workspaceName={org.name}
            userInitials={org.lead.initials}
            searchRef={searchRef}
            query={query}
            onQuery={setQuery}
          />

          <div className="sib-body">
            <main className="sib-main">
              {/* header */}
              <Rise i={0} className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="text-[30px] font-bold leading-none tracking-[-0.03em] text-[#1A1A1A]">
                        Smart Inbox
                      </h1>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
                        style={{ background: alpha(T.purple, 0.12), color: T.purple }}
                      >
                        <IconSparkle style={{ width: 13, height: 13 }} />
                        AI Triaged
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] text-[#7A756E]">
                      Business Brain sorts and prioritises everything that needs you ·{" "}
                      <span className="font-semibold text-[#1A1A1A]">
                        {needsCount} items need attention
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#E7E1D9] bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[#57534E] transition-colors hover:border-[#D8D0C6] hover:text-[#1A1A1A]"
                  >
                    <IconRefresh style={{ width: 14, height: 14 }} />
                    Sync now
                  </button>
                </div>
              </Rise>

              {/* triage stat cards */}
              <Rise i={1} className="min-w-0">
                <div className="sib-stats">
                  {CATEGORIES.map((c) => {
                    const active = filter === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setFilter(c.id)}
                        aria-pressed={active}
                        className={`${CARD_CLASS} group flex items-center gap-3 p-4 text-left transition-all hover:-translate-y-px`}
                        style={{
                          boxShadow: "0 1px 2px rgba(0,0,0,.03)",
                          borderColor: active ? c.tint : undefined,
                          background: active ? alpha(c.tint, 0.05) : undefined,
                        }}
                      >
                        <Tile Icon={c.Icon} tint={c.tint} size={44} icon={20} />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline gap-2">
                            <span className="text-[26px] font-bold leading-none tabular-nums text-[#1A1A1A]">
                              {count(c.id)}
                            </span>
                            <span className="truncate text-[13px] font-semibold text-[#1A1A1A]">
                              {c.label}
                            </span>
                          </span>
                          <span className="mt-1 block truncate text-[11.5px] text-[#A39D95]">
                            {c.blurb}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Rise>

              {/* tabs + list */}
              <Rise i={2} className="sib-list min-w-0">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="sib-tabs">
                    {[{ id: "all" as const, label: "All" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map(
                      (t) => {
                        const active = filter === t.id;
                        const tint = t.id === "all" ? T.ink : priorityTint(t.id as Priority);
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setFilter(t.id)}
                            aria-pressed={active}
                            className="rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors"
                            style={{
                              borderColor: active ? tint : T.border,
                              color: active ? "#FFFFFF" : T.sub,
                              background: active ? tint : "#FFFFFF",
                            }}
                          >
                            {t.label}
                            {t.id !== "all" ? (
                              <span className="ml-1.5 tabular-nums opacity-70">{count(t.id as Priority)}</span>
                            ) : null}
                          </button>
                        );
                      },
                    )}
                  </div>
                  <span className="hidden text-[12px] text-[#A39D95] sm:block">
                    {shown.length} {shown.length === 1 ? "message" : "messages"}
                  </span>
                </div>

                <section
                  className={`${CARD_CLASS} min-h-0 flex-1 overflow-hidden`}
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,.03)" }}
                >
                  <ul className="divide-y divide-[#F0EBE4]">
                    {shown.map((m, i) => (
                      <li
                        key={m.id}
                        className="sib-row"
                        style={{ animationDelay: `${i * 45}ms` }}
                      >
                        <button
                          type="button"
                          className="group flex w-full items-start gap-3.5 px-5 py-4 text-left transition-colors hover:bg-[#FAF7F2]"
                        >
                          {/* priority bar */}
                          <span
                            className="mt-1 h-9 w-[3px] shrink-0 rounded-full"
                            style={{ background: priorityTint(m.priority) }}
                            aria-hidden="true"
                          />
                          {/* avatar */}
                          <span
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white"
                            style={{ background: m.tint }}
                            aria-hidden="true"
                          >
                            {m.initials}
                          </span>
                          {/* body */}
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-[13.5px] font-semibold text-[#1A1A1A]">
                                {m.sender}
                              </span>
                              {m.unread ? (
                                <span
                                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ background: T.coral }}
                                  aria-hidden="true"
                                />
                              ) : null}
                              <span className="ml-auto shrink-0 text-[11.5px] text-[#A39D95]">{m.time}</span>
                            </span>
                            <span className="mt-0.5 block truncate text-[14px] font-semibold text-[#1A1A1A]">
                              {m.subject}
                            </span>
                            <span className="mt-0.5 block truncate text-[12.5px] text-[#7A756E]">
                              {m.snippet}
                            </span>
                            {/* AI reason chip */}
                            <span className="mt-2 flex items-center gap-2">
                              <span
                                className="inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[11px] font-semibold"
                                style={{
                                  background: alpha(priorityTint(m.priority), 0.12),
                                  color: m.priority === "low" ? T.sub : priorityTint(m.priority),
                                }}
                              >
                                <IconSparkle style={{ width: 11, height: 11 }} />
                                {m.reason}
                              </span>
                              {m.priority === "needs" ? (
                                <span className="inline-flex items-center gap-1 rounded-full border border-[#E7E1D9] bg-white px-2 py-[3px] text-[11px] font-semibold text-[#57534E] transition-colors group-hover:border-[#D8D0C6]">
                                  Draft reply
                                  <IconChevronRight style={{ width: 11, height: 11 }} />
                                </span>
                              ) : null}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              </Rise>
            </main>
          </div>
        </div>
      </ShellFrame>
    </MotionConfig>
  );
}
