'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, FileText, ExternalLink, Building2, Download, MessageSquare } from 'lucide-react';

export interface ClientPortalViewProps {
  clientName?: string;
  firmName?: string;
  gstProgress?: number;
  statusBadge?: string;
  docCount?: string;
  actionItemsCount?: number;
  className?: string;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  clientName = 'Oswal Exports',
  firmName = 'Sharma & Associates',
  gstProgress = 100,
  statusBadge = 'Filed & Verified',
  docCount = '3 / 3 Received ✓',
  actionItemsCount = 2,
  className = '',
}) => {
  const isComplete = gstProgress >= 100;

  return (
    <div className={`w-full h-full flex flex-col bg-[#F8FAFC] overflow-hidden select-none font-sans ${className}`}>
      {/* 1. Client Portal Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200/90 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#004AAD] text-white font-bold text-[11px] shadow-2xs">
            OE
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[14px] text-slate-900 leading-none">
                {clientName}
              </span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-[#004AAD] border border-blue-200/60 uppercase tracking-wide">
                CLIENT PORTAL
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {firmName} ClientSpace · FY 2026–27
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10.5px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Connected to {firmName}</span>
        </span>
      </div>

      {/* 2. Portal Sub-Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 bg-white px-4 text-[12px] font-medium text-slate-600">
        <button type="button" className="border-b-2 border-[#004AAD] py-2 font-bold text-[#004AAD]">
          Compliance Dashboard
        </button>
        <button type="button" className="py-2 hover:text-slate-900">
          Engagements
        </button>
        <button type="button" className="py-2 hover:text-slate-900 flex items-center gap-1.5">
          <span>Action Items</span>
          <span className="rounded-full bg-blue-100 text-[#004AAD] px-1.5 py-0.2 text-[9px] font-bold">
            {actionItemsCount}
          </span>
        </button>
        <button type="button" className="py-2 hover:text-slate-900">
          Documents
        </button>
        <button type="button" className="py-2 hover:text-slate-900 hidden sm:inline">
          Chat
        </button>
      </div>

      {/* 3. Main Client Viewport */}
      <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-hidden">
        {/* Compliance Progress Card */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-3xs flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 block">
                LIVE STATUTORY TRACKER
              </span>
              <h2 className="text-[13.5px] font-bold text-slate-900 leading-tight mt-0.5">
                GST Compliance — August 2026 (Q2 FY27)
              </h2>
              <span className="text-[10px] text-slate-500">
                {firmName} has filed GSTR-3B on the GSTN portal.
              </span>
            </div>
            <div className="text-right">
              <motion.span
                key={gstProgress}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                className={`text-[20px] font-bold block leading-none ${
                  isComplete ? 'text-emerald-600' : 'text-[#004AAD]'
                }`}
              >
                {gstProgress}%
              </motion.span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                {statusBadge}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/80">
            <motion.div
              animate={{ width: `${gstProgress}%` }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isComplete ? 'bg-emerald-500' : 'bg-[#004AAD]'
              }`}
            />
          </div>
        </div>

        {/* 2-Column Detail Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: GSTR-3B Filing */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-3xs">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-bold text-slate-900">GSTR-3B Filing</span>
              <span className="rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.5 text-[8.5px] font-bold border border-emerald-200 inline-flex items-center gap-1">
                <CheckCircle2 size={9} />
                <span>FILED</span>
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 mt-1 block">
              ARN: AA270826019482M
            </span>
            <span className="text-[9.5px] text-slate-400 mt-0.5 block">
              Filed on 20 Sep 2026 · OTP Verified
            </span>
          </div>

          {/* Card 2: ITC Reconciliation */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-3xs">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-bold text-slate-900">ITC Reconciliation</span>
              <span className="rounded bg-blue-50 text-[#004AAD] px-1.5 py-0.5 text-[8.5px] font-bold border border-blue-200 inline-flex items-center gap-1">
                <CheckCircle2 size={9} />
                <span>MATCHED</span>
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 mt-1 block">
              ₹3.2L Mismatch Resolved
            </span>
            <span className="text-[9.5px] text-slate-400 mt-0.5 block">
              {docCount}
            </span>
          </div>
        </div>

        {/* Assurance Footer */}
        <div className="rounded-xl border border-slate-200/70 bg-white p-2.5 flex items-center justify-between text-[10.5px]">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Client data secured under firm 256-bit encryption</span>
          </div>
          <span className="font-semibold text-[#004AAD] flex items-center gap-1 cursor-pointer hover:underline">
            <span>Download Ack Receipt</span>
            <ExternalLink size={10} />
          </span>
        </div>
      </div>
    </div>
  );
};
