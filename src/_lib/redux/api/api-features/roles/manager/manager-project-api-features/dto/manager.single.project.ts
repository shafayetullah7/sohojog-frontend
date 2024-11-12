export interface ProjectCreator {
  id: string;
  name: string;
  email: string;
  profilePicture: {
    minUrl: string;
    midUrl: string;
    fullUrl: string;
  };
}

export interface ProjectWallet {
  currency: string;
  estimatedBudget: number;
  _count: {
    transactions: number;
  };
}

export interface ProjectCounts {
  participations: number;
  teams: number;
  tasks: number;
  invitations: number;
  stakeholders: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  startDate: Date;
  endDate: Date;
  visibility: string;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  creator: ProjectCreator;
  counts: ProjectCounts;
  wallet: ProjectWallet;
}

export interface ManagerSingleProjectResponse {
  project: Project;
}
