import { 
  Award, 
  Coins, 
  Target, 
  Trophy, 
  Zap,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { RewardEvent } from "./rewards";
import { toast } from "sonner";

interface RewardEventsTimelineProps {
  events: RewardEvent[];
}

function EventIcon({ type }: { type: RewardEvent["type"] }) {
  switch (type) {
    case "milestone":
      return <Target className="w-4 h-4" />;
    case "goal_completion":
      return <Trophy className="w-4 h-4" />;
    case "mint":
      return <Coins className="w-4 h-4" />;
    case "streak_bonus":
      return <Zap className="w-4 h-4" />;
    default:
      return <Award className="w-4 h-4" />;
  }
}

function EventBadge({ type }: { type: RewardEvent["type"] }) {
  const configs = {
    milestone: { label: "Milestone", color: "bg-primary/10 text-primary border-primary/20" },
    goal_completion: { label: "Goal Complete", color: "bg-success/10 text-success border-success/20" },
    mint: { label: "Reward", color: "bg-warning/10 text-warning border-warning/20" },
    streak_bonus: { label: "Streak Bonus", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" }
  };

  const config = configs[type];

  return (
    <Badge variant="secondary" className={`text-xs ${config.color}`}>
      <EventIcon type={type} />
      <span className="ml-1">{config.label}</span>
    </Badge>
  );
}

function EventCard({ event }: { event: RewardEvent }) {
  const handleCopyTxHash = () => {
    navigator.clipboard.writeText(event.txHash);
    toast.success("Transaction hash copied to clipboard");
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const { date, time } = formatDate(event.timestamp);

  return (
    <div className="flex gap-4">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
          event.type === "goal_completion" ? "bg-success/10 border-success/30 text-success" :
          event.type === "milestone" ? "bg-primary/10 border-primary/30 text-primary" :
          event.type === "mint" ? "bg-warning/10 border-warning/30 text-warning" :
          "bg-purple-500/10 border-purple-500/30 text-purple-400"
        }`}>
          <EventIcon type={event.type} />
        </div>
        <div className="w-px h-full bg-border-subtle mt-2"></div>
      </div>

      {/* Event content */}
      <Card variant="glass" className="flex-1 mb-6 group hover:bg-background-subtle/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {event.milestone && (
                <div className="text-lg">{event.milestone.goalIcon}</div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <EventBadge type={event.type} />
                  <div className="flex items-center gap-2 text-xs text-foreground-muted">
                    <Clock className="w-3 h-3" />
                    <span>{date} at {time}</span>
                  </div>
                </div>
                <h3 className="font-medium">{event.description}</h3>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-success">+{event.amount}</span>
                <span className="text-sm text-foreground-muted">SWT</span>
              </div>
              <div className="text-xs text-foreground-muted">
                ≈ ${(event.amount * 0.75).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Milestone progress */}
          {event.milestone && (
            <div className="mb-3 p-3 rounded-lg bg-background-subtle/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground-subtle">Milestone Progress</span>
                <span className="font-medium">
                  {event.milestone.milestoneNumber} / {event.milestone.totalMilestones}
                </span>
              </div>
              <div className="w-full bg-border-subtle rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ 
                    width: `${(event.milestone.milestoneNumber / event.milestone.totalMilestones) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Transaction info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground-muted">Tx Hash:</span>
              <span className="text-xs font-mono text-foreground-subtle">
                {event.txHash.slice(0, 10)}...{event.txHash.slice(-8)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopyTxHash}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Confirmed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RewardEventsTimeline({ events }: RewardEventsTimelineProps) {
  const totalTokensEarned = events.reduce((sum, event) => sum + event.amount, 0);
  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.timestamp);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  });
  const thisMonthTokens = thisMonthEvents.reduce((sum, event) => sum + event.amount, 0);

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Reward Events
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <p className="text-foreground-muted">This Month</p>
              <p className="font-semibold">{thisMonthTokens} SWT</p>
            </div>
            <div className="text-right">
              <p className="text-foreground-muted">Total Earned</p>
              <p className="font-semibold">{totalTokensEarned} SWT</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-0">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">No reward events yet</h3>
              <p className="text-sm text-foreground-subtle">
                Complete milestones and goals to start earning tokens!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}