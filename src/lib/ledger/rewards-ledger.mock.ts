import { RewardsLedger, TxRef } from './rewards-ledger';

export class MockLedger implements RewardsLedger {
  private balances = new Map<string, number>();
  private events = new Map<string, Array<{points: number; txRef: TxRef}>>();
  private seenKeys = new Set<string>(); // for idempotency

  async mintTo(userId: string, points: number, dedupeKey: string): Promise<TxRef> {
    if (this.seenKeys.has(dedupeKey)) {
      // Already minted; return a synthetic ref
      const txRef: TxRef = { 
        network: 'mock', 
        idOrHash: dedupeKey, 
        timestamp: Date.now() 
      };
      return txRef;
    }
    
    this.seenKeys.add(dedupeKey);

    const currentBalance = this.balances.get(userId) ?? 0;
    this.balances.set(userId, currentBalance + points);

    const txRef: TxRef = { 
      network: 'mock', 
      idOrHash: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
      timestamp: Date.now() 
    };
    
    const userHistory = this.events.get(userId) ?? [];
    userHistory.unshift({ points, txRef });
    this.events.set(userId, userHistory);
    
    return txRef;
  }

  async balanceOf(userId: string): Promise<number> { 
    return this.balances.get(userId) ?? 0; 
  }

  async history(userId: string): Promise<Array<{points: number; txRef: TxRef}>> { 
    return this.events.get(userId) ?? []; 
  }
}
