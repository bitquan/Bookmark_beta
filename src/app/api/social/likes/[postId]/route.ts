import { NextResponse } from "next/server";
import { unlikePost } from "@/features/social/data/likes";

type RouteParams = { params: { postId?: string } | Promise<{ postId?: string }> };

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    if (!resolvedParams?.postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }
    const data = await unlikePost(resolvedParams.postId);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}