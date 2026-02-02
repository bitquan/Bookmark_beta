import { NextResponse } from "next/server";
import { getThread } from "@/features/chat/data/messages";
import { threadParamsSchema } from "@/features/chat/schemas/message";

type RouteParams = { params: { userId?: string } | Promise<{ userId?: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    if (!resolvedParams?.userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { userId } = threadParamsSchema.parse(resolvedParams);
    const data = await getThread(userId);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}