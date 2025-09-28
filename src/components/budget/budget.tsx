import { useState } from "react";
import { Sidebar } from "../dashboard/sidebar";
import { TopBar } from "../dashboard/top-bar";
import { BudgetHeader } from "./budget-header";
import { BudgetCategories } from "./budget-categories";
import { SaveChangesBar } from "./save-changes-bar";
import { AiTipsPanel } from "./ai-tips-panel";

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  currentSpent: number;
  budgetLimit: number;
  percentage: number;
  color: "success" | "warning" | "error" | "primary";
  isEditing?: boolean;
  tempLimit?: number;
}

interface BudgetProps {
  onNavigate: (page: string) => void;
}

const initialCategories: BudgetCategory[] = [
  {
    id: "food",
    name: "Food & Dining",
    icon: "🍽️",
    currentSpent: 487.32,
    budgetLimit: 600,
    percentage: 81,
    color: "warning"
  },
  {
    id: "transport",
    name: "Transportation",
    icon: "🚗",
    currentSpent: 234.67,
    budgetLimit: 400,
    percentage: 59,
    color: "success"
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛒",
    currentSpent: 189.99,
    budgetLimit: 200,
    percentage: 95,
    color: "error"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎮",
    currentSpent: 67.48,
    budgetLimit: 150,
    percentage: 45,
    color: "success"
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "⚡",
    currentSpent: 245.80,
    budgetLimit: 300,
    percentage: 82,
    color: "warning"
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
    currentSpent: 89.50,
    budgetLimit: 200,
    percentage: 45,
    color: "success"
  }
];

export function Budget({ onNavigate }: BudgetProps) {
  const [activeSection, setActiveSection] = useState("budget");
  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasGeneratedBudget, setHasGeneratedBudget] = useState(true);

  const updateCategory = (id: string, updates: Partial<BudgetCategory>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update categories with optimistic values
    setCategories(prev => prev.map(cat => ({
      ...cat,
      budgetLimit: cat.tempLimit || cat.budgetLimit,
      percentage: Math.round((cat.currentSpent / (cat.tempLimit || cat.budgetLimit)) * 100),
      isEditing: false,
      tempLimit: undefined
    })));
    
    setHasChanges(false);
    setIsSaving(false);
  };

  const handleDiscardChanges = () => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      isEditing: false,
      tempLimit: undefined
    })));
    setHasChanges(false);
  };

  const handleGenerateBudget = async () => {
    setHasGeneratedBudget(true);
    // In a real app, this would call an AI service to generate budget recommendations
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection="budget" 
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />
        
        {/* Budget Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex gap-6 p-6 h-full">
            {/* Main Budget Content */}
            <div className="flex-1 space-y-6">
              <BudgetHeader 
                hasGeneratedBudget={hasGeneratedBudget}
                onGenerateBudget={handleGenerateBudget}
              />
              
              <BudgetCategories 
                categories={categories}
                onUpdateCategory={updateCategory}
              />
            </div>

            {/* AI Tips Panel */}
            <div className="w-80 shrink-0">
              <AiTipsPanel categories={categories} />
            </div>
          </div>
        </main>

        {/* Save Changes Bar */}
        {hasChanges && (
          <SaveChangesBar 
            isSaving={isSaving}
            onSave={handleSaveChanges}
            onDiscard={handleDiscardChanges}
          />
        )}
      </div>
    </div>
  );
}