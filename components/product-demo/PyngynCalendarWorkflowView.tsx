'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PyngynCalendarView } from './PyngynCalendarView';
import { ProductCameraController } from './animation/ProductCameraController';

export interface PyngynCalendarWorkflowViewProps {
  className?: string;
  autoPlay?: boolean;
}

export const PyngynCalendarWorkflowView: React.FC<PyngynCalendarWorkflowViewProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Workflow 6 Steps:
  // 0: Overview month grid
  // 1: Focus Sep 23 Today dense cell
  // 2: Focus Sep 20 GSTR-3B cluster
  // 3: Highlight deadline & update filing status to Filed / Completed
  // 4: Pan to Sep 15 Advance Tax
  // 5: Pull back to full month grid
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timings = [
      2500, // 0: overview
      3000, // 1: Sep 23 Today
      3200, // 2: Sep 20 GSTR-3B
      3500, // 3: Highlight & mark filed
      3000, // 4: Sep 15 Advance Tax
      2400, // 5: pullback
    ];

    let timer: NodeJS.Timeout;
    const duration = timings[stepIndex] || 2800;

    timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % timings.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [stepIndex, autoPlay, prefersReducedMotion]);

  let cameraScale = 0.94;
  let activeTarget: string | undefined = undefined;

  if (stepIndex === 1) {
    cameraScale = 1.02;
    activeTarget = 'calendar-today';
  } else if (stepIndex === 2 || stepIndex === 3) {
    cameraScale = 1.03;
    activeTarget = 'calendar-gstr3b';
  } else if (stepIndex === 4) {
    cameraScale = 1.02;
    activeTarget = 'calendar-adv-tax';
  }

  const gstr3bStatus = stepIndex >= 3 && stepIndex <= 4 ? 'filed' : 'due';

  return (
    <div
      data-product-target="calendar-workflow-container"
      className={`relative w-full h-full bg-white select-none overflow-hidden ${className}`}
    >
      <ProductCameraController
        scale={cameraScale}
        activeTarget={activeTarget}
        nativeWidth={1440}
        nativeHeight={880}
      >
        <div className="w-full h-full relative">
          <PyngynCalendarView
            gstr3bStatus={gstr3bStatus}
            activeTarget={activeTarget}
          />
        </div>
      </ProductCameraController>
    </div>
  );
};
