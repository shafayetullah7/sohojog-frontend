import { Participation } from "@/_constants/types/participation.t";
import { Project } from "@/_constants/types/project.t";

interface ProjectParticipations extends Project {
  participations: Participation[];
}

export interface CreateProjectResponseData {
  project: ProjectParticipations;
}
