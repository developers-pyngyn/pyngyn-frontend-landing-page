'use client';

import React from 'react';
import { Flag } from 'lucide-react';

export type PyngynPriority = 'Urgent' | 'High' | 'Medium' | 'Low';

export interface PriorityCellProps {
  priority: PyngynPriority;
  className?: string;
}

export const PriorityCell: React.FC<PriorityCellProps> = ({ priority, className = '' }) => {
  const getPriorityStyle = () => {
    switch (priority) {
      case 'Urgent':
        return {
          icon: 'text-red-500 fill-red-500',
          text: 'text-red-700 font-bold',
        };
      case 'High':
        return {
          icon: 'text-amber-500 fill-amber-500',
          text: 'text-amber-700 font-semibold',
        };
      case 'Medium':
        return {
          icon: 'text-blue-500 fill-blue-500',
          text: 'text-blue-700 font-medium',
        };
      case 'Low':
      default:
        return {
          icon: 'text-slate-400 fill-slate-400',
          text: 'text-slate-600 font-normal',
        };
    }
  };

  const { icon, text } = getPriorityStyle();

  return (
    <div className={`min-w-0 flex items-center gap-1.5 overflow-hidden text-[10.5px] select-none ${className}`}>
      <Flag size={10} className={`${icon} flex-none`} />
      <span className={`truncate leading-none ${text}`}>{priority}</span>
    </div>
  );
};
