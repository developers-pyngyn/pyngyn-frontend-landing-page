'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, ArrowRight, Clock } from 'lucide-react';

export interface ComplianceViewProps {
  complianceProgress?: number;
  actionRequiredCount?: number;
  className?: string;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({
  complianceProgress = 86,
  actionRequiredCount = 2,
  className = '',
}) => {
  return (
    <div className={`w-full h-full flex flex-col bg-white overflow-hidden select-none font-sans ${className}`}>
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-2.5 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#004AAD] text-white shadow-2xs">
            <ShieldCheck size={15} />
          </div>
          <div>
            <h1 className="text-[14px] font-bold text-slate-900 leading-tight">
              Compliance Hub · Statutory Tracker
            </h1>
            <p className="text-[10px] text-slate-400 leading-tight">
              Sharma &amp; Associates · Practice Governance
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#004AAD]">
          <span>FY 2026–27 Q2 Active</span>
        </span>
      </div>

      {/* 2. Top Progress & Action Grid */}
      <div className="grid grid-cols-2 gap-3 p-3.5 border-b border-slate-100 bg-slate-50/50">
        {/* Compliance Progress */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
            PRACTICE COMPLIANCE PROGRESS
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <motion.span
              key={complianceProgress}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="text-[24px] font-bold text-slate-900 leading-none"
            >
              {complianceProgress}%
            </motion.span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
              Statutory Returns on Track
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              animate={{ width: `${complianceProgress}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
        </div>

        {/* Action Items */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-3xs flex flex-col justify-between">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
            ACTIONS REQUIRED
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <motion.span
              key={actionRequiredCount}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="text-[24px] font-bold text-[#004AAD] leading-none"
            >
              {actionRequiredCount}
            </motion.span>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
              Client Sign-Offs Pending
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Next audit scrutiny: Northstar Mfg</span>
        </div>
      </div>

      {/* 3. Deadlines & Service Progress */}
      <div className="flex-1 p-3.5 flex flex-col gap-2.5 overflow-hidden">
        <span className="text-[10.5px] font-bold text-slate-700 uppercase tracking-wider block">
          UPCOMING STATUTORY TARGETS
        </span>

        {/* Row 1 */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 flex items-center justify-between shadow-3xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={13} />
            </div>
            <div>
              <span className="text-[11.5px] font-bold text-slate-900 block leading-tight">
                GSTR-3B Monthly Return Filing
              </span>
              <span className="text-[10px] text-slate-400 block">
                Oswal Exports · Verified on GSTN Portal
              </span>
            </div>
          </div>
          <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
            <CheckCircle2 size={11} className="text-emerald-600" />
            Filed
          </span>
        </div>

        {/* Row 2 */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 flex items-center justify-between shadow-3xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Clock size={13} />
            </div>
            <div>
              <span className="text-[11.5px] font-bold text-slate-900 block leading-tight">
                Advance Tax Installment (Q2 FY27)
              </span>
              <span className="text-[10px] text-slate-400 block">
                Bharat Manufacturing · Computation Approved
              </span>
            </div>
          </div>
          <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
};
