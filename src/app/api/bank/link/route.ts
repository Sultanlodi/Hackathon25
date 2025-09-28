import { NextResponse } from 'next/server'
import { setPlaidAccessToken, getBankConnections } from '@/lib/store'
import { supabase } from '@/lib/supabase'

// POST /api/bank/link
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const body = await req.json()
    const { public_token, user_id } = body

    // Support both URL param and body param for user_id
    const finalUserId = userId || user_id

    if (!public_token || !finalUserId) {
      return NextResponse.json(
        {
          error: 'Missing public_token or user_id',
        },
        { status: 400 }
      )
    }

    // Exchange public_token for access_token with Plaid
    const exchangeResp = await fetch(
      'https://sandbox.plaid.com/item/public_token/exchange',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SECRET,
          public_token: public_token,
        }),
      }
    )

    const exchangeData = await exchangeResp.json()

    if (exchangeData.error) {
      console.error('Plaid exchange error:', exchangeData.error)
      return NextResponse.json(
        {
          error: exchangeData.error,
        },
        { status: 500 }
      )
    }

    // Store the bank connection in Supabase
    const connectionId = await setPlaidAccessToken(
      finalUserId,
      exchangeData.access_token,
      exchangeData.item_id,
      'Bank Institution'
    )

    return NextResponse.json({
      message: 'Bank linked successfully',
      item_id: exchangeData.item_id,
      connection_id: connectionId,
    })
  } catch (err) {
    console.error('Bank link error', err)
    return NextResponse.json(
      {
        error: 'Server error',
      },
      { status: 500 }
    )
  }
}

// GET /api/bank/link?user_id=xxx or ?userId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('user_id') || searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        {
          error: 'Missing user_id or userId parameter',
        },
        { status: 400 }
      )
    }

    const connections = await getBankConnections(userId)

    return NextResponse.json({
      connected: connections.length > 0,
      connections: connections,
    })
  } catch (error) {
    console.error('Error fetching bank connections:', error)
    return NextResponse.json(
      {
        error: 'Server error',
      },
      { status: 500 }
    )
  }
}
