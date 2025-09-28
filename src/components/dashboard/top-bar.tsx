import { useState } from 'react'
import {
  Bell,
  Search,
  Wallet,
  ChevronDown,
  Settings,
  HelpCircle,
  Zap,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Card } from '../ui/card'

interface TopBarProps {
  onNavigate?: (page: string) => void
}

export function TopBar({ onNavigate }: TopBarProps) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState('0x1234...5678')

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected)
  }

  return (
    <header className="h-16 bg-background border-b border-border-subtle flex items-center justify-between px-6">
      {/* Left Section - Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
          <Input
            placeholder="Search transactions, goals..."
            className="pl-10 bg-background-subtle border-border hover:border-ring focus:border-ring"
          />
        </div>
      </div>

      {/* Center Section - Page Title */}
      <div className="flex-1 text-center">
        <p className="text-sm text-foreground-subtle text-[16px] font-[SF_Pro]">
          Welcome back, John
        </p>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        {/* Wallet Connect */}
        <Card variant="glass" className="px-3 py-2">
          <Button
            variant={isWalletConnected ? 'default' : 'outline'}
            size="sm"
            onClick={handleWalletConnect}
            className={isWalletConnected ? 'primary-gradient' : ''}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isWalletConnected ? (
              <span className="flex items-center gap-2">
                {walletAddress}
                <Badge variant="success" className="text-xs px-1 py-0.5">
                  Connected
                </Badge>
              </span>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        </Card>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge
                variant="error"
                className="absolute -top-1 -right-1 w-2 h-2 p-0 flex items-center justify-center"
              >
                <span className="sr-only">3 notifications</span>
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">
                3
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-3 p-3">
              <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Goal Achievement!</p>
                <p className="text-xs text-foreground-subtle">
                  You've reached 75% of your emergency fund goal
                </p>
                <p className="text-xs text-foreground-muted">2 hours ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3">
              <div className="w-2 h-2 rounded-full bg-warning mt-2 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Budget Alert</p>
                <p className="text-xs text-foreground-subtle">
                  You've spent 80% of your dining budget
                </p>
                <p className="text-xs text-foreground-muted">1 day ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">New Reward</p>
                <p className="text-xs text-foreground-subtle">
                  You earned 50 STX tokens for consistent saving
                </p>
                <p className="text-xs text-foreground-muted">2 days ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
