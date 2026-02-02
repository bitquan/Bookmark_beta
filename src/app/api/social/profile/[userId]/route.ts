import { NextResponse } from "next/server";
import { getProfile, getUserStats } from "@/features/social/data/profile";

type RouteParams = { params: { userId?: string } | Promise<{ userId?: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    if (!resolvedParams?.userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const [profile, stats] = await Promise.all([
      getProfile(resolvedParams.userId),
      getUserStats(resolvedParams.userId),
    ]);
    return NextResponse.json({ profile, stats });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}