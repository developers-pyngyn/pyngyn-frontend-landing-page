"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  FileText,
  CheckCircle2,
  ChevronDown,
  Filter,
  Plus,
  Search,
  Flag,
  ShieldCheck,
  Paperclip,
  User,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { TaskItem, TaskStatus, TaskPriority } from "./types";
import { INITIAL_TASKS } from "./data";

interface TaskListProps {
  clientId?: string;
  onTaskSelect?: (task: TaskItem) => void;
  highlightTaskId?: string;
  enableInteractiveStatus?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  clientId = "oswal",
  onTaskSelect,
  highlightTaskId = "task-01",
  enableInteractiveStatus = true,
}) => {
  const [tasks, setTasks] = useState<TaskItem[]>(() =>
    clientId ? INITIAL_TASKS.filter((t) => t.clientId === clientId) : INITIAL_TASKS
  );
  const [selectedTaskId, setSelectedTaskId] = useState<string>(highlightTaskId);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterStatus, setActiveFilterStatus] = useState<string>("all");
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState<string | null>(null);

  const toggleTaskDone = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newStatus: TaskStatus = t.status === "filed" ? "in-progress" : "filed";
        return {
          ...t,
          status: newStatus,
          loggedHours: newStatus === "filed" ? t.estHours : Math.max(1, t.loggedHours),
        };
      })
    );
  };

  const updateStatus = (taskId: string, newStatus: TaskStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    setOpenStatusDropdownId(null);
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "filed":
        return {
          label: "Filed / Done",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "in-progress":
        return {
          label: "In Progress",
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };
      case "internal-review":
        return {
          label: "Internal Review",
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
        };
      case "client-approval":
        return {
          label: "Client Approval",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
      case "blocked":
        return {
          label: "Blocked",
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          dot: "bg-rose-500",
        };
      default:
        return {
          label: "To Do",
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          dot: "bg-slate-400",
        };
    }
  };

  const getPriorityFlag = (priority: TaskPriority) => {
    switch (priority) {
      case "urgent":
        return { text: "Urgent", color: "text-rose-600 bg-rose-50 border-rose-200" };
      case "high":
        return { text: "High", color: "text-amber-700 bg-amber-50 border-amber-200" };
      case "low":
        return { text: "Low", color: "text-slate-500 bg-slate-50 border-slate-200" };
      default:
        return { text: "Normal", color: "text-blue-700 bg-blue-50 border-blue-200" };
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeFilterStatus !== "all" && t.status !== activeFilterStatus) return false;
    return true;
  });

  const overdueTasks = filteredTasks.filter((t) => t.isOverdue || t.status === "blocked");
  const regularTasks = filteredTasks.filter((t) => !t.isOverdue && t.status !== "blocked");

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Top Filter & Action Bar */}
      <div className="px-3 sm:px-4 py-2 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-[7px] px-2.5 py-1 text-[12px] w-48 sm:w-56 shadow-2xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tasks..."
              className="outline-none bg-transparent flex-1 text-[12px] text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-[7px] p-0.5 text-[11px] font-semibold text-slate-600 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveFilterStatus("all")}
              className={`px-2 py-0.5 rounded-[5px] cursor-pointer transition-colors ${
                activeFilterStatus === "all" ? "bg-slate-100 text-slate-900 font-bold" : "hover:text-slate-900"
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilterStatus("in-progress")}
              className={`px-2 py-0.5 rounded-[5px] cursor-pointer transition-colors ${
                activeFilterStatus === "in-progress" ? "bg-blue-100 text-blue-800 font-bold" : "hover:text-slate-900"
              }`}
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => setActiveFilterStatus("internal-review")}
              className={`px-2 py-0.5 rounded-[5px] cursor-pointer transition-colors ${
                activeFilterStatus === "internal-review" ? "bg-purple-100 text-purple-800 font-bold" : "hover:text-slate-900"
              }`}
            >
              Review Queue
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-[6px] hidden sm:inline">
            Group by: <strong className="text-slate-700">Urgency</strong>
          </span>
          <button
            type="button"
            className="px-2.5 py-1 rounded-[6px] bg-[#14223d] hover:bg-[#1c2e4f] text-white text-[11.5px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <Plus className="w-3 h-3 text-white" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Overdue Alert Banner */}
      <div className="bg-rose-50/90 border-b border-rose-200/80 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 text-[12px] text-rose-800 font-semibold">
        <div className="flex items-center gap-2 truncate">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 animate-pulse" />
          <span className="truncate">
            <strong>Statutory Escalation:</strong> 2 targets overdue (GSTR-1 ledger reconciliation &amp; DSC Token). Partner sign-off required.
          </span>
        </div>
        <span className="text-[10.5px] font-mono font-bold bg-white text-rose-700 border border-rose-200 px-2 py-0.5 rounded shrink-0">
          Escalated to Rajesh (Partner)
        </span>
      </div>

      {/* Task Rows List Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 text-[12.5px]">
        {/* SECTION 1: OVERDUE & ATTENTION NEEDED */}
        {overdueTasks.length > 0 && (
          <div>
            <div className="bg-slate-50 px-3 sm:px-4 py-1.5 text-[11px] font-extrabold text-rose-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Overdue &amp; Critical Action Required ({overdueTasks.length})</span>
            </div>

            {overdueTasks.map((t) => renderTaskRow(t))}
          </div>
        )}

        {/* SECTION 2: DUE THIS WEEK & REGULAR QUEUE */}
        {regularTasks.length > 0 && (
          <div>
            <div className="bg-slate-50 px-3 sm:px-4 py-1.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Active Compliance Work In Hand ({regularTasks.length})</span>
            </div>

            {regularTasks.map((t) => renderTaskRow(t))}
          </div>
        )}
      </div>
    </div>
  );

  function renderTaskRow(t: TaskItem) {
    const isSelected = selectedTaskId === t.id;
    const isDone = t.status === "filed";
    const statusMeta = getStatusBadge(t.status);
    const priorityMeta = getPriorityFlag(t.priority);
    const effortPct = Math.min(100, Math.round((t.loggedHours / t.estHours) * 100));

    return (
      <div
        key={t.id}
        id={`task-row-${t.id}`}
        onClick={() => {
          setSelectedTaskId(t.id);
          if (onTaskSelect) onTaskSelect(t);
        }}
        className={`group flex items-center justify-between px-3 sm:px-4 py-2.5 transition-colors cursor-pointer border-l-4 relative ${
          isSelected
            ? "bg-pink-50/40 border-l-[#db2777]"
            : isDone
            ? "bg-slate-50/50 border-l-emerald-400 opacity-75"
            : t.isOverdue
            ? "border-l-rose-500 hover:bg-slate-50"
            : "border-l-transparent hover:bg-slate-50"
        }`}
      >
        {/* Left: Checkbox + Title + Statutory Chip */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={isDone}
            onClick={(e) => toggleTaskDone(t.id, e)}
            className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
              isDone
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-slate-300 hover:border-pink-500 bg-white"
            }`}
          >
            {isDone && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-semibold text-slate-900 leading-tight ${
                  isDone ? "line-through text-slate-400 font-normal" : ""
                }`}
              >
                {t.title}
              </span>

              {t.statutoryTag && (
                <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded shrink-0">
                  {t.statutoryTag}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5 flex-wrap">
              <span>{t.engagement}</span>
              <span>·</span>
              <span className={t.isOverdue ? "text-rose-600 font-bold" : "text-slate-500"}>
                Due: {t.dueDate}
              </span>
              {t.docsRequired && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 text-slate-500">
                    <Paperclip className="w-2.5 h-2.5" />
                    <span>{t.docsReceived}/{t.docsRequired} docs</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Status Pill + Priority + Effort Bar + Assignees */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Effort Counter & Mini Bar */}
          <div className="hidden md:flex flex-col items-end w-20">
            <div className="text-[11px] font-mono font-bold text-slate-700">
              {t.loggedHours}/{t.estHours}h
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-0.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  effortPct > 100
                    ? "bg-rose-500"
                    : effortPct >= 75
                    ? "bg-amber-500"
                    : "bg-blue-600"
                }`}
                style={{ width: `${effortPct}%` }}
              />
            </div>
          </div>

          {/* Priority Flag */}
          <span
            className={`hidden sm:inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded border ${priorityMeta.color}`}
          >
            <Flag className="w-2.5 h-2.5" />
            <span>{priorityMeta.text}</span>
          </span>

          {/* Status Dropdown Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenStatusDropdownId(openStatusDropdownId === t.id ? null : t.id);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${statusMeta.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dot}`} />
              <span>{statusMeta.label}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-60" />
            </button>

            {/* Interactive Status Transition Dropdown */}
            {openStatusDropdownId === t.id && enableInteractiveStatus && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-[10px] shadow-xl p-1.5 z-50 text-[11.5px] space-y-0.5">
                {(
                  [
                    "todo",
                    "in-progress",
                    "internal-review",
                    "client-approval",
                    "blocked",
                    "filed",
                  ] as TaskStatus[]
                ).map((st) => {
                  const meta = getStatusBadge(st);
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={(e) => updateStatus(t.id, st, e)}
                      className={`w-full text-left px-2 py-1 rounded-[6px] flex items-center gap-2 hover:bg-slate-100 cursor-pointer ${
                        t.status === st ? "font-bold text-slate-900 bg-slate-50" : "text-slate-700"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                      <span>{meta.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Assignee Avatar Stack */}
          <div className="flex items-center -space-x-1.5 shrink-0">
            {t.assignees.map((a) => (
              <div
                key={a.id}
                title={`${a.name} (${a.role})`}
                className={`w-5 h-5 rounded-md ${a.avatarColor} text-white font-bold text-[9px] flex items-center justify-center border border-white shadow-2xs`}
              >
                {a.initials}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
