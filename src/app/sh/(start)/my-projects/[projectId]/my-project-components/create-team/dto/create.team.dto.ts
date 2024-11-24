import { z } from "zod";

const removeExtraSpaces = (str: string) => str.replace(/\s+/g, " ").trim();

const uniqueStringsIgnoreCase = (arr: string[]) => {
  const lowercased = arr.map((str) => str.toLowerCase());
  return new Set(lowercased).size === arr.length;
};

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, "Team name is required")
    .max(255, "Team name can't exceed 255 characters")
    .transform(removeExtraSpaces),
  purpose: z.string().max(1000, "Purpose can't exceed 1000 characters"),
  responsibilities: z
    .array(
      z
        .string()
        .trim()
        .max(50, "Text is too long.")
        .transform(removeExtraSpaces)
    )
    .max(10, "Too many responsibilities.")
    .refine(uniqueStringsIgnoreCase, {
      message: "Responsibilities must be unique.",
    })
    .default([]),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;
