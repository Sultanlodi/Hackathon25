// src/app/api/budget/generate/route.ts
import { NextResponse } from 'next/server'
import { plaidClient } from '@/lib/plaidClient'
import { getPlaidAccessToken } from '@/lib/store'

// POST /api/budget/generate?userId=123 or { userId } in body
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userIdFromUrl = searchParams.get('userId')

    let userId = userIdFromUrl
    if (!userId) {
      const body = await req.json()
      userId = body.userId
    }

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const accessToken = await getPlaidAccessToken(userId)
    if (!accessToken) {
      return NextResponse.json({ error: 'No bank linked yet' }, { status: 400 })
    }

    // Pull last 30 days of transactions
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)
    const endDate = new Date()

    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    })

    const transactions = response.data.transactions

    // Aggregate expenses by category
    let totalSpent = 0
    const categoryTotals: Record<string, number> = {}

    for (const tx of transactions) {
      if (tx.amount > 0) {
        // expenses only
        totalSpent += tx.amount
        const category = tx.personal_finance_category?.primary || 'OTHER'
        categoryTotals[category] = (categoryTotals[category] || 0) + tx.amount
      }
    }

    // Apply 50/30/20 rule based on spending
    const budget = {
      needs: totalSpent * 0.5,
      wants: totalSpent * 0.3,
      savings: totalSpent * 0.2,
    }

    return NextResponse.json({ totalSpent, budget, categoryTotals })
  } catch (err: any) {
    console.error('Plaid budget error:', err)
    return NextResponse.json(
      { error: 'Failed to generate budget' },
      { status: 500 }
    )
  }
}
