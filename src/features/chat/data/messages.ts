import { createClient } from "@/lib/supabase/server";
import type { SendMessageInput } from "../schemas/message";

export async function sendMessage(input: SendMessageInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender_id: authData.user.id,
      recipient_id: input.recipientId,
      body: input.body,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getThread(userId: string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("messages")
    .select("id,sender_id,recipient_id,body,created_at")
    .or(
      `and(sender_id.eq.${authData.user.id},recipient_id.eq.${userId}),and(sender_id.eq.${userId},recipient_id.eq.${authData.user.id})`
    )
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}