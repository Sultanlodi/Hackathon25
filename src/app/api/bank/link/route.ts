

// src/app/api/bank/link/route.ts
import { NextResponse } from "next/server";
import { saveAccessToken, isLinked } from "@/lib/store";

// POST /api/bank/link?userId=123
// Expects { public_token } from frontend or curl
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const body = await req.json();
    const publicToken = body.public_token;

    if (!publicToken) {
      return NextResponse.json({ error: "Missing public_token" }, { status: 400 });
    }

    // Exchange public_token for access_token
    const resp = await fetch("https://sandbox.plaid.com/item/public_token/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        public_token: publicToken,
      }),
    });

    const data = await resp.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    // Save access token for this user
    saveAccessToken(userId, data.access_token);

    return NextResponse.json({
      message: "Bank linked successfully",
      item_id: data.item_id,
    });
  } catch (err) {
    console.error("Bank link error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/bank/link?userId=123
// Quick check if user has linked a bank
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  return NextResponse.json({
    linked: isLinked(userId),
    accessToken: isLinked(userId) ? "***stored***" : null,
  });
}
