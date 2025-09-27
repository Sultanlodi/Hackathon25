import { RewardsLedger } from './rewards-ledger';
import { MockLedger } from './rewards-ledger.mock';

// Use global variable to persist across Next.js hot reloads in development
declare global {
  var __mockLedgerInstance: MockLedger | undefined;
}

// Singleton instance to persist data across API calls
let mockLedgerInstance: MockLedger | null = global.__mockLedgerInstance || null;

export function getLedger(): RewardsLedger {
  const mode = process.env.USE_LEDGER;
  
  if (mode === 'mock') {
    // Use singleton pattern to ensure same instance across API calls
    if (!mockLedgerInstance) {
      console.log('🆕 Creating new MockLedger instance (first time)');
      mockLedgerInstance = new MockLedger();
      global.__mockLedgerInstance = mockLedgerInstance;
    } else {
      console.log('♻️ Reusing existing MockLedger instance (blockchain continuity maintained)');
    }
    return mockLedgerInstance;
  }
  
  if (mode === 'localchain' || mode === 'testnet') {
    // TODO: Initialize ethers/web3 + contract instance here
    // const contract = /* load ABI + address */;
    // return new ChainLedger(contract, mode === 'localchain' ? 'local' : 'testnet');
    console.warn(`Chain mode '${mode}' not implemented yet, falling back to mock`);
    if (!mockLedgerInstance) {
      console.log('🆕 Creating new MockLedger instance (chain fallback)');
      mockLedgerInstance = new MockLedger();
      global.__mockLedgerInstance = mockLedgerInstance;
    } else {
      console.log('♻️ Reusing existing MockLedger instance (chain fallback)');
    }
    return mockLedgerInstance;
  }
  
  // Default to mock for development
  console.log('No USE_LEDGER specified, defaulting to mock');
  if (!mockLedgerInstance) {
    console.log('🆕 Creating new MockLedger instance (default)');
    mockLedgerInstance = new MockLedger();
    global.__mockLedgerInstance = mockLedgerInstance;
  } else {
    console.log('♻️ Reusing existing MockLedger instance (default)');
  }
  return mockLedgerInstance;
}
