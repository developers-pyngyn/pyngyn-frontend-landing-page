'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

export interface CalendarViewProps {
  gstFilingComplete?: boolean;
  className?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  gstFilingComplete = false,
  className = '',
}) => {
  const days = [
    { num: 14, label: 'Mon', items: [] },
    {
      num: 15,
      label: 'Tue',
      items: [
        {
          title: 'Advance Tax Q2 Installment',
          client: 'Bharat Mfg',
          tone: 'blue',
          tag: 'Direct Tax',
          isLiveTarget: false,
        },
      ],
    },
    { num: 16, label: 'Wed', items: [] },
    { num: 17, label: 'Thu', items: [] },
    { num: 18, label: 'Fri', items: [] },
    { num: 19, label: 'Sat', items: [] },
    {
      num: 20,
      label: 'Sun',
      items: [
        {
          title: 'GSTR-3B Monthly Return',
          client: 'Oswal Exports',
          tone: gstFilingComplete ? 'emerald' : 'amber',
          tag: gstFilingComplete ? 'Filed' : 'Due Today',
          isLiveTarget: true,
        },
      ],
    },
  ];

  return (
    <div className={`w-full h-full flex flex-col bg-white overflow-hidden select-none font-sans ${className}`}>
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-2.5 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#004AAD] text-white shadow-2xs">
            <CalendarIcon size={15} />
          </div>
          <div>
            <h1 className="text-[14px] font-bold text-slate-900 leading-tight">
              Statutory Compliance Calendar
            </h1>
            <p className="text-[10px] text-slate-400 leading-tight">
              September 2026 · Practice Filing Deadlines
            </p>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50 rounded-lg p-0.5 text-[11px] font-bold text-slate-700">
          <button type="button" className="p-1 rounded hover:bg-white text-slate-500">
            <ChevronLeft size={12} />
          </button>
          <span className="px-2">September 2026</span>
          <button type="button" className="p-1 rounded hover:bg-white text-slate-500">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* 2. Days Strip */}
      <div className="flex-1 p-3.5 flex flex-col gap-2 overflow-hidden bg-slate-50/40">
        <div className="grid grid-cols-7 gap-2 h-full">
          {days.map((day) => {
            const hasItems = day.items.length > 0;
            const isTarget = day.items.some((i) => i.isLiveTarget);

            return (
              <div
                key={day.num}
                className={`rounded-xl border flex flex-col p-2 transition-all ${
                  isTarget
                    ? gstFilingComplete
                      ? 'border-emerald-300 bg-emerald-50/50 shadow-sm'
                      : 'border-amber-300 bg-amber-50/50 shadow-sm'
                    : hasItems
                    ? 'border-slate-200/90 bg-white shadow-3xs'
                    : 'border-slate-200/60 bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold">{day.label}</span>
                  <span
                    className={`text-[12px] font-bold ${
                      isTarget ? (gstFilingComplete ? 'text-emerald-700' : 'text-amber-700') : 'text-slate-800'
                    }`}
                  >
                    {day.num}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-col gap-1.5 flex-1 overflow-hidden">
                  {day.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      animate={item.isLiveTarget && gstFilingComplete ? { scale: [1, 1.05, 1] } : {}}
                      className={`p-1.5 rounded-lg border text-[10px] leading-tight flex flex-col gap-0.5 ${
                        item.tone === 'emerald'
                          ? 'border-emerald-200 bg-emerald-100/70 text-emerald-900'
                          : item.tone === 'amber'
                          ? 'border-amber-200 bg-amber-100/70 text-amber-900'
                          : 'border-blue-200 bg-blue-100/70 text-blue-900'
                      }`}
                    >
                      <span className="font-bold truncate">{item.title}</span>
                      <span className="text-[9px] opacity-80 truncate">{item.client}</span>
                      <span
                        className={`text-[8.5px] font-bold px-1 py-0.2 rounded mt-0.5 inline-flex items-center gap-0.5 w-fit ${
                          item.tone === 'emerald'
                            ? 'bg-emerald-200/80 text-emerald-900'
                            : item.tone === 'amber'
                            ? 'bg-amber-200/80 text-amber-900'
                            : 'bg-blue-200/80 text-blue-900'
                        }`}
                      >
                        {item.tone === 'emerald' && <CheckCircle2 size={8.5} className="text-emerald-800" />}
                        {item.tag}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
