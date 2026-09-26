"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Clock,
  AlertTriangle,
} from "lucide-react";

export const WebsiteCalendar: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none font-sans text-[12px]">
      {/* Sub Header / Filters */}
      <div className="px-3 py-2 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-[7px] p-0.5 shadow-2xs text-[11px] font-semibold text-slate-600">
            {[
              { id: "all", label: "All Statutory (48)" },
              { id: "gst", label: "GST (22)" },
              { id: "it", label: "Income Tax (16)" },
              { id: "roc", label: "MCA/ROC (6)" },
              { id: "audit", label: "Audit Signoff (4)" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-2 py-0.5 rounded-[5px] cursor-pointer transition-colors ${
                  activeFilter === f.id
                    ? "bg-[#14223d] text-white font-bold"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-[6px]">
            September 2026
          </span>
          <div className="flex items-center border border-slate-200 rounded-[6px] bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              className="p-1 hover:bg-slate-100 text-slate-600 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-slate-100 text-slate-600 cursor-pointer border-l border-slate-200"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Month Grid */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider py-1 text-center shrink-0">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* 5 Weeks Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 divide-x divide-y divide-slate-100 border-b border-slate-200 text-[11px] min-h-[380px]">
          {/* Week 1: Aug 31 - Sep 6 */}
          <div className="p-1 bg-slate-50/40 text-slate-400">31</div>
          <div className="p-1 font-mono text-slate-700">1</div>
          <div className="p-1 font-mono text-slate-700">2</div>
          <div className="p-1 font-mono text-slate-700">3</div>
          <div className="p-1 font-mono text-slate-700">4</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">5</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">6</div>

          {/* Week 2: Sep 7 - 13 */}
          <div className="p-1 font-mono text-slate-700 bg-purple-50/20">
            <span className="font-bold">7</span>
            <div className="mt-0.5 p-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200 text-[9px] font-semibold truncate leading-tight">
              TDS Challan 281
            </div>
          </div>
          <div className="p-1 font-mono text-slate-700">8</div>
          <div className="p-1 font-mono text-slate-700">9</div>
          <div className="p-1 font-mono text-slate-700">10</div>
          <div className="p-1 font-mono text-slate-700 bg-amber-50/20">
            <span className="font-bold">11</span>
            <div className="mt-0.5 p-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[9px] font-semibold truncate leading-tight">
              GSTR-1 Return
            </div>
          </div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">12</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">13</div>

          {/* Week 3: Sep 14 - 20 */}
          <div className="p-1 font-mono text-slate-700">14</div>
          <div className="p-1 font-mono text-slate-700 bg-rose-50/20">
            <span className="font-bold text-rose-700">15</span>
            <div className="mt-0.5 p-0.5 rounded bg-rose-100 text-rose-900 border border-rose-200 text-[9px] font-bold truncate leading-tight">
              Advance Tax Q2
            </div>
          </div>
          <div className="p-1 font-mono text-slate-700">16</div>
          <div className="p-1 font-mono text-slate-700">17</div>
          <div className="p-1 font-mono text-slate-700">18</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">19</div>
          <div className="p-1 font-mono text-slate-700 bg-emerald-50/20">
            <span className="font-bold">20</span>
            <div className="mt-0.5 p-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200 text-[9px] font-semibold truncate leading-tight">
              GSTR-3B Filings
            </div>
          </div>

          {/* Week 4: Sep 21 - 27 (contains TODAY Sep 24) */}
          <div className="p-1 font-mono text-slate-700">21</div>
          <div className="p-1 font-mono text-slate-700">22</div>
          <div className="p-1 font-mono text-slate-700">23</div>
          <div className="p-1 font-mono text-slate-900 bg-rose-50/80 ring-2 ring-rose-500 rounded relative z-10 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-black text-rose-700">24</span>
              <span className="text-[8px] font-bold bg-rose-600 text-white px-1 rounded uppercase">
                Today
              </span>
            </div>
            <div className="mt-1 p-1 rounded bg-rose-600 text-white font-bold text-[9px] leading-tight shadow-2xs">
              ⚠️ 9 OVERDUE TASKS
            </div>
          </div>
          <div className="p-1 font-mono text-slate-700">25</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">26</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">27</div>

          {/* Week 5: Sep 28 - Oct 4 (contains Sec 44AB Sep 30) */}
          <div className="p-1 font-mono text-slate-700">28</div>
          <div className="p-1 font-mono text-slate-700">29</div>
          <div className="p-1 font-mono text-slate-900 bg-rose-50/50">
            <span className="font-black text-rose-700">30</span>
            <div className="mt-0.5 p-0.5 rounded bg-[#b91c1c] text-white text-[8.5px] font-black truncate leading-tight shadow-2xs">
              SEC 44AB TAX AUDIT
            </div>
          </div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/40">1 Oct</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/40">2 Oct</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">3 Oct</div>
          <div className="p-1 font-mono text-slate-400 bg-slate-50/30">4 Oct</div>
        </div>
      </div>
    </div>
  );
};
