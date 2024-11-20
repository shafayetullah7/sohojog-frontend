export type GetParticipantInvitationsQueryParams = {
  projectId?: string; // Optional, UUID format
  status?: "PENDING" | "ACCEPTED" | "DECLINED"; // Optional, InviteStatus enum
  invitedBy?: string; // Optional, UUID format
  date?: Date; // Optional, single specific date
  month?: {
    startOfMonth: Date; // Start of the provided month
    endOfMonth: Date; // End of the provided month
  }; // Optional
  year?: {
    startOfYear: Date; // Start of the provided year
    endOfYear: Date; // End of the provided year
  }; // Optional
  beforeDate?: Date; // Optional, date before this
  afterDate?: Date; // Optional, date after this
  page?: number; // Positive integer, defaults to 1
  limit?: number; // Positive integer, max 100, defaults to 10
  sortBy?: string; // Optional, defaults to "createdAt"
  sortOrder?: "asc" | "desc"; // Optional, "asc" or "desc", defaults to "asc"
  searchTerm?: string; // Optional, max length 255, trimmed
};
