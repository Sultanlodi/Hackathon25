import { useState } from 'react'
import {
  Target,
  Sparkles,
  Loader2,
  CheckCircle,
  Gift,
  Info,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'

interface MilestoneSimulatorProps {
  onMilestoneReached: () => void
}

export function MilestoneSimulator({
  onMilestoneReached,
}: MilestoneSimulatorProps) {
  const [isSimulating, setIsSimulating] = useState(false)
  const [lastSimulated, setLastSimulated] = useState<Date | null>(null)

  const handleMarkMilestone = async () => {
    setIsSimulating(true)

    try {
      // Simulate blockchain transaction delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onMilestoneReached()
      setLastSimulated(new Date())
      toast.success('Demo milestone completed! 50 STX tokens earned.')
    } catch (error) {
      toast.error('Failed to simulate milestone')
    } finally {
      setIsSimulating(false)
    }
  }

  const formatLastSimulated = () => {
    if (!lastSimulated) return null
    return lastSimulated.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card variant="glass" className="border-dashed border-2 border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="w-4 h-4 text-primary" />
          </div>
          Milestone Simulator
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Demo Notice */}
        <div className="p-3 rounded-lg bg-info/5 border border-info/20">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-info font-medium mb-1">Demo Mode</p>
              <p className="text-xs text-foreground-subtle">
                This simulates reaching a milestone and earning reward tokens.
                In the real app, milestones are automatically detected.
              </p>
            </div>
          </div>
        </div>

        {/* Simulation Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-background-subtle/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Gift className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground-muted">Reward</span>
            </div>
            <p className="font-semibold">50 STX</p>
          </div>

          <div className="text-center p-3 rounded-lg bg-background-subtle/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground-muted">Type</span>
            </div>
            <p className="font-semibold text-sm">Milestone</p>
          </div>
        </div>

        {/* Last Simulated */}
        {lastSimulated && (
          <div className="p-2 rounded-lg bg-success/5 border border-success/20">
            <div className="flex items-center justify-center gap-2 text-xs">
              <CheckCircle className="w-3 h-3 text-success" />
              <span className="text-success">
                Last simulated at {formatLastSimulated()}
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleMarkMilestone}
          disabled={isSimulating}
          className="w-full primary-gradient hover:primary-gradient-hover"
        >
          {isSimulating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Mark Milestone Reached
            </>
          )}
        </Button>

        {/* Note */}
        <p className="text-xs text-center text-foreground-muted italic">
          Demo: milestone simulated
        </p>
      </CardContent>
    </Card>
  )
}
