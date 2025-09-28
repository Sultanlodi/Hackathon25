import { 
  Shield, 
  Link2, 
  CheckCircle, 
  AlertCircle,
  Unlink,
  Loader2,
  Landmark,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface PlaidLinkCardProps {
  isLinked: boolean;
  isLinking: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function PlaidLinkCard({ isLinked, isLinking, onConnect, onDisconnect }: PlaidLinkCardProps) {
  return (
    <Card variant="glass" className="border-2 border-border-subtle">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${
              isLinked ? 'bg-success/20 border border-success/30' : 
              'primary-gradient'
            }`}>
              {isLinked ? (
                <CheckCircle className="w-8 h-8 text-success" />
              ) : (
                <Landmark className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-3">
                {isLinked ? "Bank Account Connected" : "Connect with Plaid"}
                <Badge 
                  variant={isLinked ? "success" : "secondary"}
                  className="px-3 py-1"
                >
                  {isLinked ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Linked
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Not Linked
                    </>
                  )}
                </Badge>
              </CardTitle>
              <p className="text-sm text-foreground-subtle">
                {isLinked 
                  ? "Your bank account is securely connected via Plaid" 
                  : "Link your bank account using Plaid's secure sandbox environment"
                }
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Connection Status */}
        {isLinked ? (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl glass border border-border-subtle">
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Chase Bank</p>
                  <p className="text-xs text-foreground-subtle">Checking Account</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl glass border border-border-subtle">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-sm">Real-time Sync</p>
                  <p className="text-xs text-foreground-subtle">Last updated: Now</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl glass border border-border-subtle">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-warning" />
                <div>
                  <p className="font-medium text-sm">Bank-level Security</p>
                  <p className="text-xs text-foreground-subtle">256-bit encryption</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Security Features */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl glass border border-border-subtle">
                <Shield className="w-5 h-5 text-success mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Bank-level Security</h4>
                  <p className="text-xs text-foreground-subtle leading-relaxed">
                    Your credentials are encrypted and never stored on our servers. 
                    Plaid uses 256-bit encryption and OAuth standards.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl glass border border-border-subtle">
                <Zap className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Real-time Updates</h4>
                  <p className="text-xs text-foreground-subtle leading-relaxed">
                    Get instant transaction updates and account balances 
                    synced automatically across all your devices.
                  </p>
                </div>
              </div>
            </div>

            {/* Supported Banks */}
            <div className="p-4 rounded-xl glass border border-border-subtle">
              <h4 className="font-medium text-sm mb-3">Supported Banks (Sandbox)</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {["Chase", "Wells Fargo", "Bank of America", "Citi", "Capital One", "US Bank"].map((bank) => (
                  <div key={bank} className="text-center p-2 rounded-lg bg-background-subtle">
                    <div className="w-8 h-8 rounded-full bg-primary/20 mx-auto mb-1 flex items-center justify-center">
                      <Landmark className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xs text-foreground-subtle">{bank}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isLinked ? (
            <>
              <Button variant="outline" onClick={onDisconnect} className="flex items-center gap-2">
                <Unlink className="w-4 h-4" />
                Disconnect Account
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Add Another Account
              </Button>
            </>
          ) : (
            <Button 
              onClick={onConnect} 
              disabled={isLinking}
              className="primary-gradient hover:primary-gradient-hover flex items-center gap-2 px-6 py-3"
            >
              {isLinking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting via Plaid...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  Link with Plaid (Sandbox)
                </>
              )}
            </Button>
          )}
        </div>

        {/* Privacy Note */}
        <div className="p-4 rounded-xl bg-background-subtle border border-border-subtle">
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-success mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-medium text-foreground">Privacy & Security</p>
              <p className="text-xs text-foreground-subtle leading-relaxed">
                Bank linking via Plaid. We never store your credentials. Your data is encrypted 
                and protected by the same security standards used by major financial institutions. 
                You can disconnect at any time.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}