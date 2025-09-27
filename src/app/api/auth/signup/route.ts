
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Temporary in-memory store
let users: { id: string; email?: string }[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email || null;

    const userId = uuidv4();
    users.push({ id: userId, email });

    return NextResponse.json({ userId });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
