'use client';

export interface AnimationStep {
  name: string;
  durationMs: number;
  target?: string;
  scale: number;
  panX: number;
  panY: number;
  statePayload?: Record<string, any>;
}

export interface ExperienceTimeline {
  id: string;
  name: string;
  loop: boolean;
  steps: AnimationStep[];
}

/**
 * 1. Workload Experience Timeline
 * Starts at 0.94 overview -> zooms to Capacity Utilization & Risk -> pans to Overloaded Team member (Nikhil) -> pans to Donut -> resets.
 */
export const workloadTimeline: ExperienceTimeline = {
  id: 'workload',
  name: 'Workload & Team Capacity',
  loop: true,
  steps: [
    {
      name: 'Overview Baseline',
      durationMs: 2500,
      target: 'workload-screen',
      scale: 0.94,
      panX: 0,
      panY: 0,
    },
    {
      name: 'Capacity & Risk Telemetry',
      durationMs: 3200,
      target: 'workload-capacity',
      scale: 1.08,
      panX: 180,
      panY: -40,
    },
    {
      name: 'Overloaded Partner & Team Breakdown',
      durationMs: 3400,
      target: 'workload-nikhil',
      scale: 1.1,
      panX: -260,
      panY: -160,
    },
    {
      name: 'Tasks Status Filing Stage Donut',
      durationMs: 3200,
      target: 'workload-donut',
      scale: 1.08,
      panX: 0,
      panY: -160,
    },
    {
      name: 'Return to Full Frame',
      durationMs: 2400,
      target: 'workload-screen',
      scale: 0.94,
      panX: 0,
      panY: 0,
    },
  ],
};

/**
 * 2. Calendar Experience Timeline
 * Starts at 0.94 overview -> zooms to Sep 23 TODAY dense cell -> pans to Sep 20 GSTR-3B filing cluster -> pans to Sep 15 Advance Tax -> resets.
 */
export const calendarTimeline: ExperienceTimeline = {
  id: 'calendar',
  name: 'Statutory Calendar & Deadlines',
  loop: true,
  steps: [
    {
      name: 'Overview Month Grid',
      durationMs: 2500,
      target: 'calendar-screen',
      scale: 0.94,
      panX: 0,
      panY: 0,
    },
    {
      name: 'Today Active Deliverables (Sep 23)',
      durationMs: 3200,
      target: 'calendar-today',
      scale: 1.14,
      panX: -50,
      panY: -140,
    },
    {
      name: 'GSTR-3B Statutory Deadline Cluster (Sep 20)',
      durationMs: 3400,
      target: 'calendar-gstr3b',
      scale: 1.14,
      panX: -280,
      panY: -90,
    },
    {
      name: 'Advance Tax Instalment Deadline (Sep 15)',
      durationMs: 3200,
      target: 'calendar-adv-tax',
      scale: 1.14,
      panX: 180,
      panY: -90,
    },
    {
      name: 'Return to Full Month Grid',
      durationMs: 2400,
      target: 'calendar-screen',
      scale: 0.94,
      panX: 0,
      panY: 0,
    },
  ],
};

/**
 * 3. Compliance Hub Experience Timeline
 * Starts at 0.94 Cockpit overview -> zooms to Cockpit Compliance Navigation & Tabs -> pans into active statutory grid -> resets.
 */
export const complianceTimeline: ExperienceTimeline = {
  id: 'compliance',
  name: 'Cockpit Compliance Hub',
  loop: true,
  steps: [
    {
      name: 'Cockpit Compliance Baseline',
      durationMs: 2500,
      target: 'compliance-hub-view',
      scale: 0.94,
      panX: 0,
      panY: 0,
    },
    {
      name: 'Compliance Hub Tabs & Navigation',
      durationMs: 3200,
      target: 'calendar-sidebar',
      scale: 1.08,
      panX: 180,
      panY: 80,
    },
    {
      name: 'Statutory Filing Grid',
      durationMs: 3400,
      target: 'calendar-today',
      scale: 1.12,
      panX: -80,
      panY: -120,
    },
    {
      name: 'Return to Full Cockpit Frame',
      durationMs: 2400,
      target: 'compliance-hub-view',
      scale: 0.94,
      panX: 0,
      panY: 0,
    },
  ],
};

/**
 * 4. Client Workspace Experience Timeline
 * Starts at 0.94 overview -> zooms to Documents Required (Processing) -> simulates upload (changes to Received) -> pans to Compliance Progress (78% -> 82%) -> resets.
 */
export const clientWorkspaceTimeline: ExperienceTimeline = {
  id: 'client-workspace',
  name: 'Client Workspace (ClientSpace)',
  loop: true,
  steps: [
    {
      name: 'Client Portal Baseline',
      durationMs: 2500,
      target: 'client-portal-view',
      scale: 0.94,
      panX: 0,
      panY: 0,
      statePayload: { documentStatus: 'Processing', complianceProgress: 78 },
    },
    {
      name: 'Documents Required Review',
      durationMs: 3200,
      target: 'portal-card-documents',
      scale: 1.12,
      panX: -260,
      panY: 60,
      statePayload: { documentStatus: 'Processing', complianceProgress: 78 },
    },
    {
      name: 'Document Upload & Receipt Verification',
      durationMs: 3400,
      target: 'portal-card-documents',
      scale: 1.12,
      panX: -260,
      panY: 60,
      statePayload: { documentStatus: 'Received', complianceProgress: 80 },
    },
    {
      name: 'Live Compliance Progress Elevation',
      durationMs: 3400,
      target: 'portal-card-progress',
      scale: 1.12,
      panX: 220,
      panY: 60,
      statePayload: { documentStatus: 'Received', complianceProgress: 82 },
    },
    {
      name: 'Return to Full Portal Frame',
      durationMs: 2400,
      target: 'client-portal-view',
      scale: 0.94,
      panX: 0,
      panY: 0,
      statePayload: { documentStatus: 'Processing', complianceProgress: 78 },
    },
  ],
};

export const PRODUCT_TIMELINES: Record<string, ExperienceTimeline> = {
  workload: workloadTimeline,
  calendar: calendarTimeline,
  compliance: complianceTimeline,
  'client-workspace': clientWorkspaceTimeline,
};
