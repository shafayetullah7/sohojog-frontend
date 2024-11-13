export type SendInvitePayload = {
  projectId: string;
  email: string;
  invitedUserName: string;
  message: string;
  sendEmail: boolean;
};

export type Invitation = {
  id: string;
  email: string;
  projectId: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED"; // Assuming these are possible statuses
  invitedUserName: string;
  message: string;
  invitedBy: string;
  sentAt: string; // ISO date string
  actionedAt: string | null; // ISO date string or null if not actioned
  seen: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  participationId: string | null; // null if not set
};

export type SendInvitationResponse = {
  invitation: Invitation;
};
