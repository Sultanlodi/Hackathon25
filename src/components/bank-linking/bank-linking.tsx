import { useState } from 'react'
import { Sidebar } from '../dashboard/sidebar'
import { TopBar } from '../dashboard/top-bar'
import { PlaidLinkCard } from './plaid-link-card'
import { TransactionsList } from './transactions-list'
import { EmptyState } from './empty-state'

interface BankLinkingProps {
  onNavigate: (page: string) => void
}

export function BankLinking({ onNavigate }: BankLinkingProps) {
  const [activeSection, setActiveSection] = useState('link')
  const [isLinked, setIsLinked] = useState(false)
  const [isLinking, setIsLinking] = useState(false)

  const handlePlaidConnect = async () => {
    setIsLinking(true)

    // Simulate Plaid connection process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsLinked(true)
    setIsLinking(false)
  }

  const handleDisconnect = () => {
    setIsLinked(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        activeSection="link"
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Bank Linking Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Link Your Accounts</h1>
            <p className="text-foreground-subtle">
              Securely connect your bank accounts to start tracking your
              finances with AI-powered insights.
            </p>
          </div>

          {/* Plaid Link Card */}
          <PlaidLinkCard
            isLinked={isLinked}
            isLinking={isLinking}
            onConnect={handlePlaidConnect}
            onDisconnect={handleDisconnect}
          />

          {/* Content based on linking status */}
          {isLinked ? <TransactionsList /> : <EmptyState />}
        </main>
      </div>
    </div>
  )
}
