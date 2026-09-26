'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PyngynProductShell } from './PyngynProductShell';
import { PyngynBoardView } from './PyngynBoardView';
import { ProductCameraController } from './animation/ProductCameraController';

export interface PyngynBoardWorkflowViewProps {
  className?: string;
  autoPlay?: boolean;
}

export const PyngynBoardWorkflowView: React.FC<PyngynBoardWorkflowViewProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Workflow 4 Steps:
  // 0: Overview baseline (card in Overdue)
  // 1: Focus card in Overdue column
  // 2: Card animates across DOM columns to Due This Week
  // 3: Settled in Due This Week, column counts updated
  // 4: Pull back to full board view
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timings = [
      2400, // 0: overview
      2600, // 1: focus overdue card
      3200, // 2: move card to this week
      3000, // 3: hold in this week
      2400, // 4: pullback
    ];

    let timer: NodeJS.Timeout;
    const duration = timings[stepIndex] || 2600;

    timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % timings.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [stepIndex, autoPlay, prefersReducedMotion]);

  const cameraScale = stepIndex === 1 || stepIndex === 2 ? 1.02 : 0.94;
  const activeTarget =
    stepIndex === 1
      ? 'kanban-card-card-gstr1'
      : stepIndex === 2 || stepIndex === 3
      ? 'kanban-column-this-week'
      : undefined;

  const gstr1Column = stepIndex >= 2 && stepIndex <= 4 ? 'this-week' : 'overdue';

  return (
    <div
      data-product-target="board-workflow-container"
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
            <PyngynBoardView
              gstr1Column={gstr1Column}
              activeTarget={stepIndex === 1 ? 'kanban-card-card-gstr1' : undefined}
            />
          </PyngynProductShell>
        </div>
      </ProductCameraController>
    </div>
  );
};
