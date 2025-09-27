

import { NextResponse } from "next/server";
import { sendEvent } from "../events/stream/route";  // import the broadcaster

// In-memory wallets store
let wallets: Record<string, { balance: number; history: any[] }> = {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  if (!wallets[userId]) {
    wallets[userId] = { balance: 0, history: [] };
  }

  return NextResponse.json(wallets[userId]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, points, reason } = body;

    if (!userId || !points) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!wallets[userId]) {
      wallets[userId] = { balance: 0, history: [] };
    }

    const tx = {
      id: `tx-${Date.now()}`,
      points,
      reason,
      timestamp: new Date().toISOString(),
    };

    // Update wallet
    wallets[userId].balance += points;
    wallets[userId].history.push(tx);

    // 🔥 Broadcast event to all SSE subscribers
    sendEvent({
      type: "REWARD_MINTED",
      userId,
      points,
      reason,
      balance: wallets[userId].balance,
      tx,
    });

    return NextResponse.json({ success: true, newBalance: wallets[userId].balance, tx });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
