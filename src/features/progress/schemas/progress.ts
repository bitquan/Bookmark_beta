import { z } from "zod";

export const upsertProgressSchema = z.object({
  curriculumItemId: z.string().uuid(),
  percentComplete: z.number().min(0).max(100),
  pagesRead: z.number().int().min(0),
});

export type UpsertProgressInput = z.infer<typeof upsertProgressSchema>;