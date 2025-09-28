

// src/app/api/wallet/route.ts
import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaidClient"; 
import { getAccessToken } from "@/lib/store"; 

// GET /api/wallet?userId=123
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const accessToken = getAccessToken(userId);
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
  }
}
