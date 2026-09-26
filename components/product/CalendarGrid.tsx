"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export const CalendarGrid: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(11);

  // Month days with deadlines
  const eventsByDay: Record<number, { title: string; act: string; urgent?: boolean }[]> = {
    7: [{ title: "TDS / TCS Deposit Challan (ITNS 281)", act: "Income Tax", urgent: false }],
    11: [
      { title: "GSTR-1 Monthly Return Filing (Aug 2026)", act: "GST (CBIC)", urgent: true },
      { title: "E-Way Bill Ledger Match · Oswal Exports", act: "GST Compliance", urgent: true },
    ],
    15: [
      { title: "Advance Tax Q2 (15% Corporate Installment)", act: "Direct Tax", urgent: false },
      { title: "PF & ESIC Monthly Remittance ECR", act: "Labour Law", urgent: false },
    ],
    20: [
      { title: "GSTR-3B Monthly Return & ITC Settlement", act: "GST (CBIC)", urgent: true },
    ],
    30: [
      { title: "Tax Audit Report u/s 44AB (Form 3CD)", act: "Direct Tax", urgent: true },
      { title: "DIR-3 KYC Filing for Company Directors", act: "MCA / ROC", urgent: false },
    ],
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-white select-none p-3 sm:p-4 text-[12px]">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#14223d]" />
          <span className="font-extrabold text-[14px] text-slate-900">September 2026</span>
          <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            Statutory Compliance Radar
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button type="button" className="p-1 rounded hover:bg-slate-100 text-slate-600 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold text-slate-700">Today: 11 Sep</span>
          <button type="button" className="p-1 rounded hover:bg-slate-100 text-slate-600 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 py-3 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
            {d}
          </span>
        ))}

        {/* Calendar Day Boxes */}
        {daysInMonth.map((day) => {
          const events = eventsByDay[day] || [];
          const isToday = day === 11;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`min-h-[58px] p-1.5 rounded-[8px] border text-left flex flex-col justify-between transition-all cursor-pointer ${
                isSelected
                  ? "border-[#db2777] bg-pink-50/50 shadow-2xs ring-1 ring-[#db2777]"
                  : isToday
                  ? "border-rose-400 bg-rose-50/30"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono font-bold text-[11px] ${
                    isToday ? "text-rose-600" : "text-slate-800"
                  }`}
                >
                  {day}
                </span>
                {events.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                )}
              </div>

              {events.length > 0 ? (
                <div className="space-y-0.5 mt-1">
                  <div
                    className={`text-[9px] font-bold truncate rounded px-1 py-0.2 ${
                      events[0].urgent
                        ? "bg-rose-100 text-rose-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {events[0].title}
                  </div>
                </div>
              ) : (
                <div className="h-3" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Event Drawer */}
      <div className="mt-auto pt-3 border-t border-slate-200 bg-slate-50/70 p-3 rounded-[8px]">
        <div className="flex items-center justify-between pb-1.5">
          <span className="font-bold text-slate-900 text-[12px]">
            Selected: {selectedDay} September 2026 Filings
          </span>
          <span className="text-[10.5px] font-mono font-bold text-slate-500">
            {(eventsByDay[selectedDay] || []).length} Deliverables Due
          </span>
        </div>

        {(eventsByDay[selectedDay] || []).length > 0 ? (
          <div className="space-y-1.5">
            {(eventsByDay[selectedDay] || []).map((ev, i) => (
              <div
                key={i}
                className="bg-white p-2 rounded-[6px] border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span className="font-bold text-slate-900">{ev.title}</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded text-slate-600">
                  {ev.act}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-400 italic text-[11.5px] py-1">
            No statutory filings scheduled for this date.
          </div>
        )}
      </div>
    </div>
  );
};
