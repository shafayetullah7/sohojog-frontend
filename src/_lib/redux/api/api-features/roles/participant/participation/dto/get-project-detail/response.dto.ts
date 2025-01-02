export interface ProfilePicture {
  minUrl: string;
  midUrl: string;
  fullUrl: string;
}

export interface Creator {
  name: string;
  profilePicture: ProfilePicture;
}

export interface Count {
  participations: number;
  tasks: number;
  teams: number;
}

export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "UPCOMING";
  startDate: string;
  endDate: string;
  groupId: string;
  creatorId: string;
  visibility: "PUBLIC" | "PRIVATE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  tags: string[];
  creator: Creator;
  _count: Count;
}
export interface GetProjectDetailsResponseDto {
  project: ProjectDetails;
}
