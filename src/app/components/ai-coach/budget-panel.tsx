import { 
  DollarSign, 
  Target, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

interface BudgetPanelProps {
  onNavigate: (page: string) => void;
}

const currentBudget = {
  totalBudget: 3200,
  spent: 2150,
  remaining: 1050,
  categories: [
    { name: "Housing", budgeted: 1200, spent: 1200, color: "primary" as const },
    { name: "Food", budgeted: 400, spent: 380, color: "success" as const },
    { name: "Transport", budgeted: 300, spent: 245, color: "success" as const },
  ]
};

const upcomingMilestone = {
  goalName: "Emergency Fund",
  icon: "🛡️",
  currentAmount: 2250,
  targetAmount: 3000,
  daysLeft: 18,
  estimatedCompletion: "Dec 15",
  nextAction: "Save $42 more this week"
};

export function BudgetPanel({ onNavigate }: BudgetPanelProps) {
  const budgetUsagePercent = (currentBudget.spent / currentBudget.totalBudget) * 100;
  const milestoneProgress = (upcomingMilestone.currentAmount / upcomingMilestone.targetAmount) * 100;

  return (
    <div className="h-full overflow-y-auto bg-background-subtle/20">
      <div className="p-2.5 space-y-2.5">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Financial Overview</h2>
          <p className="text-sm text-foreground-subtle">
            Budget status and milestones
          </p>
        </div>

        {/* Budget Summary */}
        <Card variant="glass">
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="w-4 h-4 text-primary" />
              Monthly Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0 px-3 pb-3">
            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-subtle">Used</span>
                <span className="font-medium">
                  ${currentBudget.spent.toLocaleString()} / ${currentBudget.totalBudget.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={budgetUsagePercent} 
                color={budgetUsagePercent > 90 ? "warning" : budgetUsagePercent > 100 ? "error" : "success"} 
                className="h-2"
              />
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">{budgetUsagePercent.toFixed(0)}%</span>
                <span className={`font-medium ${
                  currentBudget.remaining > 0 ? 'text-success' : 'text-error'
                }`}>
                  ${Math.abs(currentBudget.remaining).toLocaleString()} {currentBudget.remaining > 0 ? 'left' : 'over'}
                </span>
              </div>
            </div>

            {/* Top Categories */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Top Categories</h4>
              <div className="space-y-2">
                {currentBudget.categories.map((category, index) => {
                  const categoryPercent = (category.spent / category.budgeted) * 100;
                  const isOverBudget = category.spent > category.budgeted;
                  const isComplete = category.spent === category.budgeted;
                  
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground-subtle">{category.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">
                            ${category.spent}/${category.budgeted}
                          </span>
                          {isComplete ? (
                            <CheckCircle className="w-3 h-3 text-success" />
                          ) : category.spent === 0 ? (
                            <Clock className="w-3 h-3 text-foreground-muted" />
                          ) : isOverBudget ? (
                            <AlertCircle className="w-3 h-3 text-error" />
                          ) : null}
                        </div>
                      </div>
                      <Progress 
                        value={Math.min(categoryPercent, 100)} 
                        color={isOverBudget ? "error" : isComplete ? "primary" : category.color}
                        className="h-1"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onNavigate("budget")}
              className="w-full text-sm h-8 px-3"
            >
              View Full Budget
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Milestone */}
        <Card variant="glass" className="border-primary/20">
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4 text-primary" />
              Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-0 px-3 pb-3">
            <div className="flex items-center gap-2">
              <div className="text-lg">{upcomingMilestone.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{upcomingMilestone.goalName}</h4>
                <p className="text-sm text-foreground-subtle">
                  {upcomingMilestone.daysLeft} days left
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm px-2 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                On Track
              </Badge>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-subtle">Progress</span>
                <span className="font-medium">
                  ${upcomingMilestone.currentAmount.toLocaleString()} / ${upcomingMilestone.targetAmount.toLocaleString()}
                </span>
              </div>
              <Progress value={milestoneProgress} color="primary" className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">{milestoneProgress.toFixed(0)}%</span>
                <span className="text-foreground-muted">
                  ${(upcomingMilestone.targetAmount - upcomingMilestone.currentAmount).toLocaleString()} to go
                </span>
              </div>
            </div>

            {/* Compact Timeline */}
            <div className="p-2 rounded-md bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3 text-primary" />
                <span className="text-sm font-medium text-primary">Est. {upcomingMilestone.estimatedCompletion}</span>
              </div>
              <p className="text-sm text-foreground-subtle">
                {upcomingMilestone.nextAction}
              </p>
            </div>

            {/* Quick Action */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onNavigate("goals")}
              className="w-full text-sm h-8 px-3"
            >
              View All Goals
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Compact AI Insights */}
        <Card variant="glass" className="bg-info/5 border-info/20">
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="w-4 h-4 rounded-full bg-info/20 flex items-center justify-center">
                <span className="text-sm">💡</span>
              </div>
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-3 pb-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0"></div>
                <p>15% under dining budget!</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0"></div>
                <p>Bills due soon. Set aside $350.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                <p>Save $50 more to reach early.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}