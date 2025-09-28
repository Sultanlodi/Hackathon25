import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownLeft,
  Coins,
  Target,
  CreditCard,
  Smartphone,
  Coffee,
  Car,
  Home,
  ShoppingBag,
  Gamepad2,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface ActivityFeedProps {
  isLoading: boolean;
}

const activityData = [
  {
    id: 1,
    type: "transaction",
    category: "food",
    title: "Starbucks Coffee",
    description: "Mobile payment",
    amount: -12.50,
    time: "2 hours ago",
    icon: Coffee,
    color: "warning"
  },
  {
    id: 2,
    type: "reward",
    category: "achievement",
    title: "Goal Milestone Reached",
    description: "Emergency fund 75% complete",
    amount: 100,
    time: "4 hours ago",
    icon: Target,
    color: "success"
  },
  {
    id: 3,
    type: "transaction",
    category: "transport",
    title: "Gas Station",
    description: "Fuel purchase",
    amount: -45.20,
    time: "6 hours ago",
    icon: Car,
    color: "primary"
  },
  {
    id: 4,
    type: "income",
    category: "salary",
    title: "Salary Deposit",
    description: "Monthly salary",
    amount: 4500.00,
    time: "1 day ago",
    icon: ArrowUpRight,
    color: "success"
  },
  {
    id: 5,
    type: "transaction",
    category: "housing",
    title: "Rent Payment",
    description: "Monthly rent",
    amount: -1200.00,
    time: "1 day ago",
    icon: Home,
    color: "error"
  },
  {
    id: 6,
    type: "reward",
    category: "tokens",
    title: "Daily Login Bonus",
    description: "Streak reward",
    amount: 25,
    time: "1 day ago",
    icon: Coins,
    color: "warning"
  },
  {
    id: 7,
    type: "transaction",
    category: "shopping",
    title: "Amazon Purchase",
    description: "Electronics",
    amount: -89.99,
    time: "2 days ago",
    icon: ShoppingBag,
    color: "primary"
  },
  {
    id: 8,
    type: "transaction",
    category: "entertainment",
    title: "Netflix Subscription",
    description: "Monthly subscription",
    amount: -15.99,
    time: "2 days ago",
    icon: Gamepad2,
    color: "accent"
  },
  {
    id: 9,
    type: "transaction",
    category: "food",
    title: "Grocery Store",
    description: "Weekly groceries",
    amount: -127.45,
    time: "3 days ago",
    icon: ShoppingBag,
    color: "warning"
  },
  {
    id: 10,
    type: "reward",
    category: "achievement",
    title: "Savings Streak",
    description: "7 days of consistent saving",
    amount: 50,
    time: "3 days ago",
    icon: Target,
    color: "success"
  }
];

function ActivityFeedSkeleton() {
  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-8 w-[80px]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
              <Skeleton className="h-4 w-[60px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getActivityTypeColor(type: string) {
  switch (type) {
    case "income":
      return "text-success bg-success/10 border-success/20";
    case "transaction":
      return "text-primary bg-primary/10 border-primary/20";
    case "reward":
      return "text-warning bg-warning/10 border-warning/20";
    default:
      return "text-foreground bg-background-subtle border-border";
  }
}

function getAmountColor(amount: number, type: string) {
  if (amount > 0) return "text-success";
  if (type === "reward") return "text-warning";
  return "text-foreground";
}

function ActivityItem({ activity }: { activity: any }) {
  const Icon = activity.icon;
  const isPositive = activity.amount > 0;
  const isReward = activity.type === "reward";
  
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-background-subtle/50 transition-colors">
      {/* Icon */}
      <div className={`p-2 rounded-full border ${getActivityTypeColor(activity.color)}`}>
        <Icon className="w-4 h-4" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm truncate">{activity.title}</h4>
          <div className="flex items-center gap-2">
            {isReward && <Coins className="w-3 h-3 text-warning" />}
            <span className={`font-semibold text-sm ${getAmountColor(activity.amount, activity.type)}`}>
              {isPositive ? "+" : ""}
              {isReward ? activity.amount : `$${Math.abs(activity.amount).toFixed(2)}`}
              {isReward && " tokens"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-foreground-subtle truncate">{activity.description}</p>
          <span className="text-xs text-foreground-muted whitespace-nowrap ml-2">
            {activity.time}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ActivityFeed({ isLoading }: ActivityFeedProps) {
  if (isLoading) {
    return <ActivityFeedSkeleton />;
  }

  const recentActivities = activityData.slice(0, 8);
  const todayActivities = activityData.filter(activity => 
    activity.time.includes("hours ago")
  );
  const yesterdayActivities = activityData.filter(activity => 
    activity.time.includes("1 day ago")
  );
  const olderActivities = activityData.filter(activity => 
    activity.time.includes("days ago") && !activity.time.includes("1 day ago")
  );

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <p className="text-sm text-foreground-subtle">
              Your latest transactions and achievements
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {/* Today */}
            {todayActivities.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-foreground-subtle">Today</h3>
                  <Separator className="flex-1" />
                </div>
                <div className="space-y-1">
                  {todayActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Yesterday */}
            {yesterdayActivities.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-foreground-subtle">Yesterday</h3>
                  <Separator className="flex-1" />
                </div>
                <div className="space-y-1">
                  {yesterdayActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Older */}
            {olderActivities.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-foreground-subtle">Earlier</h3>
                  <Separator className="flex-1" />
                </div>
                <div className="space-y-1">
                  {olderActivities.slice(0, 5).map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-4 pt-4 border-t border-border-subtle">
          <Button variant="ghost" className="w-full text-sm text-foreground-subtle hover:text-foreground">
            <MoreHorizontal className="w-4 h-4 mr-2" />
            Load More Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}