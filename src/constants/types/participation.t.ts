import { ParticipationRole, ParticipationStatus } from "../enums/team.enums";

export interface Participation {
  id: string;
  projectId: string;
  userId: string;
  status: ParticipationStatus;
  role: ParticipationRole;
  invitationId?: string;
  joinedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
