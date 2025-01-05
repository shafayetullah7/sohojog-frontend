export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
  HALTED: "HALTED",
  ARCHIVED: "ARCHIVED",
} as const;

export const TaskPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export const SubmissionStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];
export type SubmissionStatus =
  (typeof SubmissionStatus)[keyof typeof SubmissionStatus];

export type QueryTaskDto = {
  id?: string;
  title?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId?: string;
  participationId?: string;
  taskAssignmentType?: "GROUP" | "INDIVIDUAL";
  teamId?: string;
  submissionStatus?: SubmissionStatus;
  dueDateFrom?: string;
  dueDateTo?: string;
  dueDate?: string;
  sortBy?: "title" | "status" | "priority" | "dueDate" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  assignmentLimit?: number;
};
