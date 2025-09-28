import { 
  Bot, 
  Lightbulb, 
  TrendingDown, 
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { BudgetCategory } from "./budget";

interface AiTipsPanelProps {
  categories: BudgetCategory[];
}

interface AiTip {
  id: string;
  type: "warning" | "suggestion" | "achievement";
  title: string;
  description: string;
  action?: string;
  icon: React.ComponentType<{ className?: string }>;
  value?: string;
  category?: string;
}

export function AiTipsPanel({ categories }: AiTipsPanelProps) {
  // Generate AI tips based on spending patterns
  const generateTips = (): AiTip[] => {
    const tips: AiTip[] = [];
    
    // Find over-budget categories
    const overBudgetCategories = categories.filter(cat => 
      cat.currentSpent > (cat.tempLimit || cat.budgetLimit)
    );
    
    // Find categories close to limit
    const nearLimitCategories = categories.filter(cat => {
      const percentage = (cat.currentSpent / (cat.tempLimit || cat.budgetLimit)) * 100;
      return percentage > 80 && percentage <= 100;
    });
    
    // Find well-managed categories
    const wellManagedCategories = categories.filter(cat => {
      const percentage = (cat.currentSpent / (cat.tempLimit || cat.budgetLimit)) * 100;
      return percentage < 60;
    });

    // Add warning tip for over-budget
    if (overBudgetCategories.length > 0) {
      const category = overBudgetCategories[0];
      const overage = category.currentSpent - (category.tempLimit || category.budgetLimit);
      tips.push({
        id: "over-budget",
        type: "warning",
        title: "Budget Alert",
        description: `You're $${overage.toFixed(2)} over budget in ${category.name}. Consider reducing spending this week.`,
        action: "View spending breakdown",
        icon: AlertTriangle,
        category: category.name
      });
    }

    // Add suggestion for near-limit categories
    if (nearLimitCategories.length > 0) {
      const category = nearLimitCategories[0];
      const remaining = (category.tempLimit || category.budgetLimit) - category.currentSpent;
      tips.push({
        id: "near-limit",
        type: "suggestion",
        title: "Spending Watch",
        description: `You have $${remaining.toFixed(2)} left in ${category.name}. Try to stretch it for the rest of the month.`,
        action: "Set spending reminder",
        icon: Target,
        category: category.name
      });
    }

    // Add achievement for well-managed categories
    if (wellManagedCategories.length > 0) {
      const category = wellManagedCategories[0];
      const percentage = Math.round((category.currentSpent / (category.tempLimit || category.budgetLimit)) * 100);
      tips.push({
        id: "well-managed",
        type: "achievement",
        title: "Great Job!",
        description: `You're doing well with ${category.name} - only ${percentage}% used. Keep it up!`,
        action: "See savings tips",
        icon: CheckCircle,
        category: category.name
      });
    }

    // Add general optimization tip
    tips.push({
      id: "optimization",
      type: "suggestion",
      title: "Budget Optimization",
      description: "Based on your spending patterns, you could save $127/month by adjusting your dining and entertainment budgets.",
      action: "Apply suggestions",
      icon: TrendingDown,
      value: "$127/month"
    });

    return tips.slice(0, 3); // Return only top 3 tips
  };

  const tips = generateTips();

  const getTipColor = (type: string) => {
    switch (type) {
      case "warning":
        return "error";
      case "suggestion":
        return "primary";
      case "achievement":
        return "success";
      default:
        return "secondary";
    }
  };

  const getTipBadge = (type: string) => {
    switch (type) {
      case "warning":
        return { label: "Alert", color: "bg-error/10 text-error border-error/20" };
      case "suggestion":
        return { label: "Tip", color: "bg-primary/10 text-primary border-primary/20" };
      case "achievement":
        return { label: "Achievement", color: "bg-success/10 text-success border-success/20" };
      default:
        return { label: "Info", color: "bg-secondary/10 text-secondary border-secondary/20" };
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Tips Header */}
      <Card variant="glass" className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg primary-gradient">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">AI Budget Coach</h3>
            <p className="text-xs text-foreground-subtle">Personalized insights</p>
          </div>
          <Badge variant="glass" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
      </Card>

      {/* Budget Health Score */}
      <Card variant="glass" className="p-4">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-warning" />
            Budget Health Score
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-success">78</span>
              <span className="text-sm text-foreground-subtle">out of 100</span>
            </div>
            <Progress value={78} className="h-2" color="success" />
            <p className="text-xs text-foreground-subtle">
              Good financial discipline! Focus on reducing overspending in 2 categories.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Tips */}
      <div className="space-y-4">
        <h3 className="font-medium text-sm flex items-center gap-2">
          <Bot className="w-4 h-4" />
          Smart Recommendations
        </h3>
        
        {tips.map((tip, index) => {
          const TipIcon = tip.icon;
          const badge = getTipBadge(tip.type);
          
          return (
            <Card key={tip.id} variant="glass" className="p-4">
              <div className="space-y-3">
                {/* Tip Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${
                      tip.type === "warning" ? "bg-error/10 border-error/20" :
                      tip.type === "achievement" ? "bg-success/10 border-success/20" :
                      "bg-primary/10 border-primary/20"
                    }`}>
                      <TipIcon className={`w-4 h-4 ${
                        tip.type === "warning" ? "text-error" :
                        tip.type === "achievement" ? "text-success" :
                        "text-primary"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{tip.title}</h4>
                        <Badge variant="secondary" className={`text-xs ${badge.color}`}>
                          {badge.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground-subtle leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category Tag */}
                {tip.category && (
                  <Badge variant="outline" className="text-xs w-fit">
                    {tip.category}
                  </Badge>
                )}

                {/* Value Highlight */}
                {tip.value && (
                  <div className="p-2 rounded-lg bg-background-subtle border border-border-subtle">
                    <span className="text-sm font-semibold text-success">{tip.value}</span>
                    <span className="text-xs text-foreground-subtle ml-1">potential savings</span>
                  </div>
                )}

                {/* Action Button */}
                {tip.action && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between h-8 text-xs"
                  >
                    {tip.action}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card variant="glass" className="p-4">
        <h4 className="font-medium text-sm mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
            <Target className="w-3 h-3 mr-2" />
            Set savings goal
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
            <AlertTriangle className="w-3 h-3 mr-2" />
            Add spending alert
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
            <TrendingDown className="w-3 h-3 mr-2" />
            Analyze spending trends
          </Button>
        </div>
      </Card>
    </div>
  );
}