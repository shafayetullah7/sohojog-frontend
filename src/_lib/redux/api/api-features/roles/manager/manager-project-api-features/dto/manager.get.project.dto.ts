import {
  ProjectPriority,
  ProjectStatus,
  ProjectVisibility,
} from "@/_constants/enums/project.enums";

interface TaskCounts {
  total: number;
  todo: number;
  done: number;
}

// Define the Participation interface based on your participations structure
interface Participation {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture?: {
      minUrl?: string | null;
      midUrl?: string | null;
    } | null;
  };
}

export interface ManagerProject {
  id: string;
  title: string;
  description?: string | null;
  status: ProjectStatus;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  creatorId: string;
  visibility: ProjectVisibility;
  priority: ProjectPriority;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  tags: string[]; // Array of tags
  _count: {
    participations: number;
    stakeholders: number;
    invitations: number;
    teams: number;
  };
  participations?: Participation[];
  taskCounts: TaskCounts;
}

// ManagerProjects is simply an array of ManagerProject
type ManagerProjects = ManagerProject[];

export interface GetManagerProjectsData {
  projects: ManagerProjects;
}
