'use client';

import React from 'react';
import { PyngynOswalClientView } from './PyngynOswalClientView';

export function PyngynDashboardDemo({
  className = '',
  autoPlay = true,
}: {
  className?: string;
  autoPlay?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[14px] border border-slate-200/90 bg-white shadow-xl ${className}`}
      style={{
        boxShadow:
          '0 20px 40px -15px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      }}
    >
      <PyngynOswalClientView autoPlay={autoPlay} className="w-full" />
    </div>
  );
}
