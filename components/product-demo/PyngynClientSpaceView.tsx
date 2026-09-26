'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynClientSpaceViewProps {
  clientName?: string;
  firmName?: string;
  className?: string;
  activeTarget?: string;
  complianceProgress?: number;
  documentStatus?: 'Processing' | 'Received' | 'Approved';
  pendingDocsCount?: number;
  receivedDocsCount?: number;
  serviceProgressGst?: number;
  autoPlay?: boolean;
  animStep?: number;
  onStepChange?: (step: number) => void;
}

export const PyngynClientSpaceView: React.FC<PyngynClientSpaceViewProps> = ({
  clientName = 'Oswal Exports',
  firmName = 'Sharma & Associates',
  className = '',
  activeTarget,
  complianceProgress: controlledProgress,
  documentStatus: controlledDocStatus,
  pendingDocsCount: controlledPendingDocs,
  receivedDocsCount: controlledReceivedDocs,
  serviceProgressGst: controlledGstProgress,
  autoPlay = true,
  animStep,
  onStepChange,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'engagements' | 'action-items' | 'documents' | 'chat'>('dashboard');
  const [activePeriod, setActivePeriod] = useState<string>('FY 2026-27');

  // Animation cycle step:
  // Step 0: Baseline (78% Progress, 18 Done, 2 docs Processing, 3 Blockers pending, GSTR-3B normal)
  // Step 1: Upcoming Deadline Highlight (GSTR-3B subtle professional focus)
  // Step 2: Document 1 Received (Bank Statements Processing -> Received ✓, 4 Received · 1 Pending, Blockers 3 -> 2, Progress 80%)
  // Step 3: Compliance & Service Progress Elevation (Progress 82%, 19 Done, GST Compliance 86% -> 92%)
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof animStep === 'number') return animStep;
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const stepParam = sp.get('step');
      if (stepParam !== null && !isNaN(parseInt(stepParam, 10))) {
        return parseInt(stepParam, 10);
      }
    }
    return 0;
  });

  // Sync with prop animStep if passed
  useEffect(() => {
    if (typeof animStep === 'number') {
      setCurrentStep(animStep);
    }
  }, [animStep]);

  // Autonomous animation loop (No visible animation controls)
  useEffect(() => {
    if (!autoPlay || typeof animStep === 'number') return;
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      if (sp.has('step')) return; // Allow manual URL testing without auto-stepping
    }

    const durations = [3400, 2800, 3200, 4000];
    const timer = setTimeout(() => {
      const next = (currentStep + 1) % 4;
      setCurrentStep(next);
      if (onStepChange) onStepChange(next);
    }, durations[currentStep] || 3200);

    return () => clearTimeout(timer);
  }, [autoPlay, animStep, currentStep, onStepChange]);

  // Compute derived state based on currentStep or controlled props
  const isDocReceived = controlledDocStatus
    ? controlledDocStatus === 'Received' || controlledDocStatus === 'Approved'
    : currentStep >= 2;

  const docStatus = controlledDocStatus || (isDocReceived ? 'Received' : 'Processing');
  const receivedCount = controlledReceivedDocs !== undefined ? controlledReceivedDocs : (isDocReceived ? 4 : 3);
  const pendingCount = controlledPendingDocs !== undefined ? controlledPendingDocs : (isDocReceived ? 1 : 2);
  const blockerCount = isDocReceived ? 2 : 3;

  // Compliance progress transitions smoothly: 78% -> 80% (Step 2) -> 82% (Step 3)
  const progressPercent = controlledProgress !== undefined
    ? controlledProgress
    : currentStep === 0 || currentStep === 1
    ? 78
    : currentStep === 2
    ? 80
    : 82;

  const isProgressElevated = progressPercent > 78;
  const gstProgressPercent = controlledGstProgress !== undefined
    ? controlledGstProgress
    : currentStep >= 3
    ? 92
    : 86;

  const completedTasksCount = currentStep >= 3 ? 19 : 18;
  const activeTasksCount = currentStep >= 3 ? 4 : 5;

  const isDeadlineHighlighted = currentStep === 1 || currentStep === 2 || currentStep === 3;

  return (
    <div
      data-product-target="client-portal-view"
      className={`min-h-full bg-[#F8FAFC] text-[#113353] flex flex-col font-sans select-none overflow-y-auto ${className}`}
    >
      {/* 1. Global Branded Header Bar */}
      <header
        data-product-target="portal-top-bar"
        className="h-[48px] bg-white border-b border-[#E5EAF2] px-6 flex items-center justify-between shadow-3xs shrink-0"
      >
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-[15px] text-[#113353] tracking-tight">
            {clientName}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#EEF5FF] text-[#004AAD] text-[10px] font-extrabold uppercase tracking-wider border border-[#C2DCFF]">
            CLIENT PORTAL
          </span>
        </div>

        {/* Live CA Practice Sync Indicator */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[10.5px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#475569] font-medium">Live CA Sync:</span>
          <span className="text-[#113353] font-bold">{firmName}</span>
        </div>

        <div className="flex items-center gap-3.5 text-[12px]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#113353] text-white flex items-center justify-center font-bold text-[11px] shadow-3xs">
              SO
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="font-bold text-[#113353] block text-[11.5px]">Sunita Oswal</span>
              <span className="text-[9.5px] text-[#627D98]">Authorized Signatory</span>
            </div>
            <span className="px-1.5 py-0.2 rounded bg-[#F0FAF0] text-[#00960F] border border-[#B5EDB9] text-[9.5px] font-bold">
              ADMIN
            </span>
          </div>

          <div className="h-4 w-[1px] bg-[#E5EAF2]" />

          <button type="button" className="text-[#627D98] hover:text-[#113353] font-medium text-[11.5px] transition-colors cursor-pointer">
            Sign Out
          </button>

          <button
            type="button"
            className="px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] hover:bg-[#EEF5FF] text-[#113353] font-semibold border border-[#E5EAF2] text-[11px] flex items-center gap-1 transition-colors shadow-3xs cursor-pointer"
          >
            <span>← Staff Suite</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Room Banner Card with Authentic Architectural Dotted Pattern */}
      <div className="px-5 pt-3.5 pb-2">
        <div
          data-product-target="portal-room-banner"
          className="bg-white border border-[#E5EAF2] rounded-[10px] shadow-2xs overflow-hidden"
        >
          {/* Header background area with subtle warm gradient and authentic architectural dot matrix */}
          <div
            className="px-5 py-3.5 bg-gradient-to-r from-[#F8FAFC] via-white to-[#FFF7ED] border-b border-[#E5EAF2]/60 relative"
            style={{
              backgroundImage: 'radial-gradient(#CBD5E1 1.1px, transparent 1.1px)',
              backgroundSize: '16px 16px',
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-white border border-[#CBD5E1] shadow-3xs flex items-center justify-center text-[#113353]">
                  <PyngynIcons.folder size={16} />
                </div>
                <div>
                  <h2 className="text-[15.5px] font-black text-[#113353] tracking-tight">
                    GST Compliance - FY26
                  </h2>
                  <p className="text-[11px] text-[#627D98] font-medium">
                    {firmName} Client Space · FY 2026-27
                  </p>
                </div>
              </div>

              {/* Co-branded Control Stamp Badge */}
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-[6px] border border-[#E5EAF2] shadow-3xs text-[11px] font-bold">
                <span className="text-[#113353]">OE</span>
                <span className="text-[#627D98]">+</span>
                <span className="text-[#004AAD]">SA</span>
              </div>
            </div>

            {/* Room Title */}
            <div className="mt-2.5 flex items-center gap-2.5">
              <h1 className="text-[18px] font-black text-[#113353] tracking-tight">
                Oswal - Sharma
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#EBFDFF] text-[#129EA6] text-[9.5px] font-extrabold uppercase tracking-wider border border-[#B7F5F8]">
                VERIFIED CLIENT PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="px-5 flex items-center justify-between border-t border-[#E5EAF2] bg-white">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <PyngynIcons.dashboard size={13} /> },
                { id: 'engagements', label: 'Engagements', icon: <PyngynIcons.calendar size={13} /> },
                { id: 'action-items', label: 'Action Items', icon: <PyngynIcons.checkSquare size={13} /> },
                { id: 'documents', label: 'Documents', icon: <PyngynIcons.folder size={13} /> },
                { id: 'chat', label: 'Chat', icon: <PyngynIcons.more size={13} /> },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`h-9 px-3 flex items-center gap-1.5 text-[12px] font-bold border-b-2 cursor-pointer transition-colors whitespace-nowrap -mb-[1px] ${
                      isActive
                        ? 'text-[#004AAD] border-[#004AAD]'
                        : 'text-[#627D98] border-transparent hover:text-[#113353]'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="w-7 h-7 rounded-[5px] hover:bg-[#F8FAFC] text-[#627D98] hover:text-[#113353] flex items-center justify-center cursor-pointer transition-colors"
            >
              <PyngynIcons.search size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Toolbar: Compliance Dashboard + Period Pills + Upload CTA */}
      <div className="px-5 py-1.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-[13px] text-[#113353]">
            <PyngynIcons.kanban size={13} className="text-[#D97706]" />
            <span>Compliance Dashboard</span>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-white border border-[#CBD5E1] rounded-[6px] text-[11px] font-bold shadow-3xs">
            {['FY 2026-27', 'Q2 FY27', 'September', 'Q2 Track'].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setActivePeriod(period)}
                className={`px-2 py-0.5 rounded-[4px] transition-all cursor-pointer ${
                  activePeriod === period
                    ? 'bg-[#113353] text-white shadow-2xs font-extrabold'
                    : 'text-[#627D98] hover:text-[#113353]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded-[6px] text-[#113353] text-[11px] font-semibold flex items-center gap-1 shadow-3xs cursor-pointer"
          >
            <span>Widgets (13/13)</span>
            <PyngynIcons.chevronDown size={10} />
          </button>

          <button
            type="button"
            className="px-2.5 py-1 bg-white border border-[#CBD5E1] hover:border-[#113353] rounded-[6px] text-[#113353] text-[11px] font-bold flex items-center gap-1 shadow-3xs cursor-pointer"
          >
            <PyngynIcons.upload size={11} />
            <span>Upload</span>
          </button>

          <button
            type="button"
            className="px-3 py-1 bg-[#113353] hover:bg-[#0B2238] text-white rounded-[6px] text-[11px] font-bold shadow-2xs cursor-pointer"
          >
            Save View
          </button>
        </div>
      </div>

      {/* 4. Top Widget Row (4 Primary Cards) */}
      <div className="px-5 py-1.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Compliance Progress (Smoothly transitions 78% -> 80% -> 82%) */}
        <motion.div
          data-product-target="portal-card-progress"
          animate={{
            borderColor: isProgressElevated ? '#004AAD' : '#E5EAF2',
            boxShadow: isProgressElevated
              ? '0 4px 12px -2px rgba(0, 74, 173, 0.12), 0 2px 6px -1px rgba(0, 74, 173, 0.08)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.4 }}
          className="bg-white border rounded-[10px] p-3.5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5EAF2]/60">
            <h3 className="font-bold text-[12.5px] text-[#113353]">Compliance Progress</h3>
            <span className="px-1.5 py-0.2 rounded-full bg-[#F0FAF0] text-[#00960F] text-[9.5px] font-bold border border-[#B5EDB9]">
              On Track
            </span>
          </div>

          <div className="py-2 flex items-center justify-between">
            <div>
              <div className="text-[24px] font-black text-[#113353] leading-none transition-all flex items-baseline gap-1">
                <span>{progressPercent}%</span>
                <AnimatePresence>
                  {isProgressElevated && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] font-extrabold text-emerald-600"
                    >
                      +{progressPercent - 78}%
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-[10px] text-[#627D98] mt-1 font-medium">
                {completedTasksCount} Done · {activeTasksCount} Active · 3 Pending
              </p>
            </div>

            {/* Circular Progress Indicator Ring */}
            <div className="relative w-13 h-13 flex items-center justify-center">
              <svg width="52" height="52" className="transform -rotate-90">
                <circle cx="26" cy="26" r="21" stroke="#E2E8F0" strokeWidth="4.5" fill="transparent" />
                <motion.circle
                  cx="26"
                  cy="26"
                  r="21"
                  stroke="#10B981"
                  strokeWidth="4.5"
                  strokeDasharray="132"
                  animate={{
                    strokeDashoffset: 132 - (progressPercent / 100) * 132,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute font-bold text-[11px] text-[#113353]">{progressPercent}%</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#E5EAF2]/60 flex items-center justify-between text-[10.5px] font-medium text-[#627D98]">
            <span>26 Total Tasks</span>
            <span className="text-[#004AAD] font-bold hover:underline cursor-pointer">View All →</span>
          </div>
        </motion.div>

        {/* Card 2: Upcoming Deadlines (Compact List Structure) */}
        <motion.div
          data-product-target="portal-card-deadlines"
          animate={{
            borderColor: isDeadlineHighlighted ? '#F59E0B' : '#E5EAF2',
            boxShadow: isDeadlineHighlighted
              ? '0 4px 12px -2px rgba(245, 158, 11, 0.15)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.4 }}
          className="bg-white border rounded-[10px] p-3.5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5EAF2]/60">
            <h3 className="font-bold text-[12.5px] text-[#113353]">Upcoming Deadlines</h3>
            <span className="px-1.5 py-0.2 rounded-full bg-[#EEF5FF] text-[#004AAD] text-[9.5px] font-bold">
              4 Active
            </span>
          </div>

          <div className="py-1.5 space-y-1.5 text-[11.5px]">
            {/* GSTR-3B with small professional emphasis */}
            <motion.div
              animate={{
                backgroundColor: isDeadlineHighlighted ? '#FEF3C7' : '#F8FAFC',
                borderColor: isDeadlineHighlighted ? '#F59E0B' : '#E2E8F0',
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-1.5 rounded-[5px] border"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#113353]">GSTR-3B</span>
                {isDeadlineHighlighted && (
                  <span className="text-[9px] font-extrabold uppercase px-1 py-0.1 rounded bg-[#DC2626] text-white">
                    Urgent
                  </span>
                )}
              </div>
              <span className="text-[#DC2626] font-bold font-mono text-[11px]">28 Aug (2d)</span>
            </motion.div>

            {/* Form 26Q */}
            <div className="flex items-center justify-between p-1.5 rounded-[5px] bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="font-medium text-[#113353]">Form 26Q</span>
              <span className="text-[#D97706] font-bold font-mono text-[11px]">31 Aug (5d)</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#E5EAF2]/60 flex items-center justify-between text-[10.5px] font-medium text-[#627D98]">
            <span>Nearest: 28 Aug</span>
            <span className="text-[#004AAD] font-bold hover:underline cursor-pointer">Open Calendar →</span>
          </div>
        </motion.div>

        {/* Card 3: Action Required */}
        <motion.div
          data-product-target="portal-card-action"
          className="bg-white border border-[#E5EAF2] rounded-[10px] p-3.5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5EAF2]/60">
            <h3 className="font-bold text-[12.5px] text-[#113353]">Action Required</h3>
            <motion.span
              key={blockerCount}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`px-1.5 py-0.2 rounded-full text-[9.5px] font-bold ${
                blockerCount === 2
                  ? 'bg-[#EEF5FF] text-[#004AAD]'
                  : 'bg-[#FEF3C7] text-[#D97706]'
              }`}
            >
              {blockerCount} Pending
            </motion.span>
          </div>

          <div className="py-1.5 space-y-1.5 text-[11px]">
            {/* Blocker 1: Upload bank statement (Subtly changes state when document is received) */}
            <div className="flex items-center justify-between p-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-1.5 text-[#113353] truncate">
                {isDocReceived ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#DC2626] shrink-0" />
                )}
                <span className={`truncate ${isDocReceived ? 'line-through text-[#627D98]' : 'font-medium'}`}>
                  Upload bank statement
                </span>
              </div>
              {isDocReceived ? (
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 py-0.1 rounded">
                  Done ✓
                </span>
              ) : (
                <span className="text-[9px] font-semibold text-[#DC2626]">Blocker</span>
              )}
            </div>

            {/* Blocker 2: Approve ITR computation */}
            <div className="flex items-center justify-between p-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-1.5 text-[#113353] truncate">
                <span className="w-2 h-2 rounded-full bg-[#D97706] shrink-0" />
                <span className="truncate font-medium">Approve ITR computation</span>
              </div>
              <span className="text-[9px] font-medium text-[#627D98]">Draft ready</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#E5EAF2]/60 flex items-center justify-between text-[10.5px] font-medium text-[#627D98]">
            <span className="font-mono">{blockerCount} Blockers</span>
            <span className="text-[#004AAD] font-bold hover:underline cursor-pointer">Review Actions →</span>
          </div>
        </motion.div>

        {/* Card 4: Documents Required (Shows 2 Processing States & Matches Screenshot Upload CTA) */}
        <motion.div
          data-product-target="portal-card-documents"
          animate={{
            borderColor: isDocReceived ? '#10B981' : '#E5EAF2',
            boxShadow: isDocReceived
              ? '0 4px 12px -2px rgba(16, 185, 129, 0.15)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.4 }}
          className="bg-white border rounded-[10px] p-3.5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5EAF2]/60">
            <h3 className="font-bold text-[12.5px] text-[#113353]">Documents Required</h3>
            <span className="px-1.5 py-0.2 rounded-full bg-[#F0F4F8] text-[#113353] text-[9.5px] font-bold">
              2 Tracked
            </span>
          </div>

          <div className="py-1 space-y-1.5">
            <div className="text-[10.5px] text-[#627D98] font-medium transition-all">
              <strong className="text-[#113353]">{receivedCount}</strong> Received · <strong className="text-[#113353]">{pendingCount}</strong> Pending
            </div>

            {/* Document 1: Bank Statements (SBI) - Animates Processing -> Received ✓ */}
            <div className="p-1 bg-[#F8FAFC] border border-[#E5EAF2] rounded-[5px] flex items-center justify-between text-[10.5px]">
              <span className="text-[#113353] truncate font-medium max-w-[125px]">
                Bank Statements (SBI)
              </span>
              <motion.span
                key={docStatus}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold transition-all ${
                  docStatus === 'Received' || docStatus === 'Approved'
                    ? 'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]'
                    : 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]'
                }`}
              >
                {docStatus === 'Received' ? 'Received ✓' : 'Processing'}
              </motion.span>
            </div>

            {/* Document 2: Purchase Register Aug-26 - Shows Processing */}
            <div className="p-1 bg-[#F8FAFC] border border-[#E5EAF2] rounded-[5px] flex items-center justify-between text-[10.5px]">
              <span className="text-[#113353] truncate font-medium max-w-[125px]">
                Purchase Register Aug-26
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                Processing
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-1 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-[5px] text-[11px] font-bold flex items-center justify-center gap-1 shadow-2xs cursor-pointer transition-colors"
          >
            <PyngynIcons.upload size={11} />
            <span>Upload Docs</span>
          </button>
        </motion.div>
      </div>

      {/* 5. Lower Dashboard: Compliance Overview & Service Progress */}
      <div className="px-5 py-1.5 grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Card 5: Compliance Overview (Donut Chart) */}
        <div
          data-product-target="portal-card-compliance-overview"
          className="bg-white border border-[#E5EAF2] rounded-[10px] p-3.5 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5EAF2]/60">
            <div className="flex items-center gap-1.5">
              <PyngynIcons.clock size={13} className="text-[#627D98]" />
              <h3 className="font-bold text-[12.5px] text-[#113353]">Compliance Overview</h3>
            </div>
            <span className="text-[10px] font-bold text-[#627D98] bg-[#F8FAFC] px-2 py-0.5 rounded-full border border-[#E5EAF2]">
              35 Mandates
            </span>
          </div>

          <div className="flex items-center gap-5 py-2">
            {/* Donut SVG */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg width="90" height="90" viewBox="0 0 42 42" className="transform -rotate-90">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="5.5" />
                {/* Completed Slice (51% -> 54%) */}
                <motion.circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="5.5"
                  strokeDasharray="100 0"
                  animate={{
                    strokeDasharray: isProgressElevated ? '54 46' : '51 49',
                  }}
                  transition={{ duration: 0.6 }}
                  strokeDashoffset="0"
                />
                {/* In Progress Slice (14% -> 11%) */}
                <motion.circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="5.5"
                  animate={{
                    strokeDasharray: isProgressElevated ? '11 89' : '14 86',
                    strokeDashoffset: isProgressElevated ? -54 : -51,
                  }}
                  transition={{ duration: 0.6 }}
                />
                {/* Awaiting Client Slice (9%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#64748B"
                  strokeWidth="5.5"
                  strokeDasharray="9 91"
                  strokeDashoffset={-65}
                />
              </svg>
              <div className="absolute text-center leading-none">
                <span className="text-[13px] font-black text-[#113353]">35</span>
                <span className="text-[8.5px] block text-[#627D98] font-bold">TOTAL</span>
              </div>
            </div>

            {/* Legend Table */}
            <div className="flex-1 space-y-1.5 text-[11.5px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="font-semibold text-[#113353]">Completed</span>
                </div>
                <div className="font-mono text-[#627D98] text-[11px]">
                  <strong className="text-[#113353]">{completedTasksCount}</strong> · {isProgressElevated ? '54%' : '51%'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="font-semibold text-[#113353]">In Progress</span>
                </div>
                <div className="font-mono text-[#627D98] text-[11px]">
                  <strong className="text-[#113353]">{activeTasksCount}</strong> · {isProgressElevated ? '11%' : '14%'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#64748B]" />
                  <span className="font-semibold text-[#113353]">Awaiting Client</span>
                </div>
                <div className="font-mono text-[#627D98] text-[11px]">
                  <strong className="text-[#113353]">3</strong> · 9%
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#E5EAF2]/60 flex items-center justify-between text-[10.5px] text-[#627D98]">
            <span>Rate: <strong className="text-[#113353] font-bold">96.8% On-Time</strong></span>
            <span className="text-[#004AAD] font-bold hover:underline cursor-pointer">Filing Schedule →</span>
          </div>
        </div>

        {/* Card 6: Service Progress (Smooth Progress Bar Animation) */}
        <div
          data-product-target="portal-card-service-progress"
          className="bg-white border border-[#E5EAF2] rounded-[10px] p-3.5 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5EAF2]/60">
            <div className="flex items-center gap-1.5">
              <PyngynIcons.sliders size={13} className="text-[#627D98]" />
              <h3 className="font-bold text-[12.5px] text-[#113353]">Service Progress</h3>
            </div>
            <span className="text-[10px] font-bold text-[#627D98] bg-[#F8FAFC] px-2 py-0.5 rounded-full border border-[#E5EAF2]">
              6 Services
            </span>
          </div>

          <div className="space-y-2.5 py-1">
            {/* Service 1: ITR Filing */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-[#113353]">ITR Filing</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-medium px-1.5 py-0.1 rounded bg-[#FAF5FF] text-[#7E22CE]">
                    Ready for Review
                  </span>
                  <span className="font-mono text-[#113353] text-[10.5px]">78%</span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E5EAF2] overflow-hidden">
                <div className="h-full rounded-full bg-[#113353]" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Service 2: GST Compliance (Animates 86% -> 92%) */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-[#113353]">GST Compliance</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-medium px-1.5 py-0.1 rounded bg-[#EEF5FF] text-[#004AAD]">
                    In Progress
                  </span>
                  <span className="font-mono text-[#113353] text-[10.5px]">{gstProgressPercent}%</span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E5EAF2] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#004AAD]"
                  animate={{ width: `${gstProgressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Service 3: TDS Returns (26Q) */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-[#113353]">TDS Returns (26Q)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-medium px-1.5 py-0.1 rounded bg-[#FFFBEB] text-[#D97706]">
                    Awaiting Data
                  </span>
                  <span className="font-mono text-[#113353] text-[10.5px]">65%</span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E5EAF2] overflow-hidden">
                <div className="h-full rounded-full bg-[#D97706]" style={{ width: '65%' }} />
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#E5EAF2]/60 flex items-center justify-between text-[10.5px] text-[#627D98]">
            <span>Next: <strong className="text-[#113353] font-bold">GST 3B (20 Sep)</strong></span>
            <span className="text-[#004AAD] font-bold hover:underline cursor-pointer">Breakdown →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
