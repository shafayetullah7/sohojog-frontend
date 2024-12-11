export interface CreateTeamMembershipResponseDto {
  id: string;
  teamId: string;
  participationId: string;
  purpose?: string;
  responsibilities: string[];
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  roles: string[]; // Adjust as per your actual response structure
}
