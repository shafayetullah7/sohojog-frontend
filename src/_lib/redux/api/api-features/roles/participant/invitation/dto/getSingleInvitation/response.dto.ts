interface ProfilePicture {
  minUrl: string;
  midUrl: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture: ProfilePicture;
}

interface Project {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  _count: {
    participations: number;
    teams: number;
  };
  creator: User;
}

export interface Invitation {
  id: string;
  email: string;
  projectId: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  invitedUserName: string;
  message: string;
  invitedBy: string;
  sentAt: string;
  actionedAt: string | null;
  seen: boolean;
  seenAt: string | null;
  createdAt: string;
  updatedAt: string;
  participationId: string | null;
  inviter: User;
  project: Project;
}

export type GetSingleInvitationResponse = {
  invitation: Invitation;
};
