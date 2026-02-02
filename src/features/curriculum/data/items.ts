import { createClient } from "@/lib/supabase/server";
import type {
  CreateCurriculumItemInput,
  UpdateCurriculumItemInput,
} from "../schemas/items";

export async function listCurriculumItems() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("curriculum_items")
    .select("id,title,item_type,status,tags,created_at")
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createCurriculumItem(input: CreateCurriculumItemInput) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("curriculum_items")
    .insert({
      user_id: authData.user.id,
      title: input.title,
      item_type: input.itemType,
      status: input.status ?? "planned",
      tags: input.tags ?? [],
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateCurriculumItem(
  id: string,
  input: UpdateCurriculumItemInput
) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("curriculum_items")
    .update({
      ...(input.title ? { title: input.title } : {}),
      ...(input.status ? { status: input.status } : {}),
      ...(input.tags ? { tags: input.tags } : {}),
    })
    .eq("id", id)
    .eq("user_id", authData.user.id);

  if (error) {
    throw new Error(error.message);
  }

  return { ok: true };
}

export async function deleteCurriculumItem(id: string) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("curriculum_items")
    .delete()
    .eq("id", id)
    .eq("user_id", authData.user.id);

  if (error) {
    throw new Error(error.message);
  }

  return { ok: true };
}