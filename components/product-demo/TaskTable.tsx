'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TaskRow, TaskRowData } from './TaskRow';

export interface TaskTableProps {
  tasks: TaskRowData[];
  sectionTitle?: string;
  activeTaskId?: string;
  onSelectTask?: (id: string) => void;
  className?: string;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  sectionTitle = 'Assigned To Me',
  activeTaskId,
  onSelectTask,
  className = '',
}) => {
  return (
    <div className={`w-full flex flex-col bg-white overflow-hidden select-none ${className}`}>
      {/* Table Header: Guaranteed Non-Overlapping Grid */}
      <div
        className="grid items-center gap-2 border-b border-slate-200/80 bg-slate-50/90 px-3.5 py-1.5 text-[9.5px] font-bold tracking-wider text-slate-400 uppercase"
        style={{
          gridTemplateColumns: 'minmax(0, 1fr) 112px 76px 48px 68px 58px',
        }}
      >
        <span className="truncate min-w-0">NAME</span>
        <span className="truncate min-w-0">STATUS</span>
        <span className="truncate min-w-0">EFFORT</span>
        <span className="truncate min-w-0">ASSIGNEE</span>
        <span className="truncate min-w-0">PRIORITY</span>
        <span className="text-right truncate min-w-0">DUE</span>
      </div>

      {/* Collapsible Section Header */}
      <div className="flex items-center gap-1.5 bg-slate-50/50 px-3.5 py-1.5 border-b border-slate-100 text-[10.5px] font-bold text-slate-700">
        <ChevronDown size={11} className="text-slate-400" />
        <span>{sectionTitle}</span>
        <span className="rounded-full bg-slate-200/80 px-1.5 py-0.2 text-[9px] font-bold text-slate-600">
          {tasks.length}
        </span>
      </div>

      {/* Rows Container */}
      <div className="flex-1 overflow-hidden divide-y divide-slate-100/80">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              isActive={task.id === activeTaskId}
              onClick={() => onSelectTask?.(task.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
