import {
  ProjectPriority,
  ProjectStatus,
  ProjectVisibility,
} from "../enums/project.enums";

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  creatorId: string;
  visibility: ProjectVisibility;
  priority: ProjectPriority;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}
