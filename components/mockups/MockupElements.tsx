"use client";

import React from "react";

export type StatusType =
  | "In Progress"
  | "Blocked"
  | "Internal Review"
  | "To Do"
  | "Filed / Completed";

export function StatusBadge({ status }: { status: StatusType }) {
  switch (status) {
    case "In Progress":
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-[#f0f4fa] border border-[#14223d]/20 px-2 py-0.5 text-[11px] font-semibold text-[#14223d] shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#14223d]" />
          In Progress
        </span>
      );
    case "Blocked":
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 border border-rose-200/80 px-2 py-0.5 text-[11px] font-semibold text-rose-700 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Blocked
        </span>
      );
    case "Internal Review":
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-300 px-2 py-0.5 text-[11px] font-semibold text-slate-700 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
          Internal Review
        </span>
      );
    case "Filed / Completed":
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Filed / Completed
        </span>
      );
    case "To Do":
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200/80 px-2 py-0.5 text-[11px] font-semibold text-slate-600 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          To Do
        </span>
      );
  }
}

export type PriorityType = "Urgent" | "High" | "Medium" | "Low";

export function PriorityBadge({ priority }: { priority: PriorityType }) {
  const configs: Record<
    PriorityType,
    { text: string; color: string; flagColor: string }
  > = {
    Urgent: {
      text: "Urgent",
      color: "text-rose-600 font-semibold",
      flagColor: "text-rose-500",
    },
    High: {
      text: "High",
      color: "text-amber-700 font-semibold",
      flagColor: "text-amber-500",
    },
    Medium: {
      text: "Medium",
      color: "text-[#14223d] font-semibold",
      flagColor: "text-[#14223d]",
    },
    Low: {
      text: "Low",
      color: "text-slate-500 font-medium",
      flagColor: "text-slate-400",
    },
  };

  const c = configs[priority] || configs.Medium;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11.5px] ${c.color}`}>
      <svg
        className={`h-3 w-3 ${c.flagColor} flex-none`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4 2v20M4 4h14l-3 6 3 6H4" />
      </svg>
      <span>{c.text}</span>
    </span>
  );
}

export function EffortBar({
  spent,
  total,
  overtime = false,
}: {
  spent: number;
  total: number;
  overtime?: boolean;
}) {
  const percentage = Math.min(Math.round((spent / total) * 100), 100);
  const isHigh = percentage >= 85 || overtime;

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[11px] font-medium text-slate-600">
        {spent}/{total}h
      </span>
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all ${
            isHigh ? "bg-amber-500" : "bg-emerald-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export interface Assignee {
  initials: string;
  name: string;
  color?: string;
  isPartner?: boolean;
}

export function AvatarStack({
  assignees,
  max = 2,
}: {
  assignees: Assignee[];
  max?: number;
}) {
  const visible = assignees.slice(0, max);
  const extra = assignees.length - max;

  const colorMap: Record<string, string> = {
    AM: "bg-[#14223d] text-white ring-white",
    PS: "bg-[#1c2e4f] text-white ring-white",
    RK: "bg-emerald-600 text-white ring-white",
    NV: "bg-slate-700 text-white ring-white",
    AS: "bg-amber-600 text-white ring-white",
  };

  return (
    <div className="flex items-center -space-x-1.5">
      {visible.map((a, i) => (
        <span
          key={i}
          title={a.name + (a.isPartner ? " (Partner)" : "")}
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[9.5px] font-bold ring-2 shadow-xs ${
            colorMap[a.initials] || "bg-slate-700 text-white ring-white"
          }`}
        >
          {a.initials}
        </span>
      ))}
      {extra > 0 && (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[9px] font-semibold text-slate-700 ring-2 ring-white">
          +{extra}
        </span>
      )}
    </div>
  );
}
