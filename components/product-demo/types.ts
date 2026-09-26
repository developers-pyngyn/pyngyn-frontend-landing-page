export type ServiceLine = 'audit' | 'gst' | 'tax' | 'accounting' | 'corporate';

export type TaskStatus =
  | 'not-started'
  | 'to-do'
  | 'in-progress'
  | 'internal-review'
  | 'client-approval'
  | 'blocked'
  | 'filed'
  | 'completed';

export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export interface Assignee {
  id: string;
  name: string;
  initials: string;
  color: string;
  isOnline?: boolean;
}

export interface DemoTask {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  engagementName: string;
  serviceLine: ServiceLine;
  status: TaskStatus;
  statusLabel: string;
  effortSpent: number;
  effortTotal: number;
  effortBarColor?: 'green' | 'orange' | 'gray';
  assignees: Assignee[];
  priority: Priority;
  dueDate: string;
  dueDateNote?: string;
  isLocked?: boolean;
  isStarred?: boolean;
  isBlocked?: boolean;
  blockedReason?: string;
  isSelected?: boolean;
}

export interface KanbanCard {
  id: string;
  title: string;
  clientTag: string;
  serviceTag: string;
  priority: Priority;
  assignees: Assignee[];
  dueDate: string;
  checklistDone?: number;
  checklistTotal?: number;
  effortHours?: number | string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  count: number;
  tone: 'red' | 'purple' | 'blue' | 'green';
  cards: KanbanCard[];
  emptyMessage?: string;
}

export interface ClientPortalStat {
  label: string;
  value: string | number;
  subtext?: string;
}
