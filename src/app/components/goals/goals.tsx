import { useState } from "react";
import { Sidebar } from "../dashboard/sidebar";
import { TopBar } from "../dashboard/top-bar";
import { GoalStatusCards } from "./goal-status-cards";
import { GoalsList } from "./goals-list";
import { CommitGoalModal } from "./commit-goal-modal";
import { NextMilestone } from "./next-milestone";

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  cadence: "daily" | "weekly" | "monthly";
  startDate: string;
  endDate?: string;
  status: "active" | "pending" | "completed" | "paused";
  category: string;
  icon: string;
  txHash?: string;
  txStatus?: "pending" | "confirmed" | "failed";
  nextMilestoneAmount?: number;
  nextMilestoneDate?: string;
  totalMilestones?: number;
  completedMilestones?: number;
  createdAt: string;
  commitmentAmount?: number; // Amount committed on-chain
  isOnChain?: boolean;
}

interface GoalsProps {
  onNavigate: (page: string) => void;
}

const mockGoals: Goal[] = [
  {
    id: "emergency-fund",
    title: "Emergency Fund",
    description: "Build a 6-month emergency fund for financial security",
    targetAmount: 15000,
    currentAmount: 8750,
    cadence: "monthly",
    startDate: "2024-01-15",
    status: "active",
    category: "Safety Net",
    icon: "🛡️",
    txHash: "0x742d35Cc6134C0532925a3b8D8C58F2L7ec47c9f",
    txStatus: "confirmed",
    nextMilestoneAmount: 10000,
    nextMilestoneDate: "2024-12-31",
    totalMilestones: 6,
    completedMilestones: 3,
    createdAt: "2024-01-15",
    commitmentAmount: 500,
    isOnChain: true
  },
  {
    id: "house-down-payment",
    title: "House Down Payment",
    description: "Save for a 20% down payment on a $300k home",
    targetAmount: 60000,
    currentAmount: 22400,
    cadence: "monthly",
    startDate: "2024-03-01",
    status: "active",
    category: "Real Estate",
    icon: "🏠",
    txHash: "0x8f3e7d5c2a91b4f6e8d9c7a5b3f1e2d4c6a8b9f7e5d3c1a9b7f5e3d1c9a7b5f3e1",
    txStatus: "confirmed",
    nextMilestoneAmount: 30000,
    nextMilestoneDate: "2025-01-01",
    totalMilestones: 12,
    completedMilestones: 4,
    createdAt: "2024-03-01",
    commitmentAmount: 1200,
    isOnChain: true
  },
  {
    id: "vacation-fund",
    title: "European Vacation",
    description: "Save for a 2-week trip to Europe",
    targetAmount: 5000,
    currentAmount: 3200,
    cadence: "weekly",
    startDate: "2024-06-01",
    status: "active",
    category: "Travel",
    icon: "✈️",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h",
    txStatus: "pending",
    nextMilestoneAmount: 4000,
    nextMilestoneDate: "2024-11-15",
    totalMilestones: 8,
    completedMilestones: 5,
    createdAt: "2024-06-01",
    commitmentAmount: 150,
    isOnChain: true
  },
  {
    id: "investment-portfolio",
    title: "Investment Portfolio",
    description: "Build a diversified investment portfolio",
    targetAmount: 25000,
    currentAmount: 0,
    cadence: "monthly",
    startDate: "2024-12-01",
    status: "pending",
    category: "Investment",
    icon: "📈",
    nextMilestoneAmount: 5000,
    nextMilestoneDate: "2025-05-01",
    totalMilestones: 5,
    completedMilestones: 0,
    createdAt: "2024-11-20",
    isOnChain: false
  },
  {
    id: "debt-payoff",
    title: "Student Loan Payoff",
    description: "Pay off remaining student debt early",
    targetAmount: 12000,
    currentAmount: 12000,
    cadence: "monthly",
    startDate: "2023-01-01",
    endDate: "2024-10-15",
    status: "completed",
    category: "Debt",
    icon: "🎓",
    txHash: "0x9f8e7d6c5b4a39282716e5d4c3b2a1908f7e6d5c4b3a29281716e5d4c3b2a190",
    txStatus: "confirmed",
    totalMilestones: 12,
    completedMilestones: 12,
    createdAt: "2023-01-01",
    commitmentAmount: 800,
    isOnChain: true
  }
];

export function Goals({ onNavigate }: GoalsProps) {
  const [activeSection, setActiveSection] = useState("goals");
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);

  const activeGoals = goals.filter(goal => goal.status === "active");
  const pendingGoals = goals.filter(goal => goal.status === "pending");
  const completedGoals = goals.filter(goal => goal.status === "completed");

  const handleCommitGoal = (goalData: Partial<Goal>) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalData.title || "",
      description: goalData.description || "",
      targetAmount: goalData.targetAmount || 0,
      currentAmount: 0,
      cadence: goalData.cadence || "monthly",
      startDate: goalData.startDate || new Date().toISOString().split('T')[0],
      status: "pending",
      category: goalData.category || "General",
      icon: goalData.icon || "🎯",
      totalMilestones: goalData.totalMilestones || 1,
      completedMilestones: 0,
      createdAt: new Date().toISOString(),
      commitmentAmount: goalData.commitmentAmount,
      isOnChain: false
    };

    setGoals(prev => [newGoal, ...prev]);
    setIsCommitModalOpen(false);
  };

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection="goals" 
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />
        
        {/* Goals Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Goal Status Overview */}
            <GoalStatusCards 
              activeCount={activeGoals.length}
              pendingCount={pendingGoals.length}
              completedCount={completedGoals.length}
              onCommitGoal={() => setIsCommitModalOpen(true)}
            />

            {/* Next Milestone */}
            {activeGoals.length > 0 && (
              <NextMilestone goals={activeGoals} />
            )}

            {/* Goals List */}
            <GoalsList 
              goals={goals}
              onUpdateGoal={updateGoal}
            />
          </div>
        </main>
      </div>

      {/* Commit Goal Modal */}
      <CommitGoalModal 
        open={isCommitModalOpen}
        onClose={() => setIsCommitModalOpen(false)}
        onCommit={handleCommitGoal}
      />
    </div>
  );
}