import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { 
  AlertTriangle, 
  Trash2, 
  Download, 
  Shield,
  UserX
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

interface DangerZoneProps {
  onNavigate?: (page: string) => void;
}

export function DangerZone({ onNavigate }: DangerZoneProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [confirmations, setConfirmations] = useState({
    understand: false,
    backup: false,
    permanent: false
  });

  const handleExportData = async () => {
    setIsExporting(true);
    
    // Simulate data export
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would trigger a download
    toast.success("Data exported successfully");
    setIsExporting(false);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    
    // Simulate account deletion
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsDeleting(false);
    toast.success("Account has been permanently deleted");
    
    // Reset form and navigate to landing page
    setConfirmText("");
    setConfirmations({
      understand: false,
      backup: false,
      permanent: false
    });
    
    // Navigate back to landing page after account deletion
    if (onNavigate) {
      setTimeout(() => {
        onNavigate("landing");
      }, 1000);
    }
  };

  const canDelete = 
    confirmText === "DELETE MY ACCOUNT" && 
    confirmations.understand && 
    confirmations.backup && 
    confirmations.permanent;

  return (
    <Card variant="glass" className="border-error/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-error" />
          <div>
            <CardTitle className="text-error">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that will permanently affect your account
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Export Data */}
        <div className="p-4 rounded-lg border border-border-subtle">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Export Account Data</h4>
              <p className="text-sm text-foreground-subtle">
                Download all your financial data, goals, transactions, and settings before making any permanent changes
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleExportData}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Permanently Delete Account */}
        <div className="p-4 rounded-lg border border-error/20 bg-error/5">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-error">Permanently Delete Account</h4>
              <p className="text-sm text-foreground-subtle">
                Completely remove your Wealthly account and all associated data. This action is irreversible and cannot be undone.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-error/10 border border-error/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
                <div className="text-sm text-error space-y-1">
                  <p className="font-medium">This will permanently delete:</p>
                  <ul className="ml-4 space-y-1 text-xs">
                    <li>• Your profile and account settings</li>
                    <li>• All bank connections and transaction history</li>
                    <li>• Financial goals, budgets, and milestones</li>
                    <li>• Wallet connections and token records</li>
                    <li>• AI coach conversation history</li>
                    <li>• All achievements and rewards</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="understand"
                  checked={confirmations.understand}
                  onCheckedChange={(checked) => 
                    setConfirmations(prev => ({ ...prev, understand: checked as boolean }))
                  }
                />
                <Label htmlFor="understand" className="text-sm cursor-pointer">
                  I understand that deleting my account will permanently remove all my data
                </Label>
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="backup"
                  checked={confirmations.backup}
                  onCheckedChange={(checked) => 
                    setConfirmations(prev => ({ ...prev, backup: checked as boolean }))
                  }
                />
                <Label htmlFor="backup" className="text-sm cursor-pointer">
                  I have exported or backed up any data I want to keep
                </Label>
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="permanent"
                  checked={confirmations.permanent}
                  onCheckedChange={(checked) => 
                    setConfirmations(prev => ({ ...prev, permanent: checked as boolean }))
                  }
                />
                <Label htmlFor="permanent" className="text-sm cursor-pointer">
                  I acknowledge this action is permanent and cannot be reversed
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-text" className="text-sm">
                Type <strong>DELETE MY ACCOUNT</strong> to confirm:
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type exactly: DELETE MY ACCOUNT"
                className="border-error/20 focus:border-error"
              />
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive"
                  disabled={!canDelete}
                  className="w-full"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Permanently Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-error">
                    Final Confirmation - Delete Account
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="space-y-4">
                      <p>
                        You are about to permanently delete your Wealthly account and all associated data.
                      </p>
                      
                      <div className="p-4 rounded-lg bg-error/10 border border-error/20">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
                          <div className="space-y-2">
                            <p className="font-medium text-error">
                              THIS ACTION IS IRREVERSIBLE
                            </p>
                            <p className="text-sm text-error">
                              Once your account is deleted, it cannot be recovered by Wealthly, 
                              our support team, or any third party. All your financial data, goals, 
                              transactions, and settings will be permanently lost.
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm">
                        If you're having issues with your account, consider contacting our support team 
                        before taking this irreversible action.
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-error hover:bg-error/90 text-error-foreground"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Deleting Account...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Yes, Delete My Account
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 rounded-lg bg-info/5 border border-info/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-info">Data Security & Privacy</h4>
              <div className="text-xs text-foreground-subtle space-y-1">
                <p>• All data deletion is processed securely and complies with privacy regulations</p>
                <p>• Account deletion includes removal from all connected services and backups</p>
                <p>• All actions are logged for security and compliance purposes</p>
                <p>• Contact support if you need assistance before making permanent changes</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}