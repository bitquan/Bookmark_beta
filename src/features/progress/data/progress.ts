import { createClient } from "@/lib/supabase/server";
import type { UpsertProgressInput } from "../schemas/progress";

export async function upsertProgress(input: UpsertProgressInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("progress")
    .upsert(
      {
        user_id: authData.user.id,
        curriculum_item_id: input.curriculumItemId,
        percent_complete: input.percentComplete,
        pages_read: input.pagesRead,
        last_updated: new Date().toISOString(),
      },
      { onConflict: "user_id,curriculum_item_id" }
    )
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDashboard() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("progress")
    .select("percent_complete,pages_read,last_updated")
    .eq("user_id", authData.user.id)
    .order("last_updated", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = data ?? [];
  const totalItems = rows.length;
  const totalPagesRead = rows.reduce((sum, row) => sum + (row.pages_read ?? 0), 0);
  const avgPercent = totalItems
    ? Math.round(
        rows.reduce((sum, row) => sum + (row.percent_complete ?? 0), 0) / totalItems
      )
    : 0;

  const recent = rows.slice(0, 10).map((row) => ({
    date: row.last_updated,
    percent: row.percent_complete ?? 0,
  }));

  return {
    totals: { totalItems, totalPagesRead, avgPercent },
    recent,
  };
}