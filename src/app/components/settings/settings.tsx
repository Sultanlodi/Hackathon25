import { useState } from "react";
import { Sidebar } from "../dashboard/sidebar";
import { TopBar } from "../dashboard/top-bar";
import { ProfileSettings } from "./profile-settings";
import { ConnectionsSettings } from "./connections-settings";
import { WalletSettings } from "./wallet-settings";
import { DangerZone } from "./danger-zone";

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [activeSection, setActiveSection] = useState("settings");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection="settings" 
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onNavigate={onNavigate} />
        
        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-foreground-subtle">
                Manage your account preferences, connections, and security settings
              </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              {/* Profile Settings */}
              <ProfileSettings />
              
              {/* Connections Settings */}
              <ConnectionsSettings />
              
              {/* Wallet Settings */}
              <WalletSettings />
              
              {/* Danger Zone */}
              <DangerZone onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}