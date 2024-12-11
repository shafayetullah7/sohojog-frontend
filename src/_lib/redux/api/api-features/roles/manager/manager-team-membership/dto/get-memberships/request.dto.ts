import { TeamRole } from "@/_constants/enums/team.enums";

export interface TeamMembershipQuery {
    teamId?: string; // UUID of the team
    participationId?: string; // UUID of the participation
    projectId?: string; // UUID of the project
    role?: TeamRole; // Enum for team roles
    active?: boolean; // Filter for active memberships
    joinedFrom?: string; // ISO date string for start of join range
    joinedTo?: string; // ISO date string for end of join range
    searchTerm?: string; // Text to search within participants' names
    page?: string; // Page number as a string (will be transformed later)
    limit?: string; // Limit per page as a string (will be transformed later)
  }
  