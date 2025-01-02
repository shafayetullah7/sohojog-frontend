export interface ProfilePicture {
  minUrl?: string; // Optional because "creator" has "midUrl" instead
}

export interface User {
  name: string;
  profilePicture: ProfilePicture;
}

export interface Participation {
  joinedAt: string | null; // Nullable because `joinedAt` can be `null`
  user: User;
}

export interface Count {
  teams: number;
  participations: number;
  tasks: number;
}

export interface ParticipationProject {
  id: string;
  title: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  status: "IN_PROGRESS" | "COMPLETED" | "UPCOMING"; // Adjust if there are more statuses
  creator: User;
  _count: Count;
  participations: Participation[];
}


export interface GetProjectsResponseDto {
  projects: ParticipationProject[];
}
