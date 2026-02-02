import { createClient } from "@/lib/supabase/server";
import type { LikeInput } from "../schemas/likes";

export async function likePost(input: LikeInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("likes")
    .insert({ user_id: authData.user.id, post_id: input.postId })
    .select("post_id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function unlikePost(postId: string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", authData.user.id)
    .eq("post_id", postId);

  if (error) {
    throw new Error(error.message);
  }

  return { ok: true };
}