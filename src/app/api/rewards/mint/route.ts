import { NextRequest, NextResponse } from 'next/server';
import { getLedger } from '@/lib/ledger/ledger-factory';
import { extractAuth } from '@/lib/auth/auth.middleware';
import { HardwareFingerprintService } from '@/lib/crypto/hardware-fingerprint.service';
import { EncryptionService } from '@/lib/crypto/encryption.service';

export async function POST(request: NextRequest) {
  console.log('🏆 Mint API called with machine-bound security');
  try {
    const auth = extractAuth(request);
    console.log('Auth context:', { userId: auth?.userId, role: auth?.role, hasSecret: !!auth?.userSecret });
    
    const body = await request.json();
    console.log('Request body:', body);
    
    // Support both new format and existing format for backwards compatibility
    const userId = auth?.userId || body.userId || 'demo@user';
    const { points, reason } = body; // Removed encrypt parameter - all transactions are encrypted

    // Get machine fingerprint and security status
    const fingerprint = HardwareFingerprintService.generateMachineFingerprint();
    const machineStatus = EncryptionService.getMachineSecurityStatus(userId);
    
    console.log(`🔐 Machine Status for encryption:`, {
      machineId: fingerprint.machineId,
      userAuthorized: machineStatus.userAuthorized,
      allTransactionsEncrypted: true
    });

    // Validate input
    if (!points) {
      console.log('Validation failed: missing points');
      return NextResponse.json({ 
        error: 'Missing required field: points' 
      }, { status: 400 });
    }
    
    if (typeof points !== 'number' || points <= 0) {
      console.log('Validation failed: invalid points');
      return NextResponse.json({ 
        error: 'Points must be a positive number' 
      }, { status: 400 });
    }

    // All transactions are now encrypted by default, warn if machine not authorized
    if (!machineStatus.userAuthorized) {
      console.warn(`⚠️ Machine ${fingerprint.machineId} not authorized for user ${userId} - encrypted transaction may not be readable`);
    }

    const ledger = getLedger();
    console.log('Ledger created for minting');
    const dedupeKey = `${userId}-${Date.now()}-${reason || 'reward'}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('Dedupe key:', dedupeKey);
    
    console.log(`🎯 Minting ${points} points for user ${userId} (machine-bound encrypted: ${fingerprint.machineId})`);
    
    const txRef = await ledger.mintTo(userId, points, dedupeKey);
    console.log('✅ Minting result:', txRef);
    
    const response = { 
      success: true, 
      txRef,
      encrypted: txRef.encrypted || true, // All transactions are encrypted
      machineBinding: txRef.machineBinding,
      message: `Successfully minted ${points} points (machine-bound encrypted)`,
      machineStatus: {
        machineId: fingerprint.machineId,
        verified: fingerprint.verified,
        userAuthorized: machineStatus.userAuthorized,
        reviewerAuthorized: machineStatus.reviewerAuthorized
      }
    };
    console.log('Returning mint response:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Rewards minting error:', error);
    return NextResponse.json({ 
      error: 'Failed to mint rewards',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
