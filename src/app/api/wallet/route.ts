import { NextRequest, NextResponse } from 'next/server';
import { getLedger } from '@/lib/ledger/ledger-factory';

export async function GET(request: NextRequest) {
  console.log('Wallet API called');
  try {
    const ledger = getLedger();
    console.log('Ledger created:', ledger);
    const userId = 'demo@user'; // For MVP - replace with actual auth later
    
    const balance = await ledger.balanceOf(userId);
    console.log('Balance:', balance);
    const history = await ledger.history(userId);
    console.log('History:', history);
    
    const response = { 
      tokenBalance: balance, 
      history: history.slice(0, 10) // Last 10 transactions
    };
    console.log('Returning response:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Wallet API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch wallet data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
