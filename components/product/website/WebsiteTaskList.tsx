"use client";

import React, { useState } from "react";
import {
  Lock,
  Clock,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Flag,
  Sparkles,
} from "lucide-react";

export interface TaskItemData {
  id: string;
  name: string;
  service: string;
  serviceColor: string;
  status: "OVERDUE" | "IN PROGRESS" | "TODO" | "FILED";
  effortLogged: number;
  effortTotal: number;
  assigneeInitials: string;
  assigneeBg: string;
  priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW";
  dueDate: string;
  isConfidential?: boolean;
}

const OSWAL_TASKS_OVERDUE: TaskItemData[] = [
  {
    id: "osw-1",
    name: "GSTR-1 sales ledger scrutiny & e-invoice cross-check",
    service: "GST",
    serviceColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    status: "OVERDUE",
    effortLogged: 2,
    effortTotal: 4,
    assigneeInitials: "NJ",
    assigneeBg: "bg-[#6366f1] text-white",
    priority: "HIGH",
    dueDate: "24 Sep (Today)",
    isConfidential: true,
  },
  {
    id: "osw-2",
    name: "Advance Tax computation & Challan 280 generation (Q2)",
    service: "TAX",
    serviceColor: "bg-amber-50 text-amber-700 border-amber-200",
    status: "OVERDUE",
    effortLogged: 1,
    effortTotal: 3,
    assigneeInitials: "PA",
    assigneeBg: "bg-pink-600 text-white",
    priority: "URGENT",
    dueDate: "24 Sep (Today)",
  },
  {
    id: "osw-4",
    name: "Statutory Audit: Fixed assets register verification & physical inspection",
    service: "AUDIT",
    serviceColor: "bg-blue-50 text-blue-700 border-blue-200",
    status: "OVERDUE",
    effortLogged: 3,
    effortTotal: 8,
    assigneeInitials: "NJ",
    assigneeBg: "bg-[#6366f1] text-white",
    priority: "URGENT",
    dueDate: "24 Sep (Today)",
    isConfidential: true,
  },
];

const OSWAL_TASKS_THIS_WEEK: TaskItemData[] = [
  {
    id: "osw-w1",
    name: "GSTR-3B monthly return validation with ITC reconciliation",
    service: "GST",
    serviceColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    status: "IN PROGRESS",
    effortLogged: 2,
    effortTotal: 5,
    assigneeInitials: "NJ",
    assigneeBg: "bg-[#6366f1] text-white",
    priority: "HIGH",
    dueDate: "28 Sep",
  },
];

const SHREEJI_TASKS_OVERDUE: TaskItemData[] = [
  {
    id: "shr-1",
    name: "Tax Audit Form 3CD Clause 44 expenditure breakdown & validation",
    service: "AUDIT",
    serviceColor: "bg-blue-50 text-blue-700 border-blue-200",
    status: "OVERDUE",
    effortLogged: 4,
    effortTotal: 6,
    assigneeInitials: "NJ",
    assigneeBg: "bg-[#6366f1] text-white",
    priority: "URGENT",
    dueDate: "24 Sep (Today)",
    isConfidential: true,
  },
  {
    id: "shr-2",
    name: "TDS return verification Form 26Q (Q2) with challan ITNS 281",
    service: "TAX",
    serviceColor: "bg-amber-50 text-amber-700 border-amber-200",
    status: "OVERDUE",
    effortLogged: 2,
    effortTotal: 3,
    assigneeInitials: "PA",
    assigneeBg: "bg-pink-600 text-white",
    priority: "HIGH",
    dueDate: "24 Sep (Today)",
  },
  {
    id: "shr-3",
    name: "GSTR-1 return filing reconciliation with E-Way bills & sub-contractors",
    service: "GST",
    serviceColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    status: "OVERDUE",
    effortLogged: 3,
    effortTotal: 5,
    assigneeInitials: "AS",
    assigneeBg: "bg-teal-600 text-white",
    priority: "HIGH",
    dueDate: "24 Sep (Today)",
  },
];

const SHREEJI_TASKS_THIS_WEEK: TaskItemData[] = [
  {
    id: "shr-w1",
    name: "GSTR-3B monthly liability discharge with DRC-03 cash ledger adjustments",
    service: "GST",
    serviceColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    status: "IN PROGRESS",
    effortLogged: 1,
    effortTotal: 4,
    assigneeInitials: "NJ",
    assigneeBg: "bg-[#6366f1] text-white",
    priority: "HIGH",
    dueDate: "28 Sep",
  },
  {
    id: "shr-w2",
    name: "Work-in-progress (WIP) revenue recognition compliance AS-7/Ind AS 115",
    service: "AUDIT",
    serviceColor: "bg-blue-50 text-blue-700 border-blue-200",
    status: "TODO",
    effortLogged: 1,
    effortTotal: 5,
    assigneeInitials: "RM",
    assigneeBg: "bg-slate-600 text-white",
    priority: "MEDIUM",
    dueDate: "30 Sep",
  },
];

interface WebsiteTaskListProps {
  clientId?: "oswal" | "shreeji";
}

export const WebsiteTaskList: React.FC<WebsiteTaskListProps> = ({
  clientId = "oswal",
}) => {
  const isOswal = clientId === "oswal";
  const overdueList = isOswal ? OSWAL_TASKS_OVERDUE : SHREEJI_TASKS_OVERDUE;
  const thisWeekList = isOswal ? OSWAL_TASKS_THIS_WEEK : SHREEJI_TASKS_THIS_WEEK;

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none font-sans text-[12px]">
      {/* Table Header Row */}
      <div className="grid grid-cols-[32px_minmax(180px,1fr)_105px_80px_75px_85px_100px] items-center px-3 py-2 border-b border-slate-200 bg-white text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 cursor-pointer"
            readOnly
          />
        </div>
        <div>NAME</div>
        <div>STATUS</div>
        <div>EFFORT</div>
        <div>ASSIGNEE</div>
        <div>PRIORITY</div>
        <div>DUE</div>
      </div>

      {/* Table Content Stream */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {/* GROUP 1: OVERDUE */}
        <div className="p-2 pb-0">
          <div className="flex items-center gap-2 mb-1.5 px-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[7px] bg-[#e11d48] text-white font-extrabold text-[11.5px] shadow-2xs">
              <span className="text-[10px]">▲</span>
              <span>OVERDUE (PAST STATUTORY TARGET)</span>
            </span>
            <span className="text-[12px] font-bold text-slate-600 font-mono">
              {isOswal ? "9" : "3"}
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-[8px] overflow-hidden mb-4">
            {overdueList.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[32px_minmax(180px,1fr)_105px_80px_75px_85px_100px] items-center px-3 py-2.5 bg-white hover:bg-slate-50/80 transition-colors group"
              >
                {/* Checkbox */}
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={Boolean(checkedIds[task.id])}
                    onChange={() => toggleCheck(task.id)}
                    className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 cursor-pointer"
                  />
                </div>

                {/* Name + Service Chip + Confidential Icon */}
                <div className="flex items-center gap-2 pr-2 min-w-0">
                  {task.isConfidential && (
                    <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  )}
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 font-mono ${task.serviceColor}`}
                  >
                    {task.service}
                  </span>
                  <span
                    className={`font-semibold text-slate-800 text-[12.5px] truncate group-hover:text-blue-700 transition-colors ${
                      checkedIds[task.id] ? "line-through text-slate-400" : ""
                    }`}
                  >
                    {task.name}
                  </span>
                </div>

                {/* Status Badge */}
                <div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10.5px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span>OVERDUE</span>
                  </span>
                </div>

                {/* Effort with Progress Bar */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-slate-600">
                    {task.effortLogged}/{task.effortTotal}h
                  </span>
                  <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${Math.round(
                          (task.effortLogged / task.effortTotal) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Assignee */}
                <div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10.5px] shadow-2xs ${task.assigneeBg}`}
                  >
                    {task.assigneeInitials}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  {task.priority === "URGENT" ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase font-mono">
                      <Flag className="w-2.5 h-2.5 fill-rose-500 text-rose-600" />
                      <span>URGENT</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase font-mono">
                      <Flag className="w-2.5 h-2.5 fill-amber-500 text-amber-600" />
                      <span>HIGH</span>
                    </span>
                  )}
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-1.5 text-rose-600 font-bold text-[11.5px] font-mono">
                  <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GROUP 2: DUE THIS WEEK */}
        <div className="p-2 pt-0">
          <div className="flex items-center gap-2 mb-1.5 px-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[7px] bg-[#1e293b] text-white font-extrabold text-[11.5px] shadow-2xs">
              <span className="text-[10px]">▼</span>
              <span>DUE THIS WEEK</span>
            </span>
            <span className="text-[12px] font-bold text-slate-600 font-mono">2</span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-[8px] overflow-hidden">
            {thisWeekList.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[32px_minmax(180px,1fr)_105px_80px_75px_85px_100px] items-center px-3 py-2.5 bg-white hover:bg-slate-50/80 transition-colors group"
              >
                {/* Checkbox */}
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={Boolean(checkedIds[task.id])}
                    onChange={() => toggleCheck(task.id)}
                    className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 cursor-pointer"
                  />
                </div>

                {/* Name + Service Chip */}
                <div className="flex items-center gap-2 pr-2 min-w-0">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 font-mono ${task.serviceColor}`}
                  >
                    {task.service}
                  </span>
                  <span
                    className={`font-semibold text-slate-800 text-[12.5px] truncate group-hover:text-blue-700 transition-colors ${
                      checkedIds[task.id] ? "line-through text-slate-400" : ""
                    }`}
                  >
                    {task.name}
                  </span>
                </div>

                {/* Status Badge */}
                <div>
                  {task.status === "IN PROGRESS" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10.5px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>IN PROGRESS</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10.5px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>TODO</span>
                    </span>
                  )}
                </div>

                {/* Effort */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-slate-600">
                    {task.effortLogged}/{task.effortTotal}h
                  </span>
                  <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${Math.round(
                          (task.effortLogged / task.effortTotal) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Assignee */}
                <div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10.5px] shadow-2xs ${task.assigneeBg}`}
                  >
                    {task.assigneeInitials}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  {task.priority === "HIGH" ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase font-mono">
                      <Flag className="w-2.5 h-2.5 fill-amber-500 text-amber-600" />
                      <span>HIGH</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase font-mono">
                      <Flag className="w-2.5 h-2.5 text-blue-600" />
                      <span>MEDIUM</span>
                    </span>
                  )}
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-[11.5px] font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
