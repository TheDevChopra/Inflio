import { NextResponse } from "next/server";
import { creators } from "@/data/creators";

export async function GET() {
  return NextResponse.json({ data: creators, success: true });
}
