export interface CreateTeamMembershipRequestDto {
  teamId: string;
  participationId: string;
  purpose?: string;
  responsibilities: string[];
}
