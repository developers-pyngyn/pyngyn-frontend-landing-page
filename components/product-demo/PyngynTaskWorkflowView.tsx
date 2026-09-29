'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynProductShell } from './PyngynProductShell';
import { PyngynTaskTable } from './PyngynTaskTable';
import { ProductCameraController } from './animation/ProductCameraController';
import { PyngynCelebrationOverlay } from './PyngynCelebrationOverlay';

export interface PyngynTaskWorkflowViewProps {
  className?: string;
  autoPlay?: boolean;
  workflowMode?: 'gstr1' | 'gstr3b';
}

export const PyngynTaskWorkflowView: React.FC<PyngynTaskWorkflowViewProps> = ({
  className = '',
  autoPlay = true,
  workflowMode = 'gstr1',
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Workflow steps definition
  // 0: Overview baseline
  // 1: Focus task row
  // 2: Open status dropdown
  // 3: Select "Internal Review"
  // 4: Dropdown closes, status pill transitions + effort updates
  // 5: AI Companion confirms
  // 6: Camera pulls back to full frame
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timings = [
      1500, // 0: overview baseline
      1100, // 1: focus row
      950,  // 2: open dropdown
      900,  // 3: select option
      1200, // 4: state update + effort bar
      2400, // 5: celebration popup & verification
      1300, // 6: pullback to overview
    ];

    let timer: NodeJS.Timeout;
    const duration = timings[stepIndex] || 2400;

    timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % timings.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [stepIndex, autoPlay, prefersReducedMotion]);

  // Dynamic Camera parameters: steady, elegant, jitter-free
  let cameraScale = 1.0;
  let activeTarget: string | undefined = undefined;

  if (stepIndex === 1) {
    cameraScale = 1.04;
    activeTarget = workflowMode === 'gstr1' ? 'task-row-task-gstr1' : 'task-row-task-gstr3b';
  } else if (stepIndex === 2 || stepIndex === 3) {
    cameraScale = 1.06;
    activeTarget = 'status-dropdown';
  } else if (stepIndex === 4) {
    cameraScale = 1.06;
    activeTarget = workflowMode === 'gstr1' ? 'status-pill-task-gstr1' : 'status-pill-task-gstr3b';
  } else if (stepIndex === 5) {
    cameraScale = 1.07;
    activeTarget = 'workflow-celebration-popup';
  } else if (stepIndex === 6) {
    cameraScale = 1.0;
    activeTarget = undefined;
  }

  const isDropdownOpen = workflowMode === 'gstr1' && (stepIndex === 2 || stepIndex === 3);
  const dropdownSelected = stepIndex === 3 ? 'internal-review' : undefined;
  const gstr1Status = stepIndex >= 4 ? 'internal-review' : 'in-progress';
  const gstr1Effort = stepIndex >= 4 ? { spent: 3, total: 4 } : { spent: 2, total: 4 };

  const gstr3bStatus =
    stepIndex >= 5 ? 'filed' : stepIndex >= 3 ? 'internal-review' : 'in-progress';
  const gstr3bEffort =
    stepIndex >= 5 ? { spent: 4, total: 4 } : stepIndex >= 3 ? { spent: 3.5, total: 4 } : { spent: 2.5, total: 4 };

  return (
    <div
      data-product-target="task-workflow-container"
      className={`relative w-full h-full bg-white select-none overflow-hidden ${className}`}
    >
      <ProductCameraController
        scale={cameraScale}
        activeTarget={activeTarget}
        nativeWidth={1440}
        nativeHeight={880}
      >
        <div className="w-full h-full relative">
          <PyngynProductShell
            activeRailItem="clients"
            sidebarVariant="clients"
          >
            <PyngynTaskTable
              gstr1Status={workflowMode === 'gstr1' ? gstr1Status : undefined}
              gstr1DropdownOpen={isDropdownOpen}
              gstr1DropdownSelected={dropdownSelected}
              gstr1Effort={workflowMode === 'gstr1' ? gstr1Effort : undefined}
              gstr3bStatus={workflowMode === 'gstr3b' ? gstr3bStatus : undefined}
              gstr3bEffort={workflowMode === 'gstr3b' ? gstr3bEffort : undefined}
              selectedTaskId={workflowMode === 'gstr1' ? 'task-gstr1' : 'task-gstr3b'}
              highlightTaskId={stepIndex >= 1 && stepIndex <= 5 ? (workflowMode === 'gstr1' ? 'task-gstr1' : 'task-gstr3b') : undefined}
            />
          </PyngynProductShell>

          {/* Floating Celebration Overlay with Magical Confetti & Mascot */}
          <AnimatePresence>
            {stepIndex === 5 && (
              <div
                className="absolute top-[220px] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              >
                <PyngynCelebrationOverlay
                  dataProductTarget="workflow-celebration-popup"
                  floating={false}
                  title={workflowMode === 'gstr1' ? 'Auto-Filed GSTR-1 Return' : 'Auto-Filed GSTR-3B Return'}
                  subtitle={
                    workflowMode === 'gstr1'
                      ? 'Reconciled with ICEGATE · Synced with GSTN'
                      : 'Commercial Client · ARN: AA270826019482M · Synced'
                  }
                  statusText="Filed"
                  avatarSrc="/team/vivek-pandey.png"
                  mascotSrc="/mascot/pyngyn-insights.png"
                  showCursor={true}
                  cursorOffset={{ x: 230, y: 14 }}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </ProductCameraController>
    </div>
  );
};
