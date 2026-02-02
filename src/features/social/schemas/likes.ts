import { z } from "zod";

export const likeSchema = z.object({
  postId: z.string().uuid(),
});

export type LikeInput = z.infer<typeof likeSchema>;