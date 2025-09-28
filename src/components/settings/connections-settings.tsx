import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Link, 
  Unlink, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  CreditCard,
  Building,
  Clock,
  Shield
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

export function ConnectionsSettings() {
  const [connections, setConnections] = useState([
    {
      id: "chase",
      bankName: "Chase Bank",
      accountType: "Checking & Savings",
      lastSync: "2 minutes ago",
      status: "connected",
      accountCount: 2,
      icon: "🏦"
    },
    {
      id: "amex",
      bankName: "American Express",
      accountType: "Credit Card",
      lastSync: "1 hour ago", 
      status: "connected",
      accountCount: 1,
      icon: "💳"
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState<string | null>(null);

  const handleDisconnect = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
    toast.success("Bank account disconnected successfully");
  };

  const handleRefresh = async (connectionId: string) => {
    setIsRefreshing(connectionId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, lastSync: "just now" }
          : conn
      )
    );
    
    setIsRefreshing(null);
    toast.success("Account data refreshed successfully");
  };

  const handleAddNewBank = () => {
    toast.info("Redirecting to Plaid Link...");
    // In a real app, this would trigger Plaid Link
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Bank Connections</CardTitle>
              <CardDescription>
                Manage your connected bank accounts and financial institutions
              </CardDescription>
            </div>
          </div>
          
          <Button onClick={handleAddNewBank}>
            <Link className="w-4 h-4 mr-2" />
            Add Bank Account
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Connection Status Overview */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-success/5 border border-success/20">
          <CheckCircle className="w-6 h-6 text-success" />
          <div className="flex-1">
            <h4 className="font-medium text-success">All Connections Active</h4>
            <p className="text-sm text-foreground-subtle">
              {connections.length} bank account{connections.length !== 1 ? 's' : ''} connected and syncing properly
            </p>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Healthy
          </Badge>
        </div>

        {/* Connected Accounts */}
        <div className="space-y-4">
          <h4 className="font-medium">Connected Accounts</h4>
          
          {connections.map((connection) => (
            <Card key={connection.id} className="border-border-subtle">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-background-subtle flex items-center justify-center text-xl">
                      {connection.icon}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{connection.bankName}</h5>
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-success/10 text-success border-success/20"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-foreground-subtle">
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {connection.accountType}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {connection.accountCount} account{connection.accountCount !== 1 ? 's' : ''}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Last sync: {connection.lastSync}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRefresh(connection.id)}
                      disabled={isRefreshing === connection.id}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${
                        isRefreshing === connection.id ? 'animate-spin' : ''
                      }`} />
                      {isRefreshing === connection.id ? 'Syncing...' : 'Refresh'}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-error hover:text-error">
                          <Unlink className="w-4 h-4 mr-2" />
                          Disconnect
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Disconnect {connection.bankName}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove access to your {connection.bankName} accounts and stop 
                            automatic transaction syncing. You can reconnect at any time.
                            
                            <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                                <div className="text-sm">
                                  <strong>Important:</strong> Your historical transaction data will be preserved, 
                                  but new transactions won't be imported until you reconnect.
                                </div>
                              </div>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDisconnect(connection.id)}
                            className="bg-error hover:bg-error/90 text-error-foreground"
                          >
                            Disconnect Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Information */}
        <div className="p-4 rounded-lg bg-info/5 border border-info/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-info">Secure Bank-Grade Connections</h4>
              <div className="text-xs text-foreground-subtle space-y-1">
                <p>• All connections are secured with 256-bit encryption</p>
                <p>• We use Plaid's read-only access - we never store your login credentials</p>
                <p>• Your bank data is only used to provide Stacks features</p>
                <p>• You can disconnect any account at any time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Settings */}
        <div className="pt-4 border-t border-border-subtle">
          <h4 className="font-medium mb-3">Sync Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-background-subtle">
              <div>
                <h5 className="text-sm font-medium">Automatic Sync</h5>
                <p className="text-xs text-foreground-muted">
                  Automatically sync transactions every 6 hours
                </p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Enabled
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-background-subtle">
              <div>
                <h5 className="text-sm font-medium">Real-time Notifications</h5>
                <p className="text-xs text-foreground-muted">
                  Get notified when new transactions are detected
                </p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Enabled
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}