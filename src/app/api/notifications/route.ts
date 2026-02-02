import { NextResponse } from "next/server";
import { listNotifications } from "@/features/notifications/data/notifications";

export async function GET() {
  try {
    const data = await listNotifications();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}