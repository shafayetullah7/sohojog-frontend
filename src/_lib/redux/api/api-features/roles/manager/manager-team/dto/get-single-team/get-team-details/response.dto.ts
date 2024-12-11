interface TeamLeader {
  id: string; // User ID of the team leader
  name: string; // Name of the team leader
  profilePicture?: string;
  joinedAt: Date; // The date when the leader joined the team
  isActive: boolean; // Indicates if the team leader is currently active
  assignedAsLeaderAt: Date; // The date when the user was assigned as the team leader
}

export const TeamStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

type TeamStatusType = (typeof TeamStatus)[keyof typeof TeamStatus];

// Type for the Team Response
interface TeamDetails {
  id: string; // Unique ID of the team
  projectId: string;
  name: string; // Name of the team
  purpose: string; // Purpose/description of the team
  status: TeamStatusType;
  responsibilities: string[];
  createdAt: string;
  updatedAt: string;
  teamLeader: TeamLeader | null; // The team leader or null if no leader exists
}

export interface GetManagerTeamDetailsResponseDto {
  team: TeamDetails;
}
