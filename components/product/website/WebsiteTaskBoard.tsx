"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Flame,
  CheckCircle2,
  Calendar,
  Clock,
  FileText,
  Plus,
  MoreHorizontal,
  Timer,
  Flag,
} from "lucide-react";

interface BoardCard {
  id: string;
  client: string;
  service: string;
  serviceColor: string;
  priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW";
  title: string;
  assignees: { initials: string; bg: string }[];
  dueDate: string;
  isOverdue?: boolean;
  docsReceived?: number;
  docsRequired?: number;
  loggedHours: number;
}

const CARDS_OVERDUE: BoardCard[] = [
  {
    id: "b-1",
    client: "Oswal",
    service: "GST",
    serviceColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    priority: "HIGH",
    title: "GSTR-1 sales ledger scrutiny & e-invoice cross-check",
    assignees: [{ initials: "NJ", bg: "bg-[#6366f1] text-white" }],
    dueDate: "24 Sep",
    isOverdue: true,
    docsReceived: 5,
    docsRequired: 5,
    loggedHours: 2,
  },
  {
    id: "b-2",
    client: "Oswal",
    service: "TAX",
    serviceColor: "bg-amber-50 text-amber-700 border-amber-200",
    priority: "URGENT",
    title: "Advance Tax computation & Challan 280 generation (Q2)",
    assignees: [{ initials: "PA", bg: "bg-pink-600 text-white" }],
    dueDate: "24 Sep",
    isOverdue: true,
    docsReceived: 3,
    docsRequired: 4,
    loggedHours: 1,
  },
  {
    id: "b-3",
    client: "Oswal",
    service: "PAYROLL",
    serviceColor: "bg-sky-50 text-sky-700 border-sky-200",
    priority: "HIGH",
    title: "PF & ESIC monthly challan return filing & ECR upload",
    assignees: [{ initials: "AS", bg: "bg-teal-600 text-white" }],
    dueDate: "24 Sep",
    isOverdue: true,
    docsReceived: 2,
    docsRequired: 3,
    loggedHours: 1,
  },
];

const CARDS_THIS_WEEK: BoardCard[] = [
  {
    id: "b-4",
    client: "Oswal",
    service: "GST",
    serviceColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    priority: "HIGH",
    title: "GSTR-3B monthly return validation with ITC reconciliation",
    assignees: [{ initials: "NJ", bg: "bg-[#6366f1] text-white" }],
    dueDate: "28 Sep",
    docsReceived: 4,
    docsRequired: 4,
    loggedHours: 2,
  },
  {
    id: "b-5",
    client: "Oswal",
    service: "ACCOUNTING",
    serviceColor: "bg-purple-50 text-purple-700 border-purple-200",
    priority: "MEDIUM",
    title: "Monthly balance sheet & P&L scrutiny for bank renewal",
    assignees: [{ initials: "RM", bg: "bg-slate-600 text-white" }],
    dueDate: "30 Sep",
    docsReceived: 1,
    docsRequired: 3,
    loggedHours: 0,
  },
];

const CARDS_LATER: BoardCard[] = [
  {
    id: "b-6",
    client: "Oswal",
    service: "ROC",
    serviceColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    priority: "LOW",
    title: "Quarterly Secretarial Compliance (MCA/ROC Form MGT-7)",
    assignees: [{ initials: "NJ", bg: "bg-[#6366f1] text-white" }],
    dueDate: "15 Oct",
    docsReceived: 6,
    docsRequired: 6,
    loggedHours: 4,
  },
  {
    id: "b-7",
    client: "Oswal",
    service: "AUDIT",
    serviceColor: "bg-blue-50 text-blue-700 border-blue-200",
    priority: "MEDIUM",
    title: "Half-yearly Internal Audit review & management letter",
    assignees: [{ initials: "PA", bg: "bg-pink-600 text-white" }],
    dueDate: "31 Oct",
    docsReceived: 8,
    docsRequired: 10,
    loggedHours: 3,
  },
];

export const WebsiteTaskBoard: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none font-sans text-[12px]">
      {/* Board Columns Grid */}
      <div className="flex-1 p-3 flex gap-3 overflow-x-auto min-h-0 bg-slate-50/50">
        {/* COLUMN 1: Overdue & Due Today */}
        <div className="w-[280px] min-w-[280px] bg-slate-50/80 border border-rose-200/80 rounded-[12px] flex flex-col shrink-0 shadow-2xs">
          <div className="p-2.5 rounded-t-[11px] bg-rose-50/90 border-b border-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[12.5px] font-extrabold text-rose-950 font-heading">
                Overdue &amp; Due Today
              </span>
              <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                9
              </span>
            </div>
            <button
              type="button"
              className="w-5 h-5 rounded hover:bg-rose-200/60 flex items-center justify-center text-rose-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {CARDS_OVERDUE.map((card) => renderCard(card, "border-l-rose-500"))}
          </div>
        </div>

        {/* COLUMN 2: Due This Week */}
        <div className="w-[280px] min-w-[280px] bg-slate-50/80 border border-amber-200/80 rounded-[12px] flex flex-col shrink-0 shadow-2xs">
          <div className="p-2.5 rounded-t-[11px] bg-amber-50/90 border-b border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[12.5px] font-extrabold text-amber-950 font-heading">
                Due This Week (7 Days)
              </span>
              <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                2
              </span>
            </div>
            <button
              type="button"
              className="w-5 h-5 rounded hover:bg-amber-200/60 flex items-center justify-center text-amber-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {CARDS_THIS_WEEK.map((card) => renderCard(card, "border-l-amber-500"))}
          </div>
        </div>

        {/* COLUMN 3: Due Next Week (Empty State) */}
        <div className="w-[280px] min-w-[280px] bg-slate-50/80 border border-blue-200/80 rounded-[12px] flex flex-col shrink-0 shadow-2xs">
          <div className="p-2.5 rounded-t-[11px] bg-blue-50/90 border-b border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[12.5px] font-extrabold text-blue-950 font-heading">
                Due Next Week
              </span>
              <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                0
              </span>
            </div>
            <button
              type="button"
              className="w-5 h-5 rounded hover:bg-blue-200/60 flex items-center justify-center text-blue-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 p-3 flex flex-col items-center justify-center">
            <div className="w-full h-36 rounded-[10px] border-2 border-dashed border-slate-200 bg-white/60 flex flex-col items-center justify-center gap-1.5 text-slate-400">
              <CheckCircle2 className="w-6 h-6 text-slate-300" />
              <span className="text-[11.5px] font-medium">No tasks due next week</span>
              <span className="text-[10px] text-slate-400">All filings clear</span>
            </div>
          </div>
        </div>

        {/* COLUMN 4: Later & Filed */}
        <div className="w-[280px] min-w-[280px] bg-slate-50/80 border border-emerald-200/80 rounded-[12px] flex flex-col shrink-0 shadow-2xs">
          <div className="p-2.5 rounded-t-[11px] bg-emerald-50/90 border-b border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[12.5px] font-extrabold text-emerald-950 font-heading">
                Later &amp; Filed
              </span>
              <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                3
              </span>
            </div>
            <button
              type="button"
              className="w-5 h-5 rounded hover:bg-emerald-200/60 flex items-center justify-center text-emerald-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {CARDS_LATER.map((card) => renderCard(card, "border-l-emerald-500"))}
          </div>
        </div>
      </div>
    </div>
  );

  function renderCard(card: BoardCard, borderLeftColor: string) {
    return (
      <div
        key={card.id}
        className={`bg-white border border-slate-200/90 rounded-[9px] p-2.5 shadow-2xs flex flex-col gap-2 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer border-l-[3.5px] ${borderLeftColor}`}
      >
        {/* Top: Client + Service + Priority Tag */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-semibold font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {card.client}
            </span>
            <span
              className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border uppercase font-mono ${card.serviceColor}`}
            >
              {card.service}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {card.priority === "URGENT" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[9px] font-bold uppercase font-mono">
                <Flag className="w-2 h-2 fill-rose-500 text-rose-600" />
                <span>URGENT</span>
              </span>
            )}
            {card.priority === "HIGH" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold uppercase font-mono">
                <Flag className="w-2 h-2 fill-amber-500 text-amber-600" />
                <span>HIGH</span>
              </span>
            )}
            {card.priority === "MEDIUM" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-bold uppercase font-mono">
                <Flag className="w-2 h-2 text-blue-600" />
                <span>MED</span>
              </span>
            )}
            {card.priority === "LOW" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-slate-50 text-slate-600 border border-slate-200 text-[9px] font-bold uppercase font-mono">
                <span>LOW</span>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-[12px] font-bold text-slate-800 leading-snug line-clamp-2 hover:text-blue-700 transition-colors">
          {card.title}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10.5px]">
          <div className="flex items-center gap-1.5">
            {card.assignees.map((a, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9.5px] shadow-2xs ${a.bg}`}
              >
                {a.initials}
              </div>
            ))}
            <span
              className={`inline-flex items-center gap-1 font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                card.isOverdue
                  ? "bg-rose-50 text-rose-700 border-rose-200 font-bold"
                  : "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              <Clock className="w-2.5 h-2.5" />
              <span>{card.dueDate}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 font-mono">
            {card.docsRequired && (
              <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-1 py-0.5 rounded text-[9.5px]">
                <FileText className="w-2.5 h-2.5 text-slate-400" />
                <span>
                  {card.docsReceived}/{card.docsRequired}
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-1 py-0.5 rounded text-[9.5px]">
              <Timer className="w-2.5 h-2.5 text-slate-400" />
              <span>{card.loggedHours}h</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
};
