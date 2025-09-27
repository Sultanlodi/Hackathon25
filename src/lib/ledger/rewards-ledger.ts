// Core interfaces for the rewards ledger system
export interface TxRef { 
  network: 'mock' | 'local' | 'testnet'; 
  idOrHash: string; 
  timestamp: number;
  encrypted?: boolean; // Optional field for encryption support
  encryptedData?: any; // For storing encrypted transaction details
  machineBinding?: string; // Machine ID that encrypted this transaction
}

export interface RewardsLedger {
  mintTo(userId: string, points: number, dedupeKey: string): Promise<TxRef>;
  balanceOf(userId: string): Promise<number>;
  history(userId: string, userSecret?: string): Promise<Array<{points: number; txRef: TxRef; metadata?: any}>>;
}
