// Type for profile picture
interface ProfilePicture {
  minUrl: string;
}

// Type for the inviter
interface Inviter {
  email: string;
  id: string;
  profilePicture: ProfilePicture;
  name: string;
}

// Type for the project
interface Project {
  id: string;
  title: string;
  status: "PLANNING" | "ONGOING" | "COMPLETED"; // Adjust if there are more statuses
}

// Type for an invitation
interface Invitation {
  id: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED"; // Adjust if there are more statuses
  sentAt: string; // ISO timestamp
  invitedBy: string;
  seen: boolean;
  seenAt: string | null; // ISO timestamp or null
  createdAt: string; // ISO timestamp
  inviter: Inviter;
  project: Project;
}

// Type for pagination details
interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

// Type for the main response structure
export interface GetInvitationsResponse {
  invitations: Invitation[];
  pagination: Pagination;
}
