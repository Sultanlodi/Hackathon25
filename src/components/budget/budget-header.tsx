import { 
  Sparkles, 
  PieChart, 
  TrendingUp, 
  Calendar,
  RefreshCw
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface BudgetHeaderProps {
  hasGeneratedBudget: boolean;
  onGenerateBudget: () => void;
}

export function BudgetHeader({ hasGeneratedBudget, onGenerateBudget }: BudgetHeaderProps) {
  const totalBudget = 1850;
  const totalSpent = 1314.76;
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Smart Budget</h1>
            <Badge variant="glass" className="px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
          <p className="text-foreground-subtle">
            AI-generated budget recommendations based on your spending patterns and financial goals.
          </p>
        </div>

        <Button 
          onClick={onGenerateBudget}
          className="primary-gradient hover:primary-gradient-hover px-6 py-3"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {hasGeneratedBudget ? "Regenerate Budget" : "Generate Budget"}
        </Button>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Total Budget</p>
              <p className="text-2xl font-bold">${totalBudget.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3 text-foreground-muted" />
                <span className="text-xs text-foreground-muted">This month</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <PieChart className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Total Spent</p>
              <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs ${spentPercentage > 80 ? 'text-warning' : 'text-success'}`}>
                  {spentPercentage}% of budget
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl border ${
              spentPercentage > 80 ? 'bg-warning/10 border-warning/20' : 'bg-success/10 border-success/20'
            }`}>
              <TrendingUp className={`w-6 h-6 ${spentPercentage > 80 ? 'text-warning' : 'text-success'}`} />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Remaining</p>
              <p className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-error' : 'text-success'}`}>
                ${Math.abs(remainingBudget).toFixed(2)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-foreground-muted">
                  {remainingBudget < 0 ? 'Over budget' : 'Available'}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl border ${
              remainingBudget < 0 ? 'bg-error/10 border-error/20' : 'bg-success/10 border-success/20'
            }`}>
              <RefreshCw className={`w-6 h-6 ${remainingBudget < 0 ? 'text-error' : 'text-success'}`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}