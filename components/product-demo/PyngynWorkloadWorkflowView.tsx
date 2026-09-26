'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PyngynWorkloadView } from './PyngynWorkloadView';
import { ProductCameraController } from './animation/ProductCameraController';

export interface PyngynWorkloadWorkflowViewProps {
  className?: string;
  autoPlay?: boolean;
}

export const PyngynWorkloadWorkflowView: React.FC<PyngynWorkloadWorkflowViewProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Workflow 5 Steps:
  // 0: Overview baseline
  // 1: Focus Capacity & Risk KPIs
  // 2: Focus Nikhil Jain (42/35h overloaded red)
  // 3: Recalculate: Task reallocated, bar animates to 35h teal, At Risk drops 3 -> 2
  // 4: Pull back to full workload overview
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timings = [
      2500, // 0: overview
      3000, // 1: focus capacity KPI
      3200, // 2: focus Nikhil Jain
      3600, // 3: recalculation and update
      2400, // 4: pullback
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
    activeTarget = 'workload-capacity';
  } else if (stepIndex === 2 || stepIndex === 3) {
    cameraScale = 1.03;
    activeTarget = 'workload-nikhil';
  }

  const isRecalculated = stepIndex >= 3;
  const nikhilHours = isRecalculated
    ? { est: 35, capacity: 35, isOverloaded: false }
    : { est: 42, capacity: 35, isOverloaded: true };
  const activeTasksCount = isRecalculated ? 21 : 22;
  const capacityUtilizationPct = isRecalculated ? 44 : 47;
  const atRiskCount = isRecalculated ? 2 : 3;

  return (
    <div
      data-product-target="workload-workflow-container"
      className={`relative w-full h-full bg-white select-none overflow-hidden ${className}`}
    >
      <ProductCameraController
        scale={cameraScale}
        activeTarget={activeTarget}
        nativeWidth={1440}
        nativeHeight={880}
      >
        <div className="w-full h-full relative">
          <PyngynWorkloadView
            nikhilHours={nikhilHours}
            activeTasksCount={activeTasksCount}
            capacityUtilizationPct={capacityUtilizationPct}
            atRiskCount={atRiskCount}
            activeTarget={activeTarget}
          />
        </div>
      </ProductCameraController>
    </div>
  );
};
