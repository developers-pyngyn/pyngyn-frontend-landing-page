'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PyngynComplianceHubView } from './PyngynComplianceHubView';
import { ProductCameraController } from './animation/ProductCameraController';

export interface PyngynComplianceWorkflowViewProps {
  className?: string;
  autoPlay?: boolean;
}

export const PyngynComplianceWorkflowView: React.FC<PyngynComplianceWorkflowViewProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Workflow 7 Steps:
  // 0: Cockpit Compliance Hub baseline
  // 1: Deadline highlighted (GSTR-3B)
  // 2: Risk indicator (Notices & Scrutiny 5 notices)
  // 3: Action & Review
  // 4: Completion (Statutory compliance radar verified)
  // 5: Pullback
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timings = [
      2500, // 0: baseline
      3000, // 1: deadline
      3000, // 2: risk notices
      3400, // 3: action & review
      3400, // 4: completion
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
    activeTarget = 'calendar-gstr3b';
  } else if (stepIndex === 2) {
    cameraScale = 1.03;
    activeTarget = 'compliance-sidebar';
  } else if (stepIndex === 3 || stepIndex === 4) {
    cameraScale = 1.02;
    activeTarget = 'calendar-today';
  }

  return (
    <div
      data-product-target="compliance-workflow-container"
      className={`relative w-full h-full bg-white select-none overflow-hidden ${className}`}
    >
      <ProductCameraController
        scale={cameraScale}
        activeTarget={activeTarget}
        nativeWidth={1440}
        nativeHeight={880}
      >
        <div className="w-full h-full relative">
          <PyngynComplianceHubView
            activeTarget={activeTarget}
          />
        </div>
      </ProductCameraController>
    </div>
  );
};
