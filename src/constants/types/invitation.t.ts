import { InviteStatus } from "../enums/invitation.enums";

export interface Invitation {
  id: string;
  email: string;
  projectId: string;
  status: InviteStatus;
  invitedUserName?: string;
  message?: string;
  invitedBy: string;
  sentAt?: Date;
  actionedAt?: Date;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
  participationId?: string;
}
