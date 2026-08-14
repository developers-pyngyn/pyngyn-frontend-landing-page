"use client";

/*
 * ClientSpaceShowcase — a live, component-built recreation of the PYNGYN
 * ClientSpace dashboard for a finance team, used in place of a flat
 * screenshot on the home page.
 *
 * The cream canvas, sidebar, topbar and the container-query fit/scale
 * machinery come from ./shell/AppShell, which BusinessBrainShowcase shares.
 * This file owns only the dashboard body: KPI row, widget grid, Today rail.
 *
 * Everything is inline SVG + CSS: no chart runtime, no images, no new deps.
 */

import { useEffect, useRef, useState } from "react";
import { MotionConfig, useInView } from "framer-motion";
import {
  HealthDonut,
  WorkloadChart,
  type HealthSegment,
  type WorkloadSlot,
} from "./ShowcaseCharts";
import {
  Rise,
  ShellFrame,
  ShellSidebar,
  ShellTopbar,
  buildShellCss,
  type ShellDesign,
  type ShellNavItem,
} from "./shell/AppShell";
import { CARD_CLASS, PANEL_CLASS, PANEL_SHADOW, ROW_CLASS, T, alpha } from "./shell/tokens";
import {
  IconApprovals,
  IconCalendar,
  IconChat,
  IconClients,
  IconContracts,
  IconDashboard,
  IconDocuments,
  IconGrip,
  IconInvoices,
  IconPlus,
  IconProjects,
  IconRequests,
  IconTasks,
  IconTime,
  IconWorkflows,
} from "./showcase-icons";

/* ────────────────────────────────────────────────────────────────────
   Mock data — the single source of truth for everything rendered.
   Counts that describe a list (open tasks, items today, clients in the
   donut, progress percentages) are derived from the list itself, so
   editing a row changes the numbers on screen.
   ──────────────────────────────────────────────────────────────────── */

/** Deterministic money formatting — no Intl, so SSR and client always agree. */
const money = (n: number) => `£${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

type Kpi = { id: string; label: string; value: number; caption: string; accent: string };
type Member = { id: string; initials: string; name: string; role: string; tint: string };
type TaskRow = {
  id: string;
  title: string;
  client: string;
  due: string;
  /** priority dot + due-label colour */
  dot: string;
  dueColor: string;
};
type EngagementRow = {
  id: string;
  initials: string;
  avatar: string;
  name: string;
  client: string;
  status: string;
  statusColor: string;
  progress: number;
};
type TodayItem = { id: string; time?: string; title: string; meta: string; trail?: string };
type TodayGroup = {
  id: string;
  label: string;
  overdue?: boolean;
  /** not part of today's count */
  later?: boolean;
  items: readonly TodayItem[];
};

const sumValues = (rows: readonly { value: number }[]) =>
  rows.reduce((total, row) => total + row.value, 0);

/* Client health drives the Clients KPI, the hero count and the donut. */
const HEALTH_SEGMENTS: readonly HealthSegment[] = [
  { id: "healthy", label: "Healthy", value: 9, color: T.green },
  { id: "attention", label: "Attention", value: 4, color: T.amber },
  { id: "risk", label: "At risk", value: 1, color: T.red },
];
const CLIENT_TOTAL = sumValues(HEALTH_SEGMENTS);
const healthCount = (id: string) => HEALTH_SEGMENTS.find((s) => s.id === id)?.value ?? 0;

/** Ledger figures, shared by the KPI captions and the Today rail. */
const LEDGER = {
  openInvoices: 9,
  outstanding: 31900,
  overdueInvoices: 3,
  pastDue: 16800,
  awaitingApproval: 8,
  paymentRun: 27400,
  supplierCount: 6,
  retainerInvoices: 2,
  retainerValue: 12750,
  overspend: 14200,
} as const;

const TEAM: readonly Member[] = [
  { id: "sam", initials: "SO", name: "Sam O.", role: "Controller", tint: T.blue },
  { id: "dana", initials: "DK", name: "Dana K.", role: "AR Specialist", tint: T.purple },
  { id: "ravi", initials: "RT", name: "Ravi T.", role: "Analyst", tint: T.pink },
  { id: "mia", initials: "ML", name: "Mia L.", role: "Bookkeeper", tint: T.teal },
  { id: "jon", initials: "JP", name: "Jon P.", role: "Payroll", tint: T.amber },
  { id: "alex", initials: "AM", name: "Alex M.", role: "Finance Lead", tint: T.green },
];
const STACK_SHOWN = 3;

const TASK_ROWS: readonly TaskRow[] = [
  {
    id: "chase",
    title: "Chase 60+ day balance",
    client: "Client A",
    due: "Overdue 2d",
    dot: T.red,
    dueColor: T.coral,
  },
  {
    id: "payment-run",
    title: "Approve supplier payment run",
    client: "Client D",
    due: "Overdue 1d",
    dot: T.red,
    dueColor: T.coral,
  },
  {
    id: "reconcile",
    title: "Reconcile deposit account",
    client: "Internal",
    due: "Due today",
    dot: T.amber,
    dueColor: T.amber,
  },
  {
    id: "retainers",
    title: "Issue August retainer invoices",
    client: "Client B",
    due: "Tomorrow",
    dot: T.amber,
    dueColor: T.sub,
  },
  {
    id: "forecast",
    title: "Draft Q3 forecast",
    client: "Internal",
    due: "Fri",
    dot: T.mute,
    dueColor: T.sub,
  },
];
const TASKS_HIDDEN = 1;

const ENGAGEMENT_ROWS: readonly EngagementRow[] = [
  {
    id: "audit-prep",
    initials: "YA",
    avatar: T.pink,
    name: "Year-end audit prep",
    client: "Client A",
    status: "in review",
    statusColor: T.amber,
    progress: 78,
  },
  {
    id: "bookkeeping",
    initials: "MB",
    avatar: T.purple,
    name: "Monthly bookkeeping",
    client: "Client C",
    status: "open",
    statusColor: T.green,
    progress: 45,
  },
  {
    id: "payroll",
    initials: "PM",
    avatar: T.blue,
    name: "Payroll migration",
    client: "Client B",
    status: "open",
    statusColor: T.green,
    progress: 62,
  },
  {
    id: "vat",
    initials: "VR",
    avatar: T.amber,
    name: "VAT registration",
    client: "Client D",
    status: "blocked",
    statusColor: T.coral,
    progress: 30,
  },
  {
    id: "q3",
    initials: "QF",
    avatar: T.green,
    name: "Q3 forecast build",
    client: "Client E",
    status: "open",
    statusColor: T.green,
    progress: 12,
  },
];

const TODAY_GROUPS: readonly TodayGroup[] = [
  {
    id: "overdue",
    label: "Overdue",
    overdue: true,
    items: [
      {
        id: "chase",
        title: "Chase 60+ day balance",
        meta: "Client A",
        trail: "2 days late",
      },
      {
        id: "payment-run",
        title: "Approve supplier payment run",
        meta: money(LEDGER.paymentRun),
        trail: "1 day late",
      },
    ],
  },
  {
    id: "due-today",
    label: "Due today",
    items: [
      {
        id: "bank-rec",
        time: "09:30",
        title: "Bank reconciliation — deposit account",
        meta: "July close, step 7 of 9",
      },
      {
        id: "call",
        time: "10:30",
        title: "Client call — Client C",
        meta: `Approved spend exceeded by ${money(LEDGER.overspend)}`,
      },
      { id: "forecast", time: "12:00", title: "Q3 forecast draft", meta: "Due to the directors" },
      {
        id: "cut-off",
        time: "14:00",
        title: "Payment run cut-off",
        meta: `${money(LEDGER.paymentRun)} across ${LEDGER.supplierCount} suppliers`,
      },
      {
        id: "retainers",
        time: "16:00",
        title: "Review August retainer invoices",
        meta: `${LEDGER.retainerInvoices} invoices, ${money(LEDGER.retainerValue)}`,
      },
    ],
  },
  {
    id: "waiting",
    label: "Waiting on you",
    items: [
      { id: "journals", title: "3 journals awaiting approval", meta: "Client B, Client D" },
      { id: "expenses", title: "2 expense claims", meta: "Sam O., Dana K." },
    ],
  },
  {
    id: "later",
    label: "Later this week",
    later: true,
    items: [
      { id: "close", time: "Fri 8 Aug", title: "July close sign-off", meta: "Owner: Sam O." },
      {
        id: "collections",
        time: "Fri 8 Aug",
        title: "Send collections summary to the board",
        meta: `${money(LEDGER.outstanding)} outstanding`,
      },
      { id: "vat", time: "Thu 14 Aug", title: "VAT return submission", meta: "Statutory deadline" },
      {
        id: "board",
        time: "Wed 20 Aug",
        title: "Quarterly board pack",
        meta: "Due to the directors",
      },
    ],
  },
];

type MockData = {
  workspace: { name: string; role: string; initials: string };
  user: { name: string; initials: string };
  team: readonly Member[];
  nav: readonly ShellNavItem[];
  header: { title: string; greeting: string; ctaPill: string };
  kpis: readonly Kpi[];
  workload: {
    title: string;
    caption: string;
    slots: readonly WorkloadSlot[];
    progressLabel: string;
    done: number;
    total: number;
    slipped: number;
  };
  hero: { eyebrow: string; value: number; caption: string; link: string; live: number };
  health: { title: string; link: string; totalLabel: string; segments: readonly HealthSegment[] };
  tasks: { title: string; link: string; rows: readonly TaskRow[]; hidden: number };
  engagements: { title: string; link: string; rows: readonly EngagementRow[] };
  today: { title: string; date: string; groups: readonly TodayGroup[]; footer: string };
};

const FINANCE: MockData = {
  workspace: { name: "Star Finance", role: "Finance Lead · 4 ClientSpaces", initials: "SF" },
  user: { name: "Alex", initials: "AM" },
  team: TEAM,
  nav: [
    { id: "dashboard", label: "Dashboard", tint: T.green, Icon: IconDashboard },
    { id: "clients", label: "Clients", tint: T.blue, Icon: IconClients },
    { id: "requests", label: "Requests", tint: T.pink, Icon: IconRequests },
    { id: "workflows", label: "Workflows", tint: T.green, Icon: IconWorkflows },
    { id: "contracts", label: "Contracts", tint: T.purple, Icon: IconContracts },
    { id: "projects", label: "Projects", tint: T.amber, Icon: IconProjects },
    { id: "chat", label: "Chat", tint: T.blue, Icon: IconChat },
    { id: "tasks", label: "Tasks", tint: T.green, Icon: IconTasks },
    { id: "time", label: "Time", tint: T.purple, Icon: IconTime },
    { id: "documents", label: "Documents", tint: T.blue, Icon: IconDocuments },
    { id: "approvals", label: "Approvals", tint: T.pink, Icon: IconApprovals },
    /* Trails off under the scroll mask so the rail reads as scrollable. */
    { id: "invoices", label: "Invoices", tint: T.amber, Icon: IconInvoices },
  ],
  header: {
    title: "Dashboard",
    greeting: "Good afternoon, Alex",
    ctaPill: "New project",
  },
  kpis: [
    {
      id: "clients",
      label: "Clients",
      value: CLIENT_TOTAL,
      caption: `${healthCount("healthy")} healthy · ${healthCount("attention")} attention · ${healthCount("risk")} at risk`,
      accent: T.green,
    },
    {
      id: "open-invoices",
      label: "Open invoices",
      value: LEDGER.openInvoices,
      caption: `${money(LEDGER.outstanding)} outstanding`,
      accent: T.blue,
    },
    {
      id: "overdue",
      label: "Overdue",
      value: LEDGER.overdueInvoices,
      caption: `${money(LEDGER.pastDue)} past due`,
      accent: T.coral,
    },
    {
      id: "approval",
      label: "Awaiting approval",
      value: LEDGER.awaitingApproval,
      caption: "payments & journals",
      accent: T.amber,
    },
  ],
  workload: {
    title: "Workload",
    caption: "next seven days",
    slots: [
      { label: "Late", long: "Late", count: 5, late: true },
      { label: "Fri", long: "Friday", count: 9 },
      { label: "Sat", long: "Saturday", count: 2 },
      { label: "Sun", long: "Sunday", count: 1 },
      { label: "Mon", long: "Monday", count: 14 },
      { label: "Tue", long: "Tuesday", count: 11 },
      { label: "Wed", long: "Wednesday", count: 8 },
      { label: "Thu", long: "Thursday", count: 6 },
    ],
    progressLabel: "Due this week",
    done: 41,
    total: 56,
    slipped: 4,
  },
  hero: {
    eyebrow: "Star Finance",
    value: CLIENT_TOTAL,
    caption: "clients in your book",
    link: "Manage your portal",
    live: healthCount("healthy"),
  },
  health: {
    title: "Client health",
    link: "All clients",
    totalLabel: "clients",
    segments: HEALTH_SEGMENTS,
  },
  tasks: { title: "My tasks", link: "View all", rows: TASK_ROWS, hidden: TASKS_HIDDEN },
  engagements: { title: "Engagements", link: "View all", rows: ENGAGEMENT_ROWS },
  today: {
    title: "Today",
    date: "7 Aug",
    groups: TODAY_GROUPS,
    footer: "2 invoices go out tomorrow. VAT return due 14 Aug.",
  },
};

/*
 * Each placement of the mockup shows a different book of business, so two
 * screens on one page never read as the same screenshot twice. All three are
 * the same finance team; only the figures and rows differ.
 */
const PORTFOLIO: MockData = {
  ...FINANCE,
  header: { title: "Dashboard", greeting: "Good morning, Alex", ctaPill: "New project" },
  kpis: [
    {
      id: "clients",
      label: "Clients",
      value: 26,
      caption: "18 healthy · 6 attention · 2 at risk",
      accent: T.green,
    },
    {
      id: "open-invoices",
      label: "Open invoices",
      value: 17,
      caption: `${money(84600)} outstanding`,
      accent: T.blue,
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 6,
      caption: `${money(29300)} past due`,
      accent: T.coral,
    },
    {
      id: "approval",
      label: "Awaiting approval",
      value: 12,
      caption: "payments & journals",
      accent: T.amber,
    },
  ],
  workload: {
    title: "Workload",
    caption: "next seven days",
    slots: [
      { label: "Late", long: "Late", count: 8, late: true },
      { label: "Fri", long: "Friday", count: 12 },
      { label: "Sat", long: "Saturday", count: 3 },
      { label: "Sun", long: "Sunday", count: 2 },
      { label: "Mon", long: "Monday", count: 19 },
      { label: "Tue", long: "Tuesday", count: 15 },
      { label: "Wed", long: "Wednesday", count: 11 },
      { label: "Thu", long: "Thursday", count: 9 },
    ],
    progressLabel: "Due this week",
    done: 63,
    total: 88,
    slipped: 7,
  },
  hero: {
    eyebrow: "Star Finance",
    value: 26,
    caption: "clients in your book",
    link: "Manage your portal",
    live: 18,
  },
  health: {
    title: "Client health",
    link: "All clients",
    totalLabel: "clients",
    segments: [
      { id: "healthy", label: "Healthy", value: 18, color: T.green },
      { id: "attention", label: "Attention", value: 6, color: T.amber },
      { id: "risk", label: "At risk", value: 2, color: T.red },
    ],
  },
  tasks: {
    title: "My tasks",
    link: "View all",
    hidden: 4,
    rows: [
      {
        id: "consol",
        title: "Sign off Q2 group consolidation",
        client: "Client B",
        due: "Overdue 3d",
        dot: T.red,
        dueColor: T.coral,
      },
      {
        id: "release",
        title: "Release supplier run",
        client: "Client D",
        due: "Overdue 1d",
        dot: T.red,
        dueColor: T.coral,
      },
      {
        id: "variance",
        title: "Review payroll variance",
        client: "Internal",
        due: "Due today",
        dot: T.amber,
        dueColor: T.amber,
      },
      {
        id: "pbc",
        title: "Send audit PBC list",
        client: "Client A",
        due: "Tomorrow",
        dot: T.amber,
        dueColor: T.sub,
      },
      {
        id: "cash",
        title: "Update the cash forecast",
        client: "Internal",
        due: "Fri",
        dot: T.mute,
        dueColor: T.sub,
      },
    ],
  },
  engagements: {
    title: "Engagements",
    link: "View all",
    rows: [
      {
        id: "consol",
        initials: "GC",
        avatar: T.pink,
        name: "Group consolidation",
        client: "Client B",
        status: "in review",
        statusColor: T.amber,
        progress: 82,
      },
      {
        id: "stat",
        initials: "SA",
        avatar: T.purple,
        name: "Statutory accounts",
        client: "Client A",
        status: "open",
        statusColor: T.green,
        progress: 57,
      },
      {
        id: "payroll",
        initials: "PO",
        avatar: T.blue,
        name: "Payroll outsourcing",
        client: "Client E",
        status: "open",
        statusColor: T.green,
        progress: 71,
      },
      {
        id: "rnd",
        initials: "RD",
        avatar: T.amber,
        name: "R&D claim",
        client: "Client C",
        status: "blocked",
        statusColor: T.coral,
        progress: 24,
      },
      {
        id: "systems",
        initials: "SM",
        avatar: T.green,
        name: "Systems migration",
        client: "Client D",
        status: "open",
        statusColor: T.green,
        progress: 38,
      },
    ],
  },
  today: {
    title: "Today",
    date: "8 Aug",
    footer: "3 invoices go out tomorrow. Group filing due 21 Aug.",
    groups: [
      {
        id: "overdue",
        label: "Overdue",
        overdue: true,
        items: [
          { id: "consol", title: "Q2 consolidation sign-off", meta: "Client B", trail: "3 days late" },
          { id: "run", title: "Supplier run release", meta: money(41200), trail: "1 day late" },
        ],
      },
      {
        id: "due-today",
        label: "Due today",
        items: [
          { id: "variance", time: "09:00", title: "Payroll variance review", meta: "August run" },
          { id: "audit", time: "11:00", title: "Audit planning call", meta: "Client A" },
          { id: "board", time: "13:30", title: "Board pack draft", meta: "Due to the directors" },
          { id: "cutoff", time: "15:00", title: "Payment run cut-off", meta: `${money(41200)} across 9 suppliers` },
          { id: "retainers", time: "16:30", title: "Issue September retainers", meta: `3 invoices, ${money(18900)}` },
        ],
      },
      {
        id: "waiting",
        label: "Waiting on you",
        items: [
          { id: "journals", title: "5 journals awaiting approval", meta: "Client B, Client D" },
          { id: "claims", title: "3 expense claims", meta: "Dana K., Ravi T." },
        ],
      },
      {
        id: "later",
        label: "Later this week",
        later: true,
        items: [
          { id: "close", time: "Fri 9 Aug", title: "July close sign-off", meta: "Owner: Sam O." },
          { id: "collections", time: "Fri 9 Aug", title: "Collections review", meta: `${money(84600)} outstanding` },
          { id: "vat", time: "Thu 15 Aug", title: "VAT return submission", meta: "Statutory deadline" },
          { id: "filing", time: "Wed 21 Aug", title: "Group filing", meta: "Companies House" },
        ],
      },
    ],
  },
};

const COLLECTIONS: MockData = {
  ...FINANCE,
  header: { title: "Dashboard", greeting: "Good afternoon, Alex", ctaPill: "New project" },
  kpis: [
    {
      id: "clients",
      label: "Clients",
      value: 9,
      caption: "6 healthy · 2 attention · 1 at risk",
      accent: T.green,
    },
    {
      id: "open-invoices",
      label: "Open invoices",
      value: 5,
      caption: `${money(18400)} outstanding`,
      accent: T.blue,
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 2,
      caption: `${money(7900)} past due`,
      accent: T.coral,
    },
    {
      id: "approval",
      label: "Awaiting approval",
      value: 4,
      caption: "payments & journals",
      accent: T.amber,
    },
  ],
  workload: {
    title: "Workload",
    caption: "next seven days",
    slots: [
      { label: "Late", long: "Late", count: 3, late: true },
      { label: "Fri", long: "Friday", count: 6 },
      { label: "Sat", long: "Saturday", count: 1 },
      { label: "Sun", long: "Sunday", count: 1 },
      { label: "Mon", long: "Monday", count: 9 },
      { label: "Tue", long: "Tuesday", count: 7 },
      { label: "Wed", long: "Wednesday", count: 5 },
      { label: "Thu", long: "Thursday", count: 4 },
    ],
    progressLabel: "Due this week",
    done: 22,
    total: 31,
    slipped: 2,
  },
  hero: {
    eyebrow: "Star Finance",
    value: 9,
    caption: "clients in your book",
    link: "Manage your portal",
    live: 6,
  },
  health: {
    title: "Client health",
    link: "All clients",
    totalLabel: "clients",
    segments: [
      { id: "healthy", label: "Healthy", value: 6, color: T.green },
      { id: "attention", label: "Attention", value: 2, color: T.amber },
      { id: "risk", label: "At risk", value: 1, color: T.red },
    ],
  },
  tasks: {
    title: "My tasks",
    link: "View all",
    hidden: 2,
    rows: [
      {
        id: "reminder",
        title: "Send third reminder",
        client: "Client A",
        due: "Overdue 4d",
        dot: T.red,
        dueColor: T.coral,
      },
      {
        id: "plan",
        title: "Agree a payment plan",
        client: "Client D",
        due: "Overdue 1d",
        dot: T.red,
        dueColor: T.coral,
      },
      {
        id: "allocate",
        title: "Allocate yesterday's receipts",
        client: "Internal",
        due: "Due today",
        dot: T.amber,
        dueColor: T.amber,
      },
      {
        id: "dispute",
        title: "Resolve scope dispute",
        client: "Client B",
        due: "Tomorrow",
        dot: T.amber,
        dueColor: T.sub,
      },
      {
        id: "dso",
        title: "Report DSO to the board",
        client: "Internal",
        due: "Fri",
        dot: T.mute,
        dueColor: T.sub,
      },
    ],
  },
  engagements: {
    title: "Engagements",
    link: "View all",
    rows: [
      {
        id: "ledger",
        initials: "LC",
        avatar: T.pink,
        name: "Ledger clean-up",
        client: "Client A",
        status: "in review",
        statusColor: T.amber,
        progress: 66,
      },
      {
        id: "credit",
        initials: "CC",
        avatar: T.purple,
        name: "Credit control setup",
        client: "Client D",
        status: "open",
        statusColor: T.green,
        progress: 41,
      },
      {
        id: "billing",
        initials: "BR",
        avatar: T.blue,
        name: "Billing review",
        client: "Client B",
        status: "blocked",
        statusColor: T.coral,
        progress: 28,
      },
      {
        id: "recs",
        initials: "BR",
        avatar: T.amber,
        name: "Bank reconciliations",
        client: "Client C",
        status: "open",
        statusColor: T.green,
        progress: 84,
      },
      {
        id: "onboard",
        initials: "ON",
        avatar: T.green,
        name: "Client onboarding",
        client: "Client E",
        status: "open",
        statusColor: T.green,
        progress: 15,
      },
    ],
  },
  today: {
    title: "Today",
    date: "8 Aug",
    footer: "1 invoice goes out tomorrow. DSO review due Friday.",
    groups: [
      {
        id: "overdue",
        label: "Overdue",
        overdue: true,
        items: [
          { id: "reminder", title: "Third reminder", meta: "Client A", trail: "4 days late" },
          { id: "plan", title: "Payment plan call", meta: money(7900), trail: "1 day late" },
        ],
      },
      {
        id: "due-today",
        label: "Due today",
        items: [
          { id: "receipts", time: "09:15", title: "Allocate receipts", meta: "12 items" },
          { id: "chase", time: "11:30", title: "Chase call", meta: "Client D" },
          { id: "dispute", time: "13:00", title: "Scope dispute review", meta: "Client B" },
          { id: "recs", time: "15:30", title: "Bank reconciliation", meta: "Deposit account" },
          { id: "report", time: "16:45", title: "Draft DSO note", meta: "Due to the board" },
        ],
      },
      {
        id: "waiting",
        label: "Waiting on you",
        items: [
          { id: "journals", title: "2 journals awaiting approval", meta: "Client C" },
          { id: "claim", title: "1 expense claim", meta: "Mia L." },
        ],
      },
      {
        id: "later",
        label: "Later this week",
        later: true,
        items: [
          { id: "dso", time: "Fri 9 Aug", title: "DSO review", meta: "Owner: Dana K." },
          { id: "writeoff", time: "Fri 9 Aug", title: "Write-off proposal", meta: `${money(1200)} aged debt` },
          { id: "statements", time: "Mon 12 Aug", title: "Send statements", meta: "All clients" },
          { id: "vat", time: "Thu 15 Aug", title: "VAT return submission", meta: "Statutory deadline" },
        ],
      },
    ],
  },
};

export type ClientSpaceDataset = "finance" | "portfolio" | "collections";

const DATASETS: Record<ClientSpaceDataset, MockData> = {
  finance: FINANCE,
  portfolio: PORTFOLIO,
  collections: COLLECTIONS,
};

/* Derived per dataset, so every count tracks the rows beside it. */
const openTasks = (d: MockData) => d.tasks.rows.length + d.tasks.hidden;
const todayCount = (d: MockData) =>
  d.today.groups.filter((g) => !g.later).reduce((n, g) => n + g.items.length, 0);
const workloadPct = (d: MockData) => Math.round((d.workload.done / d.workload.total) * 100);
const teamOverflow = (d: MockData) => Math.max(0, d.team.length - STACK_SHOWN);
const clientTotal = (d: MockData) => sumValues(d.health.segments);

/* ────────────────────────────────────────────────────────────────────
   Per-tab screens
   Selecting a sidebar item swaps the content area for that section, so the
   mockup behaves like the real app instead of one frozen screen.
   ──────────────────────────────────────────────────────────────────── */

type SectionRow = {
  id: string;
  cells: readonly string[];
  /** renders the last cell as a status pill in this colour */
  tone?: string;
};

type SectionView = {
  caption: string;
  columns: readonly string[];
  rows: readonly SectionRow[];
};

const SECTIONS: Record<string, SectionView> = {
  clients: {
    caption: "Every client you hold, with the owner and their health.",
    columns: ["Client", "Owner", "Open invoices", "Health"],
    rows: [
      { id: "a", cells: ["Client A", "Sam O.", "3", "At risk"], tone: T.red },
      { id: "b", cells: ["Client B", "Dana K.", "2", "Attention"], tone: T.amber },
      { id: "c", cells: ["Client C", "Ravi T.", "1", "Attention"], tone: T.amber },
      { id: "d", cells: ["Client D", "Mia L.", "2", "Healthy"], tone: T.green },
      { id: "e", cells: ["Client E", "Jon P.", "1", "Healthy"], tone: T.green },
    ],
  },
  requests: {
    caption: "Client requests waiting on your team.",
    columns: ["Request", "Client", "Raised", "Status"],
    rows: [
      { id: "1", cells: ["Missing bank statement", "Client A", "2 days ago", "Open"], tone: T.coral },
      { id: "2", cells: ["Add a payroll user", "Client B", "Yesterday", "In progress"], tone: T.amber },
      { id: "3", cells: ["Change VAT scheme", "Client D", "Yesterday", "In progress"], tone: T.amber },
      { id: "4", cells: ["Copy of Q2 accounts", "Client C", "3 days ago", "Answered"], tone: T.green },
    ],
  },
  workflows: {
    caption: "Recurring runs that keep the month on rails.",
    columns: ["Workflow", "Trigger", "Runs", "State"],
    rows: [
      { id: "1", cells: ["Month-end close", "1st of month", "12", "Active"], tone: T.green },
      { id: "2", cells: ["Invoice chase ladder", "Overdue + 7d", "38", "Active"], tone: T.green },
      { id: "3", cells: ["Payroll approval", "Monthly", "12", "Active"], tone: T.green },
      { id: "4", cells: ["VAT return prep", "Quarterly", "4", "Paused"], tone: T.mute },
    ],
  },
  contracts: {
    caption: "Engagement letters and their renewal dates.",
    columns: ["Contract", "Client", "Value", "Status"],
    rows: [
      { id: "1", cells: ["Annual retainer", "Client A", "48,000", "Signed"], tone: T.green },
      { id: "2", cells: ["Bookkeeping SOW", "Client C", "18,000", "Signed"], tone: T.green },
      { id: "3", cells: ["Payroll addendum", "Client B", "6,400", "Out for signature"], tone: T.amber },
      { id: "4", cells: ["Advisory retainer", "Client D", "12,000", "Draft"], tone: T.mute },
    ],
  },
  projects: {
    caption: "Every engagement in flight, with progress.",
    columns: ["Engagement", "Client", "Progress", "Status"],
    rows: [
      { id: "1", cells: ["Year-end audit prep", "Client A", "78%", "In review"], tone: T.amber },
      { id: "2", cells: ["Payroll migration", "Client B", "62%", "Open"], tone: T.green },
      { id: "3", cells: ["Monthly bookkeeping", "Client C", "45%", "Open"], tone: T.green },
      { id: "4", cells: ["VAT registration", "Client D", "30%", "Blocked"], tone: T.coral },
      { id: "5", cells: ["Q3 forecast build", "Client E", "12%", "Open"], tone: T.green },
    ],
  },
  chat: {
    caption: "Threads with clients and inside the firm.",
    columns: ["Thread", "With", "Last message", "Unread"],
    rows: [
      { id: "1", cells: ["Payment run sign-off", "Client D", "09:42", "2"], tone: T.coral },
      { id: "2", cells: ["Overspend on phase 2", "Client C", "Yesterday", "1"], tone: T.coral },
      { id: "3", cells: ["July close checklist", "Sam O., Dana K.", "Yesterday", "0"], tone: T.mute },
      { id: "4", cells: ["Statements received", "Client A", "2 days ago", "0"], tone: T.mute },
    ],
  },
  tasks: {
    caption: "Everything assigned across the team.",
    columns: ["Task", "Owner", "Due", "Priority"],
    rows: [
      { id: "1", cells: ["Chase 60+ day balance", "Dana K.", "Overdue 2d", "High"], tone: T.red },
      { id: "2", cells: ["Approve supplier payment run", "Alex M.", "Overdue 1d", "High"], tone: T.red },
      { id: "3", cells: ["Reconcile deposit account", "Sam O.", "Today", "Medium"], tone: T.amber },
      { id: "4", cells: ["Issue August retainers", "Mia L.", "Tomorrow", "Medium"], tone: T.amber },
      { id: "5", cells: ["Draft Q3 forecast", "Ravi T.", "Fri", "Low"], tone: T.mute },
    ],
  },
  time: {
    caption: "Hours logged this week, billable and not.",
    columns: ["Member", "Logged", "Billable", "Utilisation"],
    rows: [
      { id: "1", cells: ["Sam O.", "46h", "38h", "115%"], tone: T.coral },
      { id: "2", cells: ["Dana K.", "22h", "18h", "55%"], tone: T.amber },
      { id: "3", cells: ["Ravi T.", "19h", "15h", "48%"], tone: T.amber },
      { id: "4", cells: ["Mia L.", "38h", "34h", "95%"], tone: T.green },
      { id: "5", cells: ["Jon P.", "36h", "30h", "90%"], tone: T.green },
    ],
  },
  documents: {
    caption: "Files shared with clients, and what is still missing.",
    columns: ["Document", "Client", "Updated", "Status"],
    rows: [
      { id: "1", cells: ["Bank statements, July", "Client A", "Today", "Missing"], tone: T.coral },
      { id: "2", cells: ["Payroll journal", "Client B", "Today", "Review"], tone: T.amber },
      { id: "3", cells: ["Q2 management pack", "Client C", "Yesterday", "Shared"], tone: T.green },
      { id: "4", cells: ["Fixed asset register", "Client D", "2 days ago", "Shared"], tone: T.green },
    ],
  },
  approvals: {
    caption: "Payments and journals waiting on a decision.",
    columns: ["Item", "Client", "Amount", "Status"],
    rows: [
      { id: "1", cells: ["Supplier payment run", "Internal", "27,400", "Waiting"], tone: T.coral },
      { id: "2", cells: ["Intercompany journal", "Client B", "8,900", "Waiting"], tone: T.coral },
      { id: "3", cells: ["Expense claim", "Sam O.", "420", "Waiting"], tone: T.amber },
      { id: "4", cells: ["Revised budget", "Client C", "14,200", "Approved"], tone: T.green },
    ],
  },
  invoices: {
    caption: "What is out, what is late, what goes out next.",
    columns: ["Invoice", "Client", "Amount", "Status"],
    rows: [
      { id: "1", cells: ["INV-1994", "Client A", "4,400", "71 days"], tone: T.red },
      { id: "2", cells: ["INV-2038", "Client B", "5,100", "44 days"], tone: T.amber },
      { id: "3", cells: ["INV-2041", "Client C", "3,800", "38 days"], tone: T.amber },
      { id: "4", cells: ["INV-2062", "Client D", "12,400", "Current"], tone: T.green },
      { id: "5", cells: ["INV-2071", "Client E", "6,200", "Draft"], tone: T.mute },
    ],
  },
};

function SectionScreen({ view }: { view: SectionView }) {
  const template = `2fr repeat(${view.columns.length - 1}, minmax(0, 1fr))`;
  return (
    <section
      className={`csw-widget flex min-h-0 min-w-0 flex-1 flex-col ${CARD_CLASS} overflow-hidden`}
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,.03)" }}
    >
      <div
        className="grid shrink-0 gap-2 border-b border-[#F0EBE4] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em]"
        style={{ gridTemplateColumns: template, color: T.mute }}
      >
        {view.columns.map((column) => (
          <span key={column} className="truncate">
            {column}
          </span>
        ))}
      </div>

      <ul className="min-h-0 flex-1 divide-y divide-[#F0EBE4] overflow-hidden">
        {view.rows.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              className="grid w-full gap-2 px-4 py-[11px] text-left transition-colors hover:bg-[#FAF7F2]"
              style={{ gridTemplateColumns: template }}
            >
              {row.cells.map((cell, i) => {
                if (i === row.cells.length - 1 && row.tone) {
                  return (
                    <span key={cell} className="min-w-0">
                      <span
                        className="inline-block max-w-full truncate rounded-full px-2 py-[1px] text-[11px] font-semibold"
                        style={{ background: alpha(row.tone, 0.13), color: row.tone }}
                      >
                        {cell}
                      </span>
                    </span>
                  );
                }
                return (
                  <span
                    key={cell}
                    className={`truncate text-[12.5px] ${
                      i === 0 ? "font-semibold text-[#1A1A1A]" : "text-[#7A756E]"
                    }`}
                  >
                    {cell}
                  </span>
                );
              })}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Dashboard body layout (the shell supplies the rest)
   ──────────────────────────────────────────────────────────────────── */

const PREFIX = "csw";
const DESIGN: ShellDesign = { wide: { w: 1360, h: 968 }, mid: { w: 920, h: 1264 } };

/* Row tracks are minmax(_, auto) so the tallest card sets the row and
   nothing (notably the Workload caption) can be clipped by a fixed height. */
const BODY_CSS = `
.csw-body{display:flex;flex-direction:column;gap:12px;min-height:0;flex:1}
.csw-rail{width:100%;flex:none}
.csw-kpis{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}
.csw-grid{display:grid;gap:20px;grid-template-columns:minmax(0,1fr)}
.csw-hero{grid-column:span 1}
@keyframes csw-view-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.csw-view{animation:csw-view-in 340ms cubic-bezier(.2,.7,.3,1);display:flex;flex-direction:column;flex:1;min-height:0;gap:14px}

@container csw (min-width:640px){
  .csw-body{flex-direction:row}
  .csw-rail{display:none}
  .csw-kpis{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:112px}
  .csw-grid{grid-template-columns:repeat(2,minmax(0,1fr));
    grid-template-rows:minmax(276px,auto) minmax(276px,auto) minmax(330px,auto);
    grid-auto-rows:minmax(276px,auto);grid-auto-flow:dense}
  .csw-hero{grid-column:span 2}
}

@container csw (min-width:900px){
  .csw-rail{display:flex;width:300px}
  .csw-grid{grid-template-columns:repeat(3,minmax(0,1fr));
    grid-template-rows:minmax(276px,auto) minmax(330px,auto)}
}
`;

/*
 * `variant="screenshot"` fits a narrow column differently: instead of
 * reflowing (rail out, then sidebar down to icons), it keeps the full desktop
 * layout — sidebar labels and all — and only scales it. Text gets small by
 * design; it reads as a shrunken screenshot rather than a squashed app. Scoped
 * by data-variant so both fits can appear on one page.
 */
/* 16:10, like a laptop screen: wider and shorter than the responsive fit,
   so the same dashboard reads as a window rather than a tall panel. */
const W = { w: 1600, h: 1000 };

function screenshotCss(p: string) {
  const at = `.${p}-fit[data-variant="screenshot"]`;
  let ladder = "";
  for (let cw = 300; cw <= W.w; cw += 12) {
    ladder += `@container ${p} (min-width:${cw}px){${at} .${p}-shell{--${p}-s:${Math.min(cw / W.w, 1).toFixed(5)}}}`;
  }
  return `
${at} .${p}-stage{aspect-ratio:${W.w}/${W.h}}
${at} .${p}-shell{position:absolute;top:0;left:0;width:${W.w}px;height:${W.h}px;
  transform:scale(var(--${p}-s));gap:14px;padding:16px;overflow:hidden}
${at} .${p}-sidebar{display:flex;width:250px}
${at} .${p}-collapse-btn{display:grid}
${at} .${p}-navrow{justify-content:flex-start}
${at} .${p}-utilrow{flex-wrap:nowrap;justify-content:flex-start}
${at} .${p}-lbl{display:block}
${at} .${p}-lblf{display:flex}
${at} .${p}-topbar-actions{display:flex}
${at} .${p}-topbar-circle{display:grid}
${at} .${p}-body{flex-direction:row}
${at} .${p}-rail{display:flex;width:300px}
${at} .${p}-kpis{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:112px}
${at} .${p}-grid{grid-template-columns:repeat(3,minmax(0,1fr));
  grid-template-rows:minmax(276px,auto) minmax(330px,auto)}
${at} .${p}-hero{grid-column:span 2}
${ladder}

/* restated last so collapsing still wins over the screenshot rules above */
.${p}-shell[data-collapsed="true"] .${p}-sidebar{width:72px}
.${p}-shell[data-collapsed="true"] .${p}-lbl,
.${p}-shell[data-collapsed="true"] .${p}-lblf{display:none}
`;
}

const SHOWCASE_CSS = buildShellCss(PREFIX, DESIGN, BODY_CSS + screenshotCss(PREFIX));

/* ────────────────────────────────────────────────────────────────────
   Shared body pieces
   ──────────────────────────────────────────────────────────────────── */

/** Overlapping member avatars + an overflow counter. */
function MemberStack({
  d,
  size,
  className,
}: {
  d: MockData;
  size: number;
  className?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const shown = d.team.slice(0, STACK_SHOWN);
  const overflow = teamOverflow(d);

  return (
    <div className={`flex shrink-0 items-center ${className ?? ""}`}>
      {shown.map((member) => (
        <span key={member.id} className="relative" style={{ marginLeft: -8 }}>
          <button
            type="button"
            aria-label={`${member.name} · ${member.role}`}
            onMouseEnter={() => setHovered(member.id)}
            onMouseLeave={() => setHovered((c) => (c === member.id ? null : c))}
            onFocus={() => setHovered(member.id)}
            onBlur={() => setHovered((c) => (c === member.id ? null : c))}
            className="grid place-items-center rounded-full font-bold text-white transition-transform duration-150 hover:z-20 hover:-translate-y-px hover:scale-110"
            style={{
              width: size,
              height: size,
              fontSize: Math.round(size * 0.36),
              background: member.tint,
              boxShadow: "0 0 0 2px #FFFFFF",
              position: "relative",
              zIndex: hovered === member.id ? 20 : 1,
            }}
          >
            {member.initials}
          </button>
          {hovered === member.id ? (
            <span
              className="pointer-events-none absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-1 text-[10px] font-semibold text-white shadow-lg"
              style={{ background: "#2A2622" }}
            >
              {member.name} · {member.role}
            </span>
          ) : null}
        </span>
      ))}
      {overflow > 0 ? (
        <span
          className="ml-1 grid place-items-center rounded-full font-semibold"
          style={{
            height: size,
            padding: `0 ${Math.round(size * 0.22)}px`,
            fontSize: Math.round(size * 0.36),
            background: T.greyBlue,
            color: T.greyBlueInk,
            boxShadow: "0 0 0 2px #FFFFFF",
          }}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

/** Bordered card whose title row is separated from the body by a hairline. */
function WidgetCard({
  title,
  link,
  badge,
  actions,
  bodyClassName,
  children,
  className,
}: {
  title: string;
  link?: string;
  badge?: string;
  actions?: React.ReactNode;
  bodyClassName?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`csw-widget flex h-full min-w-0 flex-col ${CARD_CLASS} p-4 transition-colors hover:border-[#D8D0C6] ${className ?? ""}`}
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,.03)" }}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#F0EBE4] pb-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="truncate text-[15px] font-semibold text-[#1A1A1A]">{title}</h3>
          {badge ? (
            <span
              className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ background: T.field, color: T.sub }}
            >
              {badge}
            </span>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          {link ? (
            <button
              type="button"
              className="shrink-0 text-[12px] font-medium text-[#7A756E] transition-colors hover:text-[#1A1A1A] hover:underline"
            >
              {link}
            </button>
          ) : null}
        </div>
      </div>
      <div className={`flex min-h-0 flex-1 flex-col pt-3.5 ${bodyClassName ?? "overflow-hidden"}`}>
        {children}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   KPI card (accent strip + count-up)
   ──────────────────────────────────────────────────────────────────── */

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || target === 0) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

function KpiCard({ kpi, active }: { kpi: Kpi; active: boolean }) {
  const value = useCountUp(kpi.value, active);
  return (
    <div
      className={`relative h-full overflow-hidden ${CARD_CLASS} transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-[#D8D0C6]`}
    >
      <span
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: kpi.accent }}
        aria-hidden="true"
      />
      <div className="flex h-full flex-col justify-between p-3.5 pt-[15px]">
        <span className="truncate text-[12px] font-medium text-[#7A756E]">{kpi.label}</span>
        <span className="text-[36px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[#1A1A1A]">
          {value}
        </span>
        <span className="text-[11px] leading-[1.3] text-[#A39D95]">{kpi.caption}</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Widgets
   ──────────────────────────────────────────────────────────────────── */

function WorkloadWidget({ d, inView }: { d: MockData; inView: boolean }) {
  const w = d.workload;
  return (
    <WidgetCard title={w.title} bodyClassName="pb-1.5">
      <p className="-mt-1 mb-2 text-[12px] text-[#A39D95]">{w.caption}</p>
      <WorkloadChart
        slots={w.slots}
        inView={inView}
        label={`Bar chart of work due over the next seven days: ${w.slots
          .map((s) => `${s.long} ${s.count}`)
          .join(", ")}.`}
      />
      <div className="mt-auto border-t border-[#F0EBE4] pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#7A756E]">{w.progressLabel}</span>
          <span className="text-[12px] font-semibold tabular-nums text-[#1A1A1A]">
            {w.done} / {w.total}
          </span>
        </div>
        <div className="mt-1.5 h-[6px] w-full overflow-hidden rounded-full bg-[#F2EEE7]">
          <div
            className="h-full rounded-full"
            style={{
              width: inView ? `${workloadPct(d)}%` : "0%",
              background: `linear-gradient(90deg,${T.green},${T.coral})`,
              transition: "width 900ms cubic-bezier(.2,.7,.3,1) 200ms",
            }}
          />
        </div>
        <p
          className="mt-1.5 text-[11px] font-medium leading-[1.35]"
          style={{ color: w.slipped > 0 ? T.coral : T.mute }}
        >
          {w.slipped} items slipped since Monday
        </p>
      </div>
    </WidgetCard>
  );
}

function HeroWidget({ d }: { d: MockData }) {
  const h = d.hero;
  return (
    <section
      className="csw-widget relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl p-5 text-white"
      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)" }}
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(135deg,#0C5B41 0%,#17694C 34%,#8E4A5E 72%,#F2726B 100%)`,
        }}
      />
      <div
        className="absolute -left-10 -top-16 h-56 w-56 rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: "#1FBF8A" }}
      />
      <div
        className="absolute -bottom-20 right-0 h-64 w-64 rounded-full opacity-40 blur-3xl"
        aria-hidden="true"
        style={{ background: "#FF7C7C" }}
      />

      <span className="relative text-[12px] font-semibold text-white/75">{h.eyebrow}</span>

      <div className="relative">
        <div className="text-[62px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
          {h.value}
        </div>
        <p className="mt-1.5 text-[13px] font-medium text-white/85">{h.caption}</p>
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-white/25 pt-3">
        <button
          type="button"
          className="text-[12px] font-semibold text-white underline decoration-white/50 underline-offset-[3px] transition-colors hover:decoration-white"
        >
          {h.link}
        </button>
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-white/85">
          <span className="csw-pulse h-[6px] w-[6px] rounded-full bg-white" aria-hidden="true" />
          {h.live} live
        </span>
      </div>
    </section>
  );
}

function TasksWidget({ d }: { d: MockData }) {
  const t = d.tasks;
  return (
    <WidgetCard title={t.title} link={t.link} badge={`${openTasks(d)} open`}>
      <ul className="divide-y divide-[#F0EBE4]">
        {t.rows.map((row) => (
          <li key={row.id}>
            <button type="button" className={`${ROW_CLASS} rounded-lg px-1.5 py-[7px]`}>
              <span
                className="h-[6px] w-[6px] shrink-0 rounded-full"
                style={{ background: row.dot }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-[#1A1A1A]">
                  {row.title}
                </span>
                <span className="block truncate text-[10.5px] text-[#A39D95]">{row.client}</span>
              </span>
              <span
                className="shrink-0 text-[10.5px] font-semibold"
                style={{ color: row.dueColor }}
              >
                {row.due}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-auto self-start pl-1.5 pt-2 text-[11px] font-medium text-[#A39D95] transition-colors hover:text-[#1A1A1A]"
      >
        + {t.hidden} more
      </button>
    </WidgetCard>
  );
}

function EngagementsWidget({ d }: { d: MockData }) {
  const e = d.engagements;
  return (
    <WidgetCard title={e.title} link={e.link} actions={<MemberStack d={d} size={24} className="pl-2" />}>
      <ul className="divide-y divide-[#F0EBE4]">
        {e.rows.map((row) => (
          <li key={row.id}>
            <button type="button" className={`${ROW_CLASS} flex-col rounded-lg px-1.5 py-[7px]`}>
              <span className="flex w-full items-center gap-2">
                <span
                  className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: row.avatar }}
                  aria-hidden="true"
                >
                  {row.initials}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-[#1A1A1A]">
                  {row.name}
                </span>
                <span
                  className="shrink-0 rounded-full px-1.5 py-[1px] text-[10px] font-semibold"
                  style={{ background: alpha(row.statusColor, 0.13), color: row.statusColor }}
                >
                  {row.status}
                </span>
              </span>
              <span className="mt-[3px] flex w-full items-center gap-2 pl-[30px]">
                <span className="min-w-0 flex-1 truncate text-[10.5px] text-[#A39D95]">
                  {row.client}
                </span>
                <span className="h-[4px] w-[42px] shrink-0 overflow-hidden rounded-full bg-[#F2EEE7]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${row.progress}%`, background: row.statusColor }}
                  />
                </span>
                <span className="w-[26px] shrink-0 text-right text-[10px] font-semibold tabular-nums text-[#7A756E]">
                  {row.progress}%
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}

function TodayRail({ d }: { d: MockData }) {
  const t = d.today;
  return (
    <aside className="csw-rail flex-col">
      {/* No scroll container: the card grows to fit every item, and the shell
          is sized so the full list and the footer line always fit. */}
      <div
        className={`flex min-h-full flex-col ${PANEL_CLASS} p-4`}
        style={{ boxShadow: PANEL_SHADOW }}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-[#F0EBE4] pb-3">
          <IconCalendar style={{ width: 17, height: 17, color: T.green }} />
          <h3 className="text-[15px] font-semibold text-[#1A1A1A]">{t.title}</h3>
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ background: T.field, color: T.sub }}
          >
            {todayCount(d)} items
          </span>
          <span className="ml-auto text-[12px] font-medium text-[#A39D95]">{t.date}</span>
        </div>

        <div className="flex-1">
          {t.groups.map((group) => (
            <div key={group.id} className="mt-3 first:mt-2">
              <span
                className="block text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: group.overdue ? T.coral : T.mute }}
              >
                {group.label}
              </span>
              <ul className="mt-1 divide-y divide-[#F0EBE4]">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <div
                      className={`flex items-start gap-2 rounded-lg px-1.5 py-[7px] transition-colors hover:bg-[#FAF7F2] ${
                        group.overdue ? "border-l-2 border-[#F2545B] pl-2" : ""
                      }`}
                    >
                      {item.time ? (
                        <span className="w-[54px] shrink-0 text-[11px] font-semibold tabular-nums text-[#7A756E]">
                          {item.time}
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-medium text-[#1A1A1A]">
                          {item.title}
                        </span>
                        <span className="block truncate text-[10.5px] text-[#A39D95]">
                          {item.meta}
                        </span>
                      </span>
                      {item.trail ? (
                        <span
                          className="shrink-0 text-[10.5px] font-semibold"
                          style={{ color: T.coral }}
                        >
                          {item.trail}
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-2 shrink-0 border-t border-[#F0EBE4] pt-2.5 text-[11px] leading-[1.4] text-[#A39D95]">
          {t.footer}
        </p>
      </div>
    </aside>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Root
   ──────────────────────────────────────────────────────────────────── */

export type ClientSpaceVariant = "responsive" | "screenshot";

export function ClientSpaceShowcase({
  variant = "responsive",
  loop = false,
  dataset = "finance",
}: {
  /** "screenshot" keeps the desktop layout at any width, scaled not reflowed */
  variant?: ClientSpaceVariant;
  /** cycles the active nav item so the mockup reads as live software */
  loop?: boolean;
  /** which book of business to show, so two placements never match */
  dataset?: ClientSpaceDataset;
} = {}) {
  const d = DATASETS[dataset];
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const revealed = useInView(rootRef, { once: true, margin: "-60px" });
  const onScreen = useInView(rootRef, { amount: 0.25 });

  const [activeId, setActiveId] = useState("dashboard");
  const [takenOver, setTakenOver] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [arrange, setArrange] = useState(false);
  const [query, setQuery] = useState("");

  const activeNav = d.nav.find((item) => item.id === activeId);
  const section = activeId === "dashboard" ? null : (SECTIONS[activeId] ?? null);

  /* Ctrl/Cmd+K focuses the mock search only while the mockup is on screen,
     so it never steals the shortcut from the rest of the page. */
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

  /* Idle loop: walk the active nav item down the sidebar so the screen reads as
     live software. Pauses off-screen, stops for good on first interaction, and
     never runs under prefers-reduced-motion. */
  useEffect(() => {
    if (!loop || takenOver || !onScreen) return;
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const ids = d.nav.map((item) => item.id);
    const timer = setInterval(() => {
      setActiveId((current) => ids[(ids.indexOf(current) + 1) % ids.length]);
    }, 2600);
    return () => clearInterval(timer);
  }, [loop, takenOver, onScreen, d]);

  return (
    <MotionConfig reducedMotion="user">
      <ShellFrame
        variant={variant}
        onInteract={loop && !takenOver ? () => setTakenOver(true) : undefined}
        prefix={PREFIX}
        css={SHOWCASE_CSS}
        label="Interactive preview of the PYNGYN ClientSpace dashboard"
        rootRef={rootRef}
        collapsed={collapsed}
        arrange={arrange}
      >
        <ShellSidebar
          prefix={PREFIX}
          workspace={d.workspace}
          nav={d.nav}
          navLabel="ClientSpace sections"
          navMaxHeight={530}
          activeId={activeId}
          onSelect={setActiveId}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <ShellTopbar
            prefix={PREFIX}
            workspaceName={d.workspace.name}
            userInitials={d.user.initials}
            searchRef={searchRef}
            query={query}
            onQuery={setQuery}
            extras={<MemberStack d={d} size={30} className="csw-topbar-actions pl-2" />}
          />

          <div className="csw-body">
            <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-3.5 overflow-hidden">
              {/* header row */}
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="truncate text-[30px] font-bold leading-none tracking-[-0.03em] text-[#1A1A1A]">
                    {activeNav?.label ?? d.header.title}
                  </h1>
                  <p className="mt-1.5 text-[13px] text-[#7A756E]">
                    {section ? section.caption : d.header.greeting}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: T.green }}
                    aria-hidden="true"
                  >
                    {d.user.initials}
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-[#E7E1D9] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#57534E] transition-colors hover:border-[#D8D0C6] hover:text-[#1A1A1A]"
                  >
                    {d.workload.total} due this week
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold text-white transition-transform duration-150 hover:-translate-y-px"
                    style={{ background: T.coral, boxShadow: `0 8px 18px -12px ${T.coral}` }}
                  >
                    <IconPlus style={{ width: 13, height: 13 }} />
                    {d.header.ctaPill}
                  </button>
                </div>
              </div>

              {/* Body swaps with the selected tab; the key restarts the
                  fade so the change is visible. */}
              <div key={activeId} className="csw-view">
                {section ? (
                  <SectionScreen view={section} />
                ) : (
                  <>
                {/* KPIs */}
                <div className="csw-kpis">
                  {d.kpis.map((kpi, i) => (
                    <Rise key={kpi.id} i={i} className="min-w-0">
                      <KpiCard kpi={kpi} active={revealed} />
                    </Rise>
                  ))}
                </div>

                {/* arrange */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setArrange((v) => !v)}
                    aria-pressed={arrange}
                    className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors"
                    style={{
                      borderColor: arrange ? T.coral : T.border,
                      color: arrange ? T.coral : T.sub,
                      background: arrange ? alpha(T.coral, 0.07) : "#FFFFFF",
                    }}
                  >
                    <IconGrip style={{ width: 13, height: 13 }} />
                    Arrange
                  </button>
                </div>

                {/* widgets */}
                <div className="csw-grid">
                  <Rise i={4} className="min-w-0">
                    <WorkloadWidget d={d} inView={revealed} />
                  </Rise>
                  <Rise i={5} className="csw-hero min-w-0">
                    <HeroWidget d={d} />
                  </Rise>
                  <Rise i={6} className="min-w-0">
                    <WidgetCard title={d.health.title} link={d.health.link}>
                      <HealthDonut
                        segments={d.health.segments}
                        total={clientTotal(d)}
                        totalLabel={d.health.totalLabel}
                        inView={revealed}
                        label={`Donut chart of client health: ${d.health.segments
                          .map((s) => `${s.value} ${s.label.toLowerCase()}`)
                          .join(", ")}.`}
                      />
                    </WidgetCard>
                  </Rise>
                  <Rise i={7} className="min-w-0">
                    <TasksWidget d={d} />
                  </Rise>
                  <Rise i={8} className="min-w-0">
                    <EngagementsWidget d={d} />
                  </Rise>
                </div>
                  </>
                )}
              </div>

            </main>

            {!section && <TodayRail d={d} />}
          </div>
        </div>
      </ShellFrame>
    </MotionConfig>
  );
}
