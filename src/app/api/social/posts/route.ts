import { NextResponse } from "next/server";
import { createPost } from "@/features/social/data/posts";
import { createPostSchema } from "@/features/social/schemas/posts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = createPostSchema.parse(body);
    const data = await createPost(input);
    return NextResponse.json({ id: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}