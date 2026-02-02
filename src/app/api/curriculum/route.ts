import { NextResponse } from "next/server";
import {
  createCurriculumItem,
  listCurriculumItems,
} from "@/features/curriculum/data/items";
import { createCurriculumItemSchema } from "@/features/curriculum/schemas/items";

export async function GET() {
  try {
    const data = await listCurriculumItems();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = createCurriculumItemSchema.parse(body);
    const data = await createCurriculumItem(input);
    return NextResponse.json({ id: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}