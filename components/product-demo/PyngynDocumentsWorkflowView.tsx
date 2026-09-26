'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PyngynClientSpaceView } from './PyngynClientSpaceView';
import { ProductCameraController } from './animation/ProductCameraController';

export interface PyngynDocumentsWorkflowViewProps {
  className?: string;
  autoPlay?: boolean;
}

export const PyngynDocumentsWorkflowView: React.FC<PyngynDocumentsWorkflowViewProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Workflow 8 Steps:
  // 0: Portal overview baseline (78%, 3 received 2 pending)
  // 1: Focus Documents Required card
  // 2: Document upload processing
  // 3: Verified received (4 received 1 pending)
  // 4: Pan to Compliance Progress card
  // 5: Compliance Progress elevates 78% -> 82%
  // 6: Pull back to full portal
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timings = [
      2400, // 0: overview
      3000, // 1: focus docs
      2400, // 2: upload processing
      3200, // 3: received state
      3000, // 4: pan to progress
      3500, // 5: elevate gauge
      2400, // 6: pullback
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

  if (stepIndex === 1 || stepIndex === 2 || stepIndex === 3) {
    cameraScale = 1.03;
    activeTarget = 'portal-card-documents';
  } else if (stepIndex === 4 || stepIndex === 5) {
    cameraScale = 1.03;
    activeTarget = 'portal-card-progress';
  }

  const documentStatus =
    stepIndex >= 3 && stepIndex <= 5 ? 'Received' : 'Processing';
  const pendingDocsCount = stepIndex >= 3 && stepIndex <= 5 ? 1 : 2;
  const receivedDocsCount = stepIndex >= 3 && stepIndex <= 5 ? 4 : 3;
  const complianceProgress = stepIndex >= 5 ? 82 : 78;
  const serviceProgressGst = stepIndex >= 5 ? 92 : 86;

  return (
    <div
      data-product-target="documents-workflow-container"
      className={`relative w-full h-full bg-white select-none overflow-hidden ${className}`}
    >
      <ProductCameraController
        scale={cameraScale}
        activeTarget={activeTarget}
        nativeWidth={1440}
        nativeHeight={880}
      >
        <div className="w-full h-full relative">
          <PyngynClientSpaceView
            complianceProgress={complianceProgress}
            documentStatus={documentStatus}
            pendingDocsCount={pendingDocsCount}
            receivedDocsCount={receivedDocsCount}
            serviceProgressGst={serviceProgressGst}
            activeTarget={activeTarget}
          />
        </div>
      </ProductCameraController>
    </div>
  );
};
