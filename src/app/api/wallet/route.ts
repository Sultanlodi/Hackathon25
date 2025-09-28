<<<<<<< HEAD
import { NextResponse } from 'next/server'
import { sendEvent } from '@/lib/events' // import the broadcaster

// In-memory wallets store
let wallets: Record<string, { balance: number; history: any[] }> = {}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  if (!wallets[userId]) {
    wallets[userId] = { balance: 0, history: [] }
  }

  return NextResponse.json(wallets[userId])
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, points, reason } = body

    if (!userId || !points) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!wallets[userId]) {
      wallets[userId] = { balance: 0, history: [] }
    }

    const tx = {
      id: `tx-${Date.now()}`,
      points,
      reason,
      timestamp: new Date().toISOString(),
    }

    // Update wallet
    wallets[userId].balance += points
    wallets[userId].history.push(tx)

    // 🔥 Broadcast event to all SSE subscribers
    sendEvent({
      type: 'REWARD_MINTED',
      userId,
      points,
      reason,
      balance: wallets[userId].balance,
      tx,
    })

    return NextResponse.json({
      success: true,
      newBalance: wallets[userId].balance,
      tx,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
=======


// src/app/api/wallet/route.ts
import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaidClient"; // <-- your plaid setup
import { getPlaidAccessToken } from "@/lib/store"; // <-- however you store tokens

export async function GET() {
  try {
    const accessToken = await getPlaidAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: "No bank linked yet" }, { status: 400 });
    }

    const response = await plaidClient.accountsBalanceGet({ access_token: accessToken });

    const accounts = response.data.accounts.map((acct) => ({
      id: acct.account_id,
      name: acct.name,
      type: acct.type,
      subtype: acct.subtype,
      balance: acct.balances.available ?? acct.balances.current,
      currency: acct.balances.iso_currency_code,
    }));

    return NextResponse.json({ accounts });
  } catch (err: any) {
    console.error("Plaid wallet error:", err);
    return NextResponse.json({ error: "Failed to fetch balances" }, { status: 500 });
>>>>>>> 338b53ed632a10c3c4b4ad19200441cd36a746bc
  }
}
