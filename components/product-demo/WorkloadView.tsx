'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface WorkloadViewProps {
  activeTasks?: number;
  capacityUtilization?: number;
  overdueTasks?: number;
  nikhilHours?: string;
  priyaHours?: string;
  rohanHours?: string;
  className?: string;
}

export const WorkloadView: React.FC<WorkloadViewProps> = ({
  activeTasks = 22,
  capacityUtilization = 49,
  overdueTasks = 2,
  nikhilHours = '35 / 35h (100%)',
  priyaHours = '32 / 35h (91%)',
  rohanHours = '24 / 35h (68%)',
  className = '',
}) => {
  return (
    <div className={`w-full h-full flex flex-col bg-white overflow-hidden select-none font-sans ${className}`}>
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-2.5 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#004AAD] text-white shadow-2xs">
            <Users size={15} />
          </div>
          <div>
            <h1 className="text-[14px] font-bold text-slate-900 leading-tight">
              Practice Workload &amp; Capacity
            </h1>
            <p className="text-[10px] text-slate-400 leading-tight">
              Sharma &amp; Associates · Team Resource Planning
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
          <CheckCircle2 size={11} />
          <span>Real-Time Sync</span>
        </span>
      </div>

      {/* 2. Workload KPI Metrics Strip */}
      <div className="grid grid-cols-3 gap-2.5 p-3.5 border-b border-slate-100 bg-slate-50/50">
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
            ACTIVE DELIVERABLES
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <motion.span
              key={activeTasks}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="text-[22px] font-bold text-slate-900 leading-none"
            >
              {activeTasks}
            </motion.span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
              -1 Completed
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
            CAPACITY UTILIZATION
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <motion.span
              key={capacityUtilization}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="text-[22px] font-bold text-slate-900 leading-none"
            >
              {capacityUtilization}%
            </motion.span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
              Optimal Zone
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
            AT RISK / OVERDUE
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <motion.span
              key={overdueTasks}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="text-[22px] font-bold text-slate-900 leading-none"
            >
              {overdueTasks}
            </motion.span>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
              ↓ Dropped from 3
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Workload Body: 2-Column Layout */}
      <div className="flex-1 p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 min-h-0 overflow-hidden">
        {/* Left Column: Task Lengths & Scope Distribution Vertical Bar Chart */}
        <div className="md:col-span-6 rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12.5px] font-bold text-slate-900 leading-tight">
                  Task Lengths
                </span>
                <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-bold text-slate-600 uppercase">
                  Scope Distribution
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Estimated scope length &amp; deliverable distribution by category
              </p>
            </div>
            <span className="text-[9.5px] font-mono font-bold text-[#004AAD] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              43 Total Tasks
            </span>
          </div>

          {/* Vertical Column Bar Chart */}
          <div className="py-2 px-1">
            <div className="h-32 flex items-end justify-between gap-2 relative border-b border-slate-200 pb-1">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full" />
                <div className="border-b border-dashed border-slate-200 w-full" />
                <div className="border-b border-dashed border-slate-200 w-full" />
              </div>

              {[
                { key: 'audit', label: 'Audit', count: 4, height: 35, color: '#004AAD' },
                { key: 'tax3cd', label: '3CD', count: 8, height: 65, color: '#D97706' },
                { key: 'tds', label: 'TDS', count: 12, height: 100, color: '#10B981' },
                { key: 'gst', label: 'GST', count: 6, height: 50, color: '#7C3AED' },
                { key: 'roc', label: 'ROC', count: 10, height: 83, color: '#2563EB' },
                { key: 'advtax', label: 'AdvTax', count: 3, height: 26, color: '#F59E0B' },
              ].map((item) => (
                <div key={item.key} className="flex-1 flex flex-col items-center gap-1 relative z-10 group/bar cursor-pointer">
                  <span className="text-[9.5px] font-mono font-bold text-slate-700 group-hover/bar:text-[#004AAD] transition-colors">
                    {item.count}
                  </span>
                  <div className="w-full max-w-[26px] bg-slate-100 rounded-t-[4px] h-24 flex items-end overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${item.height}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full rounded-t-[4px] group-hover/bar:brightness-110 transition-all"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-500 truncate mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="pt-1.5 border-t border-slate-100 grid grid-cols-3 gap-1 text-[9.5px] text-slate-500">
            <span className="flex items-center gap-1 truncate">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" /> TDS Returns (12)
            </span>
            <span className="flex items-center gap-1 truncate">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" /> MCA / ROC (10)
            </span>
            <span className="flex items-center gap-1 truncate">
              <span className="w-2 h-2 rounded-full bg-[#D97706] shrink-0" /> Tax Audit (8)
            </span>
          </div>
        </div>

        {/* Right Column: Team Member Capacity Breakdown */}
        <div className="md:col-span-6 rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <div>
              <span className="text-[12.5px] font-bold text-slate-900 block leading-tight">
                Team Capacity Rebalance
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Post GST Filing Allocation (35h / week target)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9.5px] font-bold text-emerald-700">
              Auto-Balanced
            </span>
          </div>

          <div className="space-y-2.5 py-1">
            {/* Staff 1: Nikhil Jain */}
            <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10.5px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#D97706] text-[8.5px] font-bold text-white">
                    NJ
                  </span>
                  <span className="font-bold text-slate-900">Nikhil Jain</span>
                  <span className="text-[9.5px] text-slate-400">Senior Associate</span>
                </div>
                <motion.span
                  key={nikhilHours}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded"
                >
                  {nikhilHours}
                </motion.span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                <motion.div
                  animate={{ width: nikhilHours.includes('100%') ? '100%' : '120%' }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
            </div>

            {/* Staff 2: Priya Sharma */}
            <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10.5px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7E22CE] text-[8.5px] font-bold text-white">
                    PS
                  </span>
                  <span className="font-bold text-slate-900">Priya Sharma</span>
                  <span className="text-[9.5px] text-slate-400">GST Lead</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                  {priyaHours}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                <div className="h-full rounded-full bg-[#004AAD] w-[91%]" />
              </div>
            </div>

            {/* Staff 3: Rohan Meena */}
            <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10.5px]">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#004AAD] text-[8.5px] font-bold text-white">
                    RM
                  </span>
                  <span className="font-bold text-slate-900">Rohan Meena</span>
                  <span className="text-[9.5px] text-slate-400">Tax Analyst</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                  {rohanHours}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                <div className="h-full rounded-full bg-slate-400 w-[68%]" />
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
            <span>Workload Engine v2.4</span>
            <span className="text-emerald-700 font-bold">Zero Capacity Overrun</span>
          </div>
        </div>
      </div>
    </div>
  );
};
