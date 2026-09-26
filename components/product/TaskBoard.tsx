"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Paperclip,
  Flag,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { TaskItem, TaskStatus } from "./types";
import { INITIAL_TASKS } from "./data";

const COLUMNS: {
  id: TaskStatus;
  label: string;
  headerBg: string;
  headerBorder: string;
  headerText: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "todo",
    label: "To Do",
    headerBg: "bg-slate-100",
    headerBorder: "border-slate-200",
    headerText: "text-slate-700",
    badgeBg: "bg-slate-200",
    badgeText: "text-slate-700",
    icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
  },
  {
    id: "in-progress",
    label: "In Progress",
    headerBg: "bg-blue-50",
    headerBorder: "border-blue-200",
    headerText: "text-blue-900",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
  },
  {
    id: "internal-review",
    label: "Internal Review (4-Eye Gate)",
    headerBg: "bg-purple-50",
    headerBorder: "border-purple-200",
    headerText: "text-purple-900",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />,
  },
  {
    id: "client-approval",
    label: "Client Approval",
    headerBg: "bg-amber-50",
    headerBorder: "border-amber-200",
    headerText: "text-amber-900",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    icon: <UserCheck className="w-3.5 h-3.5 text-amber-600" />,
  },
  {
    id: "filed",
    label: "Filed / Completed",
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-200",
    headerText: "text-emerald-900",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
  },
];

export const TaskBoard: React.FC<{ initialTasks?: TaskItem[] }> = ({
  initialTasks = INITIAL_TASKS,
}) => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const moveTaskToNextStage = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const stageOrder: TaskStatus[] = [
      "todo",
      "in-progress",
      "internal-review",
      "client-approval",
      "filed",
    ];

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const currentIndex = stageOrder.indexOf(t.status);
        const nextIndex = (currentIndex + 1) % stageOrder.length;
        return {
          ...t,
          status: stageOrder[nextIndex],
          loggedHours:
            stageOrder[nextIndex] === "filed" ? t.estHours : Math.max(1, t.loggedHours),
        };
      })
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 p-3 select-none overflow-hidden">
      {/* Kanban Board Stage Columns Horizontal Container */}
      <div className="flex items-start gap-3 overflow-x-auto pb-2 flex-1 min-h-0">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="w-72 min-w-[270px] bg-slate-100/90 rounded-[12px] border border-slate-200 flex flex-col max-h-full shrink-0 shadow-2xs"
            >
              {/* Column Header */}
              <div
                className={`px-3 py-2.5 rounded-t-[11px] border-b ${col.headerBg} ${col.headerBorder} flex items-center justify-between`}
              >
                <div className="flex items-center gap-2">
                  {col.icon}
                  <span className={`text-[12.5px] font-bold ${col.headerText}`}>
                    {col.label}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-full ${col.badgeBg} ${col.badgeText}`}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards Stack */}
              <div className="p-2 space-y-2 overflow-y-auto flex-1">
                <AnimatePresence>
                  {colTasks.map((t) => {
                    const isOverdue = t.isOverdue;
                    return (
                      <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setActiveCardId(t.id)}
                        className={`bg-white rounded-[9px] border p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group relative ${
                          activeCardId === t.id
                            ? "border-pink-500 ring-2 ring-pink-500/20"
                            : isOverdue
                            ? "border-rose-300 border-l-4 border-l-rose-500"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {/* Client & Statutory Header */}
                        <div className="flex items-center justify-between text-[10.5px] text-slate-500 mb-1">
                          <span className="font-bold text-slate-800 truncate">
                            {t.clientName}
                          </span>
                          {t.statutoryTag && (
                            <span className="font-mono bg-slate-100 border border-slate-200 px-1 rounded text-slate-600">
                              {t.statutoryTag}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-semibold text-slate-900 text-[12.5px] leading-snug group-hover:text-[#db2777] transition-colors">
                          {t.title}
                        </h4>

                        {/* Engagement Subtitle */}
                        <div className="text-[11px] text-slate-500 mt-1 truncate">
                          {t.engagement}
                        </div>

                        {/* Card Footer: Due Date, Effort & Advance Button */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-mono text-[10.5px] ${
                                isOverdue ? "text-rose-600 font-bold" : "text-slate-500"
                              }`}
                            >
                              {t.dueDate}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="font-mono text-slate-600 font-medium">
                              {t.loggedHours}/{t.estHours}h
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Advance stage button */}
                            <button
                              type="button"
                              onClick={(e) => moveTaskToNextStage(t.id, e)}
                              className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-pink-100 hover:text-[#db2777] border border-slate-200 text-slate-600 text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                              title="Advance to next workflow stage"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-2.5 h-2.5" />
                            </button>

                            {/* Assignee Avatars */}
                            <div className="flex items-center -space-x-1">
                              {t.assignees.map((a) => (
                                <div
                                  key={a.id}
                                  title={a.name}
                                  className={`w-4 h-4 rounded-md ${a.avatarColor} text-white font-bold text-[8px] flex items-center justify-center border border-white`}
                                >
                                  {a.initials}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {colTasks.length === 0 && (
                  <div className="text-center py-6 text-slate-400 text-[12px] italic">
                    No deliverables in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
