import { NextResponse } from "next/server";
import { unfollowUser } from "@/features/social/data/follows";

type RouteParams = { params: { userId?: string } | Promise<{ userId?: string }> };

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    if (!resolvedParams?.userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const data = await unfollowUser(resolvedParams.userId);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}