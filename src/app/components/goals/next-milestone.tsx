import { 
  Target, 
  Calendar, 
  TrendingUp, 
  Clock,
  DollarSign,
  ArrowRight,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Goal } from "./goals";

interface NextMilestoneProps {
  goals: Goal[];
}

export function NextMilestone({ goals }: NextMilestoneProps) {
  // Find the next upcoming milestone across all active goals
  const getNextMilestone = () => {
    const activeGoalsWithMilestones = goals
      .filter(goal => 
        goal.status === "active" && 
        goal.nextMilestoneAmount && 
        goal.nextMilestoneDate
      )
      .map(goal => ({
        ...goal,
        milestoneDate: new Date(goal.nextMilestoneDate!),
        daysUntil: Math.ceil((new Date(goal.nextMilestoneDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      }))
      .sort((a, b) => a.milestoneDate.getTime() - b.milestoneDate.getTime());

    return activeGoalsWithMilestones[0] || null;
  };

  const nextMilestone = getNextMilestone();

  if (!nextMilestone) {
    return null;
  }

  const progressToMilestone = (nextMilestone.currentAmount / nextMilestone.nextMilestoneAmount!) * 100;
  const amountNeeded = nextMilestone.nextMilestoneAmount! - nextMilestone.currentAmount;
  const isOverdue = nextMilestone.daysUntil < 0;
  const isUrgent = nextMilestone.daysUntil <= 7 && nextMilestone.daysUntil >= 0;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysText = () => {
    if (isOverdue) {
      return `${Math.abs(nextMilestone.daysUntil)} days overdue`;
    } else if (nextMilestone.daysUntil === 0) {
      return "Due today";
    } else if (nextMilestone.daysUntil === 1) {
      return "Due tomorrow";
    } else {
      return `${nextMilestone.daysUntil} days left`;
    }
  };

  const getStatusColor = () => {
    if (isOverdue) return "error";
    if (isUrgent) return "warning";
    return "success";
  };

  return (
    <Card variant="glass" className={`border-2 ${
      isOverdue ? "border-error/30" : 
      isUrgent ? "border-warning/30" : 
      "border-primary/30"
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Next Milestone
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`text-xs ${
              isOverdue ? "bg-error/10 text-error border-error/20" :
              isUrgent ? "bg-warning/10 text-warning border-warning/20" :
              "bg-success/10 text-success border-success/20"
            }`}
          >
            <Clock className="w-3 h-3 mr-1" />
            {getDaysText()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Goal Info */}
        <div className="flex items-center gap-3">
          <div className="text-xl">{nextMilestone.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold">{nextMilestone.title}</h3>
            <p className="text-sm text-foreground-subtle">{nextMilestone.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground-subtle">Target Date</p>
            <p className="font-semibold">{formatDate(nextMilestone.milestoneDate)}</p>
          </div>
        </div>

        {/* Progress to Milestone */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-subtle">Progress to milestone</span>
            <span className="font-medium">
              ${nextMilestone.currentAmount.toLocaleString()} / ${nextMilestone.nextMilestoneAmount!.toLocaleString()}
            </span>
          </div>
          
          <Progress 
            value={Math.min(progressToMilestone, 100)} 
            className="h-3"
            color={getStatusColor() as any}
          />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground-muted">
              {Math.round(progressToMilestone)}% complete
            </span>
            <span className="text-foreground-muted">
              ${amountNeeded.toLocaleString()} needed
            </span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground-muted">Amount Needed</span>
            </div>
            <p className="font-semibold text-sm">${amountNeeded.toLocaleString()}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground-muted">Per {nextMilestone.cadence}</span>
            </div>
            <p className="font-semibold text-sm">
              ${(nextMilestone.commitmentAmount || 0).toLocaleString()}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground-muted">Milestone</span>
            </div>
            <p className="font-semibold text-sm">
              {nextMilestone.completedMilestones! + 1} of {nextMilestone.totalMilestones}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button 
            className={`w-full ${
              isOverdue || isUrgent 
                ? "bg-warning text-warning-foreground hover:bg-warning/90" 
                : "primary-gradient hover:primary-gradient-hover"
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            {isOverdue ? "Catch Up Now" : 
             isUrgent ? "Complete Milestone" : 
             "Add Contribution"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Quick Tips */}
        {(isOverdue || isUrgent) && (
          <div className={`p-3 rounded-lg border ${
            isOverdue ? "bg-error/5 border-error/20" : "bg-warning/5 border-warning/20"
          }`}>
            <p className="text-xs text-foreground-subtle">
              {isOverdue 
                ? "💡 Consider adjusting your contribution amount or extending the timeline to get back on track."
                : "⚡ You're close to your milestone! A small extra contribution could help you reach it on time."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}