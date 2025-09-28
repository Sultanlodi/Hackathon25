import {
  DollarSign,
  PiggyBank,
  Target,
  Coins,
  TrendingUp,
  TrendingDown,
  Calendar,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'

interface KPICardsProps {
  isLoading: boolean
}

interface KPIData {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: any
  color: string
  subtitle: string
}

const kpiData: KPIData[] = [
  {
    id: 'budget',
    title: 'Budget Remaining',
    value: '$1,247.50',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'success',
    subtitle: 'This month',
  },
  {
    id: 'saved',
    title: 'Saved This Month',
    value: '$890.00',
    change: '+23.1%',
    trend: 'up',
    icon: PiggyBank,
    color: 'primary',
    subtitle: 'vs last month',
  },
  {
    id: 'milestone',
    title: 'Next Milestone',
    value: '12 days',
    change: 'Emergency Fund',
    trend: 'neutral',
    icon: Target,
    color: 'warning',
    subtitle: 'Goal completion',
  },
  {
    id: 'tokens',
    title: 'Token Balance',
    value: '3,847',
    change: '+127 today',
    trend: 'up',
    icon: Coins,
    color: 'accent',
    subtitle: 'WLY tokens',
  },
]

function KPICardSkeleton() {
  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4 rounded" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[120px] mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </CardContent>
    </Card>
  )
}

function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
  subtitle,
}: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: any
  color: string
  subtitle: string
}) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return 'text-success bg-success/10 border-success/20'
      case 'primary':
        return 'text-primary bg-primary/10 border-primary/20'
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20'
      case 'accent':
        return 'text-accent bg-accent/10 border-accent/20'
      default:
        return 'text-foreground bg-background-subtle border-border'
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-success" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-error" />
      case 'neutral':
        return <Calendar className="w-3 h-3 text-warning" />
    }
  }

  const getTrendBadgeVariant = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'success'
      case 'down':
        return 'error'
      case 'neutral':
        return 'warning'
    }
  }

  return (
    <Card
      variant="glass"
      className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground-subtle">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg border ${getColorClasses(color)}`}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-2">
            <Badge
              variant={getTrendBadgeVariant(trend)}
              className="text-xs px-2 py-1"
            >
              <div className="flex items-center gap-1">
                {getTrendIcon(trend)}
                {change}
              </div>
            </Badge>
          </div>
          <p className="text-xs text-foreground-muted">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPICards({ isLoading }: KPICardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <KPICardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <KPICard
          key={kpi.id}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          trend={kpi.trend}
          icon={kpi.icon}
          color={kpi.color}
          subtitle={kpi.subtitle}
        />
      ))}
    </div>
  )
}
