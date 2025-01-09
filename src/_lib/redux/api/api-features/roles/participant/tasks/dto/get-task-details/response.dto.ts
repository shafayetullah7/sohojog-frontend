import {
  FileType,
  SubmissionStatus,
  TaskAssignmentType,
  TaskPriority,
  TaskStatus,
} from "@/_constants/enums/task.enums";



// Type for the submission file
export type SubmissionFileType = {
  id: string;
  file: FileType;
};





// Type for the participation object


// ........................

type FileDetails = {
  id: string;
  file: string;
  fileName: string;
  fileType: FileType;
  extension: string;
};

type TaskAttachment = {
  id: string;
  file: FileDetails;
};

type ProfilePicture = {
  minUrl?: string;
  midUrl?: string;
};

type User = {
  id: string;
  name: string;
  profilePicture?: ProfilePicture;
};

type ProjectCreator = {
  id: string;
  name: string;
  profilePicture?: ProfilePicture;
};

type Project = {
  id: string;
  title: string;
  createdAt: string; // ISO date string
  creator: ProjectCreator;
};

type TeamLeader = {
  membership: {
    participation: {
      user: User;
    };
  };
};

type Membership = {
  teamLeader: TeamLeader;
};

type Team = {
  id: string;
  name: string;
  memberShips: Membership[];
};

type TeamTaskAssignment = {
  id: string;
  team: Team;
};

type SubmissionFile = {
  id: string;
  file: FileDetails;
};

interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  description: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  participationId: string | null;
  submissionFile: SubmissionFile[];
}

interface TaskAssignment {
  id: string;
  taskId: string;
  participationId: string | null;
  assignedAt: string;
  assignmentSubmission: AssignmentSubmission;
}

export type ParticipationType = {
  id: string;
  user: User;
};

export type TaskSubmission = {
  id: string;
  description: string;
  submittedBy: string;
  status: SubmissionStatus;
  submissionFile: SubmissionFileType[];
  participation: ParticipationType;
};


interface TaskAssignmentResponse {
  id: string;
  taskId: string;
  participationId: string | null;
  assignedAt: string;
  assignmentSubmission: AssignmentSubmission | null; 
}

// type AssignmentSubmission = {
//   id: string;
//   submissionFile: SubmissionFile[];
// };

// type TaskAssignment = {
//   id: string;
//   assignmentSubmission: AssignmentSubmission[];
// };

type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  inableBudget?: boolean;
  budget: number;
  projectId: string;
  createdBy: string;
  taskAssignmentType: TaskAssignmentType;
  createdAt: string;
  updatedAt: string;
  taskAttachments: TaskAttachment[];
  project: Project;
  teamTaskAssignment: TeamTaskAssignment[];
  taskAssignment: TaskAssignment[];
  taskSubmission:TaskSubmission
};

export type GetParticipantSingleTaskResponse = {
  task: Task;
};
