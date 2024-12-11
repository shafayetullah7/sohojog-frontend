import { TeamRole } from "@/_constants/enums/team.enums";

export type TeamMembership = {
  id: string;
  participationId: string;
  teamId: string;
  purpose?: string | null; // Nullable field
  responsibilities: string[];
  joinedAt: Date;
  roles: TeamRole[];
  createdAt: Date;
  updatedAt: Date;

  // Relations
  team: {
    id: string;
    name: string;
  };
  participation: {
    id: string;
    user: {
      id: string;
      name: string;
      profilePicture?: {
        minUrl: string;
      } | null;
    };
  };
  teamLeader?: {
    id: string;
    name: string;
  } | null;
};

export interface GetMembershipsResponse {
  memberships: TeamMembership[]; // List of memberships
  pagination: {
    currentPage: number; // Current page number
    totalItems: number; // Total number of items
    totalPages: number; // Total number of pages
    pageSize: number; // Number of items per page
  };
}
