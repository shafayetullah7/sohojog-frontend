import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(255, "Title must be 255 characters or less"),
  description: z.string().max(1300, "Description is too long.").optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional().default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().default("MEDIUM"),
  dueDate: z.string().optional(), // Date sent as ISO string
  inableBudget: z.preprocess(
    (val) => val === "true" || val === true, // Convert string "true"/"false" to boolean
    z.boolean().optional().default(true)
  ),
  budget: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val), // Convert string to number
    z.number().min(0).optional().default(0)
  ),
  taskAssignmentType: z.enum(["GROUP", "INDIVIDUAL"]),
  assigneeIds: z.array(z.string().uuid()).optional(),
  assignedTeams: z.array(z.string()).optional(),
  // files: z.instanceof(FileList).optional(), // Accept FileList
});

export type CreateTaskRequestDto = z.infer<typeof createTaskSchema>;
