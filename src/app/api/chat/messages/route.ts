import { NextResponse } from "next/server";
import { sendMessage } from "@/features/chat/data/messages";
import { sendMessageSchema } from "@/features/chat/schemas/message";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = sendMessageSchema.parse(body);

    const data = await sendMessage(input);
    return NextResponse.json({ id: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}