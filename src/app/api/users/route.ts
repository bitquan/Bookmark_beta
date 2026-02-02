import { NextResponse } from "next/server";
import { listUsers } from "@/features/users/data/list-users";

export async function GET() {
  try {
    const data = await listUsers();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}