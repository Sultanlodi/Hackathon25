
import { NextResponse } from "next/server";

// Mock transactions
const transactions = [
  { id: "t1", date: "2025-09-01", amount: -45.23, merchant: "Publix", category: "Groceries" },
  { id: "t2", date: "2025-09-02", amount: -12.99, merchant: "Starbucks", category: "Dining" },
  { id: "t3", date: "2025-09-05", amount: -220.00, merchant: "Apartment Rent", category: "Housing" },
  { id: "t4", date: "2025-09-07", amount: -60.50, merchant: "Shell Gas", category: "Transportation" },
  { id: "t5", date: "2025-09-10", amount: -30.00, merchant: "Spotify", category: "Entertainment" }
];

export async function GET() {
  return NextResponse.json(transactions);
}
