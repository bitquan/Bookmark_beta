import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1).max(100).optional(),
  username: z.string().min(2).max(30).optional(),
  bio: z.string().max(280).optional(),
  avatarUrl: z.string().url().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;