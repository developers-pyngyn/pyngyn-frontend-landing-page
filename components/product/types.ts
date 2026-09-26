export type TaskStatus =
  | "todo"
  | "in-progress"
  | "internal-review"
  | "client-approval"
  | "blocked"
  | "filed";

export type TaskPriority = "urgent" | "high" | "normal" | "low";

export interface TaskItem {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  engagement: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  isOverdue?: boolean;
  estHours: number;
  loggedHours: number;
  assignees: {
    id: string;
    name: string;
    initials: string;
    role: string;
    avatarColor: string;
  }[];
  reviewer: string;
  statutoryTag?: string;
  notes?: string;
  docsRequired?: number;
  docsReceived?: number;
}

export interface ClientProfile {
  id: string;
  name: string;
  code: string;
  entityType: string;
  industry: string;
  turnover: string;
  tier: number;
  health: "healthy" | "attention" | "at-risk";
  pan: string;
  tan: string;
  udyam: string;
  gstins: { state: string; gstin: string }[];
  books: { software: string; lastSynced: string };
  retainerMonthly: number;
  recoveryPct: number;
  activeTasksCount: number;
  overdueTasksCount: number;
}

export interface TeamMemberCapacity {
  id: string;
  name: string;
  initials: string;
  role: string;
  allocatedHours: number;
  capacityHours: number;
  utilizationPct: number;
  status: "optimal" | "overloaded" | "available";
  activeTasks: number;
  color: string;
}
