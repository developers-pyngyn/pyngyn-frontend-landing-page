'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynAiWorkflowProps {
  onCheckStepChange?: (stepName: string, targetKey?: string) => void;
  className?: string;
  autoPlay?: boolean;
}

type AiScanStep =
  | 'idle'
  | 'tasks'
  | 'deadlines'
  | 'approvals'
  | 'documents'
  | 'client-status'
  | 'result';

export const PyngynAiWorkflow: React.FC<PyngynAiWorkflowProps> = ({
  onCheckStepChange,
  className = '',
  autoPlay = true,
}) => {
  const [currentStep, setCurrentStep] = useState<AiScanStep>('idle');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timings: { step: AiScanStep; duration: number; target?: string }[] = [
      { step: 'idle', duration: 1600 },
      { step: 'tasks', duration: 1800, target: 'task-row-task-gstr1' },
      { step: 'deadlines', duration: 1800, target: 'task-row-task-gstr3b' },
      { step: 'approvals', duration: 1800, target: 'task-row-task-dsc' },
      { step: 'documents', duration: 1800, target: 'task-row-task-bank-blocked' },
      { step: 'client-status', duration: 1800, target: 'client-header' },
      { step: 'result', duration: 4500, target: 'task-row-task-gstr3b' },
    ];

    let currentIdx = 0;
    let timer: NodeJS.Timeout;

    const runNext = () => {
      const item = timings[currentIdx];
      if (!item) return;

      setCurrentStep(item.step);
      onCheckStepChange?.(item.step, item.target);

      timer = setTimeout(() => {
        currentIdx = (currentIdx + 1) % timings.length;
        runNext();
      }, item.duration);
    };

    runNext();

    return () => clearTimeout(timer);
  }, [autoPlay, prefersReducedMotion, onCheckStepChange]);

  const mascotSrc =
    currentStep === 'idle'
      ? '/mascot/pyngyn-avatar.png'
      : currentStep === 'result'
      ? '/mascot/pyngyn-insights.png'
      : '/mascot/pyngyn-thinking.png';

  const checkItems = [
    { id: 'tasks', label: 'Checking statutory tasks & filings' },
    { id: 'deadlines', label: 'Checking impending deadlines (Sep 20 / 30)' },
    { id: 'approvals', label: 'Checking partner approval gates' },
    { id: 'documents', label: 'Checking client document submissions' },
    { id: 'client-status', label: 'Checking portfolio compliance health' },
  ];

  return (
    <div
      data-product-target="pyngyn-ai-card"
      className={`bg-white/95 backdrop-blur-md border border-[#CBD5E1] rounded-[14px] shadow-xl p-4 sm:p-5 flex flex-col gap-3.5 max-w-[380px] w-full text-[#113353] select-none ${className}`}
    >
      {/* Header with Mascot & AI Chip */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF2]">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 shrink-0 rounded-full bg-[#F0F4F8] border border-[#CBD5E1] p-1 overflow-hidden shadow-2xs">
            <Image
              src={mascotSrc}
              alt="Pyngyn Mascot"
              fill
              className="object-contain p-0.5 transition-all duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[14px] tracking-tight text-[#113353]">
                PYNGYN AI
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#EEF5FF] text-[#004AAD] text-[9.5px] font-extrabold uppercase tracking-wider border border-[#C2DCFF]">
                Copilot
              </span>
            </div>
            <p className="text-[11px] text-[#627D98] font-medium leading-tight">
              Accounting & Compliance Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
        </div>
      </div>

      {/* Query Banner */}
      <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-[8px] px-3 py-2 text-[12px] font-medium text-[#334E68] flex items-center gap-2 shadow-3xs">
        <PyngynIcons.sparkles size={14} className="text-[#004AAD]" />
        <span className="italic font-sans">
          &ldquo;Which client filings need attention?&rdquo;
        </span>
      </div>

      {/* Sequential Checks Area */}
      {currentStep !== 'result' ? (
        <div className="space-y-1.5 py-1">
          <div className="text-[10.5px] font-mono font-bold text-[#627D98] uppercase tracking-wider flex items-center justify-between">
            <span>Audit Radar Scan</span>
            <PyngynIcons.sliders size={12} className="animate-spin text-[#004AAD]" />
          </div>

          <div className="space-y-1 text-[11.5px]">
            {checkItems.map((chk, i) => {
              const stepOrder: AiScanStep[] = ['idle', 'tasks', 'deadlines', 'approvals', 'documents', 'client-status'];
              const currentStepIdx = stepOrder.indexOf(currentStep);
              const thisStepIdx = stepOrder.indexOf(chk.id as AiScanStep);
              const isDone = currentStepIdx > thisStepIdx;
              const isCurrent = currentStep === chk.id;

              return (
                <div
                  key={chk.id}
                  className={`flex items-center justify-between p-1.5 rounded-[6px] transition-colors ${
                    isCurrent
                      ? 'bg-[#EEF5FF] text-[#004AAD] font-bold ring-1 ring-[#004AAD]/30'
                      : isDone
                      ? 'text-emerald-700 bg-emerald-50/60 font-medium'
                      : 'text-slate-400 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isDone ? (
                      <span className="w-3.5 h-3.5 rounded-[4px] bg-emerald-600 text-white flex items-center justify-center text-[8.5px] font-bold">
                        <PyngynIcons.check size={9} />
                      </span>
                    ) : isCurrent ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-[#004AAD] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{chk.label}</span>
                  </div>
                  {isDone && <span className="text-[10px] font-mono font-bold text-emerald-600">Done</span>}
                  {isCurrent && <span className="text-[10px] font-mono font-bold text-[#004AAD] animate-pulse">Scanning</span>}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Result Card State */
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2.5 py-1"
        >
          <div className="flex items-center gap-2 text-rose-700 font-extrabold text-[12.5px] bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-[7px]">
            <PyngynIcons.alertTriangle size={14} className="text-rose-600 shrink-0" />
            <span>3 client filings need attention:</span>
          </div>

          <div className="space-y-1.5 text-[11.5px]">
            <div className="p-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[7px] space-y-0.5">
              <div className="flex items-center justify-between font-bold text-[#113353]">
                <span>1. Oswal Exports</span>
                <span className="text-rose-600 font-mono text-[10.5px]">GSTR-3B (Sep 20)</span>
              </div>
              <p className="text-[10.5px] text-[#627D98] leading-tight">
                Bank statements awaited from client accounts team.
              </p>
            </div>

            <div className="p-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[7px] space-y-0.5">
              <div className="flex items-center justify-between font-bold text-[#113353]">
                <span>2. Oswal Exports</span>
                <span className="text-amber-600 font-mono text-[10.5px]">GSTR-1 (Sep 02)</span>
              </div>
              <p className="text-[10.5px] text-[#627D98] leading-tight">
                Sales ledger matched. Ready for internal partner review.
              </p>
            </div>

            <div className="p-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[7px] space-y-0.5">
              <div className="flex items-center justify-between font-bold text-[#113353]">
                <span>3. Oswal Exports</span>
                <span className="text-purple-600 font-mono text-[10.5px]">DSC Token (Sep 18)</span>
              </div>
              <p className="text-[10.5px] text-[#627D98] leading-tight">
                Director digital signature certificate expires in 3 days.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer Meta */}
      <div className="pt-2 border-t border-[#E5EAF2] flex items-center justify-between text-[10.5px] text-[#627D98] font-medium">
        <span>Autonomous firm scan</span>
        <span className="font-mono text-[#004AAD] font-bold">100% Real DOM Data</span>
      </div>
    </div>
  );
};
