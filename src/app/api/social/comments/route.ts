import { NextResponse } from "next/server";
import { createComment, listComments } from "@/features/social/data/comments";
import { createCommentSchema } from "@/features/social/schemas/comments";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = createCommentSchema.parse(body);
    const data = await createComment(input);
    return NextResponse.json({ id: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }
    const data = await listComments(postId);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}