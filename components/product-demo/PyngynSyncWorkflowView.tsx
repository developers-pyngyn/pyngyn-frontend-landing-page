'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PyngynTaskTable } from './PyngynTaskTable';
import { PyngynClientSpaceView } from './PyngynClientSpaceView';
import { PyngynGlobalHeader } from './PyngynGlobalHeader';
import { PyngynAppRail } from './PyngynAppRail';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynSyncWorkflowViewProps {
  className?: string;
  autoPlay?: boolean;
}

export const PyngynSyncWorkflowView: React.FC<PyngynSyncWorkflowViewProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const sequence = [
      { p: 0, ms: 2200 }, // Initial: GSTR-3B in progress, ClientSpace at 78%
      { p: 1, ms: 2500 }, // Internal GSTR-3B moves to Internal Review
      { p: 2, ms: 2200 }, // Sync pulse: documents received
      { p: 3, ms: 3000 }, // ClientSpace gauge elevates 78% -> 82%, Service Progress 86% -> 92%
      { p: 4, ms: 2400 }, // Settle / Complete loop
    ];

    let idx = 0;
    let timer: NodeJS.Timeout;

    const run = () => {
      const step = sequence[idx];
      setPhase(step.p as any);

      timer = setTimeout(() => {
        idx = (idx + 1) % sequence.length;
        run();
      }, step.ms);
    };

    run();

    return () => clearTimeout(timer);
  }, [autoPlay, prefersReducedMotion]);

  // Derived state from phase
  const gstr3bStatus = phase >= 1 ? 'internal-review' : 'in-progress';
  const gstr3bEffort = phase >= 1 ? { spent: 3.5, total: 4 } : { spent: 2.5, total: 4 };
  const documentStatus = phase >= 2 ? 'Received' : 'Processing';
  const pendingDocsCount = phase >= 2 ? 1 : 2;
  const receivedDocsCount = phase >= 2 ? 4 : 3;
  const complianceProgress = phase >= 3 ? 82 : 78;
  const serviceProgressGst = phase >= 3 ? 92 : 86;

  return (
    <div
      data-product-target="sync-workflow-view"
      className={`w-full h-full min-h-[880px] bg-[#0F172A] flex flex-col font-sans select-none overflow-hidden ${className}`}
    >
      {/* Synchronization Top Banner */}
      <div className="h-11 bg-[#1E293B] border-b border-slate-700/80 px-6 flex items-center justify-between text-white text-[12px] z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Workflow 3: Real-Time Practice &harr; ClientSpace Synchronization</span>
          </div>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-[11px] text-slate-300 font-mono">
            {phase === 0 && '1. Internal Task in Execution (GSTR-3B)'}
            {phase === 1 && '2. Associate completes work -> Internal Review'}
            {phase === 2 && '3. Documents Verified & Processed'}
            {phase >= 3 && '4. ClientSpace Live Gauge & Progress Updated'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono font-bold flex items-center gap-1">
            <PyngynIcons.check size={11} />
            <span>Zero Email Chase</span>
          </span>
        </div>
      </div>

      {/* Main Split Stage: Left Internal App, Right ClientSpace Portal */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 bg-slate-900 overflow-hidden">
        {/* LEFT PANE: Internal Accounting Firm Workspace */}
        <div className="flex flex-col bg-white rounded-[10px] border border-slate-700/80 overflow-hidden shadow-card relative">
          <div className="h-8 bg-[#113353] px-3.5 flex items-center justify-between text-white text-[11px] font-bold shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>INTERNAL FIRM WORKBENCH (CA Team View)</span>
            </div>
            <span className="text-[10px] font-mono text-blue-200">oswal-exports/tasks</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <PyngynTaskTable
              gstr3bStatus={gstr3bStatus}
              gstr3bEffort={gstr3bEffort}
              selectedTaskId="task-gstr3b"
              highlightTaskId={phase >= 1 ? 'task-gstr3b' : undefined}
            />
          </div>

          {/* Real-time sync badge indicator */}
          <div className="absolute bottom-3 right-3 z-30">
            <motion.div
              animate={{
                scale: phase === 1 || phase === 2 ? [1, 1.05, 1] : 1,
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-3 py-1.5 rounded-full bg-[#113353] text-white border border-blue-400 shadow-lg text-[11px] font-bold flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>
                {phase >= 1 ? 'Syncing Status to Oswal Portal...' : 'Sync Bridge Connected'}
              </span>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANE: External Oswal Exports ClientSpace Portal */}
        <div className="flex flex-col bg-[#F8FAFC] rounded-[10px] border border-slate-700/80 overflow-hidden shadow-card relative">
          <div className="h-8 bg-[#0F766E] px-3.5 flex items-center justify-between text-white text-[11px] font-bold shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>CLIENTSPACE PORTAL (Client View - Oswal Exports)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-100">portal.pyngyn.com</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <PyngynClientSpaceView
              complianceProgress={complianceProgress}
              documentStatus={documentStatus}
              pendingDocsCount={pendingDocsCount}
              receivedDocsCount={receivedDocsCount}
              serviceProgressGst={serviceProgressGst}
              activeTarget={phase >= 2 ? 'portal-card-progress' : undefined}
            />
          </div>

          {/* Sync result badge */}
          <div className="absolute bottom-3 right-3 z-30">
            <div
              className={`px-3 py-1.5 rounded-full border shadow-lg text-[11px] font-bold flex items-center gap-1.5 transition-all duration-300 ${
                phase >= 3
                  ? 'bg-emerald-600 text-white border-emerald-300 shadow-emerald-500/20'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  phase >= 3 ? 'bg-white' : 'bg-emerald-500'
                }`}
              />
              <span>
                {phase >= 3 ? '✓ Compliance Progress: 82% Synced' : 'Portal Sync: 78% Live'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
