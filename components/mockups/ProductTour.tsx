"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { ClientWorkspaceMockup } from "./ClientWorkspaceMockup";
import { MyWorkMockup } from "./MyWorkMockup";
import { WorkloadCockpitMockup } from "./WorkloadCockpitMockup";
import { AutomationWorkflowMockup } from "./AutomationWorkflowMockup";
import { ClientPortalMockup } from "./ClientPortalMockup";

type TourTab =
  | "Clients"
  | "Tasks"
  | "Engagements"
  | "Documents"
  | "Automations"
  | "Client Portal"
  | "Workload";

interface TabMeta {
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
}

const TOUR_CONTENT: Record<TourTab, TabMeta> = {
  Clients: {
    title: "Client Management & Hierarchies",
    tagline: "Know every client entity, sector, and risk status at a glance.",
    description:
      "Organize clients by industrial sectors, group related accounts under parent holdings, track statutory compliance status, and retain complete institutional memory across every engagement.",
    bullets: [
      "Multi-tier industry hierarchy (Manufacturing, Export, EPC, Retail)",
      "Real-time health status flags (At-Risk, Attention, Tier 1)",
      "Direct communication links for WhatsApp and Email Intake",
      "Unified compliance history and audit trail logs",
    ],
  },
  Tasks: {
    title: "Statutory Task Execution & Review",
    tagline: "Keep every filing, calculation, and review moving forward.",
    description:
      "Built specifically for CA firms to prevent statutory target misses. Group tasks by regulatory deadlines, enforce partner review checkpoints, and track real-time effort against billing budgets.",
    bullets: [
      "Overdue statutory target warning banners with partner escalations",
      "Effort tracking (e.g. 2.5/4h) with visual progress meters",
      "4-Eye review queue with draft locking before client dispatch",
      "Live running timer bar with inline quick-switch controls",
    ],
  },
  Engagements: {
    title: "Engagement & Retainer Management",
    tagline: "From engagement letter to sign-off, without scope creep.",
    description:
      "Structure multi-deliverable compliance retainers, statutory audit phases, and specialized tax projects with complete visibility into milestones, realized fees, and team ownership.",
    bullets: [
      "Annual statutory retainer tracking and MoM growth metrics",
      "Phase-gate milestone approvals for corporate audits",
      "Clear deliverables breakdown linked directly to tasks",
      "Contracted value vs. actual hours realized",
    ],
  },
  Documents: {
    title: "Bank-Grade Secure Documents & E-Sign",
    tagline: "No more sensitive financial records floating in unsecured email.",
    description:
      "Collect vouchers, bank statements, and tax forms through structured client checklists. Every file is encrypted, version-controlled, and audited.",
    bullets: [
      "Automated document request checklists with due dates",
      "One-click drag-and-drop client upload trays",
      "Legally binding digital e-signatures for tax filings",
      "Bank-grade AES-256 encryption at rest and in transit",
    ],
  },
  Automations: {
    title: "Routine Workflows on Autopilot",
    tagline: "Let Pyngyn handle reminders, follow-ups, and review gates.",
    description:
      "Trigger branded client WhatsApp messages when document requests lapse, auto-assign follow-up tasks to associates, and alert partners when compliance targets approach.",
    bullets: [
      "Document chase workflows with auto-escalation",
      "New client onboarding and folder provisioning",
      "Statutory compliance deadline alerts (7, 3, and 1-day warnings)",
      "Visual no-code automation builder designed for accounting teams",
    ],
  },
  "Client Portal": {
    title: "Branded Client Portal Experience",
    tagline: "Give clients one secure, modern space to collaborate with your firm.",
    description:
      "White-labeled under your firm's brand and custom domain. Clients log in with friction-free magic links to view deliverables, submit requested files, and e-sign drafts 24/7.",
    bullets: [
      "Friction-free magic link login (no forgotten passwords)",
      "Strict client-level data isolation (zero cross-client leakage)",
      "Live deliverable progress tracker reduces 'any update?' calls",
      "Integrated client approval and invoice review",
    ],
  },
  Workload: {
    title: "Team Workload & Capacity Planning",
    tagline: "See who has bandwidth before critical deadlines collide.",
    description:
      "Real-time visibility into team member capacity across partners, managers, and associates. Instantly identify overloaded staff during peak tax season and reassign deliverables with one click.",
    bullets: [
      "Per-practitioner capacity meters with overload indicators",
      "Optimal vs. available bandwidth tracking (e.g. 0/45h available)",
      "Statutory scope distribution across Audit, GST, Income Tax, and ROC",
      "Interactive workload rebalancing simulator",
    ],
  },
};

export function ProductTour() {
  const [activeTab, setActiveTab] = useState<TourTab>("Tasks");
  const meta = TOUR_CONTENT[activeTab];

  return (
    <section className="section bg-[#f8fafc] border-y border-slate-200">
      <div className="wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/80 bg-pink-50/50 px-3 py-0.5 text-[11.5px] font-bold text-[#14223d] uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#db2777]" />
            Interactive Product Tour
          </span>
          <h2 className="title mt-3">
            Explore the{" "}
            <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              connected accounting workspace.
            </span>
          </h2>
          <p className="lead mx-auto mt-4 max-w-[620px]">
            See how Pyngyn ClientSpace unites every phase of client delivery,
            from initial onboarding to statutory sign-off.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="mt-8 flex justify-center overflow-x-auto pb-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            {(
              [
                "Clients",
                "Tasks",
                "Engagements",
                "Documents",
                "Automations",
                "Client Portal",
                "Workload",
              ] as TourTab[]
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-lg px-3.5 sm:px-4 py-2 text-[12.5px] sm:text-[13px] font-semibold transition-all select-none whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[#14223d] bg-slate-100 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
          {/* Main Visual Display */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {activeTab === "Clients" ? (
                  <ClientWorkspaceMockup initialClient="oswal" viewMode="dossier" enableCameraZoom={false} />
                ) : activeTab === "Engagements" ? (
                  <ClientWorkspaceMockup initialClient="shreeji" enableCameraZoom={false} />
                ) : activeTab === "Tasks" ? (
                  <MyWorkMockup />
                ) : activeTab === "Workload" ? (
                  <WorkloadCockpitMockup />
                ) : activeTab === "Automations" ? (
                  <AutomationWorkflowMockup />
                ) : activeTab === "Client Portal" || activeTab === "Documents" ? (
                  <ClientPortalMockup />
                ) : (
                  <ClientWorkspaceMockup />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contextual Narrative Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#14223d]">
              {activeTab} Overview
            </span>
            <h3 className="mt-2 font-display text-[22px] font-bold text-slate-900 leading-tight">
              {meta.title}
            </h3>
            <p className="mt-1 text-[13.5px] font-medium text-slate-600">
              {meta.tagline}
            </p>
            <p className="mt-3 text-[13px] text-slate-500 leading-relaxed">
              {meta.description}
            </p>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="text-[11.5px] font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Key Capabilities
              </div>
              <ul className="space-y-2">
                {meta.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[12.5px] text-slate-600 leading-snug"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5] flex-none mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <a
                href="https://pyngyn.ai/demo"
                className="btn btn-primary w-full text-center text-[13px] py-2.5"
              >
                See {activeTab} in a live demo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
