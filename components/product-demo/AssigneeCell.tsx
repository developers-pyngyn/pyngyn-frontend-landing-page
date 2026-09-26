'use client';

import React from 'react';

export interface AssigneeCellProps {
  initials: string;
  name?: string;
  bgColor?: string;
  className?: string;
}

export const AssigneeCell: React.FC<AssigneeCellProps> = ({
  initials,
  name,
  bgColor = '#004AAD',
  className = '',
}) => {
  return (
    <div className={`min-w-0 flex items-center overflow-hidden select-none ${className}`} title={name || initials}>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-md text-[8.5px] font-bold text-white shadow-2xs flex-none ring-1 ring-white"
        style={{ backgroundColor: bgColor }}
      >
        {initials}
      </span>
    </div>
  );
};
