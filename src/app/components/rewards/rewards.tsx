import { useState } from 'react'
import { Sidebar } from '../dashboard/sidebar'
import { TopBar } from '../dashboard/top-bar'
import { TokenWalletCard } from './token-wallet-card'
import { RewardEventsTimeline } from './reward-events-timeline'
import { MilestoneSimulator } from './milestone-simulator'

export interface RewardEvent {
  id: string
  type: 'mint' | 'milestone' | 'goal_completion' | 'streak_bonus'
  amount: number
  timestamp: string
  description: string
  txHash: string
  milestone?: {
    goalTitle: string
    goalIcon: string
    milestoneNumber: number
    totalMilestones: number
  }
}

interface RewardsProps {
  onNavigate: (page: string) => void
}

const mockRewardEvents: RewardEvent[] = [
  {
    id: '1',
    type: 'milestone',
    amount: 50,
    timestamp: '2024-11-25T10:30:00Z',
    description: 'Emergency Fund - Milestone 3 reached',
    txHash: '0x742d35Cc6134C0532925a3b8D8C58F2L7ec47c9f',
    milestone: {
      goalTitle: 'Emergency Fund',
      goalIcon: '🛡️',
      milestoneNumber: 3,
      totalMilestones: 6,
    },
  },
  {
    id: '2',
    type: 'mint',
    amount: 25,
    timestamp: '2024-11-20T15:45:00Z',
    description: 'Weekly saving streak bonus',
    txHash: '0x8f3e7d5c2a91b4f6e8d9c7a5b3f1e2d4c6a8b9f7',
  },
  {
    id: '3',
    type: 'milestone',
    amount: 75,
    timestamp: '2024-11-15T09:20:00Z',
    description: 'House Down Payment - Milestone 4 reached',
    txHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    milestone: {
      goalTitle: 'House Down Payment',
      goalIcon: '🏠',
      milestoneNumber: 4,
      totalMilestones: 12,
    },
  },
  {
    id: '4',
    type: 'goal_completion',
    amount: 200,
    timestamp: '2024-10-15T14:30:00Z',
    description: 'Student Loan Payoff - Goal completed!',
    txHash: '0x9f8e7d6c5b4a39282716e5d4c3b2a1908f7e6d5c',
    milestone: {
      goalTitle: 'Student Loan Payoff',
      goalIcon: '🎓',
      milestoneNumber: 12,
      totalMilestones: 12,
    },
  },
  {
    id: '5',
    type: 'milestone',
    amount: 40,
    timestamp: '2024-10-01T11:15:00Z',
    description: 'European Vacation - Milestone 5 reached',
    txHash: '0x2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v',
    milestone: {
      goalTitle: 'European Vacation',
      goalIcon: '✈️',
      milestoneNumber: 5,
      totalMilestones: 8,
    },
  },
  {
    id: '6',
    type: 'mint',
    amount: 30,
    timestamp: '2024-09-25T16:20:00Z',
    description: 'Monthly budget adherence bonus',
    txHash: '0x3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w',
  },
  {
    id: '7',
    type: 'milestone',
    amount: 50,
    timestamp: '2024-09-15T13:45:00Z',
    description: 'Emergency Fund - Milestone 2 reached',
    txHash: '0x4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x',
    milestone: {
      goalTitle: 'Emergency Fund',
      goalIcon: '🛡️',
      milestoneNumber: 2,
      totalMilestones: 6,
    },
  },
]

export function Rewards({ onNavigate }: RewardsProps) {
  const [activeSection, setActiveSection] = useState('rewards')
  const [rewardEvents, setRewardEvents] =
    useState<RewardEvent[]>(mockRewardEvents)
  const [tokenBalance] = useState(545) // Sum of all rewards
  const [walletAddress] = useState('0x742d35Cc61...2L7ec47c9f')

  const handleMilestoneReached = () => {
    const newEvent: RewardEvent = {
      id: Date.now().toString(),
      type: 'milestone',
      amount: 50,
      timestamp: new Date().toISOString(),
      description: 'Demo milestone - Simulated reward',
      txHash: '0x' + Math.random().toString(16).substr(2, 40),
      milestone: {
        goalTitle: 'Demo Goal',
        goalIcon: '🎯',
        milestoneNumber: 1,
        totalMilestones: 5,
      },
    }

    setRewardEvents((prev) => [newEvent, ...prev])
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        activeSection="rewards"
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Rewards Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Stacks Rewards</h1>
              <p className="text-foreground-subtle">
                Earn tokens for achieving financial milestones and building good
                habits.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Wallet & Simulator */}
              <div className="space-y-6">
                {/* Token Wallet Card */}
                <TokenWalletCard
                  balance={tokenBalance}
                  address={walletAddress}
                />

                {/* Milestone Simulator */}
                <MilestoneSimulator
                  onMilestoneReached={handleMilestoneReached}
                />
              </div>

              {/* Right Column - Events Timeline */}
              <div className="lg:col-span-2">
                <RewardEventsTimeline events={rewardEvents} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
