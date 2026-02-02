import { z } from "zod";

export const createCurriculumItemSchema = z.object({
  title: z.string().min(1).max(200),
  itemType: z.string().min(1).max(50),
  status: z.string().min(1).max(50).default("planned"),
  tags: z.array(z.string().min(1).max(30)).optional(),
});

export type CreateCurriculumItemInput = z.infer<typeof createCurriculumItemSchema>;

export const updateCurriculumItemSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  status: z.string().min(1).max(50).optional(),
  tags: z.array(z.string().min(1).max(30)).optional(),
});

export type UpdateCurriculumItemInput = z.infer<typeof updateCurriculumItemSchema>;