import { z } from "zod";

// Define TeamStatus as a const object
export const TeamStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

// Derive the TeamStatus type from the const object
export type TeamStatus = (typeof TeamStatus)[keyof typeof TeamStatus];

export const getManagerTeamsRequestSchema = z
  .object({
    status: z.nativeEnum(TeamStatus).optional(),
    projectId: z.string().uuid("Invalid project ID").optional(),
    searchTerm: z.string().max(255, "Search term is too long").optional(),
    page: z.number().int().min(1, "Page number must be at least 1").default(1),
    limit: z
      .number()
      .int()
      .min(1, "Limit must be at least 1")
      .max(100, "Limit cannot exceed 100")
      .default(10),
    sortBy: z.enum(["name", "createdAt", "updatedAt"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
  })
  .strip();

export type GetManagerTeamsRequestQueryDto = z.infer<
  typeof getManagerTeamsRequestSchema
>;
