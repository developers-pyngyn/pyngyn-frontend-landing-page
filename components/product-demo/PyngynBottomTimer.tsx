'use client';

import React from 'react';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynBottomTimerProps {
  timerDisplay?: string;
  activeTaskTitle?: string;
  clientName?: string;
  isRunning?: boolean;
  className?: string;
}

export const PyngynBottomTimer: React.FC<PyngynBottomTimerProps> = ({
  timerDisplay = '00:00:00',
  activeTaskTitle = 'GSTR-1 sales ledger ...',
  clientName = 'Oswal Exports',
  isRunning = false,
  className = '',
}) => {
  return (
    <footer
      data-product-target="bottom-timer"
      className={`h-[40px] min-h-[40px] px-4 bg-white text-[#113353] flex items-center justify-between border-t border-[#E5EAF2] select-none text-[12px] shrink-0 z-40 relative shadow-sm ${className}`}
    >
      {/* Left Area: Timer Readout, Play Button, Task Picker */}
      <div className="flex items-center gap-3">
        {/* Monospace Time Readout */}
        <span
          data-product-target="bottom-timer-display"
          className="font-mono font-extrabold text-[12.5px] tracking-widest text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-[6px] border border-slate-300/80 shadow-3xs select-all"
        >
          {timerDisplay}
        </span>

        {/* Start / Pause Button */}
        <button
          type="button"
          data-product-target="bottom-timer-toggle"
          className={`px-2.5 py-1 rounded-[6px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-[11.5px] shadow-xs ${
            isRunning
              ? 'bg-[#113353] hover:bg-[#0B2238] text-white'
              : 'bg-[#00960F] hover:bg-[#007A0C] text-white'
          }`}
        >
          {isRunning ? (
            <>
              <PyngynIcons.pause size={11} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <PyngynIcons.play size={10} />
              <span>Start</span>
            </>
          )}
        </button>

        {/* Selected Task Chip */}
        <div
          data-product-target="bottom-timer-task"
          className="flex items-center gap-1.5 text-[#113353] bg-[#F8FAFC] border border-[#E5EAF2] hover:border-[#113353]/30 px-2.5 py-1 rounded-[6px] cursor-pointer max-w-[340px] truncate"
        >
          <span className="text-[11px] font-bold text-[#627D98] uppercase">TASK:</span>
          <span className="font-semibold text-[11.5px] truncate text-[#113353]">
            {activeTaskTitle.includes(`[${clientName}]`) ? activeTaskTitle : `[${clientName}] ${activeTaskTitle}`}
          </span>
          <PyngynIcons.chevronDown size={11} className="text-[#627D98] shrink-0" />
        </div>
      </div>

      {/* Right Area: Mascot icon + Shortcuts help */}
      <div className="flex items-center gap-3 text-[#627D98] text-[11.5px]">
        {/* Mascot circle */}
        <div
          data-product-target="bottom-mascot-helper"
          className="w-6 h-6 rounded-full bg-[#EBFDFF] border border-[#5DE0E6] flex items-center justify-center cursor-pointer shadow-3xs hover:scale-105 transition-transform"
          title="Pyngyn Assistant (Online)"
        >
          <img src="/mascot/pyngyn-avatar.png" alt="Pyngyn" className="w-4 h-4 object-contain" />
        </div>

        <button
          type="button"
          data-product-target="shortcuts-help-btn"
          className="hover:text-[#113353] transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>Shortcuts (?)</span>
        </button>
      </div>
    </footer>
  );
};
