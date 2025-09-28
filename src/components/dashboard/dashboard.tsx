import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { KPICards } from "./kpi-cards";
import { TransactionChart } from "./transaction-chart";
import { BudgetSummary } from "./budget-summary";
import { ActivityFeed } from "./activity-feed";
import { Card } from "../ui/card";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onNavigate={onNavigate} />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI Cards Row */}
          <KPICards isLoading={isLoading} />
          
          {/* Recent Activity Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed isLoading={isLoading} />
            </div>
            <div className="lg:col-span-1">
              <BudgetSummary isLoading={isLoading} />
            </div>
          </div>
          
          {/* Bottom Row - Chart */}
          <div className="grid gap-6">
            <TransactionChart isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}