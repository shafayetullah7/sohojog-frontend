type ProfilePicture = {
  minUrl: string;
};

type User = {
  id: string;
  name: string;
  profilePicture: ProfilePicture | null;
};

type Participation = {
  id: string;
  projectId: string;
  userId: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING"; // Adjust as per your enum
  role: "MEMBER" | "ADMIN" | "OWNER"; // Adjust as per your enum
  designation: string[]; // Assuming array of strings
  invitationId: string | null;
  joinedAt: string | null; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: User;
};

type Pagination = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
};

export type GetProjectParticipantsResponseDto = {
  participations: Participation[];
  pagination: Pagination;
};
