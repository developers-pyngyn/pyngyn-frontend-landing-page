'use client';

import { useState, useEffect } from 'react';

export interface SharedWorkflowState {
  // GSTR-3B task workflow
  phase: number;
  gstStatus: 'To Do' | 'In Progress' | 'Internal Review' | 'Filed / Completed';
  gstEffortSpent: number;
  gstEffortTotal: number;
  gstProgress: number;
  gstPriority: 'Urgent' | 'High' | 'Medium' | 'Low';
  gstChecked: boolean;

  // Workload synchronization
  activeTasks: number;
  capacityUtilization: number;
  overdueTasks: number;
  nikhilHours: string;
  priyaHours: string;
  rohanHours: string;

  // Partner Executive Dashboard
  complianceIndex: number;
  statutoryFilingsRatio: string;
  gstReturnsFiledCount: number;

  // ClientSpace Portal (Oswal Exports)
  clientGstProgress: number;
  clientStatusBadge: string;
  clientActionItemsCount: number;
  clientDocCount: string;
}

export const INITIAL_WORKFLOW_STATE: SharedWorkflowState = {
  phase: 0,
  gstStatus: 'In Progress',
  gstEffortSpent: 4,
  gstEffortTotal: 5,
  gstProgress: 72,
  gstPriority: 'Urgent',
  gstChecked: false,

  activeTasks: 23,
  capacityUtilization: 47,
  overdueTasks: 3,
  nikhilHours: '42 / 35h (120%)',
  priyaHours: '32 / 35h (91%)',
  rohanHours: '24 / 35h (68%)',

  complianceIndex: 84,
  statutoryFilingsRatio: '34/40',
  gstReturnsFiledCount: 17,

  clientGstProgress: 78,
  clientStatusBadge: 'In Progress',
  clientActionItemsCount: 3,
  clientDocCount: '2 / 3 Received',
};

export function useSharedWorkflow(autoPlay = true) {
  const [state, setState] = useState<SharedWorkflowState>(INITIAL_WORKFLOW_STATE);

  useEffect(() => {
    if (!autoPlay) return;

    const timeline = [
      // 0.0s: Initial baseline
      {
        time: 0,
        run: () => setState(INITIAL_WORKFLOW_STATE),
      },
      // 2.2s: In-progress work updates, document ingestion begins
      {
        time: 2200,
        run: () =>
          setState((prev) => ({
            ...prev,
            phase: 1,
            gstEffortSpent: 4.5,
            gstProgress: 88,
            clientDocCount: '3 / 3 Processing',
          })),
      },
      // 4.5s: GSTR-3B Filed / Completed
      {
        time: 4500,
        run: () =>
          setState((prev) => ({
            ...prev,
            phase: 2,
            gstStatus: 'Filed / Completed',
            gstEffortSpent: 5,
            gstProgress: 100,
            gstChecked: true,
            // Workload updates live
            activeTasks: 22,
            capacityUtilization: 49,
            overdueTasks: 2,
            nikhilHours: '35 / 35h (100%)',
            // Dashboard updates live
            complianceIndex: 86,
            statutoryFilingsRatio: '35/40',
            gstReturnsFiledCount: 18,
            // Client Portal updates live
            clientGstProgress: 100,
            clientStatusBadge: 'Filed & Verified',
            clientActionItemsCount: 2,
            clientDocCount: '3 / 3 Received ✓',
          })),
      },
      // 10.0s: Hold completed state
      {
        time: 10000,
        run: () =>
          setState((prev) => ({
            ...prev,
            phase: 3,
          })),
      },
    ];

    const timers = timeline.map((step) => setTimeout(step.run, step.time));
    const loopTimer = setTimeout(() => {
      setState(INITIAL_WORKFLOW_STATE);
    }, 14500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(loopTimer);
    };
  }, [autoPlay]);

  return state;
}
