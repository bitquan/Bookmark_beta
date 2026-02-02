import { z } from "zod";

export const sendMessageSchema = z.object({
  recipientId: z.string().uuid(),
  body: z.string().min(1).max(4000),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;

export const threadParamsSchema = z.object({
  userId: z.string().uuid(),
});