import { NextResponse } from "next/server";
import {
  deleteCurriculumItem,
  updateCurriculumItem,
} from "@/features/curriculum/data/items";
import { updateCurriculumItemSchema } from "@/features/curriculum/schemas/items";

type RouteParams = { params: { id?: string } | Promise<{ id?: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    if (!resolvedParams?.id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const body = await request.json();
    const input = updateCurriculumItemSchema.parse(body);
    const data = await updateCurriculumItem(resolvedParams.id, input);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    if (!resolvedParams?.id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const data = await deleteCurriculumItem(resolvedParams.id);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}