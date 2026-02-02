import { NextResponse } from "next/server";
import { likePost } from "@/features/social/data/likes";
import { likeSchema } from "@/features/social/schemas/likes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = likeSchema.parse(body);
    const data = await likePost(input);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}