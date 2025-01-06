import {
  FileType,
  TaskAssignmentType,
  TaskPriority,
  TaskStatus,
} from "@/_constants/enums/task.enums";

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

type AssignmentSubmission = {
  id: string;
  submissionFile: SubmissionFile[];
};

type TaskAssignment = {
  id: string;
  assignmentSubmission: AssignmentSubmission[];
};

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
};

export type GetParticipantSingleTaskResponse = {
  task: Task;
};
