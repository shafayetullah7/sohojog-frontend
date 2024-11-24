export type Counts = {
  memberCount: number;
  taskAssignmentCount: number;
};

export type Member = {
  id: string;
  joinedAt: string;
  userName: string;
  profilePictureUrl: string | null;
};

export type Team = {
  id: string;
  name: string;
  projectId: string;
  createdAt: string;
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  counts: Counts;
  members: Member[];
};

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalTeams: number;
  totalPages: number;
};

export type GetManagerTeamsResponse = {
  pagination: Pagination;
  teams: Team[];
};
