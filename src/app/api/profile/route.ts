import { NextResponse } from "next/server";
import { getMyProfile, updateMyProfile } from "@/features/auth/data/profile";
import { profileSchema } from "@/features/auth/schemas/profile";

export async function GET() {
  try {
    const data = await getMyProfile();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const input = profileSchema.parse(body);
    const data = await updateMyProfile(input);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}