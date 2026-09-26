'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface EffortCellProps {
  spent: number;
  total: number;
  isCompleted?: boolean;
  className?: string;
}

export const EffortCell: React.FC<EffortCellProps> = ({
  spent,
  total,
  isCompleted = false,
  className = '',
}) => {
  const percentage = Math.min(100, Math.round((spent / Math.max(1, total)) * 100));

  return (
    <div className={`min-w-0 flex flex-col gap-1 overflow-hidden select-none ${className}`}>
      <div className="flex items-center justify-between text-[9.5px] font-mono font-semibold text-slate-700">
        <span className="truncate">{spent}/{total}h</span>
        <span className="text-[9px] text-slate-400 font-normal">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/90">
        <motion.div
          initial={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            isCompleted || percentage >= 100
              ? 'bg-emerald-500'
              : 'bg-[#004AAD]'
          }`}
        />
      </div>
    </div>
  );
};
