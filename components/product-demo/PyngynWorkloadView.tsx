'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PyngynAppRail } from './PyngynAppRail';
import { PyngynGlobalHeader } from './PyngynGlobalHeader';
import { PyngynBottomTimer } from './PyngynBottomTimer';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynWorkloadViewProps {
  className?: string;
  activeTarget?: string;
  autoPlay?: boolean;
  animStep?: number;
  activeTasksCount?: number;
  capacityUtilizationPct?: number;
  atRiskCount?: number;
  nikhilHours?: { est: number; capacity: number; isOverloaded: boolean };
}

export const PyngynWorkloadView: React.FC<PyngynWorkloadViewProps> = ({
  className = '',
  activeTarget,
  autoPlay = true,
  animStep,
  activeTasksCount,
  capacityUtilizationPct,
  atRiskCount,
  nikhilHours,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Navigation states
  const [activeView, setActiveView] = useState<'overview' | 'engagements' | 'schedule' | 'tasks'>('overview');
  const [timeScale, setTimeScale] = useState<'day' | 'week' | 'month'>('week');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // AUTOMATED REALISTIC & SUBTLE WORKFLOW ANIMATION:
  // Phase 0: Baseline state (Active Tasks: 22, Capacity: 47%, At Risk: 3, Nikhil Jain: 42/35h overloaded red)
  // Phase 1: Active Tasks increases to 23, Capacity Utilization percentage glides to 51%, TDS scope updates
  // Phase 2: Team Workload Reallocation: Nikhil Jain workload rebalanced to 35/35h teal, Vikram Meena 8h -> 15h
  // Phase 3: At Risk deliverables resolved & cleared: At Risk count drops 3 -> 2, donut Pending drops
  // Phase 4: Clean optimal state hold before smooth loop reset
  const [internalStep, setInternalStep] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion || animStep !== undefined) return;

    const timings = [
      3200, // 0: Baseline state
      2800, // 1: Active tasks & capacity increase
      3200, // 2: Nikhil Jain reallocated / balanced
      2800, // 3: At Risk count reduced
      2200, // 4: Optimal state hold
    ];

    const timer = setTimeout(() => {
      setInternalStep((prev) => ((prev + 1) % timings.length) as any);
    }, timings[internalStep] || 2800);

    return () => clearTimeout(timer);
  }, [internalStep, autoPlay, shouldReduceMotion, animStep]);

  const effectiveStep = animStep !== undefined ? animStep : internalStep;

  // Dynamic values driven by step or caller overrides
  const currentTasksCount = activeTasksCount !== undefined && animStep === undefined
    ? activeTasksCount
    : effectiveStep >= 1 ? 23 : 22;

  const currentCapacityPct = capacityUtilizationPct !== undefined && animStep === undefined
    ? capacityUtilizationPct
    : effectiveStep >= 1 ? 51 : 47;

  const currentCapacityHours = effectiveStep >= 1 ? '133 / 260h' : '122 / 260h';

  const currentAtRiskCount = atRiskCount !== undefined && animStep === undefined
    ? atRiskCount
    : effectiveStep >= 3 ? 2 : 3;

  const currentNikhil = nikhilHours !== undefined && animStep === undefined
    ? nikhilHours
    : effectiveStep >= 2
      ? { est: 35, capacity: 35, isOverloaded: false }
      : { est: 42, capacity: 35, isOverloaded: true };

  const currentVikramHours = effectiveStep >= 2 ? 15 : 8;

  // Donut chart status breakdown (dynamically recalculates total tasks & slices)
  const totalTasks = currentTasksCount;
  const completeCount = effectiveStep >= 3 ? 2 : 1;
  const inProgressCount = effectiveStep >= 1 ? 13 : 12;
  const notStartedCount = 7;
  const atRiskTaskCount = currentAtRiskCount;

  const statusBreakdown = [
    {
      id: 'completed',
      label: 'Complete',
      count: completeCount,
      pct: Math.round((completeCount / totalTasks) * 100),
      color: '#2563EB',
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      count: inProgressCount,
      pct: Math.round((inProgressCount / totalTasks) * 100),
      color: '#0D9488',
    },
    {
      id: 'not_started',
      label: 'Not Started',
      count: notStartedCount,
      pct: Math.round((notStartedCount / totalTasks) * 100),
      color: '#818CF8',
    },
    {
      id: 'pending',
      label: 'Pending / At Risk',
      count: atRiskTaskCount,
      pct: Math.round((atRiskTaskCount / totalTasks) * 100),
      color: '#38BDF8',
    },
  ];

  // Scope distribution categories (vertical bar chart)
  const categories = [
    { key: 'statutory_audit', label: 'Statutory Audit', count: 2, color: '#6366F1' },
    { key: 'gst_filing', label: 'GST Monthly', count: 5, color: '#14B8A6' },
    { key: 'tax_audit', label: 'Tax Audit 3CD', count: 12, color: '#2563EB' },
    { key: 'roc_filing', label: 'MCA / ROC', count: 6, color: '#06B6D4' },
    { key: 'tds_returns', label: 'TDS Returns', count: effectiveStep >= 1 ? 11 : 10, color: '#3B82F6' },
    { key: 'adv_tax', label: 'Advance Tax', count: 4, color: '#10B981' },
    { key: 'tp_study', label: 'TP Study', count: 5, color: '#818CF8' },
    { key: 'accounts', label: 'Bookkeeping', count: 3, color: '#38BDF8' },
    { key: 'advisory', label: 'Advisory', count: 3, color: '#A5B4FC' },
  ];
  const maxCount = 12;

  // Team members capacity breakdown (segmented progress bars)
  const teamMembers = [
    {
      name: 'Nikhil Jain',
      estHours: currentNikhil.est,
      capacityHours: currentNikhil.capacity,
      segments: currentNikhil.isOverloaded
        ? [
            { key: 'comp', width: 28, color: '#2563EB', label: '28%' },
            { key: 'prog', width: 29, color: '#0D9488', label: '29%' },
            { key: 'over', width: 43, color: '#DC2626', label: '43%' },
          ]
        : [
            { key: 'comp', width: 45, color: '#2563EB', label: '45%' },
            { key: 'prog', width: 55, color: '#0D9488', label: '55%' },
          ],
      isOverloaded: currentNikhil.isOverloaded,
      targetKey: 'workload-nikhil',
      isRebalanced: effectiveStep >= 2,
    },
    {
      name: 'Priya Agarwal',
      estHours: 35,
      capacityHours: 45,
      segments: [
        { key: 'comp', width: 32, color: '#2563EB', label: '32%' },
        { key: 'prog', width: 28, color: '#0D9488', label: '28%' },
        { key: 'rem', width: 40, color: '#818CF8', label: '40%' },
      ],
      isOverloaded: false,
      targetKey: 'workload-priya',
    },
    {
      name: 'Vikram Meena',
      estHours: currentVikramHours,
      capacityHours: 45,
      segments: effectiveStep >= 2
        ? [
            { key: 'comp', width: 33, color: '#2563EB', label: '33%' },
            { key: 'rem', width: 67, color: '#818CF8', label: '67%' },
          ]
        : [
            { key: 'comp', width: 20, color: '#2563EB', label: '20%' },
            { key: 'rem', width: 80, color: '#818CF8', label: '80%' },
          ],
      isOverloaded: false,
      targetKey: 'workload-vikram',
      isRebalanced: effectiveStep >= 2,
    },
    {
      name: 'Neha Jain',
      estHours: 0,
      capacityHours: 45,
      segments: [
        { key: 'avail', width: 100, color: '#A5B4FC', label: '100%' },
      ],
      isOverloaded: false,
      targetKey: 'workload-neha',
    },
    {
      name: 'Aditya Sharma',
      estHours: 37,
      capacityHours: 45,
      segments: [
        { key: 'comp', width: 36, color: '#2563EB', label: '36%' },
        { key: 'prog', width: 64, color: '#0D9488', label: '64%' },
      ],
      isOverloaded: false,
      targetKey: 'workload-aditya',
    },
  ];

  return (
    <div
      data-product-target="workload-screen"
      className={`w-full h-full min-h-[880px] bg-white flex flex-col font-sans select-none overflow-hidden ${className}`}
    >
      {/* 1. Global Header */}
      <PyngynGlobalHeader />

      {/* 2. Main Body: Rail + Workload Sidebar + View */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <PyngynAppRail activeItem="workload" />

        {/* Workload Navigation Sidebar */}
        <aside
          data-product-target="workload-sidebar"
          className="w-[230px] shrink-0 bg-[#F8FAFC] border-r border-[#E5EAF2] flex flex-col text-[12px] text-[#113353] select-none overflow-y-auto"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-[#E5EAF2] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FF] text-[#004AAD] flex items-center justify-center shrink-0">
              <PyngynIcons.chart size={15} />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-[13px] text-[#113353] block truncate">
                Workload
              </span>
              <span className="text-[10.5px] text-[#627D98] truncate block">
                Team capacity & resource planning
              </span>
            </div>
          </div>

          {/* Saved Views */}
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center justify-between text-[10.5px] font-bold text-[#627D98] uppercase tracking-wider mb-1.5 px-1">
              <span>Saved Views</span>
              <span className="font-mono text-[10px]">5</span>
            </div>
            <div className="space-y-0.5">
              {[
                'Audit Partners & Staff Overloaded',
                'Tier 1 Retainer Client Allocations',
                'GST Available Bandwidth (Upcom...',
                'Direct Tax Scrutiny & Appeal Tasks',
              ].map((view, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] text-left hover:bg-[#EEF5FF] text-[#334E68] font-medium text-[11.5px] transition-colors truncate"
                >
                  <PyngynIcons.bookmark size={12} className="text-[#829AB1] shrink-0" />
                  <span className="truncate">{view}</span>
                </button>
              ))}
              <button
                type="button"
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-[6px] text-left hover:bg-[#EEF5FF] text-[#113353] font-semibold text-[11.5px] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <PyngynIcons.bookmark size={12} className="text-[#004AAD] shrink-0" />
                  <span className="truncate">Monthly Practice Master ...</span>
                </div>
                <span className="text-[9px] px-1 py-0.5 rounded bg-[#E2E8F0] text-[#475569] font-bold shrink-0">
                  Default
                </span>
              </button>
            </div>
          </div>

          {/* Primary Views */}
          <div className="px-3 py-2 border-t border-[#E5EAF2]/60">
            <div className="text-[10.5px] font-bold text-[#627D98] uppercase tracking-wider mb-1.5 px-1">
              Views
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => setActiveView('overview')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[7px] text-left font-bold text-[12px] transition-colors ${
                  activeView === 'overview'
                    ? 'bg-[#EBF3FF] text-[#004AAD]'
                    : 'text-[#334E68] hover:bg-[#EEF5FF]'
                }`}
              >
                <PyngynIcons.layout size={13} className="text-[#004AAD]" />
                <span>Overview</span>
              </button>
              {[
                { name: 'Engagements', count: '32', icon: <PyngynIcons.briefcase size={13} /> },
                { name: 'Schedule', count: '6', icon: <PyngynIcons.calendar size={13} /> },
                { name: 'Tasks', count: '6', icon: <PyngynIcons.checkSquare size={13} /> },
                { name: 'Clients', count: '25', icon: <PyngynIcons.users size={13} /> },
                { name: 'Team Capacity', count: '', icon: <PyngynIcons.user size={13} /> },
                { name: 'Reports', count: 'KPIs', icon: <PyngynIcons.fileText size={13} /> },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-left text-[#486581] hover:bg-[#EEF5FF] text-[12px] font-medium transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#829AB1]">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.count && (
                    <span className="text-[10.5px] font-mono text-[#829AB1] font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="px-3 py-2 border-t border-[#E5EAF2]/60">
            <div className="flex items-center justify-between text-[10.5px] font-bold text-[#627D98] uppercase tracking-wider mb-1.5 px-1">
              <span>Departments</span>
              <span className="font-mono text-[10px]">28</span>
            </div>
            <div className="space-y-0.5">
              {[
                { name: 'Income Tax', count: 8 },
                { name: 'Audit', count: 6 },
                { name: 'GST', count: 5 },
                { name: 'Company ROC', count: 4 },
                { name: 'Accounts', count: 5 },
              ].map((dept, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-left text-[#486581] hover:bg-[#EEF5FF] text-[12px] font-medium transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <PyngynIcons.folder size={12} className="text-[#829AB1]" />
                    <span className="truncate">{dept.name}</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#829AB1] font-bold">
                    {dept.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Workload Main Dashboard View */}
        <main className="flex-1 bg-[#F8FAFC] flex flex-col min-w-0 overflow-y-auto">
          {/* Top Control Bar */}
          <div className="px-6 py-3.5 bg-white border-b border-[#E5EAF2] flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#627D98]">
                <span>Workload</span>
                <span>/</span>
                <span className="text-[#113353]">Overview</span>
              </div>
              <div className="flex items-center gap-2">
                <PyngynIcons.layout size={16} className="text-[#004AAD]" />
                <h1 className="text-[18px] font-extrabold text-[#113353] tracking-tight flex items-center gap-1.5">
                  <span>Overview</span>
                  <PyngynIcons.chevronDown size={14} className="text-[#627D98]" />
                  <PyngynIcons.star size={13} className="text-[#829AB1]" />
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-[8px] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334E68] text-[11.5px] font-bold flex items-center gap-1.5 shadow-3xs"
              >
                <PyngynIcons.bookmark size={12} />
                <span>Saved Views (5)</span>
                <PyngynIcons.chevronDown size={11} />
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-[8px] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334E68] text-[11.5px] font-bold flex items-center gap-1.5 shadow-3xs"
              >
                <PyngynIcons.star size={12} />
                <span>Make Default</span>
              </button>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-[8px] bg-[#101D33] hover:bg-[#1C2D4A] text-white text-[11.5px] font-extrabold flex items-center gap-1.5 shadow-2xs"
              >
                <PyngynIcons.plus size={12} />
                <span>Save View</span>
              </button>
            </div>
          </div>

          {/* Filter Sub-bar */}
          <div className="px-6 py-2.5 bg-white border-b border-[#E5EAF2]/80 flex items-center justify-between flex-wrap gap-2 text-[11.5px]">
            <button
              type="button"
              className="px-2.5 py-1 rounded-[6px] bg-white border border-[#CBD5E1] text-[#334E68] font-bold flex items-center gap-1.5 hover:bg-[#F8FAFC] shadow-3xs"
            >
              <PyngynIcons.filter size={12} className="text-[#627D98]" />
              <span>Filter</span>
              <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-[7px] border border-[#CBD5E1] font-bold text-[11px]">
                <button
                  type="button"
                  onClick={() => setTimeScale('day')}
                  className={`px-2.5 py-0.5 rounded-[5px] transition-colors ${
                    timeScale === 'day' ? 'bg-white text-[#113353] shadow-3xs' : 'text-[#627D98]'
                  }`}
                >
                  Day
                </button>
                <button
                  type="button"
                  onClick={() => setTimeScale('week')}
                  className={`px-2.5 py-0.5 rounded-[5px] transition-colors ${
                    timeScale === 'week' ? 'bg-white text-[#113353] shadow-3xs' : 'text-[#627D98]'
                  }`}
                >
                  Weekly
                </button>
                <button
                  type="button"
                  onClick={() => setTimeScale('month')}
                  className={`px-2.5 py-0.5 rounded-[5px] transition-colors ${
                    timeScale === 'month' ? 'bg-white text-[#113353] shadow-3xs' : 'text-[#627D98]'
                  }`}
                >
                  Monthly
                </button>
              </div>

              <div className="flex items-center gap-1 text-[11.5px] font-bold text-[#334E68]">
                <button type="button" className="p-1 hover:bg-[#F1F5F9] rounded text-[#627D98]">
                  <PyngynIcons.chevronLeft size={13} />
                </button>
                <span className="font-mono px-1">21 - 27 Sep 2026</span>
                <button type="button" className="p-1 hover:bg-[#F1F5F9] rounded text-[#627D98]">
                  <PyngynIcons.chevronRight size={13} />
                </button>
              </div>

              <div className="p-1 text-[#627D98] hover:text-[#113353] cursor-pointer">
                <PyngynIcons.calendar size={14} />
              </div>
            </div>
          </div>

          {/* 3. Dashboard Body with 4 KPI Cards + 3 Content Cards */}
          <div className="p-4 space-y-3">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: Active Tasks */}
              <div
                data-product-target="workload-tasks-card"
                className={`bg-white border rounded-[12px] p-3.5 shadow-3xs space-y-1.5 transition-all ${
                  effectiveStep === 1
                    ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/15'
                    : 'border-[#E5EAF2] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-[#627D98] uppercase tracking-wider">
                    Active Tasks
                  </span>
                  <div className="w-6 h-6 rounded-[6px] bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                    <PyngynIcons.checkSquare size={12} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <motion.span
                    key={currentTasksCount}
                    initial={{ opacity: 0.6, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[24px] font-black font-mono text-[#113353] leading-none"
                  >
                    {currentTasksCount}
                  </motion.span>
                  <span className="text-[10px] font-bold text-[#4338CA] bg-[#EEF2FF] border border-[#C7D2FE] px-2 py-0.5 rounded-[5px] transition-colors">
                    {effectiveStep >= 1 ? '+5 completed' : '+4 completed'}
                  </span>
                </div>
                <p className="text-[10.5px] text-[#627D98] font-medium truncate">
                  Across 12 active client retainers
                </p>
              </div>

              {/* Card 2: Capacity Utilization */}
              <div
                data-product-target="workload-capacity"
                className={`bg-white border rounded-[12px] p-3.5 shadow-3xs space-y-1.5 transition-all ${
                  activeTarget === 'workload-capacity' || effectiveStep === 1
                    ? 'border-[#004AAD] ring-2 ring-[#004AAD]/20'
                    : 'border-[#E5EAF2] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-[#627D98] uppercase tracking-wider">
                    Capacity Utilization
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[5px] text-[10px] font-bold bg-[#E6FFFA] text-[#0D9488] border border-[#99F6E4]">
                    Optimal
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <motion.span
                    key={currentCapacityPct}
                    initial={{ opacity: 0.6, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[24px] font-black font-mono text-[#113353] leading-none"
                  >
                    {currentCapacityPct}%
                  </motion.span>
                  <span className="text-[10.5px] font-mono font-bold text-[#627D98]">
                    {currentCapacityHours}
                  </span>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#2563EB]"
                    initial={false}
                    animate={{ width: `${currentCapacityPct}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              {/* Card 3: Retainer Value */}
              <div
                data-product-target="workload-retainer-card"
                className="bg-white border border-[#E5EAF2] rounded-[12px] p-3.5 shadow-3xs space-y-1.5 hover:border-[#CBD5E1] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-[#627D98] uppercase tracking-wider">
                    Retainer Value
                  </span>
                  <div className="w-6 h-6 rounded-[6px] bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-[11px]">
                    $
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[24px] font-black font-mono text-[#113353] leading-none">
                    ₹94.8L
                  </span>
                  <span className="text-[10px] font-bold text-[#0369A1] bg-[#F0F9FF] border border-[#BAE6FD] px-2 py-0.5 rounded-[5px]">
                    ↑ 12.4% MoM
                  </span>
                </div>
                <p className="text-[10.5px] text-[#627D98] font-medium truncate">
                  Annual contracted client value
                </p>
              </div>

              {/* Card 4: At Risk / Overdue */}
              <div
                data-product-target="workload-risk"
                className={`bg-white border rounded-[12px] p-3.5 shadow-3xs space-y-1.5 transition-all ${
                  activeTarget === 'workload-risk' || effectiveStep === 3
                    ? 'border-[#D97706] ring-2 ring-[#D97706]/20'
                    : 'border-[#E5EAF2] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-[#627D98] uppercase tracking-wider">
                    At Risk / Overdue
                  </span>
                  <div className="w-6 h-6 rounded-[6px] bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                    <PyngynIcons.alertTriangle size={12} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <motion.span
                    key={currentAtRiskCount}
                    initial={{ opacity: 0.6, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[24px] font-black font-mono text-[#113353] leading-none"
                  >
                    {currentAtRiskCount}
                  </motion.span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-[5px] transition-colors ${
                      currentAtRiskCount === 2
                        ? 'text-[#0D9488] bg-[#E6FFFA] border border-[#99F6E4]'
                        : 'text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A]'
                    }`}
                  >
                    {currentAtRiskCount === 2 ? 'Cleared 1 Block' : 'Need Review'}
                  </span>
                </div>
                <p className="text-[10.5px] text-[#627D98] font-medium truncate">
                  Blocked deliverables or due soon
                </p>
              </div>
            </div>

            {/* 3 Lower Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
              {/* Card 1: Task Lengths / Scope Distribution (4 cols) */}
              <div
                data-product-target="workload-scope"
                className="lg:col-span-4 bg-white border border-[#E5EAF2] rounded-[12px] p-3.5 shadow-3xs flex flex-col justify-between"
              >
                <div className="space-y-0.5 border-b border-[#E5EAF2] pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#113353] text-[13px]">Task Lengths</h3>
                    <span className="text-[9px] font-extrabold text-[#627D98] uppercase tracking-wider">
                      SCOPE DISTRIBUTION
                    </span>
                  </div>
                  <p className="text-[10px] text-[#627D98] leading-tight">
                    Estimated scope length and deliverable distribution by compliance category.
                  </p>
                </div>

                {/* Vertical Bar Chart */}
                <div className="py-2.5">
                  <div className="h-[120px] flex items-end justify-between gap-1.5 px-1 relative border-b border-[#E5EAF2]">
                    {/* Gridlines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                      <div className="border-b border-dashed border-[#CBD5E1] w-full" />
                      <div className="border-b border-dashed border-[#CBD5E1] w-full" />
                      <div className="border-b border-dashed border-[#CBD5E1] w-full" />
                    </div>

                    {categories.map((cat) => {
                      const heightPct = Math.round((cat.count / maxCount) * 100);
                      return (
                        <div
                          key={cat.key}
                          className="flex-1 flex flex-col items-center gap-1 relative z-10 group/bar cursor-pointer"
                        >
                          <motion.span
                            key={cat.count}
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-[9.5px] font-mono font-bold text-[#113353] group-hover/bar:text-[#004AAD] transition-colors"
                          >
                            {cat.count}
                          </motion.span>
                          <div className="w-full max-w-[22px] bg-[#F1F5F9] rounded-t-[4px] h-24 flex items-end">
                            <motion.div
                              className="w-full rounded-t-[4px] transition-colors duration-200 group-hover/bar:brightness-110"
                              initial={false}
                              animate={{ height: `${Math.max(heightPct, 12)}%` }}
                              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                              style={{ backgroundColor: cat.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center pt-1.5 text-[9.5px] font-extrabold text-[#627D98] uppercase tracking-wider">
                    TOTAL CATEGORIES
                  </div>
                </div>

                {/* Legend */}
                <div className="pt-2 border-t border-[#E5EAF2] grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-[#486581]">
                  {categories.slice(0, 6).map((c) => (
                    <div key={c.key} className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-[2px] shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="truncate">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Tasks Status / Filing Stage (Donut Chart - 4 cols) */}
              <div
                data-product-target="workload-donut"
                className="lg:col-span-4 bg-white border border-[#E5EAF2] rounded-[12px] p-3.5 shadow-3xs flex flex-col justify-between"
              >
                <div className="space-y-0.5 border-b border-[#E5EAF2] pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#113353] text-[13px]">Tasks Status</h3>
                    <span className="text-[9px] font-extrabold text-[#627D98] uppercase tracking-wider">
                      FILING STAGE
                    </span>
                  </div>
                  <p className="text-[10px] text-[#627D98] leading-tight">
                    Live ratio of completed vs in-progress, pending and not started deliverables.
                  </p>
                </div>

                {/* Donut Chart Visual */}
                <div className="py-1.5 flex items-center justify-center relative">
                  <div className="relative w-[136px] h-[136px] flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {(() => {
                        let accumulatedPct = 0;
                        const radius = 38;
                        const circumference = 2 * Math.PI * radius;

                        return statusBreakdown.map((slice) => {
                          const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
                          const strokeDashoffset = -((accumulatedPct / 100) * circumference);
                          accumulatedPct += slice.pct;
                          const isHovered = hoveredSlice === slice.id;

                          return (
                            <motion.circle
                              key={slice.id}
                              cx="50"
                              cy="50"
                              r={radius}
                              fill="transparent"
                              stroke={slice.color}
                              strokeWidth={isHovered ? 19 : 15}
                              initial={false}
                              animate={{ strokeDasharray, strokeDashoffset }}
                              transition={{ duration: 0.8, ease: 'easeInOut' }}
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredSlice(slice.id)}
                              onMouseLeave={() => setHoveredSlice(null)}
                            />
                          );
                        });
                      })()}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center">
                      <motion.span
                        key={totalTasks}
                        initial={{ opacity: 0.6, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-[18px] font-black font-mono text-[#113353] leading-none"
                      >
                        {totalTasks}
                      </motion.span>
                      <span className="text-[8.5px] font-bold text-[#627D98] uppercase mt-0.5">
                        TOTAL TASKS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="pt-2 border-t border-[#E5EAF2] grid grid-cols-2 gap-1.5 text-[10px]">
                  {statusBreakdown.map((s) => (
                    <div
                      key={s.id}
                      className="p-1 rounded-[5px] border border-[#E5EAF2] flex items-center justify-between bg-[#F8FAFC]"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-[2px] shrink-0" style={{ backgroundColor: s.color }} />
                        <span className="truncate font-medium text-[#334E68]">{s.label}</span>
                      </div>
                      <motion.span
                        key={`${s.id}-${s.pct}`}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        className="font-mono font-bold text-[#113353] text-[9.5px] ml-1"
                      >
                        {s.pct}%
                      </motion.span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Workload / Team Breakdown (4 cols) */}
              <div
                data-product-target="workload-team"
                className="lg:col-span-4 bg-white border border-[#E5EAF2] rounded-[12px] p-3.5 shadow-3xs flex flex-col justify-between"
              >
                <div className="space-y-0.5 border-b border-[#E5EAF2] pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#113353] text-[13px]">Workload</h3>
                    <span className="text-[9px] font-extrabold text-[#627D98] uppercase tracking-wider">
                      TEAM BREAKDOWN
                    </span>
                  </div>
                  <p className="text-[10px] text-[#627D98] leading-tight">
                    Workload share, completed deliverables and available capacity per team member.
                  </p>
                </div>

                {/* Team member rows */}
                <div className="py-1.5 space-y-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.name}
                      data-product-target={member.targetKey}
                      className={`space-y-1 p-1 rounded-[6px] transition-all ${
                        activeTarget === member.targetKey
                          ? 'ring-2 ring-[#DC2626]/30 bg-rose-50/50'
                          : member.isRebalanced && effectiveStep === 2
                          ? 'ring-1.5 ring-[#0D9488]/40 bg-[#F0FDF4]/50'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10.5px]">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-bold text-[#113353] truncate">{member.name}</span>
                          {member.name === 'Nikhil Jain' && effectiveStep >= 2 && (
                            <span className="text-[8.5px] font-bold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Optimized
                            </span>
                          )}
                          {member.name === 'Vikram Meena' && effectiveStep >= 2 && (
                            <span className="text-[8.5px] font-bold px-1 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                              Assigned
                            </span>
                          )}
                        </div>
                        <motion.span
                          key={`${member.name}-${member.estHours}`}
                          initial={{ opacity: 0.6 }}
                          animate={{ opacity: 1 }}
                          className={`font-mono font-bold text-[10px] shrink-0 ${
                            member.isOverloaded
                              ? 'text-[#DC2626]'
                              : member.name === 'Nikhil Jain' && effectiveStep >= 2
                              ? 'text-[#0D9488]'
                              : 'text-[#627D98]'
                          }`}
                        >
                          {member.estHours} / {member.capacityHours}h
                        </motion.span>
                      </div>

                      {/* Stacked bar */}
                      <div className="w-full bg-[#F1F5F9] rounded-[5px] h-[18px] flex overflow-hidden border border-[#CBD5E1]/60">
                        {member.segments.map((seg) => (
                          <motion.div
                            key={seg.key}
                            initial={false}
                            animate={{ width: `${seg.width}%` }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full flex items-center justify-center text-[8.5px] font-bold text-white font-mono"
                            style={{ backgroundColor: seg.color }}
                          >
                            {seg.width >= 18 ? seg.label : ''}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team Legend */}
                <div className="pt-2 border-t border-[#E5EAF2] flex items-center justify-between text-[10px] text-[#627D98] font-medium flex-wrap gap-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-[2px] bg-[#2563EB]" />
                    <span>Complete</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-[2px] bg-[#0D9488]" />
                    <span>In Progress</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-[2px] bg-[#818CF8]" />
                    <span>Not Started</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-[2px] bg-[#DC2626]" />
                    <span>Overdue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 4. Docked Bottom Timer Bar */}
      <PyngynBottomTimer />
    </div>
  );
};
