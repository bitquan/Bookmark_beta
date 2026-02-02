import { createClient } from "@/lib/supabase/server";
import type { CreateCommentInput } from "../schemas/comments";

export async function createComment(input: CreateCommentInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: input.postId,
      user_id: authData.user.id,
      content: input.content,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function listComments(postId: string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id,post_id,user_id,content,created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}