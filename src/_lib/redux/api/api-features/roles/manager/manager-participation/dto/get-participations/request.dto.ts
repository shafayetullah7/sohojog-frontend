export const participationStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  REMOVED: "REMOVED",
} as const;

export const participationRole = {
  MEMBER: "MEMBER",
} as const;

export type ParticipationStatus =
  (typeof participationStatus)[keyof typeof participationStatus];
export type ParticipationRole =
  (typeof participationRole)[keyof typeof participationRole];

export type GetParticipationRequestDto = {
  id?: string; // UUID
  projectId?: string; // UUID
  userId?: string; // UUID
  status?: ParticipationStatus; // Enum
  role?: ParticipationRole; // Enum
  invitationId?: string; // UUID
  joinedAt?: string; // Date (ISO string)
  joinedFrom?: string; // Date (ISO string)
  joinedTo?: string; // Date (ISO string)
  searchTerm?: string; // Trimmed, max 255 characters
  page?: number; // Integer >= 1, defaults to 1
  limit?: number; // Integer between 1 and 100, defaults to 10
};
