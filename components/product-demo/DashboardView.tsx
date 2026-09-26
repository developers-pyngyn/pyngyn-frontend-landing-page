'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, FileCheck, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

export interface DashboardViewProps {
  complianceIndex?: number;
  statutoryFilingsRatio?: string;
  gstReturnsFiledCount?: number;
  className?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  complianceIndex = 86,
  statutoryFilingsRatio = '35/40',
  gstReturnsFiledCount = 18,
  className = '',
}) => {
  return (
    <div className={`w-full h-full flex flex-col bg-white overflow-hidden select-none font-sans ${className}`}>
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-2.5 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#113353] text-white shadow-2xs">
            <ShieldCheck size={15} />
          </div>
          <div>
            <h1 className="text-[14px] font-bold text-slate-900 leading-tight">
              Statutory Audit &amp; Tax Command
            </h1>
            <p className="text-[10px] text-slate-400 leading-tight">
              Executive Practice Overview · FY 2026–27
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#004AAD]">
          <span>Partner Sign-Off Gate Active</span>
        </span>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 gap-3 p-3.5 border-b border-slate-100 bg-slate-50/50">
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <div>
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
              PRACTICE COMPLIANCE INDEX
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <motion.span
                key={complianceIndex}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                className="text-[26px] font-bold text-slate-900 leading-none"
              >
                {complianceIndex}%
              </motion.span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                +2% Post GST Filing
              </span>
            </div>
          </div>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              animate={{ width: `${complianceIndex}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <div>
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
              STATUTORY FILINGS COMPLETED
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <motion.span
                key={statutoryFilingsRatio}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                className="text-[26px] font-bold text-[#004AAD] leading-none"
              >
                {statutoryFilingsRatio}
              </motion.span>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                87.5% Target Achieved
              </span>
            </div>
          </div>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-[#004AAD] w-[87.5%]" />
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Body: 2-Column Layout */}
      <div className="flex-1 p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 min-h-0 overflow-hidden">
        {/* Left Column: Monthly Filing Velocity Bar Chart */}
        <div className="md:col-span-6 rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12.5px] font-bold text-slate-900 leading-tight">
                  Filing Velocity Trend
                </span>
                <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold text-[#004AAD] uppercase">
                  Monthly Volume
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Monthly volume of statutory returns certified &amp; filed
              </p>
            </div>
            <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ↑ 24% vs Q1
            </span>
          </div>

          {/* Column Bars */}
          <div className="py-2 px-1">
            <div className="h-32 flex items-end justify-between gap-2 relative border-b border-slate-200 pb-1">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full" />
                <div className="border-b border-dashed border-slate-200 w-full" />
                <div className="border-b border-dashed border-slate-200 w-full" />
              </div>

              {[
                { month: 'Apr', count: 14, height: 40, isCurrent: false },
                { month: 'May', count: 18, height: 51, isCurrent: false },
                { month: 'Jun', count: 24, height: 68, isCurrent: false },
                { month: 'Jul', count: 28, height: 80, isCurrent: false },
                { month: 'Aug', count: 35, height: 100, isCurrent: true },
                { month: 'Sep', count: 29, height: 82, isCurrent: false },
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-1 relative z-10 group/bar cursor-pointer">
                  {bar.isCurrent && (
                    <span className="absolute -top-3 text-[7.5px] font-extrabold text-[#004AAD] bg-blue-50 px-1 rounded shadow-3xs border border-blue-200">
                      Peak
                    </span>
                  )}
                  <span
                    className={`text-[9.5px] font-mono font-bold ${
                      bar.isCurrent ? 'text-[#004AAD]' : 'text-slate-700'
                    }`}
                  >
                    {bar.count}
                  </span>
                  <div className="w-full max-w-[26px] bg-slate-100 rounded-t-[4px] h-24 flex items-end overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.height}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full rounded-t-[4px] transition-all group-hover/bar:brightness-110 ${
                        bar.isCurrent
                          ? 'bg-gradient-to-t from-[#004AAD] to-blue-500 shadow-sm'
                          : 'bg-slate-400'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[9px] font-semibold truncate mt-0.5 ${
                      bar.isCurrent ? 'text-[#004AAD] font-bold' : 'text-slate-500'
                    }`}
                  >
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
            <span>Q1 Average: 18.6 returns / month</span>
            <span className="font-bold text-[#004AAD]">Q2 Surge: 35 returns / month</span>
          </div>
        </div>

        {/* Right Column: Service Line Progress & 44AB Breakdown */}
        <div className="md:col-span-6 rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12.5px] font-bold text-slate-900 leading-tight">
                  Service Line Progress
                </span>
                <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-bold text-slate-600 uppercase">
                  Sec 44AB &amp; GST
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Statutory audit &amp; corporate compliance milestones
              </p>
            </div>
            <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              4 Disciplines
            </span>
          </div>

          <div className="space-y-2 py-1">
            {/* Line 1: GST */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-700">GST Monthly Returns (GSTR-3B)</span>
                <span className="font-mono font-bold text-emerald-700">35 / 40 (87.5%)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[87.5%]" />
              </div>
            </div>

            {/* Line 2: Sec 44AB */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-700">Tax Audit Sec 44AB (Form 3CD)</span>
                <span className="font-mono font-bold text-amber-700">26 / 40 (65.0%)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 w-[65%]" />
              </div>
            </div>

            {/* Line 3: Corporate ROC */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-700">Corporate ROC / MCA V3 Filings</span>
                <span className="font-mono font-bold text-blue-700">14 / 33 (42.4%)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[42.4%]" />
              </div>
            </div>

            {/* Line 4: TDS 26Q */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-700">TDS Challan 281 &amp; Form 26Q</span>
                <span className="font-mono font-bold text-purple-700">18 / 20 (90.0%)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 w-[90%]" />
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
            <span>Unified CBDT &amp; GSTN Radar</span>
            <span className="text-emerald-700 font-bold">All APIs Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
};
