import { useState } from "react";
import { 
  MoreHorizontal, 
  ExternalLink, 
  Pause, 
  Play, 
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Goal } from "./goals";
import { toast } from "sonner";

interface GoalsListProps {
  goals: Goal[];
  onUpdateGoal: (goalId: string, updates: Partial<Goal>) => void;
}

function TransactionStatusChip({ txStatus, txHash }: { txStatus?: string; txHash?: string }) {
  if (!txStatus) return null;

  const getStatusConfig = () => {
    switch (txStatus) {
      case "confirmed":
        return { 
          icon: CheckCircle, 
          label: "Confirmed", 
          color: "bg-success/10 text-success border-success/20" 
        };
      case "pending":
        return { 
          icon: Clock, 
          label: "Pending", 
          color: "bg-warning/10 text-warning border-warning/20" 
        };
      case "failed":
        return { 
          icon: AlertTriangle, 
          label: "Failed", 
          color: "bg-error/10 text-error border-error/20" 
        };
      default:
        return { 
          icon: Clock, 
          label: "Unknown", 
          color: "bg-secondary/10 text-secondary border-secondary/20" 
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  const handleCopyHash = () => {
    if (txHash) {
      navigator.clipboard.writeText(txHash);
      toast.success("Transaction hash copied to clipboard");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className={`text-xs ${config.color}`}>
        <StatusIcon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
      {txHash && (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopyHash}
            className="h-6 w-6 p-0"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
}

function GoalCard({ goal, onUpdate }: { goal: Goal; onUpdate: (updates: Partial<Goal>) => void }) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const isCompleted = goal.status === "completed";
  const isActive = goal.status === "active";
  const isPending = goal.status === "pending";

  const getStatusColor = () => {
    switch (goal.status) {
      case "completed": return "success";
      case "active": return "primary";
      case "pending": return "warning";
      case "paused": return "secondary";
      default: return "secondary";
    }
  };

  const handleTogglePause = () => {
    const newStatus = goal.status === "paused" ? "active" : "paused";
    onUpdate({ status: newStatus });
    toast.success(`Goal ${newStatus === "paused" ? "paused" : "resumed"}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getNextMilestoneText = () => {
    if (goal.nextMilestoneAmount && goal.nextMilestoneDate) {
      return `Next: $${goal.nextMilestoneAmount.toLocaleString()} by ${formatDate(goal.nextMilestoneDate)}`;
    }
    return "No upcoming milestones";
  };

  return (
    <Card variant="glass" className="group hover:bg-background-subtle/50 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="text-2xl">{goal.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{goal.title}</h3>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    getStatusColor() === "success" ? "bg-success/10 text-success border-success/20" :
                    getStatusColor() === "primary" ? "bg-primary/10 text-primary border-primary/20" :
                    getStatusColor() === "warning" ? "bg-warning/10 text-warning border-warning/20" :
                    "bg-secondary/10 text-secondary border-secondary/20"
                  }`}
                >
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </Badge>
                {goal.isOnChain && (
                  <Badge variant="outline" className="text-xs">
                    On-chain
                  </Badge>
                )}
              </div>
              {goal.description && (
                <p className="text-sm text-foreground-subtle">{goal.description}</p>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-foreground-muted">
                <span>Category: {goal.category}</span>
                <span>Started: {formatDate(goal.startDate)}</span>
                {goal.endDate && <span>Completed: {formatDate(goal.endDate)}</span>}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isActive && (
                <DropdownMenuItem onClick={handleTogglePause}>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Goal
                </DropdownMenuItem>
              )}
              {goal.status === "paused" && (
                <DropdownMenuItem onClick={handleTogglePause}>
                  <Play className="w-4 h-4 mr-2" />
                  Resume Goal
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-error">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Goal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-subtle">Progress</span>
            <span className="font-medium">
              ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
            </span>
          </div>
          
          <Progress 
            value={Math.min(progress, 100)} 
            className="h-3"
            color={getStatusColor() as any}
          />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground-muted">{Math.round(progress)}% complete</span>
            <span className="text-foreground-muted">
              ${(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
            </span>
          </div>
        </div>

        {/* Milestones */}
        {goal.totalMilestones && goal.completedMilestones !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground-subtle">Milestones</span>
              <span className="font-medium">
                {goal.completedMilestones} / {goal.totalMilestones}
              </span>
            </div>
            <Progress 
              value={(goal.completedMilestones / goal.totalMilestones) * 100} 
              className="h-2"
              color="secondary"
            />
          </div>
        )}

        {/* Next Milestone */}
        {isActive && goal.nextMilestoneAmount && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">{getNextMilestoneText()}</span>
            </div>
          </div>
        )}

        {/* Contribution Info */}
        {goal.commitmentAmount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-subtle">Contribution</span>
            <span className="font-medium">
              ${goal.commitmentAmount.toLocaleString()} / {goal.cadence}
            </span>
          </div>
        )}

        {/* Transaction Status */}
        {goal.txHash && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-subtle">Transaction</span>
            <TransactionStatusChip txStatus={goal.txStatus} txHash={goal.txHash} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function GoalsList({ goals, onUpdateGoal }: GoalsListProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filterGoals = (status: string) => {
    switch (status) {
      case "active":
        return goals.filter(goal => goal.status === "active");
      case "pending":
        return goals.filter(goal => goal.status === "pending");
      case "completed":
        return goals.filter(goal => goal.status === "completed");
      default:
        return goals;
    }
  };

  const filteredGoals = filterGoals(activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Goals</h2>
        <Badge variant="secondary" className="px-3 py-1">
          {goals.length} total goals
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredGoals.length > 0 ? (
            <div className="grid gap-4">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={(updates) => onUpdateGoal(goal.id, updates)}
                />
              ))}
            </div>
          ) : (
            <Card variant="glass" className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">No {activeTab !== "all" ? activeTab : ""} goals found</h3>
                  <p className="text-sm text-foreground-subtle">
                    {activeTab === "all" 
                      ? "Start by committing to your first financial goal."
                      : `You don't have any ${activeTab} goals yet.`
                    }
                  </p>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}