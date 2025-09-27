import { NextResponse } from "next/server";
// For demo we’ll store in memory (replace with DB in production)
let accessToken: string | null = null;

// POST /api/bank/link
// Expects { public_token } from Plaid Link frontend or curl
export async function POST(req: Request) {
  try {
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

    // Save the access_token (for demo, in memory)
    accessToken = data.access_token;

    return NextResponse.json({
      message: "Bank linked successfully",
      item_id: data.item_id,
    });
  } catch (err) {
    console.error("Bank link error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/bank/link → just to check if stored
export async function GET() {
  return NextResponse.json({
    linked: !!accessToken,
    accessToken: accessToken ? "***stored***" : null,
  });
}
