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

  const posts = data ?? [];
  if (posts.length === 0) {
    return [];
  }

  const postIds = posts.map((post) => post.id);

  const [{ data: likeRows, error: likeError }, { data: commentRows, error: commentError }] =
    await Promise.all([
      supabase.from("likes").select("post_id,user_id").in("post_id", postIds),
      supabase.from("comments").select("post_id").in("post_id", postIds),
    ]);

  if (likeError) {
    throw new Error(likeError.message);
  }
  if (commentError) {
    throw new Error(commentError.message);
  }

  const likeCounts = new Map<string, number>();
  const likedByMe = new Set<string>();

  (likeRows ?? []).forEach((row) => {
    likeCounts.set(row.post_id, (likeCounts.get(row.post_id) ?? 0) + 1);
    if (row.user_id === authData.user.id) {
      likedByMe.add(row.post_id);
    }
  });

  const commentCounts = new Map<string, number>();
  (commentRows ?? []).forEach((row) => {
    commentCounts.set(row.post_id, (commentCounts.get(row.post_id) ?? 0) + 1);
  });

  return posts.map((post) => ({
    ...post,
    likeCount: likeCounts.get(post.id) ?? 0,
    commentCount: commentCounts.get(post.id) ?? 0,
    likedByMe: likedByMe.has(post.id),
  }));
}