import { useState } from "react";
import { 
  Edit3, 
  Check, 
  X, 
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { BudgetCategory } from "./budget";
import { toast } from "sonner";

interface BudgetCategoriesProps {
  categories: BudgetCategory[];
  onUpdateCategory: (id: string, updates: Partial<BudgetCategory>) => void;
}

function CategoryCard({ category, onUpdate }: { 
  category: BudgetCategory; 
  onUpdate: (updates: Partial<BudgetCategory>) => void;
}) {
  const [editValue, setEditValue] = useState(category.budgetLimit.toString());

  const handleStartEdit = () => {
    setEditValue(category.budgetLimit.toString());
    onUpdate({ isEditing: true });
  };

  const handleSaveEdit = () => {
    const newLimit = parseFloat(editValue);
    if (isNaN(newLimit) || newLimit <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }

    // Optimistic update
    onUpdate({ 
      tempLimit: newLimit,
      isEditing: false 
    });
    
    toast.success(`Budget updated for ${category.name}`);
  };

  const handleCancelEdit = () => {
    setEditValue(category.budgetLimit.toString());
    onUpdate({ isEditing: false, tempLimit: undefined });
  };

  const currentLimit = category.tempLimit || category.budgetLimit;
  const currentPercentage = Math.round((category.currentSpent / currentLimit) * 100);
  const isOverBudget = currentPercentage > 100;
  const isNearLimit = currentPercentage > 80 && currentPercentage <= 100;

  const getStatusColor = () => {
    if (isOverBudget) return "error";
    if (isNearLimit) return "warning";
    return "success";
  };

  const getStatusBadge = () => {
    if (isOverBudget) return { label: "Over Budget", icon: AlertTriangle };
    if (isNearLimit) return { label: "Near Limit", icon: TrendingUp };
    return { label: "On Track", icon: TrendingDown };
  };

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;

  return (
    <Card variant="glass" className="p-6 hover:bg-background-subtle/50 transition-colors">
      <div className="space-y-4">
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{category.icon}</div>
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              <Badge 
                variant="secondary" 
                className={`mt-1 text-xs ${
                  getStatusColor() === "error" ? "bg-error/10 text-error border-error/20" :
                  getStatusColor() === "warning" ? "bg-warning/10 text-warning border-warning/20" :
                  "bg-success/10 text-success border-success/20"
                }`}
              >
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusBadge.label}
              </Badge>
            </div>
          </div>

          {!category.isEditing ? (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleStartEdit}
              className="h-8 w-8 p-0"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSaveEdit}
                className="h-8 w-8 p-0 text-success hover:bg-success/10"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleCancelEdit}
                className="h-8 w-8 p-0 text-error hover:bg-error/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Spending vs Budget */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-subtle">Spent this month</span>
            <span className="font-medium">${category.currentSpent.toFixed(2)}</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={Math.min(currentPercentage, 100)} 
              className="h-2"
              color={getStatusColor()}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground-muted">{currentPercentage}% used</span>
              <span className="text-foreground-muted">
                ${(currentLimit - category.currentSpent).toFixed(2)} remaining
              </span>
            </div>
          </div>

          {/* Budget Limit */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-subtle">Monthly budget</span>
            {!category.isEditing ? (
              <span className="font-semibold">
                ${currentLimit.toFixed(2)}
                {category.tempLimit && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Unsaved
                  </Badge>
                )}
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <Input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-24 h-8 text-sm text-right"
                  step="0.01"
                  min="0"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                />
              </div>
            )}
          </div>

          {/* Over Budget Warning */}
          {isOverBudget && (
            <div className="p-3 rounded-lg bg-error/10 border border-error/20">
              <div className="flex items-center gap-2 text-sm text-error">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">
                  ${(category.currentSpent - currentLimit).toFixed(2)} over budget
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function BudgetCategories({ categories, onUpdateCategory }: BudgetCategoriesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Budget Categories</h2>
        <Badge variant="secondary" className="px-3 py-1">
          {categories.length} categories
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onUpdate={(updates) => onUpdateCategory(category.id, updates)}
          />
        ))}
      </div>
    </div>
  );
}