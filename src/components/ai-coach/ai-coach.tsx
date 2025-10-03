import { useState, useEffect, useRef } from 'react'
import { Sidebar } from '../dashboard/sidebar'
import { TopBar } from '../dashboard/top-bar'
import { ChatMessages } from './chat-messages'
import { ChatComposer } from './chat-composer'
import { BudgetPanel } from './budget-panel'

export interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: string
  isTyping?: boolean
}

interface AICoachProps {
  onNavigate: (page: string) => void
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'assistant',
    content:
      "Hi! I'm your AI financial coach. I'm here to help you make smarter financial decisions, optimize your budget, and reach your goals faster. What would you like to work on today?",
    timestamp: new Date().toISOString(),
  },
]

export function AICoach({ onNavigate }: AICoachProps) {
  const [activeSection, setActiveSection] = useState('coach')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Call the Gemini API
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationHistory: messages.slice(-6), // Send last 6 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content:
          data.response ||
          "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error calling AI API:', error)

      // Show error message to user
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection="coach"
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top Bar */}
        <TopBar onNavigate={onNavigate} />

        {/* Chat Content */}
        <div className="flex-1 flex h-full overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-border-subtle flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-base">🤖</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">AI Financial Coach</h1>
                  <p className="text-xs text-foreground-subtle">
                    Your personal guide to smarter financial decisions
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-2 text-xs text-success">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <ChatMessages messages={messages} isTyping={isTyping} />
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Composer - Fixed at bottom */}
            <div className="flex-shrink-0">
              <ChatComposer onSendMessage={handleSendMessage} />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-72 border-l border-border-subtle flex-shrink-0">
            <BudgetPanel onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </div>
  )
}
