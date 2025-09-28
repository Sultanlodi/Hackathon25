

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { plaidClient } from "@/lib/plaid";
import { getAccessToken } from "@/lib/store"; // our in-memory token store
import dayjs from "dayjs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { question, userId } = await req.json();

    // 1. Get user’s Plaid access token
    const accessToken = getAccessToken(userId || "demo-user");
    if (!accessToken) {
      return NextResponse.json({ error: "No bank linked for this user" }, { status: 400 });
    }

    // 2. Fetch transactions from Plaid
    const startDate = dayjs().subtract(30, "day").format("YYYY-MM-DD");
    const endDate = dayjs().format("YYYY-MM-DD");

    const plaidRes = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
      options: { count: 20, offset: 0 },
    });

    const plaidTxs = plaidRes.data.transactions;

    if (!plaidTxs || plaidTxs.length === 0) {
      return NextResponse.json({ error: "No transactions found" }, { status: 404 });
    }

    // 3. Format transactions for AI
    const spendingSummary = plaidTxs
      .map(
        (t) =>
          `${t.date}: ${t.name} - $${t.amount} [${t.personal_finance_category?.primary || "UNCATEGORIZED"}]`
      )
      .join("\n");

    // 4. Build prompt for Gemini
    const prompt = `
You are a financial coach. Analyze the following transactions from Plaid:

${spendingSummary}

1. Summarize spending behavior by category.
2. Provide personalized financial tips.
3. Detect anomalies (overspending or unusual charges).
4. Answer the user’s question: "${question || "What advice do you have for me?"}"

Return a JSON object in this format:
{
  "summary": "...",
  "tips": ["...", "..."],
  "anomalies": ["...", "..."],
  "answer": "..."
}
`;

    // 5. Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 6. Try to parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text }; // fallback if Gemini doesn’t return valid JSON
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("AI Coach Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze transactions" },
      { status: 500 }
    );
  }
}
