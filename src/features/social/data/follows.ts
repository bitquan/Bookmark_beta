import { createClient } from "@/lib/supabase/server";
import type { FollowInput } from "../schemas/follows";

export async function followUser(input: FollowInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  if (authData.user.id === input.userId) {
    throw new Error("Cannot follow yourself");
  }

  const { data, error } = await supabase
    .from("follows")
    .insert({ follower_id: authData.user.id, following_id: input.userId })
    .select("follower_id,following_id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function unfollowUser(userId: string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", authData.user.id)
    .eq("following_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return { ok: true };
}