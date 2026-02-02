import { NextResponse } from "next/server";
import { upsertProgress } from "@/features/progress/data/progress";
import { upsertProgressSchema } from "@/features/progress/schemas/progress";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = upsertProgressSchema.parse(body);
    const data = await upsertProgress(input);
    return NextResponse.json({ id: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}