import { createClient } from "@/lib/supabase/server";
import type { CreatePostInput } from "../schemas/posts";

export async function createPost(input: CreatePostInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id: authData.user.id, content: input.content })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getFeed() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data: followRows, error: followError } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", authData.user.id);

  if (followError) {
    throw new Error(followError.message);
  }

  const followedIds = (followRows ?? []).map((row) => row.following_id);
  const authorIds = [authData.user.id, ...followedIds];

  const { data, error } = await supabase
    .from("posts")
    .select("id,content,created_at,user_id")
    .in("user_id", authorIds)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}