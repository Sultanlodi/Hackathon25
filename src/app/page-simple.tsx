'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [walletData, setWalletData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [userSecret, setUserSecret] = useState('');
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);

  const fetchWalletData = async () => {
    try {
      console.log('🔄 Fetching wallet data...');
      const headers: Record<string, string> = {
        'X-Demo-User-Id': 'demo@user'
      };
      
      if (userSecret) {
        headers['X-User-Secret'] = userSecret;
      }

      const response = await fetch('/api/wallet', { headers });
      console.log('Wallet response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('✅ Wallet data received:', data);
      setWalletData(data);
    } catch (error) {
      console.error('❌ Failed to fetch wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mintTestRewards = async () => {
    console.log('🎯 Starting mint test rewards...');
    try {
      setMinting(true);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Demo-User-Id': 'demo@user'
      };
      
      if (userSecret) {
        headers['X-User-Secret'] = userSecret;
      }

      const requestBody = {
        points: 50,
        reason: 'demo-goal-completion',
        encrypt: encryptionEnabled
      };
      console.log('Sending mint request:', requestBody);
      
      const response = await fetch('/api/rewards/mint', {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      console.log('Mint response status:', response.status);
      const mintResult = await response.json();
      console.log('🏆 Mint response data:', mintResult);
      
      if (!response.ok) throw new Error(`Failed to mint: ${mintResult.error}`);
      
      console.log('✅ Mint successful, refreshing wallet...');
      await fetchWalletData();
    } catch (error) {
      console.error('❌ Failed to mint rewards:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setMinting(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, [userSecret]);

  if (loading && !walletData) {
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
            🔐 Hackathon25 Rewards
          </h1>

          {/* Encryption Controls */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 text-left">
            <h3 className="text-lg font-semibold mb-3">🔑 Encryption Settings</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                User Secret (optional - for enhanced encryption):
              </label>
              <input
                type="password"
                value={userSecret}
                onChange={(e) => setUserSecret(e.target.value)}
                placeholder="Enter your secret key..."
                className="w-full p-2 border rounded text-black"
              />
              <p className="text-xs text-gray-500 mt-1">
                Without this, you'll see limited transaction details
              </p>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={encryptionEnabled}
                  onChange={(e) => setEncryptionEnabled(e.target.checked)}
                  className="mr-2"
                />
                Enable encryption for new transactions
              </label>
            </div>

            <div className="text-sm">
              <span className="font-medium">Encryption Status: </span>
              <span className={`px-2 py-1 rounded text-xs ${
                walletData?.encryptionStatus === 'decrypted' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {walletData?.encryptionStatus || 'limited'}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Your Balance</h2>
            <div className="text-4xl font-bold">{walletData?.tokenBalance || 0} Points</div>
            <div className="text-sm opacity-90 mt-2">
              Network: {walletData?.history?.[0]?.txRef?.network || 'mock'} | 
              Role: {walletData?.userRole || 'user'}
            </div>
          </div>
        </div>

        <div className="mb-8 text-center">
          <button 
            onClick={mintTestRewards}
            disabled={minting}
            className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {minting ? '⏳ Minting...' : `🎯 Complete Demo Goal (+50 Points) ${encryptionEnabled ? '🔒' : '🔓'}`}
          </button>
          <p className="text-sm mt-2 text-gray-600">
            {encryptionEnabled ? 'Transaction will be encrypted' : 'Transaction will be unencrypted'}
          </p>
        </div>

        {walletData?.history && walletData.history.length > 0 && (
          <div className="w-full">
            <h3 className="text-2xl font-semibold mb-4">🏆 Recent Rewards</h3>
            <div className="grid gap-4">
              {walletData.history.map((item: any, index: number) => (
                <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="font-semibold text-green-600 text-lg">+{item.points} Points</span>
                        {item.txRef?.encrypted && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            🔒 Encrypted
                          </span>
                        )}
                      </div>
                      
                      {item.metadata && (
                        <div className="text-sm text-gray-600 mb-2">
                          {item.metadata.encrypted ? (
                            <div>
                              {item.metadata.error ? (
                                <span className="text-red-500">🔐 {item.metadata.error}</span>
                              ) : (
                                <span>🔒 {item.metadata.preview || 'Encrypted transaction'}</span>
                              )}
                            </div>
                          ) : (
                            <div>
                              <div><strong>Reason:</strong> {item.metadata.reason}</div>
                              <div><strong>Goal Type:</strong> {item.metadata.goalType}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500 text-right">
                      <div className="flex items-center mb-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {item.txRef.network}
                        </span>
                      </div>
                      <div>{new Date(item.txRef.timestamp).toLocaleString()}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.txRef.idOrHash.substring(0, 16)}...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {userSecret === '' && walletData.history.some((item: any) => item.txRef?.encrypted) && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>Tip:</strong> Enter a user secret above to see full transaction details for encrypted records!
                </p>
              </div>
            )}
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