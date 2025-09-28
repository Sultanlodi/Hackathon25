import { 
  Target, 
  Clock, 
  CheckCircle, 
  Plus,
  TrendingUp,
  Calendar,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface GoalStatusCardsProps {
  activeCount: number;
  pendingCount: number;
  completedCount: number;
  onCommitGoal: () => void;
}

export function GoalStatusCards({ 
  activeCount, 
  pendingCount, 
  completedCount, 
  onCommitGoal 
}: GoalStatusCardsProps) {
  const totalGoals = activeCount + pendingCount + completedCount;
  const completionRate = totalGoals > 0 ? Math.round((completedCount / totalGoals) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Smart Goals</h1>
            <Badge variant="glass" className="px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              Blockchain-Secured
            </Badge>
          </div>
          <p className="text-foreground-subtle">
            Set, track, and achieve your financial goals with on-chain commitment contracts.
          </p>
        </div>

        <Button 
          onClick={onCommitGoal}
          className="primary-gradient hover:primary-gradient-hover px-6 py-3"
        >
          <Plus className="w-4 h-4 mr-2" />
          Commit Goal
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Active Goals */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Active Goals</p>
              <p className="text-2xl font-bold">{activeCount}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success">In progress</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
              <Target className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        {/* Pending Goals */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Pending</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3 text-warning" />
                <span className="text-xs text-warning">Awaiting start</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
              <Clock className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>

        {/* Completed Goals */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Completed</p>
              <p className="text-2xl font-bold">{completedCount}</p>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary">Achieved</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Success Rate */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Success Rate</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs ${
                  completionRate >= 70 ? 'text-success' : 
                  completionRate >= 40 ? 'text-warning' : 'text-error'
                }`}>
                  {completionRate >= 70 ? 'Excellent' : 
                   completionRate >= 40 ? 'Good' : 'Needs focus'}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl border ${
              completionRate >= 70 ? 'bg-success/10 border-success/20' : 
              completionRate >= 40 ? 'bg-warning/10 border-warning/20' : 
              'bg-error/10 border-error/20'
            }`}>
              <TrendingUp className={`w-6 h-6 ${
                completionRate >= 70 ? 'text-success' : 
                completionRate >= 40 ? 'text-warning' : 'text-error'
              }`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}