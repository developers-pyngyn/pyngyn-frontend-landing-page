'use client';

import React, { useState } from 'react';
import {
  PyngynProductShell,
  PyngynTaskTable,
  PyngynBoardView,
  PyngynMyWorkView,
  PyngynClientSpaceView,
  PyngynWorkloadView,
  PyngynCalendarView,
  PyngynComplianceHubView,
  PyngynProductCamera,
  ProductAnimationController,
  PyngynAiWorkflow,
  PyngynSyncWorkflowView,
  PyngynTaskWorkflowView,
  PyngynBoardWorkflowView,
  PyngynWorkloadWorkflowView,
  PyngynCalendarWorkflowView,
  PyngynDocumentsWorkflowView,
  PyngynComplianceWorkflowView,
  PyngynExecutiveDashboardView,
  PyngynOswalClientView,
  PyngynTaskListView,
  PyngynTaskBoardView,
  PyngynMyWorkDetailedView,
  workloadTimeline,
  calendarTimeline,
  complianceTimeline,
  clientWorkspaceTimeline,
} from '@/components/product-demo';

export default function ProductShowcasePage() {
  const [selectedExperience, setSelectedExperience] = useState<string>('wf1-task-status');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const exp = params.get('exp');
      if (exp) setSelectedExperience(exp);
    }
  }, []);

  const experiences = [
    // PART 3: 8 Automated Workflows
    { id: 'wf1-task-status', category: 'Part 3 Workflows', label: '★ WF1: Task Status Transition', desc: 'GSTR-1 In Progress -> Dropdown opens -> Select Internal Review -> Dropdown closes -> Effort 3/4h' },
    { id: 'wf2-gst-filing', category: 'Part 3 Workflows', label: '★ WF2: GST Filing Lifecycle', desc: 'GSTR-3B In Progress -> Docs received -> Progress updates -> Internal Review -> Filed / Completed' },
    { id: 'wf3-sync', category: 'Part 3 Workflows', label: '★ WF3: ClientSpace Synchronization', desc: 'Internal GSTR-3B Internal Review -> ClientSpace Gauge elevates 78% -> 82% -> Service Progress' },
    { id: 'wf4-board', category: 'Part 3 Workflows', label: '★ WF4: Kanban Board Movement', desc: 'GSTR-1 card animates between actual DOM columns: Overdue (9->8) -> Due This Week (2->3)' },
    { id: 'wf5-workload', category: 'Part 3 Workflows', label: '★ WF5: Workload Recalculation', desc: 'Capacity 47% & Nikhil 42/35h red -> Task reallocated -> Nikhil 35h teal, At Risk 3->2' },
    { id: 'wf6-calendar', category: 'Part 3 Workflows', label: '★ WF6: Calendar Deadlines', desc: 'Sep 23 TODAY -> Sep 20 GSTR-3B filing cluster -> Event highlights -> Status updates to Filed' },
    { id: 'wf7-compliance', category: 'Part 3 Workflows', label: '★ WF7: Compliance Hub Sequence', desc: 'Deadline -> Risk Score (5 notices) -> Action -> Review -> Completion' },
    { id: 'wf8-documents', category: 'Part 3 Workflows', label: '★ WF8: Client Documents & Progress', desc: '3 Received 2 Pending -> Upload processing -> Received -> Gauge ring animates 78% -> 82%' },
    { id: 'wf-ai', category: 'Part 3 Workflows', label: '★ Pyngyn AI Mascot Scanner', desc: 'Authentic mascot: "Which client filings need attention?" -> Sequential checks -> 3 filings highlighted' },
    { id: 'hero', category: 'Base Components', label: '1. Hero Shell (Oswal Tasks)', desc: 'Mockup #1: Full Product Shell with Rail, Sidebar, Task Table, and Bottom Timer' },
    { id: 'oswal-client', category: 'Base Components', label: '2. ClientSpace / Oswal Exports', desc: 'Mockup #2: Client Overview & Tasks with List/Board toggle, Client Status, Tier, and Automatic Status Shift' },
    { id: 'tasks', category: 'Base Components', label: '3. Tasks List (Oswal)', desc: 'Mockup #3: 9 Dense Accounting Task Rows with Status Pills, Effort Bars, Dual Assignees, and 7 Autonomous Interactions' },
    { id: 'board', category: 'Base Components', label: '4. Kanban Board', desc: 'Mockup #4: 4 Columns (Overdue & Due Today, Due This Week, Due Next Week, Later & Filed) with Card Movement' },
    { id: 'mywork', category: 'Base Components', label: '5. My Work Workbench', desc: 'Mockup #5: Staff Workbench with Client/Internal switch, Inline Timer, Floating Modal, and Lifecycle Motion' },
    { id: 'workload', category: 'Base Components', label: '6. Workload Overview', desc: 'Mockup #6: Team capacity, Active Tasks 22, 47% Util, ₹94.8L Retainer, 3 At Risk, 3 Charts, Reallocation' },
    { id: 'calendar', category: 'Base Components', label: '7. Statutory Calendar', desc: 'Mockup #7: Full Sep 2026 month grid, 48 events, GSTR-3B & Advance Tax clusters, Today Sep 23' },
    { id: 'compliance', category: 'Base Components', label: '8. Compliance Hub', desc: 'Mockup #8: Cockpit Hub, Statutory Calendar tab, Notices & Scrutiny (5), Returns Tracker' },
    { id: 'clientspace', category: 'Base Components', label: '9. Oswal Exports — Client Portal', desc: 'Mockup #9: Branded Client Portal, 78%->82% Gauge, GSTR-3B Highlight, Blocker Resolution, Docs Processing->Received, 86%->92% GST Progress' },
    { id: 'executive-command', category: 'Base Components', label: '10. Executive Command Dashboard', desc: 'Managing Partner: Statutory Audit & Tax Command, Gauge 88%, Filing Deadlines, Audit Progress' },
  ];

  return (
    <div className="min-h-screen bg-[#F1F2F5] text-[#113353] p-4 sm:p-8">
      {/* Top Banner */}
      <div className="max-w-[1440px] mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[12px] border border-[#CBD5E1] shadow-card">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#004AAD] bg-[#EEF5FF] px-2.5 py-0.5 rounded-full border border-[#C2DCFF]">
                PYNGYN WEBSITE • PART 3 VERIFICATION
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                8 Automated Workflows + Mascot AI
              </span>
            </div>
            <h1 className="text-[22px] font-black text-[#113353] mt-1.5 leading-tight">
              Automated Product Motion &amp; Real Workflow Engine
            </h1>
            <p className="text-[13px] text-[#627D98] mt-0.5">
              100% Real React DOM Components • Zero Manual Controls • Scroll-Triggered Autonomous Camera &amp; State Transitions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className="px-3.5 py-2 rounded-[8px] bg-[#113353] text-white text-[13px] font-bold shadow-xs hover:bg-[#0B2238] transition-colors"
            >
              ← Back to Main Site
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Selector (sm:hidden) */}
        <div className="sm:hidden mt-3">
          <label htmlFor="exp-select-mobile" className="block text-[11px] font-bold text-[#627D98] mb-1">
            SELECT SCREEN / WORKFLOW
          </label>
          <select
            id="exp-select-mobile"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="w-full p-2.5 bg-white border border-[#004AAD] rounded-[8px] font-bold text-[13px] text-[#113353] outline-none shadow-3xs"
          >
            {experiences.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Experience Selector Tabs (hidden sm:grid) */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
          {experiences.map((exp) => {
            const isSelected = selectedExperience === exp.id;
            return (
              <button
                key={exp.id}
                type="button"
                data-exp-btn={exp.id}
                onClick={() => setSelectedExperience(exp.id)}
                className={`p-2.5 rounded-[10px] text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#004AAD] shadow-soft ring-2 ring-[#004AAD]/20'
                    : 'bg-white/80 border-[#CBD5E1] hover:bg-white hover:border-[#94A3B8]'
                }`}
              >
                <div className={`font-bold text-[12.5px] truncate ${isSelected ? 'text-[#004AAD]' : 'text-[#113353]'}`}>
                  {exp.label}
                </div>
                <div className="text-[10.5px] text-[#627D98] mt-0.5 leading-snug line-clamp-2">
                  {exp.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Presentation Stage */}
      <div className="max-w-[1440px] mx-auto bg-white rounded-[14px] border border-[#CBD5E1] p-4 shadow-card overflow-hidden">
        {/* WORKFLOW 1: Task Status Transition */}
        {selectedExperience === 'wf1-task-status' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 1: Task Status Change (GSTR-1 In Progress &rarr; Internal Review &rarr; Effort 3/4h)</span>
              <span className="text-[#004AAD] font-mono">Autonomous DOM State Transition + Mascot Confirmation</span>
            </div>
            <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
              <PyngynTaskWorkflowView workflowMode="gstr1" autoPlay={true} />
            </div>
          </div>
        )}

        {/* WORKFLOW 2: GST Filing Lifecycle */}
        {selectedExperience === 'wf2-gst-filing' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 2: GST Filing Lifecycle (GSTR-3B In Progress &rarr; Internal Review &rarr; Filed / Completed)</span>
              <span className="text-emerald-700 font-mono">Real Accounting Sign-off &rarr; Done Checkmark</span>
            </div>
            <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
              <PyngynTaskWorkflowView workflowMode="gstr3b" autoPlay={true} />
            </div>
          </div>
        )}

        {/* WORKFLOW 3: ClientSpace Synchronization */}
        {selectedExperience === 'wf3-sync' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 3: Practice &harr; ClientSpace Real-Time Synchronization</span>
              <span className="text-[#004AAD] font-mono">Internal Task Review &rarr; Portal Gauge 78% &rarr; 82%</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynSyncWorkflowView autoPlay={true} />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* WORKFLOW 4: Kanban Board Movement */}
        {selectedExperience === 'wf4-board' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 4: Kanban Board Real DOM Card Animation</span>
              <span className="text-[#7E22CE] font-mono">Card moves from Overdue (9&rarr;8) to Due This Week (2&rarr;3)</span>
            </div>
            <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
              <PyngynBoardWorkflowView autoPlay={true} />
            </div>
          </div>
        )}

        {/* WORKFLOW 5: Workload Recalculation */}
        {selectedExperience === 'wf5-workload' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 5: Workload &amp; Capacity Dynamic Recalculation</span>
              <span className="text-amber-700 font-mono">Nikhil Jain 42h (Red Overload) &rarr; Reallocated 35h (Teal Optimal)</span>
            </div>
            <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
              <PyngynWorkloadWorkflowView autoPlay={true} />
            </div>
          </div>
        )}

        {/* WORKFLOW 6: Calendar Deadlines */}
        {selectedExperience === 'wf6-calendar' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 6: Statutory Calendar Filing Deadlines</span>
              <span className="text-rose-700 font-mono">Sep 23 TODAY &rarr; Sep 20 GSTR-3B Filing Cluster Highlighted &rarr; Filed</span>
            </div>
            <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
              <PyngynCalendarWorkflowView autoPlay={true} />
            </div>
          </div>
        )}

        {/* WORKFLOW 7: Compliance Hub Sequence */}
        {selectedExperience === 'wf7-compliance' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 7: Cockpit Statutory Compliance Sequence</span>
              <span className="text-[#004AAD] font-mono">Deadline &rarr; Risk (5 notices) &rarr; Action &rarr; Review &rarr; Completion</span>
            </div>
            <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
              <PyngynComplianceWorkflowView autoPlay={true} />
            </div>
          </div>
        )}

        {/* WORKFLOW 8: Client Documents */}
        {selectedExperience === 'wf8-documents' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Workflow 8: Client Workspace Documents &amp; Gauge Elevation</span>
              <span className="text-emerald-700 font-mono">Processing &rarr; Received &rarr; Circular Gauge 78% &rarr; 82%</span>
            </div>
            <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
              <PyngynDocumentsWorkflowView autoPlay={true} />
            </div>
          </div>
        )}

        {/* PYNGYN AI MASCOT SCANNER */}
        {selectedExperience === 'wf-ai' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Pyngyn AI Mascot Audit Scanner</span>
              <span className="text-[#004AAD] font-mono">Autonomous Sequential Checks &rarr; Real Product Highlight</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full relative border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft bg-white">
                <PyngynProductShell
                  activeRailItem="clients"
                  sidebarVariant="clients"
                  showAlertBanner={false}
                  showBottomTimer={true}
                >
                  <PyngynTaskTable
                    clientName="Oswal Exports"
                    selectedTaskId="task-gstr3b"
                    highlightTaskId="task-gstr3b"
                  />
                </PyngynProductShell>

                {/* Floating Pyngyn AI Workflow Widget with Authentic Mascot */}
                <div className="absolute top-16 right-8 z-40">
                  <PyngynAiWorkflow autoPlay={true} />
                </div>
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 6: Workload Overview */}
        {selectedExperience === 'workload' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #6: Pyngyn Workload Overview (Exact Structural Architecture &amp; Reallocation Motion)</span>
              <span>Fixed 1440x880 Desktop Aspect Ratio Frame</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={1040}>
              <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynWorkloadView />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 7: Statutory Calendar */}
        {selectedExperience === 'calendar' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #7: Pyngyn Statutory Calendar (Exact Dense 35-Cell Accounting Grid &amp; Motion)</span>
              <span>Fixed 1440x880 Desktop Aspect Ratio Frame</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynCalendarView />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 8: Compliance Hub */}
        {selectedExperience === 'compliance' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #8: Pyngyn Compliance Hub (Exact Architecture &amp; Statutory Lifecycle Sequence)</span>
              <span>Fixed 1440x880 Desktop Aspect Ratio Frame</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynComplianceHubView />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 9: Client Workspace / Oswal Client Portal (Mockup #9) */}
        {selectedExperience === 'clientspace' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #9: Oswal Exports — Client Portal (Exact Architecture &amp; Autonomous Transparency Sync)</span>
              <span>Fixed 1440x880 Desktop Aspect Ratio Frame</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynClientSpaceView
                  clientName="Oswal Exports"
                  firmName="Sharma & Associates"
                  className="w-full h-full"
                />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 1: Hero Shell */}
        {selectedExperience === 'hero' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #1: Complete Hero Product Shell (Oswal Tasks &amp; Dense Accounting Architecture)</span>
              <span>Native 1440x880 with uniform down-scaling</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <PyngynProductShell
                activeRailItem="clients"
                sidebarVariant="clients"
                showAlertBanner={true}
                alertText="GSTR-3B Overdue · 3 not ready +2"
                showBottomTimer={true}
              >
                <PyngynTaskTable
                  clientName="Oswal Exports"
                  clientHealth="at-risk"
                  clientTier={1}
                  activeViewShape="list"
                />
              </PyngynProductShell>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 2: Oswal Client View (Mockup #2) */}
        {selectedExperience === 'oswal-client' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #2: ClientSpace / Oswal Exports (Exact Architecture &amp; Autonomous Task Transition)</span>
              <span>Fixed 1440x880 Desktop Aspect Ratio Frame</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full bg-white border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynOswalClientView standalone={true} />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 3: Tasks List (Mockup #3: Task List) */}
        {selectedExperience === 'tasks' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #3: Pyngyn Task List (Exact Structural Reproduction &amp; 7 Autonomous Interactions)</span>
              <span>Full Product Shell with App Rail + Client Portfolios + Table + 7 Realistic Interactions</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full bg-white border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynTaskListView standalone={true} />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 2: Executive Command Dashboard */}
        {selectedExperience === 'executive-command' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Managing Partner: Statutory Audit &amp; Tax Command</span>
              <span>Full Product Shell with App Rail (Dashboard Active) + Speedometer Gauge + Deadlines</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <PyngynProductShell
                activeRailItem="dashboard"
                sidebarVariant="none"
                showAlertBanner={false}
                showBottomTimer={true}
                bottomActiveTaskTitle="Sec 44AB Tax Audit Draft - Form 3CD Sign-off"
                bottomClientName="Northstar Mfg"
                className="w-full h-full"
              >
                <PyngynExecutiveDashboardView />
              </PyngynProductShell>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 4: Board View (Mockup #4: Task Board) */}
        {selectedExperience === 'board' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #4: Pyngyn Task Board (Exact Reproduction &amp; Multi-Stage Card Movement)</span>
              <span>4 Categorized Columns with Autonomous Workflow Movement (Overdue &rarr; This Week &rarr; Later &amp; Filed)</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full bg-white border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynTaskBoardView standalone={true} />
              </div>
            </PyngynProductCamera>
          </div>
        )}

        {/* BASE EXPERIENCE 5: My Work (Mockup #5: My Work Detailed) */}
        {selectedExperience === 'mywork' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#627D98] px-1">
              <span>Mockup #5: Pyngyn My Work (Exact Structural Architecture &amp; Subtle Lifecycle Motion)</span>
              <span>Home Rail Active + Client/Internal Switch + Inline Timer + Task Selector + Table</span>
            </div>
            <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
              <div className="w-full h-full bg-white border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-soft">
                <PyngynMyWorkDetailedView standalone={true} />
              </div>
            </PyngynProductCamera>
          </div>
        )}
      </div>
    </div>
  );
}
