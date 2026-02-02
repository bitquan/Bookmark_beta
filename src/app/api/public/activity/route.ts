import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ActivityRow = {
  id: string;
  type: "post" | "progress";
  user_id: string;
  content: string;
  created_at: string;
};

export async function GET() {
  const supabase = await createClient();

  const [{ data: posts, error: postsError }, { data: progress, error: progressError }] =
    await Promise.all([
      supabase
        .from("posts")
        .select("id,user_id,content,created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("progress")
        .select("id,user_id,percent_complete,pages_read,created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  if (postsError || progressError) {
    return NextResponse.json(
      { error: postsError?.message || progressError?.message || "Failed to load activity" },
      { status: 500 }
    );
  }

  const postRows: ActivityRow[] = (posts ?? []).map((row) => ({
    id: row.id,
    type: "post",
    user_id: row.user_id,
    content: row.content,
    created_at: row.created_at,
  }));

  const progressRows: ActivityRow[] = (progress ?? []).map((row) => ({
    id: row.id,
    type: "progress",
    user_id: row.user_id,
    content: `Progress update: ${row.percent_complete}% complete, ${row.pages_read} pages read`,
    created_at: row.created_at,
  }));

  const activity = [...postRows, ...progressRows]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 12);

  return NextResponse.json(activity);
}
