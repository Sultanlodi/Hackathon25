import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Unlink,
  Shield,
  Activity,
  Coins
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export function WalletSettings() {
  const [walletData] = useState({
    address: "0x742d35Cc6634C0532925a3b8D5F4F4C0eb345923",
    network: "Polygon",
    balance: "125.50",
    symbol: "WLY",
    isConnected: true,
    connectionDate: "Nov 15, 2024",
    transactionCount: 8
  });

  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    toast.success("Wallet address copied to clipboard");
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsDisconnecting(false);
    toast.success("Wallet disconnected successfully");
  };

  const openBlockExplorer = () => {
    // In a real app, this would open the actual block explorer
    toast.info("Opening Polygon block explorer...");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Crypto Wallet</CardTitle>
              <CardDescription>
                Manage your connected wallet for Wealthly Coin (WLY) rewards
              </CardDescription>
            </div>
          </div>
          
          {walletData.isConnected && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {walletData.isConnected ? (
          <>
            {/* Wallet Information */}
            <div className="space-y-4">
              {/* Address */}
              <div className="p-4 rounded-lg bg-background-subtle border border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Wallet Address</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={copyAddress}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={openBlockExplorer}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-foreground-subtle break-all">
                      {walletData.address}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {walletData.network} Network • Connected {walletData.connectionDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Token Balance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border-subtle">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Coins className="w-5 h-5 text-warning" />
                      <span className="font-medium">WLY Balance</span>
                    </div>
                    <div className="text-2xl font-bold text-warning">
                      {walletData.balance}
                    </div>
                    <p className="text-xs text-foreground-muted">Wealthly Coins</p>
                  </CardContent>
                </Card>

                <Card className="border-border-subtle">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <span className="font-medium">Transactions</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {walletData.transactionCount}
                    </div>
                    <p className="text-xs text-foreground-muted">Total transactions</p>
                  </CardContent>
                </Card>

                <Card className="border-border-subtle">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-success" />
                      <span className="font-medium">Security</span>
                    </div>
                    <div className="text-2xl font-bold text-success">
                      ✓
                    </div>
                    <p className="text-xs text-foreground-muted">Verified wallet</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-3">
              <h4 className="font-medium">Recent Activity</h4>
              <div className="space-y-2">
                {[
                  { type: "mint", amount: "+25.0", reason: "Emergency Fund Milestone", time: "2 hours ago" },
                  { type: "mint", amount: "+15.0", reason: "Budget Goal Achieved", time: "1 day ago" },
                  { type: "mint", amount: "+10.0", reason: "Weekly Savings Target", time: "3 days ago" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background-subtle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <Coins className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.reason}</p>
                        <p className="text-xs text-foreground-muted">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-success">{activity.amount} WLY</div>
                      <div className="text-xs text-foreground-muted capitalize">{activity.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallet Actions */}
            <div className="pt-4 border-t border-border-subtle">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Wallet Management</h4>
                  <p className="text-sm text-foreground-muted">
                    Manage your wallet connection and settings
                  </p>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="text-error hover:text-error border-error/20 hover:border-error/40"
                    >
                      <Unlink className="w-4 h-4 mr-2" />
                      Disconnect Wallet
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Disconnect Wallet?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will disconnect your wallet from Wealthly. You'll need to reconnect 
                        to continue earning WLY tokens for achieving financial milestones.
                        
                        <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                            <div className="text-sm">
                              <strong>Important:</strong> Your existing WLY tokens will remain in your wallet, 
                              but you won't earn new tokens until you reconnect.
                            </div>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDisconnect}
                        disabled={isDisconnecting}
                        className="bg-error hover:bg-error/90 text-error-foreground"
                      >
                        {isDisconnecting ? "Disconnecting..." : "Disconnect Wallet"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </>
        ) : (
          /* Not Connected State */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-background-subtle flex items-center justify-center">
              <Wallet className="w-8 h-8 text-foreground-muted" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">No Wallet Connected</h4>
              <p className="text-sm text-foreground-subtle max-w-md mx-auto">
                Connect your crypto wallet to start earning Wealthly Coins (WLY) 
                for achieving financial milestones and goals.
              </p>
            </div>
            
            <Button className="primary-gradient hover:primary-gradient-hover">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        )}

        {/* Security Information */}
        <div className="p-4 rounded-lg bg-info/5 border border-info/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-info">Wallet Security</h4>
              <div className="text-xs text-foreground-subtle space-y-1">
                <p>• We only request permission to view your wallet address</p>
                <p>• Smart contracts are audited and open-source</p>
                <p>• You maintain full control of your tokens and private keys</p>
                <p>• All transactions are recorded on the Polygon blockchain</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}