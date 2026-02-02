import { z } from "zod";

export const followSchema = z.object({
  userId: z.string().uuid(),
});

export type FollowInput = z.infer<typeof followSchema>;