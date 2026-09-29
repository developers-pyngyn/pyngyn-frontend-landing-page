'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynExecutiveDashboardViewProps {
  className?: string;
  activeTarget?: string;
}

export const PyngynExecutiveDashboardView: React.FC<PyngynExecutiveDashboardViewProps> = ({
  className = '',
  activeTarget,
}) => {
  const [layoutMode, setLayoutMode] = useState<'3' | '2'>('3');
  const [isDefaultHome, setIsDefaultHome] = useState(true);

  // Speedometer calculation: 88% score on 157 perimeter semi-circle
  const score = 88;
  const strokeDash = (score / 100) * 157;

  const deadlines = [
    {
      id: 'd1',
      title: 'GSTR-3B Monthly Return Filing (August 2026)',
      client: 'Oswal Exports',
      form: 'GSTR-3B',
      priority: 'high',
      status: 'filed',
      statusLabel: 'Filed & Synced',
      due: '20 Sep',
      assignee: 'Nikhil Jain',
      assigneeInitials: 'NJ',
    },
    {
      id: 'd2',
      title: 'Sec 44AB Tax Audit & Form 3CD Compilation',
      client: 'Manufacturing Client',
      form: 'Form 3CD',
      priority: 'urgent',
      status: 'review',
      statusLabel: 'Internal Review',
      due: '30 Sep',
      assignee: 'Pooja Sharma',
      assigneeInitials: 'PS',
    },
    {
      id: 'd3',
      title: 'Advance Tax Q2 Instalment Verification',
      client: 'Logistics Client',
      form: 'Challan 280',
      priority: 'high',
      status: 'filed',
      statusLabel: 'Filed',
      due: '15 Sep',
      assignee: 'Aditya Verma',
      assigneeInitials: 'AV',
    },
    {
      id: 'd4',
      title: 'Provisional Balance Sheet & Ratio Analysis for SBI',
      client: 'Infrastructure Client',
      form: 'MIS/Banking',
      priority: 'urgent',
      status: 'in-progress',
      statusLabel: 'In Progress',
      due: '21 Sep',
      assignee: 'Rahul Mehta',
      assigneeInitials: 'RM',
    },
    {
      id: 'd5',
      title: 'ROC Form MGT-7 Annual Return Filing FY26',
      client: 'Corporate Enterprise Client',
      form: 'MGT-7',
      priority: 'normal',
      status: 'review',
      statusLabel: 'Partner Scrutiny',
      due: '30 Sep',
      assignee: 'Nikhil Jain',
      assigneeInitials: 'NJ',
    },
  ];

  const auditStages = [
    { label: 'Fixed Asset Depreciation Schedules', pct: 92, note: '34 assets verified' },
    { label: 'Sec 40A(3) Cash Payment Scrutiny', pct: 85, note: 'Ledger scanned' },
    { label: 'Sec 43B Statutory Dues & PF Verification', pct: 78, note: 'Challans cross-matched' },
    { label: 'TDS Reconciliation (Form 26AS vs Books)', pct: 94, note: 'Zero mismatch' },
    { label: 'Form 3CD Annexures & Draft Report', pct: 88, note: '4-Eye sign-off queue' },
  ];

  const teamPipelines = [
    {
      team: 'Corporate Audit Team',
      lead: 'CA Rajesh Jain',
      filed: 18,
      review: 4,
      blocked: 2,
      total: 24,
    },
    {
      team: 'GST Compliance Team',
      lead: 'Aman Gupta',
      filed: 22,
      review: 3,
      blocked: 1,
      total: 26,
    },
    {
      team: 'Direct Tax & Scrutiny',
      lead: 'Pooja Sharma',
      filed: 14,
      review: 5,
      blocked: 2,
      total: 21,
    },
  ];

  return (
    <div
      data-product-target={activeTarget || 'executive-dashboard-view'}
      className={`w-full h-full flex flex-col bg-[#F8FAFC] text-[#113353] overflow-y-auto select-none font-sans ${className}`}
    >
      {/* 1. Header with Title, Breadcrumbs, and Top Controls */}
      <div className="bg-white border-b border-[#E5EAF2] px-4 py-3 shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#627D98] uppercase tracking-wider">
            <span>Analytics</span>
            <span>/</span>
            <span>Dashboards</span>
            <span>/</span>
            <span className="text-[#004AAD]">Statutory Audit &amp; Tax Command</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-[17px] font-extrabold text-[#113353] tracking-tight">
              Statutory Audit &amp; Tax Command
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
              Corporate Audit &amp; Tax Portfolios
            </span>
            <span className="text-[11.5px] text-[#627D98]">· CA Rajesh Jain (Partner)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Default Landing Page Star Toggle */}
          <button
            type="button"
            onClick={() => setIsDefaultHome(!isDefaultHome)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11.5px] font-bold transition-all border shadow-2xs cursor-pointer ${
              isDefaultHome
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <PyngynIcons.star size={13} className={isDefaultHome ? 'fill-amber-400 text-amber-500' : 'text-slate-400'} />
            <span>{isDefaultHome ? 'Default Command' : 'Set as Default'}</span>
          </button>

          {/* Grid Layout Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-[7px] border border-slate-200 text-[11.5px] font-bold">
            <button
              type="button"
              onClick={() => setLayoutMode('3')}
              className={`px-2 py-1 rounded-[5px] transition-all cursor-pointer ${
                layoutMode === '3' ? 'bg-white text-[#113353] shadow-3xs' : 'text-slate-500 hover:text-[#113353]'
              }`}
            >
              3 Cols
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('2')}
              className={`px-2 py-1 rounded-[5px] transition-all cursor-pointer ${
                layoutMode === '2' ? 'bg-white text-[#113353] shadow-3xs' : 'text-slate-500 hover:text-[#113353]'
              }`}
            >
              2 Cols
            </button>
          </div>

          {/* Add Widget Button */}
          <button
            type="button"
            className="h-[30px] px-3 bg-[#113353] hover:bg-[#0B2238] text-white text-[12px] font-bold rounded-[7px] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
          >
            <PyngynIcons.plus size={12} />
            <span>Add Widget</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Bar: Operational Scope & Summary */}
      <div className="bg-white border-b border-[#E5EAF2] px-4 py-2 flex items-center justify-between text-[11.5px] text-[#627D98]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#113353]">Firm-wide statutory deliverables, Form 3CD audit gates &amp; MCA V3 filings</span>
          <span>·</span>
          <span>Scope: <strong className="text-[#113353]">All Practice Portfolios</strong></span>
          <span>·</span>
          <span><strong className="text-[#113353]">24</strong> active filings in progress</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> 18 Filed
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> 4 In Review Gate
          </span>
          <span className="flex items-center gap-1 font-semibold text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> 2 Blocked
          </span>
        </div>
      </div>

      {/* 3. Main Dashboard Widgets Grid */}
      <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Widget 1: Statutory Filing Velocity (Gauge) - Span 4 */}
        <div className="lg:col-span-4 bg-white border border-[#CBD5E1]/80 rounded-[10px] p-4 shadow-3xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-extrabold text-[#627D98] uppercase tracking-wider">
              Statutory Filing Velocity
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Target 85%
            </span>
          </div>

          <div className="flex items-center gap-4 my-3">
            <div className="relative w-28 h-16 flex items-end justify-center shrink-0">
              <svg className="w-28 h-16 overflow-visible" viewBox="0 0 100 55">
                {/* Background arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Foreground value arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="157"
                  strokeDashoffset={157 - strokeDash}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute bottom-0 text-center font-extrabold text-[20px] text-[#113353] leading-none">
                {score}%
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-extrabold text-[#113353]">
                Compliance Strong
              </div>
              <p className="text-[11px] text-[#627D98] mt-0.5 leading-snug">
                22 of 25 statutory milestones completed on schedule this cycle.
              </p>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-[#627D98]">Filing Pace</span>
            <span className="font-bold text-emerald-700">↑ 14% vs Previous Cycle</span>
          </div>
        </div>

        {/* Widget 2: 4-Eye Review Queue Status - Span 4 */}
        <div className="lg:col-span-4 bg-white border border-[#CBD5E1]/80 rounded-[10px] p-4 shadow-3xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-extrabold text-[#627D98] uppercase tracking-wider">
              Partner 4-Eye Review Gates
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              4 Pending
            </span>
          </div>

          <div className="my-2 space-y-2">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11.5px]">
              <div>
                <span className="font-bold text-[#113353]">Manufacturing Client</span>
                <p className="text-[10px] text-[#627D98]">Sec 44AB Form 3CD Final Draft</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-100 text-amber-800">
                Partner Sign-off
              </span>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11.5px]">
              <div>
                <span className="font-bold text-[#113353]">Corporate Enterprise Client</span>
                <p className="text-[10px] text-[#627D98]">ROC Form MGT-7 Annual Filing</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-100 text-amber-800">
                Awaiting Gate
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-[#627D98]">Average Review Turnaround</span>
            <span className="font-bold text-[#113353]">3.2 hours</span>
          </div>
        </div>

        {/* Widget 3: Realised Fee Retainer Health - Span 4 */}
        <div className="lg:col-span-4 bg-white border border-[#CBD5E1]/80 rounded-[10px] p-4 shadow-3xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-extrabold text-[#627D98] uppercase tracking-wider">
              Practice Retainer Realisation
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              ₹94.8L / Mo
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[22px] font-black text-[#113353]">92.4%</span>
              <span className="text-[11px] font-semibold text-emerald-700">₹4.2L outstanding</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-1.5">
              <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{ width: '92.4%' }} />
            </div>
            <p className="text-[10.5px] text-[#627D98] mt-1.5">
              98% of corporate audit retainer milestones billed on time.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-[#627D98]">Audit Engagements Active</span>
            <span className="font-bold text-[#113353]">14 Corporate Entities</span>
          </div>
        </div>

        {/* Widget 4: Statutory Filing Deadlines List - Span 7 */}
        <div className="lg:col-span-7 bg-white border border-[#CBD5E1]/80 rounded-[10px] p-4 shadow-3xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11.5px] font-extrabold text-[#627D98] uppercase tracking-wider">
              Impending Statutory Filing Deadlines
            </span>
            <span className="text-[11px] text-[#627D98]">Next 15 Days</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11.5px]">
              <thead>
                <tr className="border-b border-slate-200/80 text-[10.5px] font-bold text-[#627D98] uppercase tracking-wider">
                  <th className="pb-2">Engagement / Task</th>
                  <th className="pb-2">Client</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Lead</th>
                  <th className="pb-2 text-right">Statutory Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {deadlines.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 pr-2">
                      <div className="font-semibold text-[#113353] truncate max-w-[210px]" title={d.title}>
                        {d.title}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{d.form}</span>
                    </td>
                    <td className="py-2.5 pr-2 text-slate-700 truncate max-w-[120px]">
                      {d.client}
                    </td>
                    <td className="py-2.5 pr-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'filed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : d.status === 'review'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {d.statusLabel}
                      </span>
                    </td>
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[9.5px] font-bold flex items-center justify-center">
                          {d.assigneeInitials}
                        </span>
                        <span className="text-slate-600 truncate max-w-[80px]">{d.assignee}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-[#113353]">
                      {d.due}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Widget 5: Sec 44AB Tax Audit Progress - Span 5 */}
        <div className="lg:col-span-5 bg-white border border-[#CBD5E1]/80 rounded-[10px] p-4 shadow-3xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-extrabold text-[#627D98] uppercase tracking-wider">
              Sec 44AB Tax Audit Progress (FY26)
            </span>
            <span className="text-[11px] font-bold text-[#004AAD]">Target 30 Sep</span>
          </div>

          <div className="space-y-2.5 my-auto">
            {auditStages.map((stage, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#113353]">{stage.label}</span>
                  <span className="font-bold text-[#113353]">{stage.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9.5px] text-[#627D98]">
                  <span>{stage.note}</span>
                  <span>Verified</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-[#627D98]">Audit Working Papers Verified</span>
            <span className="font-bold text-emerald-700">142 of 158 Working Papers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
