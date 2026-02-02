import { NextResponse } from "next/server";
import { followUser } from "@/features/social/data/follows";
import { followSchema } from "@/features/social/schemas/follows";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = followSchema.parse(body);
    const data = await followUser(input);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}