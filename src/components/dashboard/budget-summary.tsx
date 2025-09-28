import { 
  PieChart, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

interface BudgetSummaryProps {
  isLoading: boolean;
}

const budgetCategories = [
  {
    name: "Housing",
    budgeted: 1500,
    spent: 1200,
    remaining: 300,
    status: "on-track",
    trend: "up",
    trendValue: 5
  },
  {
    name: "Food & Dining",
    budgeted: 600,
    spent: 580,
    remaining: 20,
    status: "warning",
    trend: "up",
    trendValue: 15
  },
  {
    name: "Transportation",
    budgeted: 400,
    spent: 450,
    remaining: -50,
    status: "over-budget",
    trend: "up",
    trendValue: 12
  },
  {
    name: "Entertainment",
    budgeted: 300,
    spent: 180,
    remaining: 120,
    status: "on-track",
    trend: "down",
    trendValue: 8
  },
  {
    name: "Shopping",
    budgeted: 250,
    spent: 245,
    remaining: 5,
    status: "warning",
    trend: "up",
    trendValue: 25
  }
];

function BudgetSummarySkeleton() {
  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function getBudgetStatus(spent: number, budgeted: number) {
  const percentage = (spent / budgeted) * 100;
  
  if (percentage > 100) return "over-budget";
  if (percentage > 85) return "warning";
  return "on-track";
}

function getStatusIcon(status: string) {
  switch (status) {
    case "over-budget":
      return <AlertTriangle className="w-4 h-4 text-error" />;
    case "warning":
      return <Clock className="w-4 h-4 text-warning" />;
    case "on-track":
      return <CheckCircle className="w-4 h-4 text-success" />;
    default:
      return null;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "over-budget":
      return "bg-error";
    case "warning":
      return "bg-warning";
    case "on-track":
      return "bg-success";
    default:
      return "bg-gray-500";
  }
}

function BudgetCategoryItem({ category }: { category: any }) {
  const percentage = Math.min((category.spent / category.budgeted) * 100, 100);
  const isOverBudget = category.spent > category.budgeted;
  
  return (
    <div className="space-y-3 p-4 rounded-xl glass border border-border-subtle">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{category.name}</span>
          {getStatusIcon(category.status)}
        </div>
        <div className="flex items-center gap-2">
          {category.trend === "up" ? (
            <TrendingUp className="w-3 h-3 text-error" />
          ) : (
            <TrendingDown className="w-3 h-3 text-success" />
          )}
          <span className="text-xs text-foreground-subtle">
            {category.trendValue}%
          </span>
        </div>
      </div>
      
      {/* Progress */}
      <div className="space-y-2">
        <Progress 
          value={percentage}
          className={`h-2 ${isOverBudget ? '[&>div]:bg-error' : ''}`}
        />
        <div className="flex justify-between text-xs">
          <span className="text-foreground-subtle">
            ${category.spent.toLocaleString()} spent
          </span>
          <span className={`font-medium ${
            isOverBudget ? 'text-error' : 
            category.status === 'warning' ? 'text-warning' : 
            'text-foreground-subtle'
          }`}>
            {isOverBudget ? 
              `$${Math.abs(category.remaining)} over` :
              `$${category.remaining} left`
            }
          </span>
        </div>
      </div>
      
      {/* Budget info */}
      <div className="flex justify-between items-center text-xs text-foreground-muted">
        <span>Budget: ${category.budgeted.toLocaleString()}</span>
        <Badge 
          variant={
            category.status === 'over-budget' ? 'error' :
            category.status === 'warning' ? 'warning' : 'success'
          }
          className="text-xs px-2 py-0.5"
        >
          {percentage.toFixed(0)}%
        </Badge>
      </div>
    </div>
  );
}

export function BudgetSummary({ isLoading }: BudgetSummaryProps) {
  if (isLoading) {
    return <BudgetSummarySkeleton />;
  }

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const overallPercentage = (totalSpent / totalBudgeted) * 100;

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Budget Summary
            </CardTitle>
            <p className="text-sm text-foreground-subtle">
              Monthly budget overview
            </p>
          </div>
        </div>
        
        {/* Overall Budget Status */}
        <div className="p-4 rounded-xl glass border border-border-subtle">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Overall Budget</span>
            <Badge 
              variant={overallPercentage > 100 ? 'error' : overallPercentage > 85 ? 'warning' : 'success'}
              className="px-3 py-1"
            >
              {overallPercentage.toFixed(1)}% used
            </Badge>
          </div>
          <Progress value={Math.min(overallPercentage, 100)} className="h-3 mb-2" />
          <div className="flex justify-between text-sm">
            <span className="text-foreground-subtle">
              ${totalSpent.toLocaleString()} spent
            </span>
            <span className={`font-medium ${totalRemaining < 0 ? 'text-error' : 'text-success'}`}>
              {totalRemaining < 0 ? 
                `$${Math.abs(totalRemaining).toLocaleString()} over` :
                `$${totalRemaining.toLocaleString()} remaining`
              }
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {budgetCategories.map((category, index) => (
          <BudgetCategoryItem key={index} category={category} />
        ))}
        
        <div className="pt-4 border-t border-border-subtle">
          <Button variant="outline" className="w-full">
            View Detailed Budget
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}