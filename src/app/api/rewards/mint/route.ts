import { NextRequest, NextResponse } from 'next/server';
import { getLedger } from '@/lib/ledger/ledger-factory';

export async function POST(request: NextRequest) {
  console.log('Mint API called');
  try {
    const body = await request.json();
    console.log('Request body:', body);
    const { userId, points, reason } = body;
    
    // Validate input
    if (!userId || !points || !reason) {
      console.log('Validation failed: missing fields');
      return NextResponse.json({ 
        error: 'Missing required fields: userId, points, reason' 
      }, { status: 400 });
    }
    
    if (typeof points !== 'number' || points <= 0) {
      console.log('Validation failed: invalid points');
      return NextResponse.json({ 
        error: 'Points must be a positive number' 
      }, { status: 400 });
    }
    
    const ledger = getLedger();
    console.log('Ledger created for minting');
    const dedupeKey = `${userId}-${Date.now()}-${reason}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('Dedupe key:', dedupeKey);
    
    const txRef = await ledger.mintTo(userId, points, dedupeKey);
    console.log('Minting result:', txRef);
    
    const response = { 
      success: true, 
      txRef,
      message: `Successfully minted ${points} points for ${reason}`
    };
    console.log('Returning mint response:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Rewards minting error:', error);
    return NextResponse.json({ 
      error: 'Failed to mint rewards',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
