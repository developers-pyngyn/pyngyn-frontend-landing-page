'use client';

import React from 'react';

export interface DueDateCellProps {
  dueDate: string;
  isOverdue?: boolean;
  className?: string;
}

export const DueDateCell: React.FC<DueDateCellProps> = ({
  dueDate,
  isOverdue = false,
  className = '',
}) => {
  return (
    <div className={`min-w-0 overflow-hidden text-right select-none ${className}`}>
      <span
        className={`font-mono text-[10px] font-semibold truncate inline-block px-1.5 py-0.5 rounded ${
          isOverdue
            ? 'text-red-700 bg-red-50 border border-red-200/80 font-bold'
            : 'text-slate-600'
        }`}
      >
        {dueDate}
      </span>
    </div>
  );
};
