
import { NextResponse } from "next/server";

export async function POST() {
  // Mock bank linking success
  return NextResponse.json({ linked: true });
}
