
// src/app/api/transactions/route.ts
import { NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const config = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
      "PLAID-SECRET": process.env.PLAID_SECRET!,
    },
  },
});

const client = new PlaidApi(config);

export async function GET() {
  try {
    const response = await client.transactionsSync({
      access_token: process.env.PLAID_ACCESS_TOKEN!,
      count: 10,
    });

    // Transform Plaid's massive JSON into clean objects
    const simplified = response.data.added.map((txn) => ({
      id: txn.transaction_id,
      name: txn.merchant_name || txn.name,
      amount: txn.amount,
      date: txn.date,
      category: txn.personal_finance_category?.primary,
      logo: txn.logo_url || txn.personal_finance_category_icon_url || null,
    }));

    return NextResponse.json(simplified);
  } catch (error: any) {
    console.error("Plaid transactions error:", error.response?.data || error);
    return NextResponse.json(
      { error: "Failed to fetch Plaid transactions" },
      { status: 500 }
    );
  }
}
