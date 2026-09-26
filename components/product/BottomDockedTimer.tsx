"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Square, Keyboard, CheckSquare } from "lucide-react";

interface BottomDockedTimerProps {
  activeTaskTitle?: string;
  clientName?: string;
  initialSeconds?: number;
  onStopLog?: () => void;
}

export const BottomDockedTimer: React.FC<BottomDockedTimerProps> = ({
  activeTaskTitle = "GSTR-1 sales ledger matching & E-way bill validation",
  clientName = "Oswal Exports",
  initialSeconds = 5058, // 01:24:18
  onStopLog,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [isLoggedToast, setIsLoggedToast] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const timeFormatted = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const handleStop = () => {
    setIsRunning(false);
    setIsLoggedToast(true);
    if (onStopLog) onStopLog();
    setTimeout(() => setIsLoggedToast(false), 2400);
  };

  return (
    <div className="h-10 min-h-[40px] px-3 sm:px-4 bg-white text-slate-800 flex items-center justify-between border-t border-slate-200 select-none text-[12px] shrink-0 z-30 shadow-xs">
      {/* Left: Ticking Time Display & Controls */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <span className="font-mono font-extrabold text-[12.5px] sm:text-[13px] tracking-wider text-slate-900 bg-slate-100 px-2 sm:px-2.5 py-0.5 rounded-[6px] border border-slate-300 shadow-2xs">
          {timeFormatted}
        </span>

        {isRunning ? (
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setIsRunning(false)}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-[#db2777] text-white hover:bg-[#be185d] transition-colors shadow-2xs cursor-pointer flex-shrink-0"
              title="Pause Timer"
              aria-label="Pause Timer"
            >
              <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
            </button>
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-bold text-slate-900 truncate max-w-[130px] sm:max-w-[280px]">
                [{clientName}] {activeTaskTitle}
              </span>
              <span className="text-slate-400 hidden sm:inline">·</span>
              <span className="text-slate-700 font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 font-bold hidden sm:inline">
                BILLABLE
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRunning(true)}
              className="px-2 sm:px-2.5 py-1 rounded-[6px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 transition-colors shadow-2xs text-[11px] cursor-pointer"
              title="Resume Timer"
            >
              <Play className="w-2.5 h-2.5 fill-white" />
              <span>Resume</span>
            </button>
            <span className="text-slate-500 font-medium text-[11px] truncate max-w-[200px]">
              Paused on [{clientName}]
            </span>
          </div>
        )}

        {/* Stop & Log */}
        <button
          type="button"
          onClick={handleStop}
          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[6px] bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs flex-shrink-0"
          title="Stop and Log Time to Timesheet"
        >
          <Square className="w-2.5 h-2.5 fill-white" />
          <span className="hidden sm:inline">Stop &amp; Log</span>
        </button>

        {isLoggedToast && (
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-200 animate-in fade-in duration-200">
            ✓ 1h 24m Logged
          </span>
        )}
      </div>

      {/* Right: Keyboard Shortcuts */}
      <div className="flex items-center gap-2 flex-shrink-0 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
        <Keyboard className="w-3 h-3 text-slate-400" />
        <span className="text-[11px] font-medium hidden sm:inline">Shortcuts (?)</span>
      </div>
    </div>
  );
};
