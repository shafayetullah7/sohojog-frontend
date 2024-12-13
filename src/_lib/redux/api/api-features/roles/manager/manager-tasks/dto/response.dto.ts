export interface CreateTaskResponseDto {
  id: string; // UUID of the created task
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string; // ISO string for the date
  inableBudget: boolean;
  budget: number;
  projectId: string;
  taskAssignmentType: "GROUP" | "INDIVIDUAL";
  assigneeIds?: string[];
  assignedTeams?: string[];
  createdAt: string; // ISO string for the creation timestamp
  updatedAt: string; // ISO string for the update timestamp
}
