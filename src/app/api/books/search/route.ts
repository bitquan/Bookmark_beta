import { NextResponse } from "next/server";
import { searchOpenLibrary } from "@/features/curriculum/data/books/openLibrary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    if (!q) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }
    const data = await searchOpenLibrary(q);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}