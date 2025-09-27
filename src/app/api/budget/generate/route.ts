
import { NextResponse } from "next/server";

// Simple rules-based budget generator
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const transactions = body.transactions || [];

    // Sum amounts by category
    const categoryTotals: Record<string, number> = {};
    transactions.forEach((t: any) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
    });

    // Apply simple 50/30/20 budgeting rule
    const income = 2000; // mock monthly income for demo
    const budget = [
      { name: "Needs (50%)", limit: income * 0.5, basis: "50/30/20 rule" },
      { name: "Wants (30%)", limit: income * 0.3, basis: "50/30/20 rule" },
      { name: "Savings (20%)", limit: income * 0.2, basis: "50/30/20 rule" },
    ];

    return NextResponse.json({ budget, categoryTotals });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
