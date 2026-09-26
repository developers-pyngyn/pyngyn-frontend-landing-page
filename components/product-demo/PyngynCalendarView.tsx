'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PyngynAppRail } from './PyngynAppRail';
import { PyngynGlobalHeader } from './PyngynGlobalHeader';
import { PyngynBottomTimer } from './PyngynBottomTimer';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynCalendarViewProps {
  className?: string;
  activeTarget?: string;
  showInsideCockpit?: boolean;
  gstr3bStatus?: 'due' | 'filed';
  autoPlay?: boolean;
  animStep?: number;
}

export const PyngynCalendarView: React.FC<PyngynCalendarViewProps> = ({
  className = '',
  activeTarget,
  showInsideCockpit = false,
  gstr3bStatus,
  autoPlay = true,
  animStep,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [viewShape, setViewShape] = useState<'month' | 'week' | 'day' | 'timeline'>('month');
  const [activeCalendarFilter, setActiveCalendarFilter] = useState<'all' | 'client' | 'internal'>('all');

  // AUTOMATED REALISTIC & SUBTLE WORKFLOW ANIMATION:
  // Phase 0: Baseline state (Day 20 GSTR-3B due, Day 23 TODAY standard, matching screenshot)
  // Phase 1: Subtle deadline emphasis (Day 20 GSTR-3B cluster becomes active with glowing focus ring)
  // Phase 2: Task status updates (GSTR-3B Filing transitions to GSTR-3B Filed ✓ in emerald/teal)
  // Phase 3: Calendar event highlight moves naturally to Day 23 TODAY, interior cost task verified
  // Phase 4: Hold clean optimal state before smooth continuous loop reset
  const [internalStep, setInternalStep] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion || animStep !== undefined) return;

    const timings = [
      3200, // 0: Baseline state
      2800, // 1: Day 20 deadline active emphasis
      3200, // 2: Day 20 status updates to Filed
      2800, // 3: Highlight moves to Day 23 Today
      2200, // 4: Hold state
    ];

    const timer = setTimeout(() => {
      setInternalStep((prev) => ((prev + 1) % timings.length) as any);
    }, timings[internalStep] || 2800);

    return () => clearTimeout(timer);
  }, [internalStep, autoPlay, shouldReduceMotion, animStep]);

  const effectiveStep = animStep !== undefined ? animStep : internalStep;

  // Determine dynamic filing status on Day 20
  const isGstr3bFiled = gstr3bStatus !== undefined
    ? gstr3bStatus === 'filed'
    : effectiveStep >= 2;

  // Determine which cell has active highlight
  const isDay20Active = activeTarget === 'calendar-gstr3b' || effectiveStep === 1 || effectiveStep === 2;
  const isDay23Active = activeTarget === 'calendar-today' || effectiveStep === 3;
  const isDay15Active = activeTarget === 'calendar-adv-tax';

  return (
    <div
      data-product-target="calendar-screen"
      className={`w-full h-full min-h-0 bg-white flex flex-col font-sans select-none overflow-hidden ${className}`}
    >
      {/* 1. Global Header */}
      <PyngynGlobalHeader />

      {/* 2. Main Body: Rail + Sidebar + Calendar Grid */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <PyngynAppRail activeItem={showInsideCockpit ? 'cockpit' : 'calendar'} />

        {/* Left Sidebar */}
        <aside
          data-product-target="calendar-sidebar"
          className="w-[230px] shrink-0 bg-[#F8FAFC] border-r border-[#E5EAF2] flex flex-col text-[12px] text-[#113353] select-none overflow-y-auto"
        >
          {showInsideCockpit ? (
            <>
              {/* Cockpit Sidebar */}
              <div className="p-3.5 border-b border-[#E5EAF2] flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FF] text-[#004AAD] flex items-center justify-center shrink-0">
                  <PyngynIcons.shield size={15} />
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-[13px] text-[#113353] block truncate">
                    Cockpit
                  </span>
                  <span className="text-[10.5px] text-[#627D98] truncate block">
                    Compliance, governance & oversight
                  </span>
                </div>
              </div>

              <div className="px-3 py-3 space-y-1">
                <div className="text-[10.5px] font-bold text-[#627D98] uppercase tracking-wider mb-1.5 px-1">
                  Cockpit
                </div>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[7px] text-left font-bold text-[12px] bg-[#EBF3FF] text-[#004AAD] transition-colors"
                >
                  <PyngynIcons.shield size={13} className="text-[#004AAD]" />
                  <span>Compliance</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-left text-[#486581] hover:bg-[#EEF5FF] text-[12px] font-medium transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <PyngynIcons.alertTriangle size={13} className="text-[#829AB1]" />
                    <span className="truncate">Notices & Scrutiny</span>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono font-bold flex items-center justify-center">
                    5
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Statutory Calendar Sidebar */}
              <div className="p-3.5 border-b border-[#E5EAF2] flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FF] text-[#004AAD] flex items-center justify-center shrink-0">
                  <PyngynIcons.calendar size={15} />
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-[13px] text-[#113353] block truncate">
                    Calendar
                  </span>
                  <span className="text-[10.5px] text-[#627D98] truncate block">
                    Statutory deadlines & schedules
                  </span>
                </div>
              </div>

              {/* Calendars Group */}
              <div className="px-3 pt-3 pb-2">
                <div className="text-[10.5px] font-bold text-[#627D98] uppercase tracking-wider mb-1.5 px-1">
                  Calendars
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveCalendarFilter('all')}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-left text-[12px] font-bold transition-colors ${
                      activeCalendarFilter === 'all'
                        ? 'bg-[#EBF3FF] text-[#004AAD]'
                        : 'text-[#334E68] hover:bg-[#EEF5FF]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PyngynIcons.calendar size={13} className="text-[#004AAD]" />
                      <span>All Events</span>
                    </div>
                    <span className="font-mono text-[10.5px] text-[#004AAD] font-bold">48</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCalendarFilter('client')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-left text-[#486581] hover:bg-[#EEF5FF] text-[12px] font-medium transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <PyngynIcons.briefcase size={13} className="text-[#829AB1]" />
                      <span>Client Work</span>
                    </div>
                    <span className="font-mono text-[10.5px] text-[#829AB1] font-bold">32</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCalendarFilter('internal')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-left text-[#486581] hover:bg-[#EEF5FF] text-[12px] font-medium transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <PyngynIcons.fileText size={13} className="text-[#829AB1]" />
                      <span>Internal Work</span>
                    </div>
                    <span className="font-mono text-[10.5px] text-[#829AB1] font-bold">16</span>
                  </button>
                </div>
              </div>

              {/* Tax & Laws Group */}
              <div className="px-3 py-2 border-t border-[#E5EAF2]/60">
                <div className="flex items-center justify-between text-[10.5px] font-bold text-[#627D98] uppercase tracking-wider mb-1.5 px-1">
                  <span>Tax & Laws</span>
                  <span className="font-mono text-[10px]">32</span>
                </div>
                <div className="space-y-0.5">
                  {[
                    { name: 'All Taxes', count: 32 },
                    { name: 'GST', count: 14 },
                    { name: 'Income Tax', count: 8 },
                    { name: 'Company ROC', count: 5 },
                    { name: 'PF & ESI', count: 5 },
                  ].map((tax, i) => (
                    <button
                      key={i}
                      type="button"
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-left text-[#486581] hover:bg-[#EEF5FF] text-[12px] font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <PyngynIcons.bookmark size={12} className="text-[#829AB1]" />
                        <span className="truncate">{tax.name}</span>
                      </div>
                      <span className="text-[10.5px] font-mono text-[#829AB1] font-bold">
                        {tax.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </aside>

        {/* Calendar Main Grid Console — Zero Internal Scrolling */}
        <main className="flex-1 bg-[#F8FAFC] flex flex-col min-w-0 overflow-hidden">
          {/* If inside Cockpit, show Cockpit Header & Navigation Tabs first */}
          {showInsideCockpit && (
            <div className="bg-white border-b border-[#E5EAF2]">
              <div className="px-6 py-2.5 border-b border-[#E5EAF2]/80 flex items-center justify-between flex-wrap gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#627D98]">
                    <span>Cockpit</span>
                    <span>/</span>
                    <span className="text-[#113353]">Compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PyngynIcons.shield size={16} className="text-[#004AAD]" />
                    <h1 className="text-[17px] font-extrabold text-[#113353] tracking-tight flex items-center gap-1.5">
                      <span>Compliance Hub</span>
                      <PyngynIcons.chevronDown size={14} className="text-[#627D98]" />
                      <PyngynIcons.star size={13} className="text-[#829AB1]" />
                    </h1>
                  </div>
                </div>
              </div>

              {/* Cockpit Tabs Underline */}
              <div className="px-6 flex items-center gap-6 text-[12.5px] font-medium">
                <button
                  type="button"
                  className="py-2 border-b-2 border-[#004AAD] text-[#004AAD] font-bold flex items-center gap-2"
                >
                  <PyngynIcons.calendar size={14} />
                  <span>Statutory Calendar</span>
                </button>
                <button
                  type="button"
                  className="py-2 border-b-2 border-transparent text-[#627D98] hover:text-[#113353] flex items-center gap-2"
                >
                  <PyngynIcons.chart size={14} />
                  <span>Returns Tracker</span>
                </button>
                <button
                  type="button"
                  className="py-2 border-b-2 border-transparent text-[#627D98] hover:text-[#113353] flex items-center gap-1"
                >
                  <span>More</span>
                  <PyngynIcons.chevronDown size={12} />
                </button>
                <button
                  type="button"
                  className="py-2 border-b-2 border-transparent text-[#004AAD] hover:text-[#003A8C] font-semibold flex items-center gap-1"
                >
                  <PyngynIcons.plus size={12} />
                  <span>View</span>
                </button>
              </div>
            </div>
          )}

          {/* Calendar Control Bar */}
          <div className="px-4 py-2 bg-white border-b border-[#E5EAF2] flex items-center justify-between flex-wrap gap-2">
            {/* Left: Stepper + Month Title + View Mode */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center bg-[#F1F5F9] border border-[#CBD5E1] rounded-[7px] p-0.5">
                <button type="button" className="p-1 hover:bg-white rounded text-[#627D98]">
                  <PyngynIcons.chevronLeft size={13} />
                </button>
                <button
                  type="button"
                  className="px-2 py-0.5 text-[11px] font-bold text-[#113353] hover:bg-white rounded transition-colors"
                >
                  Today
                </button>
                <button type="button" className="p-1 hover:bg-white rounded text-[#627D98]">
                  <PyngynIcons.chevronRight size={13} />
                </button>
              </div>

              <span className="text-[15px] font-black text-[#113353] tracking-tight">
                September 2026
              </span>

              {/* View Shape Switcher */}
              <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-[7px] border border-[#CBD5E1] font-bold text-[11px]">
                {(['month', 'week', 'day', 'timeline'] as const).map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => setViewShape(shape)}
                    className={`px-2.5 py-0.5 rounded-[5px] capitalize transition-colors ${
                      viewShape === shape
                        ? 'bg-[#101D33] text-white shadow-3xs'
                        : 'text-[#627D98] hover:text-[#113353]'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Search + Filters + Event Button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] px-2.5 py-1 text-[11px] text-[#113353]">
                <PyngynIcons.search size={12} className="text-[#829AB1]" />
                <span className="text-[#829AB1]">Search events...</span>
              </div>

              <button
                type="button"
                className="px-2.5 py-1 rounded-[6px] bg-white border border-[#CBD5E1] text-[#334E68] font-bold text-[11px] flex items-center gap-1.5 shadow-3xs hover:bg-[#F8FAFC]"
              >
                <PyngynIcons.filter size={12} className="text-[#627D98]" />
                <span>Filters</span>
              </button>

              <button
                type="button"
                className="px-2 py-1 rounded-[6px] bg-white border border-[#CBD5E1] text-[#627D98] font-bold text-[11px] shadow-3xs hover:bg-[#F8FAFC]"
              >
                ⋯
              </button>

              <button
                type="button"
                className="px-3 py-1 rounded-[6px] bg-[#101D33] hover:bg-[#1C2D4A] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-2xs"
              >
                <PyngynIcons.plus size={12} />
                <span>Event</span>
              </button>
            </div>
          </div>

          {/* Month Weekdays Header */}
          <div className="grid grid-cols-7 bg-[#F8FAFC] border-b border-[#CBD5E1] text-[10px] font-extrabold text-[#627D98] uppercase tracking-wider py-1 text-center shrink-0">
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div className="text-rose-600">SUN</div>
          </div>

          {/* Full September 2026 Month Grid — 5 Responsive Equal Rows, Zero Internal Scroll */}
          <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-[#CBD5E1] gap-[1px] min-h-0 overflow-hidden">
            {/* ROW 1: Aug 31 to Sep 6 */}
            {/* Mon 31 (Prev month) */}
            <div className="bg-slate-50/70 p-1 flex flex-col justify-between opacity-50 overflow-hidden">
              <span className="text-[10px] font-semibold text-slate-400">31</span>
            </div>

            {/* Tue 1 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>1</span>
                <span className="text-[9px] text-[#829AB1] font-mono">1</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate flex items-center justify-between gap-1 shadow-3xs">
                <span className="truncate">Engagement letter si...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">Task</span>
              </div>
            </div>

            {/* Wed 2 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>2</span>
                <span className="text-[9px] text-[#829AB1] font-mono">4</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                GSTR-1 sales ledger...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Internal controls tes...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0284C7] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Daily Practice Stand...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#2563EB] text-white text-[8.5px] font-semibold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">Statutory GST...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">Meet</span>
              </div>
              <span className="text-[8px] text-[#627D98] font-bold leading-none">+1 more</span>
            </div>

            {/* Thu 3 */}
            <div className="bg-white p-1 flex flex-col overflow-hidden">
              <span className="text-[10.5px] font-semibold text-[#113353]">3</span>
            </div>

            {/* Fri 4 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="text-[10.5px] font-semibold text-[#113353]">4</span>
                <span className="text-[8px] font-bold text-rose-700 bg-rose-50 px-1 py-0.2 rounded border border-rose-200 truncate">
                  Janmashtami
                </span>
              </div>
            </div>

            {/* Sat 5 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>5</span>
                <span className="text-[9px] text-[#829AB1] font-mono">1</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate flex items-center justify-between gap-1 shadow-3xs">
                <span className="truncate">LUT validity check fo...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">filed</span>
              </div>
            </div>

            {/* Sun 6 */}
            <div className="bg-rose-50/20 p-1 flex flex-col overflow-hidden">
              <span className="text-[10.5px] font-bold text-rose-600">6</span>
            </div>

            {/* ROW 2: Sep 7 to Sep 13 */}
            {/* Mon 7 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>7</span>
                <span className="text-[9px] text-[#829AB1] font-mono">2</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Investor MIS</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Investor MIS - 9 days l...</span>
              </div>
            </div>

            {/* Tue 8 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>8</span>
                <span className="text-[9px] text-[#829AB1] font-mono">1</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate flex items-center justify-between gap-1 shadow-3xs">
                <span className="truncate">HSN code rate check...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">filed</span>
              </div>
            </div>

            {/* Wed 9 */}
            <div className="bg-white p-1 flex flex-col overflow-hidden">
              <span className="text-[10.5px] font-semibold text-[#113353]">9</span>
            </div>

            {/* Thu 10 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>10</span>
                <span className="text-[9px] text-[#829AB1] font-mono">1</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate flex items-center justify-between gap-1 shadow-3xs">
                <span className="truncate">PPF and Sukanya Sa...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">filed</span>
              </div>
            </div>

            {/* Fri 11 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>11</span>
                <span className="text-[9px] text-[#829AB1] font-mono">3</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                August GSTR-1 filed
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                ARN archived
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                GSTR-1 outward invol...
              </div>
            </div>

            {/* Sat 12 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>12</span>
                <span className="text-[9px] text-[#829AB1] font-mono">2</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Client copy sent to po...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Home loan interest ce...
              </div>
            </div>

            {/* Sun 13 - 25 Advance Tax Instalm... */}
            <div
              data-product-target="calendar-adv-tax-13"
              className="bg-rose-50/20 p-1 flex flex-col gap-0.5 overflow-hidden"
            >
              <div className="flex items-center justify-between text-[10.5px] font-bold text-rose-600">
                <span>13</span>
                <span className="text-[9px] text-[#829AB1] font-mono">25</span>
              </div>
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="px-1 py-0.5 rounded-[3px] bg-[#059669] text-white text-[8.5px] font-semibold truncate shadow-3xs flex items-center gap-1"
                >
                  <PyngynIcons.checkSquare size={8} />
                  <span className="truncate">Advance Tax Instalm...</span>
                </div>
              ))}
            </div>

            {/* ROW 3: Sep 14 to Sep 20 */}
            {/* Mon 14 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <div className="flex items-center gap-1 truncate">
                  <span>14</span>
                  <span className="text-[7.5px] font-bold text-rose-700 bg-rose-50 px-1 py-0.2 rounded border border-rose-200 truncate">
                    Ganesh Chat...
                  </span>
                </div>
                <span className="text-[9px] text-[#829AB1] font-mono">2</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0D9488] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Weekly Compliance S...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0D9488] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Advance Tax Q2 Esti...
              </div>
            </div>

            {/* Tue 15 - Major Statutory Deadline */}
            <div
              data-product-target="calendar-adv-tax"
              className={`p-1 flex flex-col gap-0.5 overflow-hidden transition-all ${
                isDay15Active ? 'bg-amber-50 ring-2 ring-amber-400 shadow-3xs' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>15</span>
                <span className="text-[9px] text-[#829AB1] font-mono">5</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#DC2626] text-white text-[8.5px] font-bold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">Advance Tax In...</span>
                <span className="text-[7.5px] bg-white/20 px-0.5 rounded">25</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Advance Tax Q2</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#2563EB] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Advance tax compu...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#2563EB] text-white text-[8.5px] font-semibold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">Q2 Advance T...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">Meet</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0284C7] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Q3 Tax Planning & A...
              </div>
            </div>

            {/* Wed 16 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>16</span>
                <span className="text-[9px] text-[#829AB1] font-mono">4</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#2563EB] text-white text-[8.5px] font-semibold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">Corporate Ta...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">Meet</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0284C7] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Income Tax Faceles...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0D9488] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Practice Complianc...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0D9488] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Tax Audit Form 3CD ...
              </div>
              <span className="text-[8px] text-[#627D98] font-bold leading-none">+1 more</span>
            </div>

            {/* Thu 17 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>17</span>
                <span className="text-[9px] text-[#829AB1] font-mono">4</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Suspense clearance...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#2563EB] text-white text-[8.5px] font-semibold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">Statutory Aud...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">Meet</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0D9488] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                TDS Reconciliation ...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0D9488] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Statutory Audit Inve...
              </div>
              <span className="text-[8px] text-[#627D98] font-bold leading-none">+1 more</span>
            </div>

            {/* Fri 18 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>18</span>
                <span className="text-[9px] text-[#829AB1] font-mono">25</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Match GSTR-2B - re...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Weekly status draft ...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Monthly pharmacy ...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#059669] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                [Maharashtra - 27AA...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#059669] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                [Gujarat - 24AAAFO1...
              </div>
            </div>

            {/* Sat 19 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <div className="flex items-center gap-1 truncate">
                  <span>19</span>
                  <span className="text-[7.5px] font-bold text-rose-700 bg-rose-50 px-1 py-0.2 rounded border border-rose-200 truncate">
                    Samvatsari / ...
                  </span>
                </div>
                <span className="text-[9px] text-[#829AB1] font-mono">9</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                BRC/FIRC reconcilia...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                GSTR-3B preparatio...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                GTA RCM inward lia...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Works contract 18%...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                GSTR-3B draft revie...
              </div>
            </div>

            {/* Sun 20 - Monthly GSTR-3B Filing Cluster (Animated Filing Deadline) */}
            <motion.div
              data-product-target="calendar-gstr3b"
              animate={{
                backgroundColor: isDay20Active
                  ? isGstr3bFiled
                    ? 'rgba(236, 253, 245, 0.9)'
                    : 'rgba(254, 243, 199, 0.7)'
                  : isGstr3bFiled
                  ? 'rgba(236, 253, 245, 0.4)'
                  : 'rgba(255, 241, 242, 0.3)',
              }}
              transition={{ duration: 0.4 }}
              className={`p-1 flex flex-col gap-0.5 overflow-hidden transition-all relative ${
                isDay20Active
                  ? isGstr3bFiled
                    ? 'ring-2 ring-emerald-500 shadow-sm'
                    : 'ring-2 ring-amber-400 shadow-sm'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between text-[10.5px] font-bold text-rose-600">
                <span className="flex items-center gap-1">
                  <span>20</span>
                  {isDay20Active && !isGstr3bFiled && (
                    <span className="text-[7.5px] font-extrabold bg-amber-200 text-amber-900 px-1 py-0.2 rounded animate-pulse">
                      Active Deadline
                    </span>
                  )}
                  {isGstr3bFiled && (
                    <span className="text-[7.5px] font-extrabold bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded">
                      Filing Done ✓
                    </span>
                  )}
                </span>
                <span className="text-[9px] text-[#829AB1] font-mono">21</span>
              </div>

              {/* Status Header Badge */}
              <motion.div
                key={isGstr3bFiled ? 'filed' : 'due'}
                initial={{ opacity: 0.7, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`px-1 py-0.5 rounded-[3px] text-white text-[8.5px] font-bold truncate flex items-center justify-between shadow-3xs ${
                  isGstr3bFiled ? 'bg-[#059669]' : 'bg-[#DC2626]'
                }`}
              >
                <span className="truncate">
                  {isGstr3bFiled ? 'Filed & Synced ✓' : 'Monthly Return ...'}
                </span>
                <span className="text-[7.5px] bg-white/20 px-0.5 rounded">
                  {isGstr3bFiled ? 'Done' : '18'}
                </span>
              </motion.div>

              {/* 3 Filing Cards */}
              {[1, 2, 3].map((idx) => (
                <motion.div
                  key={`${idx}-${isGstr3bFiled}`}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`px-1 py-0.5 rounded-[3px] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs ${
                    isGstr3bFiled ? 'bg-[#059669]' : 'bg-[#D97706]'
                  }`}
                >
                  <PyngynIcons.star size={8} />
                  <span className="truncate">
                    {isGstr3bFiled ? 'GSTR-3B Filed ✓' : 'GSTR-3B Filing'}
                  </span>
                </motion.div>
              ))}

              <motion.div
                key={`gta-${isGstr3bFiled}`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`px-1 py-0.5 rounded-[3px] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs ${
                  isGstr3bFiled ? 'bg-[#10B981]' : 'bg-[#D97706]'
                }`}
              >
                <PyngynIcons.star size={8} />
                <span className="truncate">
                  {isGstr3bFiled ? 'GTA 3B Done ✓' : 'GTA GSTR-3B'}
                </span>
              </motion.div>
            </motion.div>

            {/* ROW 4: Sep 21 to Sep 27 */}
            {/* Mon 21 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>21</span>
                <span className="text-[9px] text-[#829AB1] font-mono">4</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Shipping bill matchi...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Form 15CA/15CB pre...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#0284C7] text-white text-[8.5px] font-semibold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">SEZ Complian...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">Meet</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-slate-600 text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.user size={8} />
                <span className="truncate">Leave: vikram</span>
              </div>
            </div>

            {/* Tue 22 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>22</span>
                <span className="text-[9px] text-[#829AB1] font-mono">5</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Ledger Scrutiny</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Advance Tax Q2 Re...</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Provisional balance...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                AWS cloud hosting i...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-slate-600 text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.user size={8} />
                <span className="truncate">Leave: aditya</span>
              </div>
            </div>

            {/* Wed 23 - TODAY (Animated Natural Highlight Move) */}
            <motion.div
              data-product-target="calendar-today"
              animate={{
                backgroundColor: isDay23Active ? 'rgba(235, 243, 255, 0.9)' : 'rgba(239, 246, 255, 0.4)',
              }}
              transition={{ duration: 0.4 }}
              className={`p-1 flex flex-col gap-0.5 overflow-hidden transition-all ${
                isDay23Active ? 'ring-2 ring-[#004AAD] shadow-sm' : ''
              }`}
            >
              <div className="flex items-center justify-between text-[10.5px] font-bold">
                <div className="flex items-center gap-1">
                  <span className="w-4.5 h-4.5 rounded-full bg-[#101D33] text-white flex items-center justify-center text-[9px] font-black">
                    23
                  </span>
                  <span className="text-[7.5px] bg-[#101D33]/10 text-[#101D33] px-1 py-0.2 rounded font-black">
                    TODAY
                  </span>
                  {isDay23Active && (
                    <span className="text-[7.5px] font-extrabold bg-blue-100 text-[#004AAD] px-1 py-0.2 rounded">
                      In Focus
                    </span>
                  )}
                </div>
                <span className="text-[9px] text-[#829AB1] font-mono">7</span>
              </div>

              {/* Task with verified status on Step 3 */}
              <motion.div
                key={`task-interior-${effectiveStep >= 3}`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className={`px-1 py-0.5 rounded-[3px] text-white text-[8.5px] font-semibold truncate shadow-3xs flex items-center justify-between ${
                  effectiveStep >= 3 ? 'bg-[#0D9488]' : 'bg-[#7C3AED]'
                }`}
              >
                <span className="truncate">
                  {effectiveStep >= 3 ? 'Interior cost verified ✓' : 'Interior project cost ...'}
                </span>
                {effectiveStep >= 3 && <span className="text-[7px] bg-white/20 px-0.5 rounded">done</span>}
              </motion.div>

              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Section 44ADA gros...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#059669] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                [Karnataka - 29AAA...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#059669] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                [Maharashtra - 27AB...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#059669] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                [Maharashtra - 27AA...
              </div>
            </motion.div>

            {/* Thu 24 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>24</span>
                <span className="text-[9px] text-[#829AB1] font-mono">5</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Bank Statement Pos...</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                RFD-01 refund filing...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Diesel expense vou...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                GST e-invoice IRN g...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-slate-600 text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.user size={8} />
                <span className="truncate">Leave: aditya</span>
              </div>
            </div>

            {/* Fri 25 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>25</span>
                <span className="text-[9px] text-[#829AB1] font-mono">11</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#DC2626] text-white text-[8.5px] font-bold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">Monthly Tax Pay...</span>
                <span className="text-[7.5px] bg-white/20 px-0.5 rounded">3</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Bank Reco & MIS</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Debtors Ageing</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">ITR-4 Return Verific...</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Foreign currency ex...
              </div>
            </div>

            {/* Sat 26 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>26</span>
                <span className="text-[9px] text-[#829AB1] font-mono">8</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Subcontractor Reco...</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Invoicing & TDS Rec...</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Fixed-asset schedul...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Driver advance ledg...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                DTAA India-UAE Art...
              </div>
            </div>

            {/* Sun 27 */}
            <div className="bg-rose-50/20 p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-rose-600">
                <span>27</span>
                <span className="text-[9px] text-[#829AB1] font-mono">5</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Partner capital acco...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Section 44AD turno...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Work-in-progress bi...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-slate-600 text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.user size={8} />
                <span className="truncate">Leave: aditya</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-slate-600 text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.user size={8} />
                <span className="truncate">Leave: neha</span>
              </div>
            </div>

            {/* ROW 5: Sep 28 to Oct 4 */}
            {/* Mon 28 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>28</span>
                <span className="text-[9px] text-[#829AB1] font-mono">49</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">Monthly Trial Balance</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#D97706] text-white text-[8.5px] font-semibold truncate flex items-center gap-1 shadow-3xs">
                <PyngynIcons.star size={8} />
                <span className="truncate">F&O Loss Setoff Me...</span>
              </div>
            </div>

            {/* Tue 29 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>29</span>
                <span className="text-[9px] text-[#829AB1] font-mono">2</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Cash book negative ...
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate shadow-3xs">
                Form 10F electronic ...
              </div>
            </div>

            {/* Wed 30 */}
            <div className="bg-white p-1 flex flex-col gap-0.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#113353]">
                <span>30</span>
                <span className="text-[9px] text-[#829AB1] font-mono">11</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#2563EB] text-white text-[8.5px] font-bold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">Tax Audit Report...</span>
                <span className="text-[7.5px] bg-white/20 px-0.5 rounded">16</span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#2563EB] text-white text-[8.5px] font-bold truncate flex items-center justify-between shadow-3xs">
                <span className="truncate">State Professio...</span>
                <span className="text-[7.5px] bg-white/20 px-0.5 rounded">20</span>
              </div>
            </div>

            {/* Thu 1 (Oct, trailing) */}
            <div className="bg-slate-50/70 p-1 flex flex-col overflow-hidden opacity-60">
              <span className="text-[10px] font-semibold text-slate-500">1</span>
            </div>

            {/* Fri 2 (Oct, trailing) */}
            <div className="bg-slate-50/70 p-1 flex flex-col gap-0.5 overflow-hidden opacity-75">
              <div className="flex items-center gap-1 truncate">
                <span className="text-[10px] font-semibold text-slate-500">2</span>
                <span className="text-[7.5px] font-bold text-rose-700 bg-rose-50 px-1 py-0.2 rounded border border-rose-200 truncate">
                  Mahatma Gan...
                </span>
              </div>
              <div className="px-1 py-0.5 rounded-[3px] bg-[#7C3AED] text-white text-[8.5px] font-semibold truncate flex items-center justify-between gap-1 shadow-3xs">
                <span className="truncate">Tax Residency Certif...</span>
                <span className="text-[7px] bg-white/20 px-0.5 rounded">docs-pending</span>
              </div>
            </div>

            {/* Sat 3 (Oct, trailing) */}
            <div className="bg-slate-50/70 p-1 flex flex-col overflow-hidden opacity-60">
              <span className="text-[10px] font-semibold text-slate-500">3</span>
            </div>

            {/* Sun 4 (Oct, trailing) */}
            <div className="bg-slate-50/70 p-1 flex flex-col overflow-hidden opacity-60">
              <span className="text-[10px] font-semibold text-rose-400">4</span>
            </div>
          </div>
        </main>
      </div>

      {/* 3. Docked Bottom Timer */}
      <PyngynBottomTimer />
    </div>
  );
};
