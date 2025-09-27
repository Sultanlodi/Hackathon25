import { RewardsLedger } from './rewards-ledger';
import { MockLedger } from './rewards-ledger.mock';

// Singleton instance to persist data across API calls
let mockLedgerInstance: MockLedger | null = null;

export function getLedger(): RewardsLedger {
  const mode = process.env.USE_LEDGER;
  
  if (mode === 'mock') {
    // Use singleton pattern to ensure same instance across API calls
    if (!mockLedgerInstance) {
      console.log('Creating new MockLedger instance');
      mockLedgerInstance = new MockLedger();
    } else {
      console.log('Reusing existing MockLedger instance');
    }
    return mockLedgerInstance;
  }
  
  if (mode === 'localchain' || mode === 'testnet') {
    // TODO: Initialize ethers/web3 + contract instance here
    // const contract = /* load ABI + address */;
    // return new ChainLedger(contract, mode === 'localchain' ? 'local' : 'testnet');
    console.warn(`Chain mode '${mode}' not implemented yet, falling back to mock`);
    if (!mockLedgerInstance) {
      mockLedgerInstance = new MockLedger();
    }
    return mockLedgerInstance;
  }
  
  // Default to mock for development
  console.log('No USE_LEDGER specified, defaulting to mock');
  if (!mockLedgerInstance) {
    mockLedgerInstance = new MockLedger();
  }
  return mockLedgerInstance;
}
