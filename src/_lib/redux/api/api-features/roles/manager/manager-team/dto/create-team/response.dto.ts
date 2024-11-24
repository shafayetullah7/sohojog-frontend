enum TeamStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
}

type NewTeam = {
  id: string;
  name: string;
  purpose: string | null; // Can be null if not provided
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TeamStatus; // Enum for team status
  responsibilities: string[];
};

export type CreateTeamResponse = {
  newTeam: NewTeam;
};
