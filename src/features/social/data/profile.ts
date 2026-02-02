import { createClient } from "@/lib/supabase/server";

export async function getProfile(userId: string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id,username,full_name,avatar_url,bio,created_at")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUserStats(userId: string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const [{ count: postsCount }, { count: followersCount }, { count: followingCount }] =
    await Promise.all([
      supabase.from("posts").select("id", { count: "exact", head: true }).eq("user_id", userId),
      supabase
        .from("follows")
        .select("follower_id", { count: "exact", head: true })
        .eq("following_id", userId),
      supabase
        .from("follows")
        .select("following_id", { count: "exact", head: true })
        .eq("follower_id", userId),
    ]);

  return {
    postsCount: postsCount ?? 0,
    followersCount: followersCount ?? 0,
    followingCount: followingCount ?? 0,
  };
}