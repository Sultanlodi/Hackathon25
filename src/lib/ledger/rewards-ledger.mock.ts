import { RewardsLedger, TxRef } from './rewards-ledger';
import { EncryptionService } from '../crypto/encryption.service';
import { HardwareFingerprintService } from '../crypto/hardware-fingerprint.service';
import { ReviewerAuthService } from '../crypto/reviewer-auth.service';

interface TransactionRecord {
  points: number;
  txRef: TxRef;
  metadata?: any;
  encrypted: boolean;
  machineBinding?: string;
}

export class MockLedger implements RewardsLedger {
  private balances = new Map<string, number>();
  private events = new Map<string, Array<TransactionRecord>>();
  private seenKeys = new Set<string>();

  async mintTo(userId: string, points: number, dedupeKey: string): Promise<TxRef> {
    if (this.seenKeys.has(dedupeKey)) {
      const existing = this.events.get(userId)?.find(e => e.txRef.idOrHash.includes(dedupeKey));
      if (existing) {
        return existing.txRef;
      }
      return { network: 'mock', idOrHash: dedupeKey, timestamp: Date.now(), encrypted: true };
    }
    
    this.seenKeys.add(dedupeKey);

    const currentBalance = this.balances.get(userId) ?? 0;
    this.balances.set(userId, currentBalance + points);

    // Get machine fingerprint for the transaction
    const machineFingerprint = HardwareFingerprintService.generateMachineFingerprint();

    const txRef: TxRef = { 
      network: 'mock', 
      idOrHash: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
      timestamp: Date.now(),
      encrypted: true, // All transactions are now encrypted by default
      machineBinding: machineFingerprint.machineId
    };

    // Create metadata for the transaction
    const metadata = {
      reason: 'goal_completion',
      goalType: 'demo',
      timestamp: new Date().toISOString(),
      pointsAwarded: points,
      userId: userId,
      machineId: machineFingerprint.machineId,
      userContext: machineFingerprint.userContext
    };

    let transactionRecord: TransactionRecord = {
      points,
      txRef,
      metadata,
      encrypted: true, // All transactions are encrypted
      machineBinding: machineFingerprint.machineId
    };

    // Use machine-bound encryption for all transactions
    try {
      console.log(`🔒 Using machine-bound SHA256 encryption for user ${userId}`);
      
      // Use new machine-bound encryption
      const encryptedMetadata = EncryptionService.encryptForAuthorizedMachines(
        metadata, 
        userId, 
        'reviewer@system'
      );
      
      txRef.encryptedData = encryptedMetadata;
      txRef.machineBinding = machineFingerprint.machineId;
      
      // Store only preview for non-decrypted access
      transactionRecord.metadata = { 
        encrypted: true, 
        preview: 'Goal completion reward',
        algorithm: 'SHA256-AES256',
        machineBinding: machineFingerprint.machineId
      };
      
      console.log(`✅ Transaction encrypted with machine binding: ${machineFingerprint.machineId}`);
    } catch (error) {
      console.error('❌ Machine-bound encryption failed, fallback to preview only:', error);
      txRef.encrypted = true; // Still mark as encrypted but with fallback
      transactionRecord.metadata = { 
        encrypted: true, 
        preview: 'Encrypted transaction (fallback mode)',
        error: 'Encryption failed'
      };
    }
    
    const userHistory = this.events.get(userId) ?? [];
    userHistory.unshift(transactionRecord);
    this.events.set(userId, userHistory);
    
    console.log(`📊 Blockchain State Updated:
    📈 Balance: ${this.balances.get(userId)} points
    🔗 Total Transactions: ${userHistory.length}
    🆔 User: ${userId}
    🔒 Machine: ${machineFingerprint.machineId.substring(0, 8)}...`);
    
    return txRef;
  }

  async balanceOf(userId: string): Promise<number> {
    const balance = this.balances.get(userId) ?? 0;
    console.log(`💰 Balance check for ${userId}: ${balance} points`);
    return balance;
  }

  async history(userId: string, userSecret?: string, reviewerMode: boolean = false): Promise<Array<{points: number; txRef: TxRef; metadata?: any}>> {
    const records = this.events.get(userId) ?? [];
    const currentMachine = HardwareFingerprintService.generateMachineFingerprint();
    
    console.log(`📚 History query for ${userId}: Found ${records.length} transactions in blockchain`);
    
    return records.map(record => {
      // If record is not encrypted, return as-is
      if (!record.encrypted || !record.txRef.encryptedData) {
        return {
          points: record.points,
          txRef: record.txRef,
          metadata: record.metadata
        };
      }

      // Handle machine-bound encrypted records
      if (record.txRef.encryptedData.algorithm === 'SHA256-AES256') {
        try {
          // Check if this machine is authorized
          const machineStatus = EncryptionService.getMachineSecurityStatus(userId);
          
          if (!machineStatus.userAuthorized && !reviewerMode) {
            return {
              points: record.points,
              txRef: record.txRef,
              metadata: { 
                encrypted: true, 
                error: `Machine ${currentMachine.machineId} not authorized for user ${userId}`,
                machineBinding: record.machineBinding
              }
            };
          }

          // Attempt decryption based on mode
          let decryptedMetadata;
          if (reviewerMode) {
            // Use reviewer access
            const accessResult = ReviewerAuthService.attemptReviewerAccess(
              userId,
              'reviewer@system',
              'decrypt',
              record.txRef.encryptedData
            );
            
            if (accessResult.success) {
              decryptedMetadata = accessResult.data;
            } else {
              return {
                points: record.points,
                txRef: record.txRef,
                metadata: { 
                  encrypted: true, 
                  error: `Reviewer access denied: ${accessResult.reason}`,
                  machineBinding: record.machineBinding
                }
              };
            }
          } else {
            // Use user access
            decryptedMetadata = EncryptionService.decryptOnAuthorizedMachine(
              record.txRef.encryptedData,
              userId,
              'user'
            );
          }

          return {
            points: record.points,
            txRef: record.txRef,
            metadata: {
              ...decryptedMetadata,
              _decryptedOn: currentMachine.machineId,
              _encryptionAlgorithm: 'SHA256-AES256'
            }
          };
        } catch (error) {
          console.error('🔐 Machine-bound decryption failed:', error);
          return {
            points: record.points,
            txRef: record.txRef,
            metadata: { 
              encrypted: true, 
              error: `SHA256 decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              machineBinding: record.machineBinding
            }
          };
        }
      }

      // Fallback to legacy decryption for backwards compatibility
      if (userSecret) {
        try {
          const decryptedMetadata = EncryptionService.decryptAsUser(record.txRef.encryptedData, userId, userSecret);
          return {
            points: record.points,
            txRef: record.txRef,
            metadata: {
              ...decryptedMetadata,
              _decryptedOn: currentMachine.machineId,
              _encryptionAlgorithm: 'Legacy'
            }
          };
        } catch (error) {
          return {
            points: record.points,
            txRef: record.txRef,
            metadata: { encrypted: true, error: 'Unable to decrypt - check your secret key or machine authorization' }
          };
        }
      }
      
      return {
        points: record.points,
        txRef: record.txRef,
        metadata: record.metadata
      };
    });
  }

  // New method for reviewer access
  async getReviewerHistory(userId: string, reviewerId: string = 'reviewer@system'): Promise<Array<{points: number; txRef: TxRef; metadata?: any}>> {
    return this.history(userId, undefined, true);
  }

  // Get machine binding information
  async getMachineBindingInfo(): Promise<{
    currentMachine: string;
    authorizedMachines: string[];
    encryptedRecords: number;
    decryptableRecords: number;
  }> {
    const currentMachine = HardwareFingerprintService.generateMachineFingerprint();
    const allRecords = Array.from(this.events.values()).flat();
    
    const encryptedRecords = allRecords.filter(r => r.encrypted).length;
    const authorizedMachines = Array.from(new Set(allRecords.map(r => r.machineBinding).filter(Boolean))) as string[];
    
    // Count how many records this machine can decrypt
    let decryptableRecords = 0;
    for (const record of allRecords) {
      if (record.encrypted && record.machineBinding === currentMachine.machineId) {
        decryptableRecords++;
      }
    }

    return {
      currentMachine: currentMachine.machineId,
      authorizedMachines,
      encryptedRecords,
      decryptableRecords
    };
  }
}
