'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge, PyngynStatusType } from './StatusBadge';
import { EffortCell } from './EffortCell';
import { AssigneeCell } from './AssigneeCell';
import { PriorityCell, PyngynPriority } from './PriorityCell';
import { DueDateCell } from './DueDateCell';

export interface TaskRowData {
  id: string;
  name: string;
  client: string;
  status: PyngynStatusType;
  effortSpent: number;
  effortTotal: number;
  assigneeInitials: string;
  assigneeName?: string;
  assigneeBg?: string;
  priority: PyngynPriority;
  dueDate: string;
  isOverdue?: boolean;
}

export interface TaskRowProps {
  task: TaskRowData;
  isActive?: boolean;
  isChecked?: boolean;
  onToggleCheck?: () => void;
  onClick?: () => void;
  className?: string;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  task,
  isActive = false,
  isChecked = false,
  onToggleCheck,
  onClick,
  className = '',
}) => {
  const isCompleted = task.status === 'Filed / Completed' || isChecked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`grid items-center gap-2 px-3.5 py-2.5 text-[11.5px] border-b border-slate-100 transition-colors select-none group cursor-pointer ${
        isActive
          ? 'bg-blue-50/70 ring-1 ring-blue-300/80'
          : isCompleted
          ? 'bg-slate-50/40 hover:bg-slate-50/80'
          : 'hover:bg-slate-50/90'
      } ${className}`}
      style={{
        gridTemplateColumns: 'minmax(0, 1fr) 112px 76px 48px 68px 58px',
      }}
    >
      {/* 1. Name & Client with Checkbox */}
      <div className="flex items-center gap-2.5 min-w-0 overflow-hidden pr-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => {
            e.stopPropagation();
            onToggleCheck?.();
          }}
          className="h-3.5 w-3.5 flex-none rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
        />
        <div className="min-w-0 flex-1 overflow-hidden">
          <span
            className={`font-semibold block truncate text-[11.5px] leading-tight ${
              isCompleted
                ? 'text-slate-400 line-through'
                : 'text-slate-900 group-hover:text-[#004AAD]'
            }`}
          >
            {task.name}
          </span>
          <span className="text-[10px] text-slate-400 block truncate mt-0.5 leading-tight">
            {task.client}
          </span>
        </div>
      </div>

      {/* 2. Status Badge */}
      <div className="min-w-0 overflow-hidden">
        <StatusBadge status={task.status} />
      </div>

      {/* 3. Effort Cell */}
      <div className="min-w-0 overflow-hidden">
        <EffortCell
          spent={task.effortSpent}
          total={task.effortTotal}
          isCompleted={isCompleted}
        />
      </div>

      {/* 4. Assignee Cell */}
      <div className="min-w-0 overflow-hidden">
        <AssigneeCell
          initials={task.assigneeInitials}
          name={task.assigneeName}
          bgColor={task.assigneeBg}
        />
      </div>

      {/* 5. Priority Cell */}
      <div className="min-w-0 overflow-hidden">
        <PriorityCell priority={task.priority} />
      </div>

      {/* 6. Due Date Cell */}
      <div className="min-w-0 overflow-hidden">
        <DueDateCell
          dueDate={task.dueDate}
          isOverdue={task.isOverdue}
        />
      </div>
    </motion.div>
  );
};
