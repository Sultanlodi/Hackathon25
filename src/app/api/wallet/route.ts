

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
  }
}
