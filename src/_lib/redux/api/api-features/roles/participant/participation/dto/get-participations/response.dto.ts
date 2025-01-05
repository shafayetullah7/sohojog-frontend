import { ProjectStatusType } from "../get-project-detail/response.dto";

export interface ProfilePicture {
  minUrl: string;
}

export interface User {
  id: string;
  name: string;
  profilePicture: ProfilePicture;
}

export interface Count {
  teams: number;
  participations: number;
  tasks: number;
}

export interface ProjectParticipation {
  id: string;
  joinedAt: string | null;
  user: User;
}

export interface Project {
  id: string;
  title: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  status: ProjectStatusType;
  creator: User;
  _count: Count;
  participations: ProjectParticipation[];
}

export interface Participation {
  id: string;
  userId: string;
  joinedAt: string | null;
  project: Project;
}

export interface GetParticipationsResponseDto {
  participations: Participation[];
}
