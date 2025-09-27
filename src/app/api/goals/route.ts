
import { NextResponse } from "next/server";

let goals: { id: string; userId: string; amountMonthly: number; startDate: string; progress: number }[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, amountMonthly, startDate } = body;

    const goalId = `goal-${Date.now()}`;
    goals.push({ id: goalId, userId, amountMonthly, startDate, progress: 0 });

    return NextResponse.json({ goalId });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const goalId = searchParams.get("id");

  if (goalId) {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    return NextResponse.json(goal);
  }

  return NextResponse.json(goals);
}
