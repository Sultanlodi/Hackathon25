// Core interfaces for the rewards ledger system
export interface TxRef { 
  network: 'mock' | 'local' | 'testnet'; 
  idOrHash: string; 
  timestamp: number; 
}

export interface RewardsLedger {
  mintTo(userId: string, points: number, dedupeKey: string): Promise<TxRef>;
  balanceOf(userId: string): Promise<number>;
  history(userId: string): Promise<Array<{points: number; txRef: TxRef}>>;
}
