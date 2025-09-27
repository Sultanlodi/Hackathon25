import { NextRequest, NextResponse } from 'next/server';
import { getLedger } from '@/lib/ledger/ledger-factory';
import { extractAuth } from '@/lib/auth/auth.middleware';
import { HardwareFingerprintService } from '@/lib/crypto/hardware-fingerprint.service';
import { EncryptionService } from '@/lib/crypto/encryption.service';

export async function GET(request: NextRequest) {
  console.log('🔍 Wallet API called with machine-bound security');
  try {
    const auth = extractAuth(request);
    console.log('Auth context:', { userId: auth?.userId, role: auth?.role, hasSecret: !!auth?.userSecret });
    
    // Use auth or fallback to existing demo behavior for backwards compatibility
    const userId = auth?.userId || 'demo@user';
    const userSecret = auth?.userSecret;
    
    // Get machine security status
    const machineStatus = EncryptionService.getMachineSecurityStatus(userId);
    const fingerprint = HardwareFingerprintService.generateMachineFingerprint();
    
    console.log(`🔐 Machine Security Status:`, {
      machineId: machineStatus.machineId,
      userAuthorized: machineStatus.userAuthorized,
      reviewerAuthorized: machineStatus.reviewerAuthorized,
      verified: fingerprint.verified
    });

    const ledger = getLedger();
    
    const balance = await ledger.balanceOf(userId);
    console.log('Balance:', balance);
    
    // Get machine binding info
    const bindingInfo = await (ledger as any).getMachineBindingInfo?.() || {
      currentMachine: fingerprint.machineId,
      authorizedMachines: [fingerprint.machineId],
      encryptedRecords: 0,
      decryptableRecords: 0
    };
    
    const history = await ledger.history(userId, userSecret);
    console.log('History entries:', history.length);
    
    const response = { 
      tokenBalance: balance, 
      history: history.slice(0, 10),
      encryptionStatus: userSecret ? 'decrypted' : 'limited',
      userRole: auth?.role || 'user',
      machineStatus: {
        machineId: fingerprint.machineId,
        verified: fingerprint.verified,
        userAuthorized: machineStatus.userAuthorized,
        reviewerAuthorized: machineStatus.reviewerAuthorized,
        ...bindingInfo
      }
    };
    console.log('Returning response with machine security status');
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Wallet API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch wallet data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
