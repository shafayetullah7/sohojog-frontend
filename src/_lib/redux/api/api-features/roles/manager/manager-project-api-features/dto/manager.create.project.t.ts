import { Participation } from "@/constants/types/participation.t";
import { Project } from "@/constants/types/project.t";

interface ProjectParticipations extends Project {
  participations: Participation[];
}

export interface CreateProjectResponseData {
  project: ProjectParticipations;
}
