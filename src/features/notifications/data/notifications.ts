import { createClient } from "@/lib/supabase/server";
import type { MarkReadInput } from "../schemas/notifications";

export async function listNotifications() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("notifications")
    .select("id,type,payload,created_at,read_at")
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function markNotificationsRead(input: MarkReadInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .in("id", input.notificationIds)
    .eq("user_id", authData.user.id)
    .select("id")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}