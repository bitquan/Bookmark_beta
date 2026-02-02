import { NextResponse } from "next/server";
import { markNotificationsRead } from "@/features/notifications/data/notifications";
import { markReadSchema } from "@/features/notifications/schemas/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = markReadSchema.parse(body);
    const data = await markNotificationsRead(input);
    return NextResponse.json({ updated: data.map((row) => row.id) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}