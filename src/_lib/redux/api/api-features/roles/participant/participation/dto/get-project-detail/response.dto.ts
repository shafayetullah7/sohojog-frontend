export const ProjectStatus = {
  PLANNING: "PLANNING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
} as const;

export type ProjectStatusType =
  (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const ProjectVisibility = {
  PRIVATE: "PRIVATE",
  PUBLIC: "PUBLIC",
} as const;

export type ProjectVisibilityType =
  (typeof ProjectVisibility)[keyof typeof ProjectVisibility];

export const ProjectPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type ProjectPriorityType =
  (typeof ProjectPriority)[keyof typeof ProjectPriority];



  
  export const ParticipationStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    REMOVED: "REMOVED",
  } as const;
  
  export type ParticipationStatus = (typeof ParticipationStatus)[keyof typeof ParticipationStatus];
  
  export const ParticipationRole = {
    MEMBER: "MEMBER",
  } as const;
  
  export type ParticipationRole = (typeof ParticipationRole)[keyof typeof ParticipationRole];
  

export interface ProfilePicture {
  minUrl: string;
  midUrl?: string; // Optional if not always present
  fullUrl?: string; // Optional if not always present
}

export interface User {
  name: string;
  profilePicture: ProfilePicture;
}

export interface ParticipationCount {
  participations: number;
  tasks: number;
  teams: number;
}

export interface ProjectParticipation {
  id: string;
  joinedAt: string | null;
  user: User;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatusType; // Updated to use the object-based type
  startDate: string;
  endDate: string;
  groupId: string;
  creatorId: string;
  visibility: ProjectVisibilityType; // Updated to use the object-based type
  priority: ProjectPriorityType; // Updated to use the object-based type
  createdAt: string;
  updatedAt: string;
  tags: string[];
  creator: User;
  participations: ProjectParticipation[];
  _count: ParticipationCount;
}

export interface Participation {
  id: string;
  projectId: string;
  userId: string;
  status: ParticipationStatus;
  role: ParticipationRole;
  designation: string[];
  invitationId: string;
  joinedAt: string | null;
  createdAt: string;
  updatedAt: string;
  project: Project;
}

export interface GetParticipationProjectDetailResponseDto {
  participation: Participation;
}
