interface TaskCounts {
  total: number;
  todo: number;
  done: number;
}

// Define the Participation interface based on your participations structure
interface Participation {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture: {
      minUrl: string;
      midUrl: string;
    };
  };
}

export interface GetManagerProjectData {
  id: string;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  participationsCount: number; // Total participations count
  stakeholdersCount: number; // Total stakeholders count
  invitationsCount: number; // Total invitations count
  teamsCount: number; // Total teams count
  participations?: Participation[]; // Include participations if necessary
  taskCounts: TaskCounts; // Include task counts
}
