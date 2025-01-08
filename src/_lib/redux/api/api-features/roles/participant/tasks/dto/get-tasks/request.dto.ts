import {
  SubmissionStatus,
  TaskAssignmentType,
  TaskPriority,
  TaskStatus,
} from "@/_constants/enums/task.enums";

export type QueryTaskDto = {
  id?: string;
  title?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId?: string;
  participationId?: string;
  taskAssignmentType?: TaskAssignmentType;
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
