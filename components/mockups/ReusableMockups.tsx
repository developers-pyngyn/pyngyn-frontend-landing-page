"use client";

import React from "react";
import { FileText } from "lucide-react";
export { BrowserFrame } from "./BrowserFrame";
export {
  StatusBadge,
  PriorityBadge,
  EffortBar,
  AvatarStack,
  type StatusType,
  type PriorityType,
  type Assignee,
} from "./MockupElements";
export { ClientWorkspaceMockup } from "./ClientWorkspaceMockup";
export { MyWorkMockup } from "./MyWorkMockup";
export { WorkloadCockpitMockup as WorkloadChart, WorkloadCockpitMockup } from "./WorkloadCockpitMockup";
export { StatutoryCalendarMockup as Calendar, StatutoryCalendarMockup } from "./StatutoryCalendarMockup";
export { ClientPortalMockup as ClientPortal, ClientPortalMockup } from "./ClientPortalMockup";
export { ExecutiveDashboardMockup } from "./ExecutiveDashboardMockup";
export { ResponsiveMockupFrame } from "./ResponsiveMockupFrame";

// 1. Avatar
export function Avatar({
  initials,
  name,
  className = "",
}: {
  initials: string;
  name?: string;
  className?: string;
}) {
  return (
    <span
      title={name}
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#14223d] text-[10px] font-bold text-white shadow-2xs ${className}`}
    >
      {initials}
    </span>
  );
}

// 2. ProgressBar
export function ProgressBar({
  value,
  max = 100,
  color = "bg-[#14223d]",
}: {
  value: number;
  max?: number;
  color?: string;
}) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// 3. Notification
export function Notification({
  title,
  message,
  type = "info",
}: {
  title: string;
  message: string;
  type?: "info" | "warning" | "success" | "danger";
}) {
  const bg = {
    info: "bg-[#f0f4fa] border-[#14223d]/20 text-[#14223d]",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    danger: "bg-rose-50 border-rose-200 text-rose-800",
  }[type];

  return (
    <div className={`rounded-lg border p-3 text-[12px] shadow-2xs ${bg}`}>
      <div className="font-bold">{title}</div>
      <div className="mt-0.5 opacity-90">{message}</div>
    </div>
  );
}

// 4. AutomationNode
export function AutomationNode({
  type,
  label,
  subtext,
  icon,
}: {
  type: "TRIGGER" | "ACTION" | "CONDITION";
  label: string;
  subtext: string;
  icon: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-[14px]">
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#14223d]">
          {type}
        </span>
        <div className="font-bold text-[13px] text-slate-900">{label}</div>
        <p className="text-[11.5px] text-slate-500 mt-0.5">{subtext}</p>
      </div>
    </div>
  );
}

// 5. TaskCard
export function TaskCard({
  title,
  due,
  priority = "High",
  status = "In Progress",
}: {
  title: string;
  due: string;
  priority?: "Urgent" | "High" | "Medium" | "Low";
  status?: any;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs hover:border-slate-400 transition-colors">
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="font-mono text-rose-600 font-bold">{due}</span>
        <span className="text-[10.5px] text-slate-400">{priority}</span>
      </div>
      <h5 className="font-semibold text-slate-800 text-[12.5px]">{title}</h5>
    </div>
  );
}

// 6. TaskList
export function TaskList({ tasks }: { tasks: any[] }) {
  return (
    <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white shadow-2xs">
      {tasks.map((t, i) => (
        <div key={i} className="flex items-center justify-between p-3 text-[12px]">
          <span className="font-medium text-slate-800">{t.name || t.title}</span>
          <span className="text-slate-500">{t.due}</span>
        </div>
      ))}
    </div>
  );
}

// 7. ClientList
export function ClientList({ clients }: { clients: any[] }) {
  return (
    <div className="space-y-1.5 text-[12px]">
      {clients.map((c, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-slate-100 p-2 hover:bg-slate-50 transition-colors"
        >
          <span className="font-semibold text-slate-800">{c.name}</span>
          <span className="text-[10.5px] text-slate-400">{c.tier}</span>
        </div>
      ))}
    </div>
  );
}

// 8. ProductSidebar
export function ProductSidebar({ activeItem = "Clients" }: { activeItem?: string }) {
  const items = ["Home", "Clients", "CRM", "Cockpit", "Dashboard", "Workload", "Calendar"];
  return (
    <div className="w-14 border-r border-slate-200 bg-[#f8fafc] p-2 flex flex-col items-center gap-3">
      {items.map((it) => (
        <div
          key={it}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
            activeItem === it ? "bg-[#14223d] text-white" : "text-slate-500 hover:bg-slate-200"
          }`}
          title={it}
        >
          {it[0]}
        </div>
      ))}
    </div>
  );
}

// 9. ProductHeader
export function ProductHeader({
  firmName = "Meridian Tax Partners",
  activeEntity = "Horizon Exports",
}: {
  firmName?: string;
  activeEntity?: string;
}) {
  return (
    <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-[#f8fafc] px-4 text-[12px]">
      <div className="flex items-center gap-2 font-bold text-slate-900">
        <span>Pyngyn</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600 font-medium">{firmName}</span>
        <span className="text-slate-300">/</span>
        <span className="text-[#14223d] font-semibold">{activeEntity}</span>
      </div>
      <div className="rounded-full bg-slate-100 text-[#14223d] px-2 py-0.5 text-[10px] font-bold border border-slate-200">
        Live Sync
      </div>
    </div>
  );
}

// 10. EngagementCard
export function EngagementCard({
  title = "Statutory Corporate Audit",
  client = "Horizon Exports",
  progress = 75,
}: {
  title?: string;
  client?: string;
  progress?: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-[14px] text-slate-900">{title}</h4>
          <span className="text-[11.5px] text-slate-400">{client}</span>
        </div>
        <span className="text-[#14223d] font-bold text-[12px]">{progress}%</span>
      </div>
      <div className="mt-3">
        <ProgressBar value={progress} />
      </div>
    </div>
  );
}

// 11. DashboardCard
export function DashboardCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="mt-1 text-[22px] font-bold text-slate-900">{value}</div>
      <p className="mt-0.5 text-[11.5px] text-slate-500">{subtext}</p>
    </div>
  );
}

// 12. DocumentList
export function DocumentList({ documents }: { documents: any[] }) {
  return (
    <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white shadow-2xs">
      {documents.map((d, i) => (
        <div key={i} className="flex items-center justify-between p-3 text-[12px]">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400 flex-none" />
            <span className="font-medium text-slate-800">{d.name}</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">{d.status}</span>
        </div>
      ))}
    </div>
  );
}
