"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  FileSpreadsheet,
  FolderLock,
  Clock,
  HelpCircle,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
  X,
  Check,
} from "lucide-react";

interface ComparisonItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const BEFORE_ITEMS: ComparisonItem[] = [
  {
    icon: Mail,
    title: "Email Thread Clutter",
    desc: "Critical tax returns and engagement letters buried under 20-reply threads.",
  },
  {
    icon: MessageSquare,
    title: "Scattered WhatsApp Messages",
    desc: "Client documents sent on personal phones with zero team visibility.",
  },
  {
    icon: FileSpreadsheet,
    title: "Brittle Tracking Spreadsheets",
    desc: "Manual status updates that go out-of-date within 24 hours of filing season.",
  },
  {
    icon: FolderLock,
    title: "Unsecured Shared Folders",
    desc: "Sensitive financial records moved without access controls or audit trails.",
  },
  {
    icon: Clock,
    title: "Manual Deadline Reminders",
    desc: "Partners spending high-value billable hours chasing clients for missing vouchers.",
  },
  {
    icon: HelpCircle,
    title: "Constant 'Any Update?' Calls",
    desc: "Clients left in the dark, calling your team while the actual work waits.",
  },
];

const AFTER_ITEMS: ComparisonItem[] = [
  {
    icon: Building2,
    title: "Single Client Workspace",
    desc: "One connected workspace for every client's tasks, files, and deadlines.",
  },
  {
    icon: CheckCircle2,
    title: "Statutory Task Engine",
    desc: "Due dates mapped to regulatory calendars with automated partner escalations.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Document Vault",
    desc: "AES-256 encrypted file collection with client checklists and audit logs.",
  },
  {
    icon: Zap,
    title: "Automated Reminders",
    desc: "Automatic follow-ups dispatched via branded email and WhatsApp.",
  },
  {
    icon: Sparkles,
    title: "Self-Service Client Portal",
    desc: "Clients log in with one-click magic links to see live progress and e-sign drafts.",
  },
  {
    icon: Users,
    title: "Balanced Team Workload",
    desc: "Real-time visibility into staff capacity to prevent busy-season burnout.",
  },
];

export function ProblemBeforeAfter() {
  return (
    <section id="problem" className="section bg-white border-b border-slate-200">
      <div className="wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">The Operating Shift</span>
          <h2 className="title mt-3">
            Stop running tax & audit season through chaotic inboxes.
          </h2>
          <p className="lead mx-auto mt-4 max-w-[640px]">
            Most accounting firms lose 25% of their billable capacity to status
            chasing, lost documents, and spreadsheet maintenance.
          </p>
        </div>

        {/* The Bottleneck Narrative Card */}
        <div className="mt-10 mx-auto max-w-[880px] rounded-2xl border border-slate-200 bg-gradient-to-r from-amber-50/60 via-slate-50 to-indigo-50/60 p-5 sm:p-7 shadow-xs">
          <div className="grid items-center gap-6 sm:grid-cols-[200px_1fr] md:grid-cols-[220px_1fr]">
            {/* Visual: Scattered Bottleneck Simulation */}
            <div className="mx-auto w-full max-w-[220px] rounded-xl border border-amber-200/80 bg-white/95 p-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                    Live Inbound Chaos
                  </span>
                </div>
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-600">
                  +18 Chases
                </span>
              </div>

              <div className="mt-2.5 space-y-2">
                {/* WhatsApp Ping */}
                <div className="flex items-start gap-2 rounded-lg bg-emerald-50/80 p-2 border border-emerald-100/80">
                  <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500 text-white mt-0.5">
                    <MessageSquare className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-950">WhatsApp</span>
                      <span className="text-[9px] text-emerald-700/80">10:42 AM</span>
                    </div>
                    <p className="text-[10.5px] text-emerald-900 leading-snug font-medium truncate">
                      &ldquo;Did you get my voucher?&rdquo;
                    </p>
                  </div>
                </div>

                {/* Unorganized Email Inbox */}
                <div className="flex items-start gap-2 rounded-lg bg-rose-50/80 p-2 border border-rose-100/80">
                  <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-rose-500 text-white mt-0.5">
                    <Mail className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-rose-950">Director Inbox</span>
                      <span className="text-[9px] text-rose-700/80">10:44 AM</span>
                    </div>
                    <p className="text-[10.5px] text-rose-900 leading-snug font-medium truncate">
                      &ldquo;Any update on our filing?&rdquo;
                    </p>
                  </div>
                </div>

                {/* Brittle Excel Spreadsheet */}
                <div className="flex items-start gap-2 rounded-lg bg-amber-50/80 p-2 border border-amber-100/80">
                  <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-amber-500 text-white mt-0.5">
                    <FileSpreadsheet className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-950">Excel Tracker</span>
                      <span className="text-[9px] text-amber-700/80">Conflict</span>
                    </div>
                    <p className="text-[10.5px] text-amber-900 leading-snug font-medium truncate">
                      ITR_v3_Final(2).xlsx
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 rounded-md bg-slate-900/5 px-2 py-1 text-center">
                <span className="text-[9.5px] font-semibold text-slate-700 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3 text-slate-500" />
                  Partner Bottleneck: ~2.5 hrs/day
                </span>
              </div>
            </div>

            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                The Busy-Season Bottleneck
              </span>
              <h3 className="mt-2 font-display text-[20px] sm:text-[22px] font-bold text-slate-900 leading-snug">
                &ldquo;Did you get my voucher? Any update on our filing?&rdquo;
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                When accounting work is scattered across WhatsApp, unorganized email inboxes, and
                Excel, partners become the bottleneck between clients and their
                own information. ClientSpace replaces the chaos with an
                integrated operating cockpit.
              </p>
            </div>
          </div>
        </div>

        {/* Before vs After Grid */}
        <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Before Column */}
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/30 p-5 sm:p-8">
            <div className="flex items-start gap-2.5">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rose-100 text-rose-700 mt-0.5 shrink-0">
                <X className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
              <h3 className="font-display text-[20px] font-bold text-slate-900 leading-tight">
                Before Pyngyn: Scattered Chaos
              </h3>
            </div>
            <p className="mt-2 text-[13px] text-slate-500">
              Disjointed tools, siloed files, and frantic deadline sprints.
            </p>

            <div className="mt-6 space-y-3">
              {BEFORE_ITEMS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-rose-100 bg-white p-3.5 shadow-2xs"
                  >
                    <div className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-rose-50 text-rose-600 mt-0.5 shrink-0">
                      <IconComp className="h-4 w-4 shrink-0" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-[13.5px] text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-[12.5px] text-slate-500 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* After Column */}
          <div className="rounded-2xl border border-slate-300 bg-slate-50/60 p-5 sm:p-8 shadow-card">
            <div className="flex items-start gap-2.5">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#14223d] text-white mt-0.5 shrink-0">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
              <h3 className="font-display text-[20px] font-bold text-slate-900 leading-tight">
                With Pyngyn ClientSpace: One Connected Workspace
              </h3>
            </div>
            <p className="mt-2 text-[13px] text-slate-500">
              Automated workflows, institutional clarity, and relaxed clients.
            </p>

            <div className="mt-6 space-y-3">
              {AFTER_ITEMS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-slate-100 text-[#14223d] mt-0.5 shrink-0">
                      <IconComp className="h-4 w-4 shrink-0" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-[13.5px] text-slate-950">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-[12.5px] text-slate-600 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
