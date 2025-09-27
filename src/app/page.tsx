'use client';

import { useState, useEffect } from 'react';

interface TxRef { 
  network: 'mock' | 'local' | 'testnet'; 
  idOrHash: string; 
  timestamp: number; 
}

interface WalletData {
  tokenBalance: number;
  history: Array<{points: number; txRef: TxRef}>;
}

export default function Home() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);

  const fetchWalletData = async () => {
    console.log('Fetching wallet data...');
    try {
      const response = await fetch('/api/wallet');
      console.log('Wallet response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('Wallet data received:', data);
      setWalletData(data);
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mintTestRewards = async () => {
    console.log('Starting mint test rewards...');
    try {
      setMinting(true);
      const requestBody = {
        userId: 'demo@user',
        points: 50,
        reason: 'goal-completion'
      };
      console.log('Sending mint request:', requestBody);
      
      const response = await fetch('/api/rewards/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      console.log('Mint response status:', response.status);
      const mintResult = await response.json();
      console.log('Mint response data:', mintResult);
      
      if (!response.ok) throw new Error(`Failed to mint: ${mintResult.error}`);
      
      console.log('Mint successful, refreshing wallet...');
      await fetchWalletData(); // Refresh wallet data
    } catch (error) {
      console.error('Failed to mint rewards:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setMinting(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-xl">Loading wallet...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hackathon25 Rewards
          </h1>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Your Balance</h2>
            <div className="text-4xl font-bold">{walletData?.tokenBalance || 0} Points</div>
            <div className="text-sm opacity-90 mt-2">
              Network: {walletData?.history?.[0]?.txRef?.network || 'mock'}
            </div>
          </div>
        </div>

        <div className="mb-8 text-center">
          <button 
            onClick={mintTestRewards}
            disabled={minting}
            className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {minting ? '⏳ Minting...' : '🎯 Complete Demo Goal (+50 Points)'}
          </button>
        </div>

        {walletData?.history && walletData.history.length > 0 && (
          <div className="w-full">
            <h3 className="text-2xl font-semibold mb-4">Recent Rewards</h3>
            <div className="grid gap-4">
              {walletData.history.map((item, index) => (
                <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-600 text-lg">+{item.points} Points</span>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                        {item.txRef.network}
                      </span>
                      <span className="font-mono text-xs">
                        {item.txRef.idOrHash.substring(0, 12)}...
                      </span>
                      <span>
                        {new Date(item.txRef.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!walletData?.history || walletData.history.length === 0) && (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg mb-2">No rewards earned yet</p>
            <p className="text-sm">Click the button above to earn your first 50 points!</p>
          </div>
        )}
      </div>
    </main>
  );
}
