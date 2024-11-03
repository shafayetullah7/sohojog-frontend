import {
  ProjectPriority,
  ProjectStatus,
  ProjectVisibility,
} from "@/constants/enums/project.enums";
import { z } from "zod";

export const createProjectSchema = z
  .object({
    title: z
      .string()
      .min(1, "Project title is required")
      .max(255, "Title is too long"),
    description: z.string().max(1000, "Description is too long.").optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    status: z.nativeEnum(ProjectStatus, {
      required_error: "Status is required",
    }),
    visibility: z.nativeEnum(ProjectVisibility, {
      required_error: "Visibility is required",
    }),
    priority: z.nativeEnum(ProjectPriority, {
      required_error: "Priority is required",
    }),
  })
  .refine(
    (data) => {
      if (data.endDate) {
        return !!data.startDate;
      }
      return true;
    },
    {
      message: "Please mention the start date first.",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date cannot be earlier than start date.",
      path: ["endDate"],
    }
  );

export type CreateProjectRequestFormData = z.infer<typeof createProjectSchema>;

export type CreateProjectRequestData = CreateProjectRequestFormData & {
  tags: string[];
};
