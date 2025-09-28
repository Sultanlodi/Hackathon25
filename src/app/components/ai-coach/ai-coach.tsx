import { useState, useEffect, useRef } from "react";
import { Sidebar } from "../dashboard/sidebar";
import { TopBar } from "../dashboard/top-bar";
import { ChatMessages } from "./chat-messages";
import { ChatComposer } from "./chat-composer";
import { BudgetPanel } from "./budget-panel";

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

interface AICoachProps {
  onNavigate: (page: string) => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    type: "assistant",
    content: "Hi! I'm your AI financial coach. I'm here to help you make smarter financial decisions, optimize your budget, and reach your goals faster. What would you like to work on today?",
    timestamp: new Date().toISOString(),
  }
];



export function AICoach({ onNavigate }: AICoachProps) {
  const [activeSection, setActiveSection] = useState("coach");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };



  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("dining") || message.includes("food")) {
      return `Great question about dining expenses! I've analyzed your recent transactions and noticed you're spending about $380/month on dining out. Here are some personalized strategies:

**Quick Wins:**
• Try the "50/30/20 rule" for dining: 50% groceries, 30% planned dining out, 20% spontaneous treats
• Consider meal prepping on Sundays - you could save $120-150/month
• Use apps like Honey or Rakuten for restaurant discounts

**Based on your spending patterns:**
• You frequent lunch spots near work - bringing lunch 3 days a week could save $240/month
• Weekend brunch spending averages $65 - try alternating with home cooking

**Goal Integration:**
Since you're working toward your emergency fund goal, redirecting just $100/month from dining could help you reach your milestone 2 months faster!

Would you like me to create a specific meal planning strategy or help you set dining budget alerts?`;
    }
    
    if (message.includes("bills") || message.includes("lower")) {
      return `Let's optimize your monthly bills! I see several opportunities based on your transaction history:

**Immediate Actions (Potential Monthly Savings):**
• **Phone/Internet Bundle:** Switch to a bundled plan - save ~$25-40/month
• **Streaming Services:** You have 4 active subscriptions - consider rotating or family plans - save ~$15-25/month  
• **Insurance Review:** Shop around for auto/renters insurance - potential ~$30-50/month savings

**Energy Efficiency:**
• Your electricity bill varies significantly ($85-$140) - consider a programmable thermostat
• Switch to LED bulbs and unplug devices when not in use

**Subscription Audit:**
I noticed these recurring charges:
• Netflix ($15.49), Spotify ($9.99), Adobe ($20.99), Gym membership ($89)
• Consider: Family Spotify plan, annual Adobe discount, or local gym alternatives

**Total Potential Savings:** $70-115/month

This could accelerate your goals significantly! Should I help you prioritize which bills to tackle first?`;
    }
    
    if (message.includes("emergency") || message.includes("fund")) {
      return `Excellent priority setting up an emergency fund! Based on your current income and expenses, here's your personalized emergency fund strategy:

**Your Target Emergency Fund:** $4,500-6,000
• This covers 3-4 months of your essential expenses ($1,500/month)
• Start with a goal of $1,000 for immediate peace of mind

**Step-by-Step Plan:**
1. **Quick Start (Month 1):** Save $500 from your next paycheck
2. **Automation:** Set up automatic transfer of $150/week to high-yield savings
3. **Boost Strategy:** Redirect dining savings ($100/month) directly to emergency fund

**Where to Keep It:**
• High-yield savings account (currently 4.5-5% APY)
• Keep it separate from checking to avoid temptation
• Consider Marcus, Ally, or Capital One 360

**Timeline to $1,000:** 6-8 weeks with current plan
**Timeline to Full Fund:** 8-10 months

**Smart Tips:**
• Use windfalls (tax refund, bonuses) to jump-start
• Round up purchases to nearest $5 and save the difference
• Try a no-spend week monthly and add those savings

I can help you set up automatic transfers and track progress. Want me to create milestone reminders?`;
    }

    // Default responses for other topics
    const responses = [
      `I understand you're looking for guidance on this topic. Based on your financial profile and current goals, here are some personalized recommendations:

Your current monthly cash flow shows positive momentum, which puts you in a great position to optimize this area. I've analyzed your transaction patterns and spending habits to provide targeted advice.

**Key Insights:**
• Your spending discipline has improved 23% over the last 3 months
• You're consistently hitting your savings targets
• There's room for optimization in a few key categories

**Recommended Next Steps:**
1. **Immediate Action:** Focus on the highest-impact changes first
2. **Track Progress:** Set up automated monitoring for these changes  
3. **Review & Adjust:** Check in weekly to ensure you're on track

**Integration with Your Goals:**
This aligns perfectly with your current goals, especially your emergency fund milestone. Making these changes could accelerate your timeline by 4-6 weeks.

Would you like me to break down any of these recommendations into specific action items?`,

      `That's a smart question! Let me provide some tailored advice based on your current financial situation and goals.

Looking at your profile, you're in a strong position to tackle this effectively. Your consistent saving habits and improving budget discipline give you a solid foundation.

**Personalized Analysis:**
Your spending patterns show you're already making good decisions in most areas. The opportunity here is to optimize and get even better results from your efforts.

**Strategic Approach:**
• **Phase 1:** Implement the changes with the biggest immediate impact
• **Phase 2:** Fine-tune and optimize based on results
• **Phase 3:** Automate and maintain long-term

**Expected Impact:**
Based on similar profiles I've worked with, you could see meaningful improvements within 2-3 weeks of implementation.

This strategy complements your existing goals nicely and could help you reach your next milestone faster. Should we dive deeper into the implementation details?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

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
              <ChatMessages 
                messages={messages} 
                isTyping={isTyping}
              />
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
  );
}