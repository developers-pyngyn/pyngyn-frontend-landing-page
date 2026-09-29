'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynWorkloadView } from './PyngynWorkloadView';
import { PyngynCelebrationOverlay } from './PyngynCelebrationOverlay';
import { ProductCameraController } from './animation/ProductCameraController';

export function PyngynWorkloadDemo({
  className = '',
  autoPlay = true,
}: {
  className?: string;
  autoPlay?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  // In-place live data transitions
  // Stage 0: Baseline (Active Tasks: 22, Capacity: 47%, At Risk: 3, Nikhil: 42/35h)
  // Stage 1: Active Tasks increases 22 -> 23, Capacity Utilization glides 47% -> 51%
  // Stage 2: Team Workload Rebalance: Nikhil Jain reallocated 35/35h, Vikram 8h -> 15h
  // Stage 3: At Risk resolved & dropped 3 -> 2
  // Stage 4: Hold optimal state before smooth cycle repeat
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) {
      setStage(3);
      return;
    }

    const stageTimes = [
      3600, // 0: Baseline
      3200, // 1: Active Tasks & Capacity update
      3600, // 2: Team rebalance
      3200, // 3: At Risk drop
      2400, // 4: Hold clean overview
    ];

    const timer = setTimeout(() => {
      setStage((prev) => (prev + 1) % stageTimes.length);
    }, stageTimes[stage] || 3200);

    return () => clearTimeout(timer);
  }, [stage, autoPlay, shouldReduceMotion]);

  const animStepProp = stage >= 3 ? 3 : stage >= 2 ? 2 : stage >= 1 ? 1 : 0;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[14px] border border-slate-200/90 bg-white shadow-xl ${className}`}
      style={{
        boxShadow:
          '0 20px 40px -15px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      }}
    >
      <ProductCameraController
        nativeWidth={1440}
        nativeHeight={880}
        scale={stage === 2 || stage === 3 ? 1.02 : 1.0}
        activeTarget={stage === 2 || stage === 3 ? 'workload-team' : undefined}
      >
        <div className="w-full h-full relative">
          <PyngynWorkloadView
            animStep={animStepProp}
            autoPlay={false}
            className="w-full h-full"
          />
        </div>
      </ProductCameraController>

      {/* Floating Celebration Overlay appears during the Team Rebalance phase */}
      <AnimatePresence>
        {(stage === 2 || stage === 3) && (
          <div className="absolute bottom-4 right-4 sm:right-6 z-40 pointer-events-none drop-shadow-2xl">
            <PyngynCelebrationOverlay
              floating={false}
              title="Team Workload Rebalanced"
              subtitle="Capacity: 100% Optimal across team"
              statusText="Optimized"
              avatarSrc="/team/vivek-pandey.png"
              mascotSrc="/mascot/pyng-hierarchy.png"
              showCursor={true}
              cursorOffset={{ x: 135, y: 14 }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
