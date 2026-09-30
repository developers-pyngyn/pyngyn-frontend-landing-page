"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  MessageSquare,
  Mail,
  Sparkles,
  Megaphone,
  BarChart3,
  Calendar,
  FileSpreadsheet,
  Briefcase,
  Zap,
  Folder,
  Smartphone,
  Scale,
  Search,
  Shield,
  Check,
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { DEMO_URL, SIGNUP_URL } from "../config";
import { ClientWorkspaceMockup } from "../mockups/ClientWorkspaceMockup";
import { ClientPortalMockup } from "../mockups/ClientPortalMockup";
import { WorkloadCockpitMockup } from "../mockups/WorkloadCockpitMockup";
import { AutomationWorkflowMockup } from "../mockups/AutomationWorkflowMockup";
import { ExecutiveDashboardMockup } from "../mockups/ExecutiveDashboardMockup";
import { StatutoryCalendarMockup } from "../mockups/StatutoryCalendarMockup";
import { MyWorkMockup } from "../mockups/MyWorkMockup";
import { SplitAgentWorkShowcase } from "../mockups/SplitAgentWorkShowcase";
import { PyngynCelebrationOverlay } from "../product-demo/PyngynCelebrationOverlay";
import { DesktopMockupFrame } from "./DesktopMockupFrame";

// ============================================================================
// 1. CLIENT MANAGEMENT SECTION
// ============================================================================
export function ClientManagementSection() {
  return (
    <section id="client-management" className="section bg-white border-b border-slate-200">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#db2777] mr-1.5 align-middle" />
            Client Management
          </span>
          <h2 className="title mt-3">
            Know every client.{" "}
            <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              At a glance.
            </span>
          </h2>
          <p className="lead mx-auto mt-4 max-w-[640px]">
            Stop digging through folders and email threads to remember who is
            handling a client. ClientSpace centralizes every entity, holding
            structure, partner in charge, and statutory health score in one
            unified profile.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3 max-w-[1040px] mx-auto">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <h4 className="font-bold text-[14.5px] text-slate-900">
              Sector &amp; Industry Hierarchies
            </h4>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Group accounts under parent holdings (Manufacturing, Automotive, EPC, Retail) with nested portfolio navigation.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <h4 className="font-bold text-[14.5px] text-slate-900">
              Real-Time Compliance Health
            </h4>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Instant visual flags for At-Risk, Attention, and Tier-1 retainers before statutory deadlines are compromised.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <h4 className="font-bold text-[14.5px] text-slate-900">
              Multi-Contact Authorizations
            </h4>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Keep directors, CFOs, external bookkeepers, and signing partners synchronized on every deliverable.
            </p>
          </div>
        </div>

        {/* Authentic Client Workspace Mockup Display — Shreeji Constructions */}
        <div className="mt-10 mx-auto max-w-[1040px]">
          <ClientWorkspaceMockup initialClient="shreeji" viewMode="tasks" enableCameraZoom={false} />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 2. TASK MANAGEMENT & 4-EYE REVIEW GATES
// ============================================================================
export function TaskManagementSection() {
  return (
    <section id="task-management" className="section bg-[#f8fafc] border-b border-slate-200">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#db2777] mr-1.5 align-middle" />
            Task Management
          </span>
          <h2 className="title mt-3">
            Keep every piece of client work{" "}
            <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              moving.
            </span>
          </h2>
          <p className="lead mx-auto mt-4 max-w-[620px]">
            Engineered around statutory compliance deadlines, internal review
            queues, and multi-tier sign-offs so no filing slips through.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card h-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 border border-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="mt-3 font-bold text-[16px] text-slate-900">
              Statutory Overdue Grouping
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
              Automatic escalation banners highlight filings that have breached
              or are approaching statutory targets, triggering direct partner
              alerts.
            </p>
          </div>

          <div className="card h-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
              <Search className="h-5 w-5 text-[#14223d]" />
            </div>
            <h3 className="mt-3 font-bold text-[16px] text-slate-900">
              4-Eye Review Gates
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
              Enforce quality controls. When an associate completes a tax
              computation, it is locked in the Review Queue until the partner
              verifies the working papers.
            </p>
          </div>

          <div className="card h-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
              <Clock className="h-5 w-5 text-slate-700" />
            </div>
            <h3 className="mt-3 font-bold text-[16px] text-slate-900">
              Live Effort Tracking (e.g. 2.5/4h)
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
              Track actual effort against allocated billing budgets with
              integrated timers, preventing write-offs and scope bleed on fixed-fee
              retainers.
            </p>
          </div>

          <div className="card h-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
              <RefreshCw className="h-5 w-5 text-[#14223d]" />
            </div>
            <h3 className="mt-3 font-bold text-[16px] text-slate-900">
              Recurring Compliance Cycles
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
              Auto-generate monthly, quarterly, and annual compliance tasks (GSTR-1,
              GSTR-3B, Advance Tax, TDS) on regulatory schedule milestones.
            </p>
          </div>

          <div className="card h-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
              <Lock className="h-5 w-5 text-slate-700" />
            </div>
            <h3 className="mt-3 font-bold text-[16px] text-slate-900">
              Sensitive Working Papers
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
              Mark sensitive audit calculations and tax opinions as restricted,
              protecting privileged communications with role-based access.
            </p>
          </div>

          <div className="card h-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
              <Users className="h-5 w-5 text-[#14223d]" />
            </div>
            <h3 className="mt-3 font-bold text-[16px] text-slate-900">
              Multi-Assignee Ownership
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
              Assign senior partners, working associates, and reviewers to the same
              deliverable with designated escalation roles.
            </p>
          </div>
        </div>

        {/* Split-Panel Agent-at-Work Showcase: Real Task Board + Progressive Scrutiny Checklist */}
        <div className="mt-12 mx-auto max-w-[1040px]">
          <SplitAgentWorkShowcase />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. ENGAGEMENT MANAGEMENT
// ============================================================================
export function EngagementSection() {
  return (
    <section id="engagements" className="section bg-white border-b border-slate-200">
      <div className="wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#db2777] mr-1.5 align-middle" />
            Engagement Management
          </span>
          <h2 className="title mt-3">
            From engagement letter{" "}
            <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              to sign-off.
            </span>
          </h2>
          <p className="lead mx-auto mt-4 max-w-[640px]">
            Stop treating complex audit cycles like generic project tickets.
            ClientSpace organizes accounting deliverables into formal
            engagements with milestones, contracted fees, and realization
            tracking.
          </p>
        </div>

        {/* 3-Column Feature Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3 max-w-[1040px] mx-auto">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <h4 className="font-bold text-[14.5px] text-slate-900">
              Fixed-Fee Retainers &amp; Annual Renewals
            </h4>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Track contracted retainer values (e.g. ₹94.8L annual recurring
              fees) with month-over-month realization analytics.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <h4 className="font-bold text-[14.5px] text-slate-900">
              Statutory Phase-Gate Approvals
            </h4>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Enforce milestone sign-offs: Interim Testing → Ledger
              Scrutiny → Draft Report → Partner Review → Client E-Sign.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <h4 className="font-bold text-[14.5px] text-slate-900">
              Scope Creep Prevention
            </h4>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Instantly spot uncontracted work (e.g. ad-hoc tax notices) and
              convert them into secondary addendums with client approval.
            </p>
          </div>
        </div>

        {/* Authentic Client Engagement Workspace Mockup — Full Desktop Viewport */}
        <div className="mt-10 mx-auto max-w-[1040px]">
          <ClientWorkspaceMockup initialClient="shreeji" viewMode="tasks" enableCameraZoom={false} />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 4. CLIENT PORTAL
// ============================================================================
export function ClientPortalSection() {
  return (
    <section id="client-portal" className="section bg-[#f8fafc] border-b border-slate-200">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">Client Portal</span>
          <h2 className="title mt-3">
            Give clients one place to work with your firm.
          </h2>
          <p className="lead mx-auto mt-4 max-w-[640px]">
            No passwords to remember. White-labeled with your firm&apos;s brand.
            Clients see where work stands, upload missing vouchers, and e-sign
            drafts 24/7.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-[960px] relative">
          <ClientPortalMockup />
          {/* Floating Celebration Overlay on top */}
          <div className="absolute -top-3 sm:-top-5 right-4 sm:right-10 z-50 pointer-events-none drop-shadow-2xl">
            <PyngynCelebrationOverlay
              title="Client E-Signed 24Q Draft"
              subtitle="Oswal Exports · Sunita Oswal (Director)"
              statusText="Approved"
              avatarSrc="/team/vivek-pandey.png"
              mascotSrc="/mascot/pyng-comms.png"
              showCursor={true}
              cursorOffset={{ x: 135, y: 14 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 5. COMMUNICATION & INTAKE (WITH PYNG COMMS MASCOT)
// ============================================================================
export function CommunicationSection() {
  return (
    <section id="communication" className="section bg-white border-b border-slate-200">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <span className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#db2777] mr-1.5 align-middle" />
              Communication &amp; Intake
            </span>
            <h2 className="title mt-3">
              WhatsApp, Email, and AI{" "}
              <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
                in one thread.
              </span>
            </h2>
            <p className="lead mt-4">
              Clients don&apos;t want to install complex enterprise software. They
              message on WhatsApp and send emails. ClientSpace automatically
              ingests these conversations directly into the client&apos;s task
              queue.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[14px] text-slate-900 mt-2.5">
                  Branded WhatsApp Intake
                </h4>
                <p className="text-[12.5px] text-slate-500 mt-1">
                  Send automated document chase reminders and receive files
                  straight into working paper folders.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-[#14223d] border border-slate-200">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[14px] text-slate-900 mt-2.5">
                  Dedicated Email Ingestion
                </h4>
                <p className="text-[12.5px] text-slate-500 mt-1">
                  Each client gets a private inbound address
                  (e.g. horizon@intake.pyngyn.ai) that auto-logs attachments.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-[#14223d] border border-slate-200">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[14px] text-slate-900 mt-2.5">
                  Ask Pyngyn AI
                </h4>
                <p className="text-[12.5px] text-slate-500 mt-1">
                  Query prior tax filings, engagement terms, and statutory due
                  dates in plain English with instant answers.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                  <Megaphone className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[14px] text-slate-900 mt-2.5">
                  Compliance Channels
                </h4>
                <p className="text-[12.5px] text-slate-500 mt-1">
                  Team chat organized by deliverable (#tax-audit-fy26,
                  #gst-scrutiny-portal) keeps discussions in context.
                </p>
              </div>
            </div>
          </div>

          {/* Pyng Comms Mascot Card */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-100 via-white to-slate-50 p-6 text-center shadow-soft flex flex-col items-center group cursor-pointer"
          >
            <div className="relative h-48 w-48 mb-2">
              <Image
                src="/mascot/pyng-comms.png"
                alt="Pyng managing client communication on smartphone"
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <span className="rounded-full bg-slate-200 text-[#14223d] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              Pyng Comms Engine
            </span>
            <h4 className="mt-2 text-[16px] font-bold text-slate-900">
              Zero Manual Chasing
            </h4>
            <p className="mt-1 text-[12.5px] text-slate-500 leading-relaxed max-w-[300px]">
              &ldquo;Pyng auto-notifies your clients when document requests are
              overdue, logging replies without partner intervention.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 6. AUTOMATIONS
// ============================================================================
export function AutomationsSection() {
  return (
    <section id="automations" className="section bg-[#f8fafc] border-b border-slate-200">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">Workflow Automation</span>
          <h2 className="title mt-3">Let routine work run itself.</h2>
          <p className="lead mx-auto mt-4 max-w-[620px]">
            Eliminate repetitive busy-season overhead. Set up visual triggers for
            missing documents, review gates, and compliance deadlines.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-[960px] relative">
          <AutomationWorkflowMockup />
          {/* Floating Celebration Overlay on top */}
          <div className="absolute -top-3 sm:-top-5 right-4 sm:right-10 z-50 pointer-events-none drop-shadow-2xl">
            <PyngynCelebrationOverlay
              title="Auto-Dispatched GSTR-2B Notice"
              subtitle="Jain Traders · ₹3.2L Variance Claimed"
              statusText="Triggered"
              avatarSrc="/team/vivek-pandey.png"
              mascotSrc="/mascot/pyngyn-ai-avatar.png"
              showCursor={true}
              cursorOffset={{ x: 135, y: 14 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 7. WORKLOAD & TEAM CAPACITY (WITH PYNG HIERARCHY MASCOT)
// ============================================================================
export function WorkloadSection() {
  return (
    <section id="workload" className="section bg-white border-b border-slate-200">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px]">
          <div>
            <span className="eyebrow">Team Capacity & Workload</span>
            <h2 className="title mt-3">
              See who has capacity before work gets assigned.
            </h2>
            <p className="lead mt-4">
              Prevent partner burnout and balance delivery across Aarav, Priya,
              Rohan, Neha, and Aditya. ClientSpace tracks real-time billable hours
              against weekly bandwidth limits.
            </p>
          </div>

          {/* Pyng Capacity Mascot Card */}
          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-2xs group cursor-pointer"
          >
            <div className="relative h-20 w-20 flex-none">
              <Image
                src="/mascot/pyng-hierarchy.png"
                alt="Pyng analyzing team capacity hierarchy"
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <span className="font-bold text-[13px] text-slate-900 block">
                Intelligent Load Balancing
              </span>
              <p className="text-[12px] text-slate-500 leading-snug mt-0.5">
                Automatically flags staff members exceeding 35h/week and suggests
                available bandwidth.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 mx-auto max-w-[1040px]">
          <WorkloadCockpitMockup />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 8. DASHBOARD & STATUTORY COMPLIANCE RADAR
// ============================================================================
export function DashboardSection() {
  const [viewMode, setViewMode] = React.useState<"radar" | "calendar">("radar");

  return (
    <section id="dashboard" className="section bg-[#f8fafc] border-b border-slate-200">
      <div className="wrap">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <span className="eyebrow">Executive Compliance Radar</span>
            <h2 className="title mt-3">
              Real-time compliance intelligence for managing partners.
            </h2>
            <p className="lead mt-4">
              Maintain total oversight over every active statutory deadline, direct
              tax audit, and corporate filing velocity index across all practice
              retainers.
            </p>
          </div>

          {/* Pyng Audit & Megaphone Mascot Card */}
          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="flex items-center gap-4 rounded-2xl border border-slate-300 bg-white p-4 shadow-soft group cursor-pointer"
          >
            <div className="relative h-20 w-20 flex-none">
              <Image
                src="/mascot/pyng-audit-megaphone.png"
                alt="Pyng auditing compliance radar with magnifying glass and megaphone"
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <span className="rounded bg-slate-100 text-[#14223d] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                Practice Radar
              </span>
              <h4 className="font-bold text-[13.5px] text-slate-900 mt-1">
                Zero Missed Filings
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-snug mt-0.5">
                Statutory filing calendar auto-syncs with regulatory dates across
                GST, TDS, and MCA.
              </p>
            </div>
          </motion.div>
        </div>

        {/* View Switcher Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              onClick={() => setViewMode("radar")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[12px] font-bold transition-all ${
                viewMode === "radar"
                  ? "bg-[#14223d] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Executive Compliance Radar</span>
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[12px] font-bold transition-all ${
                viewMode === "calendar"
                  ? "bg-[#14223d] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Statutory Filing Calendar</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mockup View - Desktop Viewport / Laptop Screen Frame */}
        <div className="mt-8 mx-auto max-w-[1040px] relative">
          <DesktopMockupFrame
            url={
              viewMode === "radar"
                ? "app.pyngyn.com/compliance-radar"
                : "app.pyngyn.com/statutory-calendar"
            }
            baseWidth={1200}
            imageHeight={720}
            maxWidthClass="max-w-[1040px]"
            className="shadow-2xl"
          >
            <div className="w-full h-full overflow-hidden bg-white">
              {viewMode === "radar" ? (
                <ExecutiveDashboardMockup />
              ) : (
                <StatutoryCalendarMockup />
              )}
            </div>
          </DesktopMockupFrame>

          {/* Floating Celebration Overlay on top */}
          <div className="absolute -top-3 sm:-top-5 right-4 sm:right-10 z-50 pointer-events-none drop-shadow-2xl">
            <PyngynCelebrationOverlay
              title={viewMode === "radar" ? "100% Statutory Compliance" : "20th Sep: GSTR-3B Filing"}
              subtitle={
                viewMode === "radar"
                  ? "All 142 Filings Verified · 0 Penalties"
                  : "18 Portfolios Filed · 0 Penalties"
              }
              statusText="100% On-Time"
              avatarSrc="/team/vivek-pandey.png"
              mascotSrc="/mascot/pyng-audit-megaphone.png"
              showCursor={true}
              cursorOffset={{ x: 135, y: 14 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 9. INTEGRATIONS (HONEST ACCOUNTING ECOSYSTEM)
// ============================================================================
export function IntegrationsSection() {
  const INTEGRATIONS: {
    name: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { name: "Tally Prime", category: "Accounting & Ledgers", icon: BarChart3 },
    { name: "Zoho Books", category: "Invoicing & Books", icon: Briefcase },
    { name: "QuickBooks Online", category: "Cloud Accounting", icon: Zap },
    { name: "GST & IT Portals", category: "Gov & Tax Portals", icon: Scale },
    { name: "WhatsApp Business", category: "Client Messaging", icon: Smartphone },
    { name: "Google Calendar", category: "Deadlines & Practice Meetings", icon: Calendar },
    { name: "Google Drive", category: "Client Folders & Document Storage", icon: Folder },
    { name: "Gmail", category: "Client Emails & Task Conversion", icon: Mail },
    { name: "eMudhra & DocuSign", category: "e-Sign & DSC Tokens", icon: ShieldCheck },
    { name: "Razorpay Payments", category: "UPI & Fee Collections", icon: Sparkles },
  ];

  return (
    <section id="features" className="section bg-white border-b border-slate-200">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">Integrations</span>
          <h2 className="title mt-3">
            Connects with your firm&apos;s existing tools.
          </h2>
          <p className="lead mx-auto mt-4 max-w-[620px]">
            No need to replace your accounting stack. ClientSpace works alongside
            your core ledger software, tax suites, and calendars.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((tool) => {
            const IconComp = tool.icon;
            return (
              <div
                key={tool.name}
                className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-100 text-[#14223d] border border-slate-200">
                  <IconComp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[13.5px] text-slate-900">
                    {tool.name}
                  </h4>
                  <p className="text-[11.5px] text-slate-500">{tool.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 10. USE CASES (AUDIENCE SPECIFIC)
// ============================================================================
export function UseCasesSection() {
  const USE_CASES: {
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    link: string;
  }[] = [
    {
      title: "Chartered Accountants & CA Practices",
      desc: "Multi-partner practice governance, article workload cockpits, and ICAI SQC-1 quality review gates.",
      icon: Scale,
      link: "/solutions/accountants",
    },
    {
      title: "Accounting & Bookkeeping Firms",
      desc: "Monthly closing pipelines, automated bank feed reconciliations, MIS dashboards, and AP/AR workflows.",
      icon: BarChart3,
      link: "/solutions/accounting-firms",
    },
    {
      title: "Corporate Tax & Advisory Partnerships",
      desc: "Corporate ITR pipelines, GST 2B reconciliations, advance tax forecasting, and scrutiny notice defense.",
      icon: FileSpreadsheet,
      link: "/solutions/tax-teams",
    },
    {
      title: "Statutory Audit & Assurance Teams",
      desc: "Companies Act statutory audits, Form 3CD workpapers, sample vouching trails, and EQCR partner sign-offs.",
      icon: Search,
      link: "/solutions/audit-teams",
    },
    {
      title: "Corporate Secretarial & Compliance Teams",
      desc: "Master statutory regulatory calendars, director DSC registries, and ROC/MCA secretarial filing pipelines.",
      icon: Shield,
      link: "/solutions/compliance-teams",
    },
  ];

  return (
    <section className="section bg-[#f8fafc] border-b border-slate-200">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="eyebrow">Solutions</span>
          <h2 className="title mt-3">Built for your practice model.</h2>
          <p className="lead mx-auto mt-4 max-w-[620px]">
            Whether you are a boutique practice, a fast-growing bookkeeping firm, or a multi-partner CA partnership, ClientSpace scales with your team.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {USE_CASES.map((uc) => {
            const IconComp = uc.icon;
            return (
              <Link
                key={uc.title}
                href={uc.link}
                className="card group flex flex-col justify-between hover:border-slate-400 hover:shadow-card transition-all"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#14223d] border border-slate-200 group-hover:bg-[#14223d] group-hover:text-white transition-colors">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-bold text-[16px] text-slate-900 group-hover:text-[#14223d] transition-colors">
                    {uc.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] text-slate-500 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
                <span className="mt-4 text-[12px] font-bold text-[#14223d] flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  <span>Explore solution</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 11. TRUST & SECURITY (WITH PYNG SECURITY GUARDIAN MASCOT)
// ============================================================================
export function TrustSecuritySection() {
  return (
    <section className="section bg-white border-b border-slate-200">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <span className="eyebrow">Security & Data Privacy</span>
            <h2 className="title mt-3">
              Bank-grade security. Zero cross-client data leakage.
            </h2>
            <p className="lead mt-4">
              Accounting records, payroll registers, and tax filings demand
              institutional trust. ClientSpace enforces multi-tenant isolation so
              no client can ever see another client&apos;s records.
            </p>

            <div className="mt-8 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">
                    AES-256 Encryption & TLS 1.3
                  </h4>
                  <p className="text-[12.5px] text-slate-500">
                    All document uploads and client working papers are encrypted at
                    rest and in transit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">
                    Strict Multi-Tenant Client Isolation
                  </h4>
                  <p className="text-[12.5px] text-slate-500">
                    Each client space operates in an isolated container. Magic
                    links authenticate solely to that entity&apos;s records.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">
                    Tamper-Evident Audit Trails
                  </h4>
                  <p className="text-[12.5px] text-slate-500">
                    Every document download, status update, and partner sign-off
                    logs timestamp and IP metadata.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">
                    DPIIT Recognized &amp; ISO 9001:2015 Certified
                  </h4>
                  <p className="text-[12.5px] text-slate-500">
                    Operated under certified quality management systems on high-reliability cloud data centers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank-Grade Security Visual Protocol Card */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6 text-center shadow-soft flex flex-col items-center">
            {/* Bank-Grade Concentric Shield & Encryption Visual */}
            <div className="relative h-44 w-44 sm:h-48 sm:w-48 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
              <div className="relative flex h-36 w-36 sm:h-40 sm:w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0b192c] via-[#14223d] to-[#1e3a5f] p-5 shadow-xl border border-emerald-500/30">
                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md border-2 border-white">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <ShieldCheck className="h-14 w-14 sm:h-16 sm:w-16 text-emerald-400 drop-shadow-[0_4px_12px_rgba(52,211,153,0.4)]" />
                  <span className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-300">
                    AES-256 · TLS 1.3
                  </span>
                </div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              Pyng Shield Protocol
            </span>
            <h4 className="mt-2 text-[16px] font-bold text-slate-900">
              Institutional Privacy
            </h4>
            <p className="mt-1 text-[12.5px] text-slate-500 leading-relaxed max-w-[300px]">
              &ldquo;Your firm&apos;s data stays yours. Privileged working papers
              remain strictly isolated and audit-ready.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 12. FINAL CALL TO ACTION (WITH PYNG WELCOME MASCOT)
// ============================================================================
export function FinalCTASection() {
  return (
    <section className="section bg-[#0a1220] text-white overflow-hidden relative border-t border-slate-800">
      <div className="absolute inset-0 -z-0 opacity-15 pointer-events-none">
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-[#14223d] blur-3xl" />
      </div>

      <div className="wrap relative z-10">
        <div className="mx-auto max-w-[800px] text-center">
          {/* Pyngyn Official Icon Badge */}
          <div className="mx-auto mb-4 h-24 w-24 rounded-full border-2 border-slate-400/40 shadow-xl bg-white p-3 flex items-center justify-center">
            <img
              src="/pyngyn-icon.png"
              alt="Pyngyn"
              width={72}
              height={72}
              className="h-full w-full object-contain"
            />
          </div>

          <span className="inline-block rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11.5px] font-semibold text-slate-200">
            Get Started in Minutes
          </span>

          <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,48px)] font-bold tracking-tight text-white leading-tight">
            Run your accounting firm from one client workspace.
          </h2>

          <p className="mt-4 text-[16px] text-slate-300 max-w-[580px] mx-auto leading-relaxed">
            Join modern CA, accounting, and tax firms that have eliminated
            email chasing, missed deadlines, and spreadsheet chaos.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={DEMO_URL}
              className="btn btn-accent text-[15px] px-7 py-3.5 shadow-cta font-bold"
            >
              Book a 30-Min Demo
            </a>
            <a
              href={SIGNUP_URL}
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[15px] px-6 py-3.5 font-semibold"
            >
              Start Free Trial
            </a>
          </div>

          <p className="mt-4 text-[12.5px] text-slate-400">
            Plans starting from ₹499/mo ($14/mo) · 7-day free trial · 30-minute tailored practice
            walkthrough
          </p>
        </div>
      </div>
    </section>
  );
}
