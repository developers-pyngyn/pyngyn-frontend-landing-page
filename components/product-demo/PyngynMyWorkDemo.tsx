'use client';

import React from 'react';
import { PyngynMyWorkDetailedView } from './PyngynMyWorkDetailedView';
import { ProductCameraController } from './animation/ProductCameraController';

export function PyngynMyWorkDemo({
  className = '',
  autoPlay = true,
  standalone = true,
  alwaysShowCelebration = false,
}: {
  className?: string;
  autoPlay?: boolean;
  standalone?: boolean;
  alwaysShowCelebration?: boolean;
}) {
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
        scale={1.0}
        className="w-full"
      >
        <PyngynMyWorkDetailedView
          autoPlay={autoPlay}
          standalone={standalone}
          alwaysShowCelebration={alwaysShowCelebration}
          className="w-full h-full"
        />
      </ProductCameraController>
    </div>
  );
}
