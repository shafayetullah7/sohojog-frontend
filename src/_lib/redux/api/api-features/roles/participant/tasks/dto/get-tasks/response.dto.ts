import { TaskPriority, TaskStatus } from "@/_constants/enums/task.enums";

type ProfilePicture = {
  minUrl: string;
};

type UserProfile = {
  name: string;
  profilePicture: ProfilePicture;
};

type TaskAssignmentParticipation = {
  id: string;
  role: string;
  status: string;
  user: UserProfile;
};

type TaskAssignment = {
  id: string;
  participation: TaskAssignmentParticipation;
  _count: {
    assignmentSubmission: number;
  };
};

type TeamTaskAssignment = {
  id: string;
  team: {
    id: string;
    name: string;
  };
};

type ManagerTaskCreator = {
  participation: {
    id: string;
    user: UserProfile;
  };
};

type Project = {
  id: string;
  title: string;
  creator: {
    id: string;
    name: string;
    profilePicture: ProfilePicture;
  };
};

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  projectId: string;
  _count: {
    teamTaskAssignment: number;
    taskAssignment: number;
  };
  project: Project;
  taskAssignment: TaskAssignment[];
  teamTaskAssignment: TeamTaskAssignment[];
  managerTasks: ManagerTaskCreator[];
};

type Pagination = {
  limit: number;
  total: number;
  totalPages: number;
  currentPage: number;
};

export type GetParticipationTaskResponse = {
  tasks: Task[];
  pagination: Pagination;
};
