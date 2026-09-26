"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Activity,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export const StatutoryHealthDashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-3 sm:p-4 select-none overflow-y-auto space-y-4">
      {/* 1. Velocity & Critical Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Metric 1: Filing Velocity */}
        <div className="bg-white border border-slate-200 rounded-[10px] p-3.5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Statutory Filing Velocity
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[26px] font-extrabold font-mono text-slate-900">84%</span>
            <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Ahead of Deadline
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[84%]" />
          </div>
          <div className="text-[11px] text-slate-400">18 of 22 monthly returns submitted</div>
        </div>

        {/* Metric 2: Tax Audit Form 3CD Clause Progress */}
        <div className="bg-white border border-slate-200 rounded-[10px] p-3.5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Form 3CD Clause Readiness
            </span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[26px] font-extrabold font-mono text-slate-900">32 / 44</span>
            <span className="text-[10.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              72% Verified
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-[72%]" />
          </div>
          <div className="text-[11px] text-slate-400">12 clauses pending partner sign-off</div>
        </div>

        {/* Metric 3: GST ITC Mismatch Radar */}
        <div className="bg-white border border-slate-200 rounded-[10px] p-3.5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ITC Scrutiny &amp; 2B Reconciled
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[26px] font-extrabold font-mono text-slate-900">₹4.6L</span>
            <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              ₹3.2L Resolved
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full w-[70%]" />
          </div>
          <div className="text-[11px] text-slate-400">₹1.4L pending supplier e-invoicing response</div>
        </div>
      </div>

      {/* 2. Statutory Calendar & Radar Table */}
      <div className="bg-white border border-slate-200 rounded-[10px] p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-[13.5px]">Upcoming Statutory Compliance Milestones</h3>
            <p className="text-[11px] text-slate-500">Live target deadlines synchronized across CBIC, ITD, and MCA portals.</p>
          </div>
          <span className="text-[11px] font-bold text-[#db2777] bg-pink-50 border border-pink-200 px-2 py-0.5 rounded">
            September 2026 Focus
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-[12px]">
          {[
            {
              act: "GST (CBIC)",
              form: "GSTR-1 (Sales Return)",
              deadline: "11 Sep 2026",
              status: "Overdue (2 Clients)",
              tagBg: "bg-rose-50 text-rose-700 border-rose-200",
              action: "Escalate to Partner",
            },
            {
              act: "Direct Tax (ITD)",
              form: "Advance Tax Q2 (15% Installment)",
              deadline: "15 Sep 2026",
              status: "Ready for Payment",
              tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
              action: "Client Sign-off",
            },
            {
              act: "GST (CBIC)",
              form: "GSTR-3B (Tax Settlement)",
              deadline: "20 Sep 2026",
              status: "ITC Draft in Review",
              tagBg: "bg-blue-50 text-blue-700 border-blue-200",
              action: "Review Queue",
            },
            {
              act: "Income Tax (ITD)",
              form: "Tax Audit Report (Sec 44AB Form 3CD)",
              deadline: "30 Sep 2026",
              status: "Working Papers Active",
              tagBg: "bg-purple-50 text-purple-700 border-purple-200",
              action: "Audit Lead In-Charge",
            },
          ].map((item) => (
            <div key={item.form} className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-[10.5px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                  {item.act}
                </span>
                <div className="truncate">
                  <span className="font-bold text-slate-900 block truncate">{item.form}</span>
                  <span className="text-[11px] text-slate-500">Statutory Deadline: {item.deadline}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded border ${item.tagBg}`}>
                  {item.status}
                </span>
                <button
                  type="button"
                  className="text-[11px] font-bold text-[#14223d] hover:text-[#db2777] flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  <span>{item.action}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
