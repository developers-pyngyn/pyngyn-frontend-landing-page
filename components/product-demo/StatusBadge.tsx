'use client';

import React from 'react';

export type PyngynStatusType =
  | 'To Do'
  | 'In Progress'
  | 'Internal Review'
  | 'Filed / Completed'
  | 'Client Approval';

export interface StatusBadgeProps {
  status: PyngynStatusType | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStyles = () => {
    switch (status) {
      case 'Filed / Completed':
        return {
          wrapper: 'border-emerald-200 bg-emerald-50 text-emerald-700',
          dot: 'bg-emerald-500',
        };
      case 'Internal Review':
        return {
          wrapper: 'border-purple-200 bg-purple-50 text-purple-700',
          dot: 'bg-purple-500',
        };
      case 'Client Approval':
        return {
          wrapper: 'border-amber-200 bg-amber-50 text-amber-700',
          dot: 'bg-amber-500',
        };
      case 'To Do':
        return {
          wrapper: 'border-slate-200 bg-slate-50 text-slate-600',
          dot: 'bg-slate-400',
        };
      case 'In Progress':
      default:
        return {
          wrapper: 'border-blue-200 bg-blue-50 text-blue-700',
          dot: 'bg-[#004AAD]',
        };
    }
  };

  const { wrapper, dot } = getStyles();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-colors select-none whitespace-nowrap min-w-0 ${wrapper} ${className}`}
    >
      <span className={`h-1.5 w-1.5 flex-none rounded-full ${dot}`} />
      <span className="truncate leading-tight">{status}</span>
    </span>
  );
};
