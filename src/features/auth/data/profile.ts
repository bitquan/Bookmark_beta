import { createClient } from "@/lib/supabase/server";
import type { ProfileInput } from "../schemas/profile";

export async function getMyProfile() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id,username,full_name,avatar_url,bio")
    .eq("id", authData.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateMyProfile(input: ProfileInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...(input.fullName ? { full_name: input.fullName } : {}),
      ...(input.username ? { username: input.username } : {}),
      ...(input.bio ? { bio: input.bio } : {}),
      ...(input.avatarUrl ? { avatar_url: input.avatarUrl } : {}),
    })
    .eq("id", authData.user.id);

  if (error) {
    throw new Error(error.message);
  }

  return { ok: true };
}