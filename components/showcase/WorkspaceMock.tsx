"use client";

/*
 * WorkspaceMock — component-built recreations of the real PYNGYN Workspace
 * screens (Global Dashboard + Smart Inbox) for the /workspace page, replacing
 * the flat screenshots. Faithful to the product UI: dark navy sidebar, light
 * canvas, orange accent. Populated with the Star Finance finance team's data.
 *
 * Authored at a fixed 1600×950 and scaled to fit its column via a container
 * query, so on a phone it shrinks the whole desktop layout to fit rather than
 * reflowing — you always see the real desktop screen.
 */

import { useMemo, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────────
   Scale wrapper — fixed 1600×950 canvas, scaled to the column width.
   ──────────────────────────────────────────────────────────────────── */

const W = 1600;
const H = 950;

function scaleCss(p: string): string {
  // Fine steps keep the scaled shell within a pixel of the stage; the stage
  // background matches the mockup's light canvas so any residual sub-pixel gap
  // on the right/bottom edge blends in instead of showing a dark line. (The
  // left/top edges are flush — the shell is anchored there.)
  let ladder = "";
  for (let cw = 200; cw <= W; cw += 4) {
    ladder += `@container ${p} (min-width:${cw}px){.${p}-shell{--s:${Math.min(cw / W, 1).toFixed(5)}}}`;
  }
  return `
.${p}-fit{container-type:inline-size;container-name:${p}}
.${p}-stage{position:relative;overflow:hidden;aspect-ratio:${W}/${H};background:#f6f7f9}
.${p}-shell{--s:1;position:absolute;top:0;left:0;width:${W}px;height:${H}px;transform:scale(var(--s));transform-origin:top left;display:flex;font-family:var(--font-jakarta),system-ui,sans-serif}
${ladder}
@container ${p} (min-width:${W}px){.${p}-shell{--s:1}}`;
}

function Shell({ prefix, children }: { prefix: string; children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scaleCss(prefix) }} />
      <div className={`${prefix}-fit w-full`}>
        <div className={`${prefix}-stage`}>
          <div className={`${prefix}-shell`}>{children}</div>
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Icons (24×24 stroke, currentColor)
   ──────────────────────────────────────────────────────────────────── */

type IProps = { size?: number; className?: string; style?: React.CSSProperties };
const svg =
  (path: React.ReactNode, fill = false) =>
  ({ size = 18, className, style }: IProps) =>
    (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
        aria-hidden="true"
      >
        {path}
      </svg>
    );

const IGrid = svg(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
const IList = svg(<><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></>);
const IStar = svg(<path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 17l-5.2 2.5 1-5.8L3.5 9.6l5.9-.8L12 3.5z" />);
const IShare = svg(<><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" /></>);
const IMail = svg(<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7l8 6 8-6" /></>);
const INote = svg(<><rect x="4" y="3" width="16" height="18" rx="2.5" /><path d="M8 8h8M8 12h8M8 16h5" /></>);
const ICal = svg(<><rect x="3.5" y="4.5" width="17" height="16" rx="2.5" /><path d="M3.5 9h17M8 3v3M16 3v3" /></>);
const IFolder = svg(<path d="M3.5 7a2 2 0 012-2h3.4l1.6 2H18a2 2 0 012 2v8a2 2 0 01-2 2H5.5a2 2 0 01-2-2V7z" />);
const IVideo = svg(<><rect x="3" y="6" width="12" height="12" rx="2.5" /><path d="M15 10l6-3v10l-6-3z" /></>);
const ISearch = svg(<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.2-3.2" /></>);
const IMoon = svg(<path d="M20 14.5A8 8 0 019.5 4a7 7 0 108.9 10.5z" />);
const IChat = svg(<path d="M20 12a7.5 7.5 0 01-10.7 6.8L4 20l1.3-4.1A7.5 7.5 0 1120 12z" />);
const IGlobe = svg(<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.3 3.6 8.5S14.4 18.2 12 20.5c-2.4-2.3-3.6-5.3-3.6-8.5S9.6 5.8 12 3.5z" /></>);
const IBell = svg(<><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10.5 20a1.8 1.8 0 003 0" /></>);
const IPlus = svg(<path d="M12 5v14M5 12h14" />);
const IChevR = svg(<path d="M9 6l6 6-6 6" />);
const IChevDown = svg(<path d="M6 9l6 6 6-6" />);
const IChevLR = svg(<path d="M14 6l-6 6 6 6" />);
const IClock = svg(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>);
const IAlert = svg(<><circle cx="12" cy="12" r="8.5" /><path d="M12 8v5M12 16h.01" /></>);
const ICheckCircle = svg(<><circle cx="12" cy="12" r="8.5" /><path d="M8.5 12.5l2.4 2.4 4.6-5" /></>);
const IUsers = svg(<><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c0-3.2 2.5-5 5.5-5s5.5 1.8 5.5 5" /><path d="M16 5.2a3.2 3.2 0 010 5.6M20.5 19c0-2.6-1.6-4.2-4-4.7" /></>);
const ITrendUp = svg(<><path d="M4 15l5-5 4 4 7-8" /><path d="M20 6v5h-5" /></>);
const IInfo = svg(<><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></>);
const IRefresh = svg(<><path d="M4 12a8 8 0 0113.7-5.6L20 8" /><path d="M20 4v4h-4" /><path d="M20 12a8 8 0 01-13.7 5.6L4 16" /><path d="M4 20v-4h4" /></>);
const ISparkle = svg(<path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />, true);
const IActivity = svg(<path d="M3 12h4l2.5 7 5-14 2.5 7H21" />);
const IHome = svg(<path d="M4 11l8-6 8 6v8a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 19z" />);
const IUserCircle = svg(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="10" r="3" /><path d="M6.5 18.5c1-2.2 3-3.3 5.5-3.3s4.5 1.1 5.5 3.3" /></>);

/* ────────────────────────────────────────────────────────────────────
   Shared data — Star Finance
   ──────────────────────────────────────────────────────────────────── */

const WORKSPACE = { name: "Star Finance", plan: "Pro Workspace", initials: "SF" };
const USER = { name: "Alex Morgan", role: "Finance Lead", initials: "AM" };

type Nav = { id: string; label: string; Icon: (p: IProps) => JSX.Element; badge?: string; badgeTone?: "count" | "ai" };

const NAV_MY_WORK: Nav[] = [
  { id: "tasks", label: "My Tasks", Icon: IList, badge: "3", badgeTone: "count" },
  { id: "fav", label: "Favourite Projects", Icon: IStar },
  { id: "shared", label: "Shared with Me", Icon: IShare },
];
const NAV_FAV: Nav[] = [
  { id: "inbox", label: "Smart Inbox", Icon: IMail, badge: "AI", badgeTone: "ai" },
  { id: "notes", label: "Notes", Icon: INote, badge: "0", badgeTone: "count" },
  { id: "calendar", label: "My Calendar", Icon: ICal },
];
const NAV_WS: Nav[] = [
  { id: "dashboard", label: "Global Dashboard", Icon: IGrid },
  { id: "spaces", label: "Spaces", Icon: IFolder, badge: "4", badgeTone: "count" },
  { id: "meetings", label: "Meetings", Icon: IVideo, badge: "AI", badgeTone: "ai" },
  { id: "wsnotes", label: "Notes", Icon: INote, badge: "0", badgeTone: "count" },
];

const ORANGE = "#F97316";

/* ────────────────────────────────────────────────────────────────────
   Sidebar (dark)
   ──────────────────────────────────────────────────────────────────── */

function NavRow({ item, active }: { item: Nav; active: boolean }) {
  return (
    <button
      type="button"
      className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-[9px] text-left transition-colors ${
        active ? "bg-[#1c2740]" : "hover:bg-[#18213a]"
      }`}
      style={{ color: active ? "#fff" : "#c3ccdb" }}
    >
      {active ? (
        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r" style={{ background: ORANGE }} />
      ) : null}
      <item.Icon size={18} style={{ color: active ? ORANGE : "#8b97ac" }} />
      <span className="flex-1 truncate text-[13.5px] font-medium">{item.label}</span>
      {item.badge ? (
        item.badgeTone === "ai" ? (
          <span className="rounded-md px-1.5 py-[1px] text-[10px] font-bold text-white" style={{ background: "#3b82f6" }}>
            {item.badge}
          </span>
        ) : (
          <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#2a3550] px-1 text-[10.5px] font-semibold text-[#9fb0c9]">
            {item.badge}
          </span>
        )
      ) : null}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-3 pb-1.5 pt-4 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#5b6880]">{children}</div>;
}

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="flex h-full w-[256px] flex-none flex-col" style={{ background: "#0f1729" }}>
      {/* brand */}
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "#1c2740" }}>
            <span className="text-[16px]">🐧</span>
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-tight text-white">PYNGYN</span>
            <span className="mt-[3px] block text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#5b6880]">Workspace</span>
          </span>
        </div>
        <IChevLR size={17} style={{ color: "#5b6880" }} />
      </div>

      {/* workspace switcher card */}
      <div className="px-3">
        <button type="button" className="flex w-full items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 text-left">
          <span className="grid h-8 w-8 place-items-center rounded-lg text-[12px] font-bold text-white" style={{ background: ORANGE }}>
            {WORKSPACE.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-bold text-[#0f172a]">{WORKSPACE.name}</span>
            <span className="block truncate text-[11px] font-medium text-[#94a3b8]">{WORKSPACE.plan}</span>
          </span>
          <IChevDown size={15} style={{ color: "#94a3b8" }} />
        </button>
      </div>

      {/* nav */}
      <nav className="mt-1 flex-1 overflow-hidden px-2">
        <SectionLabel>My Work</SectionLabel>
        {NAV_MY_WORK.map((n) => <NavRow key={n.id} item={n} active={active === n.id} />)}
        <SectionLabel>Favourites</SectionLabel>
        {NAV_FAV.map((n) => <NavRow key={n.id} item={n} active={active === n.id} />)}
        <SectionLabel>Workspace</SectionLabel>
        {NAV_WS.map((n) => <NavRow key={n.id} item={n} active={active === n.id} />)}
      </nav>

      {/* optimize pill */}
      <div className="px-3 pb-2">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-white"
          style={{ background: "linear-gradient(90deg,#F97316,#EA580C)" }}
        >
          <ISparkle size={15} />
          Optimise for niche
        </button>
      </div>

      {/* user */}
      <div className="flex items-center gap-2.5 border-t border-[#1c2740] px-4 py-3">
        <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "#10b981" }}>
          {USER.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-bold text-white">{USER.name}</span>
          <span className="block truncate text-[11px] text-[#7c89a1]">{USER.role}</span>
        </span>
        <span className="text-[11px] font-medium text-[#7c89a1]">Sign out</span>
      </div>
    </aside>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Topbar (light)
   ──────────────────────────────────────────────────────────────────── */

function Topbar({ page }: { page: string }) {
  return (
    <header className="flex h-[60px] flex-none items-center gap-4 border-b border-[#eceef1] bg-white px-6">
      <div className="flex items-center gap-2 text-[13.5px]">
        <span className="font-medium text-[#94a3b8]">{WORKSPACE.name} Project</span>
        <IChevR size={13} style={{ color: "#cbd5e1" }} />
        <span className="font-semibold text-[#0f172a]">{page}</span>
      </div>

      <div className="mx-2 flex h-9 max-w-[420px] flex-1 items-center gap-2 rounded-full border border-[#eceef1] bg-[#f5f6f8] px-3.5">
        <ISearch size={15} style={{ color: "#94a3b8" }} />
        <span className="flex-1 text-[13px] text-[#94a3b8]">Search projects, tasks, people…</span>
        <span className="rounded-md border border-[#e2e5ea] bg-white px-1.5 py-[1px] text-[10.5px] font-semibold text-[#94a3b8]">⌘ K</span>
      </div>

      {/* Workspace / Client toggle */}
      <div className="flex items-center rounded-full border border-[#eceef1] bg-[#f5f6f8] p-0.5">
        <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-white" style={{ background: ORANGE }}>
          <IHome size={14} /> Workspace
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-semibold text-[#64748b]">
          <IUserCircle size={14} /> Client
          <span className="rounded px-1.5 py-[1px] text-[9.5px] font-bold text-white" style={{ background: ORANGE }}>UPGRADE</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[#64748b]">
        {[IMoon, IChat, IGlobe, IBell].map((Ic, i) => (
          <span key={i} className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-[#f5f6f8]">
            <Ic size={17} />
          </span>
        ))}
      </div>

      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white"
        style={{ background: ORANGE, boxShadow: "0 8px 16px -8px rgba(249,115,22,.6)" }}
      >
        <IPlus size={15} /> Create
      </button>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Dashboard body
   ──────────────────────────────────────────────────────────────────── */

type Kpi = { label: string; value: string; trend?: string; trendUp?: boolean; tint: string; Icon: (p: IProps) => JSX.Element };
const KPIS: Kpi[] = [
  { label: "Active Projects", value: "8", trend: "100%", trendUp: true, tint: "#3b82f6", Icon: IFolder },
  { label: "Open Tasks", value: "12", trend: "100%", trendUp: true, tint: "#F97316", Icon: IList },
  { label: "Tasks Today", value: "5", tint: "#F59E0B", Icon: IClock },
  { label: "Overdue", value: "2", tint: "#EF4444", Icon: IAlert },
  { label: "Completed (7d)", value: "24", trend: "18%", trendUp: true, tint: "#10B981", Icon: ICheckCircle },
  { label: "Team Members", value: "6", trend: "100%", trendUp: true, tint: "#8B5CF6", Icon: IUsers },
];

type Proj = { code: string; name: string; client: string; progress: number; due: string; status: string; tint: string };
const PROJECTS: Proj[] = [
  { code: "YA", name: "Year-end audit prep", client: "Client A", progress: 78, due: "Fri 8 Aug", status: "In review", tint: "#F59E0B" },
  { code: "PM", name: "Payroll migration", client: "Client B", progress: 62, due: "Tue 12 Aug", status: "Open", tint: "#10B981" },
  { code: "VR", name: "VAT registration", client: "Client D", progress: 30, due: "Thu 14 Aug", status: "Blocked", tint: "#EF4444" },
  { code: "QF", name: "Q3 forecast build", client: "Client E", progress: 12, due: "Wed 20 Aug", status: "Open", tint: "#10B981" },
];
const GOALS = [
  { label: "Bring DSO under 35 days", progress: 64 },
  { label: "Hit £68k monthly billings", progress: 82 },
];
const ACTIVITY = [
  { who: "Alex Morgan", what: 'created task "Chase 60+ day balance"', when: "12m ago" },
  { who: "Dana K.", what: 'moved "VAT registration" to Blocked', when: "1h ago" },
  { who: "Sam O.", what: "approved the supplier payment run", when: "3h ago" },
];
const ONLINE = [
  { initials: "SO", tint: "#3b82f6" },
  { initials: "DK", tint: "#8b5cf6" },
  { initials: "RT", tint: "#ec4899" },
];

function DashboardMain() {
  return (
    <div className="flex-1 overflow-hidden bg-[#f6f7f9] px-8 py-7">
      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[27px] font-extrabold tracking-tight text-[#0f172a]">
            Welcome back, {USER.name.split(" ")[0]} <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-1 text-[13.5px] text-[#64748b]">Here&apos;s what&apos;s happening across {WORKSPACE.name} today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#475569]">Customise</button>
          <button type="button" className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#475569]">Calendar</button>
          <button type="button" className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold text-white" style={{ background: ORANGE }}>
            <IPlus size={14} /> New project
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-6 gap-3.5">
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-[#ecedf0] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#dfe1e5] hover:shadow-[0_10px_24px_-16px_rgba(15,23,42,.35)]"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] text-white" style={{ background: k.tint }}>
                <k.Icon size={20} style={{ color: "#fff" }} />
              </span>
              {k.trend ? (
                <span className="flex items-center gap-0.5 text-[11px] font-bold" style={{ color: k.trendUp ? "#10b981" : "#ef4444" }}>
                  <ITrendUp size={12} /> {k.trend}
                </span>
              ) : null}
            </div>
            <div className="mt-3 text-[30px] font-extrabold leading-none tracking-tight text-[#0f172a]">{k.value}</div>
            <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#94a3b8]">{k.label}</div>
          </div>
        ))}
      </div>

      {/* projects + rail */}
      <div className="mt-5 grid grid-cols-[1fr_360px] gap-5">
        {/* Active projects */}
        <section className="rounded-2xl border border-[#ecedf0] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-bold text-[#0f172a]">Active projects</h2>
              <p className="text-[12px] text-[#94a3b8]">{PROJECTS.length} projects</p>
            </div>
            <button type="button" className="flex items-center gap-1 text-[12.5px] font-semibold" style={{ color: ORANGE }}>
              View all <ITrendUp size={13} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <div
                key={p.code}
                className="cursor-pointer rounded-xl border border-[#eef0f3] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#dfe1e5] hover:shadow-[0_10px_24px_-16px_rgba(15,23,42,.35)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg text-[12px] font-bold text-white" style={{ background: ORANGE }}>
                    {p.code}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold text-[#0f172a]">{p.name}</div>
                    <div className="truncate text-[11.5px] text-[#94a3b8]">{WORKSPACE.name} · {p.client}</div>
                  </div>
                </div>
                <div className="mt-3.5 flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
                    <span className="block h-full rounded-full" style={{ width: `${p.progress}%`, background: p.tint }} />
                  </span>
                  <span className="w-8 text-right text-[11px] font-semibold tabular-nums text-[#64748b]">{p.progress}%</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#94a3b8]">Due {p.due}</span>
                  <span className="rounded-full px-2 py-[2px] text-[10px] font-semibold" style={{ background: `${p.tint}1f`, color: p.tint }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* rail */}
        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border border-[#ecedf0] bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#0f172a]">Online now</h3>
              <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#10b981]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" /> {ONLINE.length}
              </span>
            </div>
            <div className="mt-3 flex items-center">
              {ONLINE.map((m, i) => (
                <span key={m.initials} className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: m.tint, marginLeft: i ? -8 : 0, boxShadow: "0 0 0 2px #fff" }}>
                  {m.initials}
                </span>
              ))}
              <span className="ml-2.5 text-[12px] text-[#64748b]">Sam, Dana &amp; Ravi</span>
            </div>
          </section>

          <section className="rounded-2xl border border-[#ecedf0] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-[#0f172a]">Goals snapshot</h3>
                <p className="text-[11.5px] text-[#94a3b8]">Top goals for this quarter</p>
              </div>
              <button type="button" className="text-[12px] font-semibold" style={{ color: ORANGE }}>All goals</button>
            </div>
            <ul className="mt-3 space-y-3">
              {GOALS.map((g) => (
                <li key={g.label}>
                  <div className="flex items-center justify-between">
                    <span className="truncate text-[12.5px] font-medium text-[#475569]">{g.label}</span>
                    <span className="text-[11px] font-semibold tabular-nums text-[#64748b]">{g.progress}%</span>
                  </div>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[#eef0f3]">
                    <span className="block h-full rounded-full" style={{ width: `${g.progress}%`, background: "linear-gradient(90deg,#10b981,#14b8a6)" }} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex-1 rounded-2xl border border-[#ecedf0] bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[14px] font-bold text-[#0f172a]"><IActivity size={15} style={{ color: ORANGE }} /> Recent activity</span>
              <button type="button" className="text-[12px] font-semibold" style={{ color: ORANGE }}>View all</button>
            </div>
            <ul className="mt-3 space-y-3.5">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: "#3b82f6" }}><IPlus size={13} style={{ color: "#fff" }} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] leading-snug text-[#475569]"><span className="font-semibold text-[#0f172a]">{a.who}</span> {a.what}</span>
                    <span className="block text-[11px] text-[#94a3b8]">{a.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Smart Inbox body
   ──────────────────────────────────────────────────────────────────── */

type Priority = "needs" | "fyi" | "low";
type Mail = { id: string; sender: string; initials: string; tint: string; subject: string; snippet: string; reason: string; time: string; priority: Priority; unread?: boolean };

const MAILS: Mail[] = [
  { id: "a", sender: "Client A · Accounts", initials: "CA", tint: "#ef4444", subject: "INV-1994 is now 71 days overdue", snippet: "We still haven't received payment on the £4,400 invoice from May — can someone confirm?", reason: "Receivables · 60+ days · 2 reminders unanswered", time: "9:12 AM", priority: "needs", unread: true },
  { id: "b", sender: "HSBC Business", initials: "HB", tint: "#3b82f6", subject: "Authorise supplier payment run — £27,400", snippet: "6 suppliers are queued for release. Approval required before the 2:00 PM cut-off.", reason: "Approval needed · cut-off 2 PM", time: "8:40 AM", priority: "needs", unread: true },
  { id: "c", sender: "Client D · Priya N.", initials: "PN", tint: "#8b5cf6", subject: "Can we move the audit sign-off to next week?", snippet: "Our board meeting shifted to the 15th, so we'd like a few more days on the year-end pack.", reason: "Deadline change · affects Fri close", time: "Yesterday", priority: "needs", unread: true },
  { id: "d", sender: "HMRC · Companies House", initials: "HM", tint: "#10b981", subject: "VAT return submitted successfully", snippet: "Your Q2 VAT submission for Star Finance has been received. No action required.", reason: "Statutory · confirmation only", time: "7:05 AM", priority: "fyi" },
  { id: "e", sender: "Client C · Maya R.", initials: "MR", tint: "#ec4899", subject: "Thanks for the Q2 management pack", snippet: "Really useful — the margin-by-engagement view especially. We'll circulate to the board.", reason: "Positive · no reply required", time: "Yesterday", priority: "fyi" },
  { id: "f", sender: "BrightPay", initials: "BP", tint: "#14b8a6", subject: "August payroll processed — 6 employees", snippet: "Net pay of £18,240 is scheduled for 28 Aug. Payslips are in the portal.", reason: "Payroll · confirmation", time: "Yesterday", priority: "fyi" },
  { id: "g", sender: "Xero", initials: "XO", tint: "#3b82f6", subject: "Your July subscription receipt", snippet: "£33.00 charged to the card ending 6411. Filed to Documents.", reason: "Receipt · auto-filed", time: "2 days ago", priority: "low" },
  { id: "h", sender: "AccountingWEB", initials: "AW", tint: "#F59E0B", subject: "5 changes to R&D tax relief you should know", snippet: "The latest guidance on qualifying costs and the merged scheme, in a 4-minute read.", reason: "Newsletter", time: "3 days ago", priority: "low" },
  { id: "i", sender: "Slack", initials: "SL", tint: "#8b5cf6", subject: "Your weekly activity digest", snippet: "14 messages you may have missed across #close, #clients and #advisory.", reason: "Digest", time: "3 days ago", priority: "low" },
];

const CATS: { id: Priority; label: string; tint: string; Icon: (p: IProps) => JSX.Element }[] = [
  { id: "needs", label: "Needs response", tint: "#ef4444", Icon: IClock },
  { id: "fyi", label: "FYI only", tint: "#3b82f6", Icon: IInfo },
  { id: "low", label: "Low priority", tint: "#94a3b8", Icon: IChat },
];
const catTint = (p: Priority) => CATS.find((c) => c.id === p)!.tint;
const cnt = (p: Priority) => MAILS.filter((m) => m.priority === p).length;

function SmartInboxMain() {
  const [filter, setFilter] = useState<Priority | "all">("needs");
  const shown = useMemo(() => (filter === "all" ? MAILS : MAILS.filter((m) => m.priority === filter)), [filter]);

  return (
    <div className="flex-1 overflow-hidden bg-[#f6f7f9] px-8 py-7">
      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[26px] font-extrabold tracking-tight text-[#0f172a]">
              {WORKSPACE.name}<span className="align-super text-[13px]">™</span> Smart Inbox
            </h1>
            <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: "#8b5cf6" }}>
              <ISparkle size={12} /> AI Triaged
            </span>
          </div>
          <p className="mt-1.5 text-[13.5px] text-[#64748b]">
            Business Brain sorts and prioritises everything that needs you ·{" "}
            <span className="font-bold text-[#0f172a]">{cnt("needs")} items need attention</span>
          </p>
        </div>
        <button type="button" className="flex items-center gap-1.5 rounded-lg border border-[#e6e8ec] bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[#475569]">
          <IRefresh size={14} /> Sync now
        </button>
      </div>

      {/* triage cards (clickable filters) */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {CATS.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className="flex items-center gap-4 rounded-2xl border bg-white p-5 text-left transition-all hover:-translate-y-px"
              style={{ borderColor: active ? c.tint : "#ecedf0", boxShadow: active ? `0 0 0 1px ${c.tint}` : undefined }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full" style={{ background: `${c.tint}1f`, color: c.tint }}>
                <c.Icon size={22} />
              </span>
              <span>
                <span className="block text-[30px] font-extrabold leading-none text-[#0f172a]">{cnt(c.id)}</span>
                <span className="mt-1 block text-[13.5px] font-semibold text-[#475569]">{c.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* filter tabs */}
      <div className="mt-5 flex items-center gap-2">
        {[{ id: "all" as const, label: "All" }, ...CATS.map((c) => ({ id: c.id, label: c.label }))].map((t) => {
          const active = filter === t.id;
          const tint = t.id === "all" ? "#0f172a" : catTint(t.id as Priority);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className="rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors"
              style={{ borderColor: active ? tint : "#e6e8ec", color: active ? "#fff" : "#64748b", background: active ? tint : "#fff" }}
            >
              {t.label}{t.id !== "all" ? <span className="ml-1.5 tabular-nums opacity-70">{cnt(t.id as Priority)}</span> : null}
            </button>
          );
        })}
      </div>

      {/* mail list */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[#ecedf0] bg-white">
        <ul className="divide-y divide-[#f1f2f4]">
          {shown.map((m) => (
            <li key={m.id}>
              <button type="button" className="flex w-full items-start gap-4 px-6 py-4 text-left transition-colors hover:bg-[#fafbfc]">
                <span className="mt-0.5 h-9 w-[3px] flex-none rounded-full" style={{ background: catTint(m.priority) }} />
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: m.tint }}>{m.initials}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[13.5px] font-semibold text-[#0f172a]">{m.sender}</span>
                    {m.unread ? <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#ef4444]" /> : null}
                    <span className="ml-auto flex-none text-[11.5px] text-[#94a3b8]">{m.time}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-[14px] font-semibold text-[#0f172a]">{m.subject}</span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-[#64748b]">{m.snippet}</span>
                  <span className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[11px] font-semibold" style={{ background: `${catTint(m.priority)}1f`, color: m.priority === "low" ? "#64748b" : catTint(m.priority) }}>
                      <ISparkle size={11} /> {m.reason}
                    </span>
                    {m.priority === "needs" ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#e6e8ec] bg-white px-2 py-[3px] text-[11px] font-semibold text-[#475569]">Draft reply <IChevR size={11} /></span>
                    ) : null}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Exported showcases
   ──────────────────────────────────────────────────────────────────── */

export function WorkspaceDashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Shell prefix="wds">
      <Sidebar active="dashboard" />
      <div className="flex min-w-0 flex-1 flex-col" ref={ref}>
        <Topbar page="Global Dashboard" />
        <DashboardMain />
      </div>
    </Shell>
  );
}

export function SmartInboxShowcase() {
  return (
    <Shell prefix="sib">
      <Sidebar active="inbox" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar page="Smart Inbox" />
        <SmartInboxMain />
      </div>
    </Shell>
  );
}
