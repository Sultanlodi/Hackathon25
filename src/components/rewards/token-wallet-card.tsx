import { useState } from 'react'
import {
  Wallet,
  Copy,
  CheckCircle,
  ExternalLink,
  Coins,
  TrendingUp,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'

interface TokenWalletCardProps {
  balance: number
  address: string
}

export function TokenWalletCard({ balance, address }: TokenWalletCardProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)

  // Mock values for demonstration
  const usdValue = balance * 0.75 // Assuming 1 token = $0.75
  const monthlyEarnings = 125
  const totalEarnings = 545

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `0x742d35Cc6134C0532925a3b8D8C58F2L7ec47c9f`
      )
      setIsCopied(true)
      toast.success('Wallet address copied to clipboard')
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy address')
    }
  }

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible)
  }

  const formatBalance = (amount: number) => {
    if (!isBalanceVisible) return '•••••'
    return amount.toLocaleString()
  }

  const formatUSD = (amount: number) => {
    if (!isBalanceVisible) return '•••••'
    return `$${amount.toFixed(2)}`
  }

  return (
    <Card variant="glass" className="relative overflow-hidden group">
      {/* Background gradient - Grey to Purple blend with shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-700/70 to-purple-600/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/20 to-purple-400/30" />
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      {/* Color transition line */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-zinc-700/0 via-purple-500/60 to-purple-600/0 opacity-40"
        style={{ clipPath: 'polygon(0 40%, 100% 60%, 100% 65%, 0 45%)' }}
      />

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            Stacks Token
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-success/10 text-success border-success/20"
          >
            <Coins className="w-3 h-3 mr-1" />
            STX
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Balance Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-subtle">
              Token Balance
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBalanceVisibility}
              className="h-6 w-6 p-0"
            >
              {isBalanceVisible ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
            </Button>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {formatBalance(balance)}
              </span>
              <span className="text-sm text-foreground-muted">STX</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground-subtle">
                ≈ {formatUSD(usdValue)}
              </span>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="space-y-2">
          <span className="text-sm text-foreground-subtle">Wallet Address</span>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-background-subtle border">
            <span className="text-sm font-mono text-foreground-muted flex-1">
              {address}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="h-6 w-6 p-0"
            >
              {isCopied ? (
                <CheckCircle className="w-3 h-3 text-success" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <p className="text-xs text-foreground-muted">This Month</p>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                {formatBalance(monthlyEarnings)}
              </span>
              <span className="text-xs text-foreground-muted">STX</span>
            </div>
            <p className="text-xs text-success">+23% vs last month</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-foreground-muted">Total Earned</p>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                {formatBalance(totalEarnings)}
              </span>
              <span className="text-xs text-foreground-muted">STX</span>
            </div>
            <p className="text-xs text-foreground-subtle">Since joining</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </Button>
          <Button variant="outline" size="sm">
            <Coins className="w-4 h-4 mr-2" />
            Trade Tokens
          </Button>
        </div>

        {/* Token Info */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Token Utility
            </span>
          </div>
          <p className="text-xs text-foreground-subtle">
            Use STX tokens to unlock premium features, access exclusive
            financial courses, or exchange for real rewards and discounts.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
