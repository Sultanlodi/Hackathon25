import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Shield, 
  TrendingUp, 
  Target, 
  Zap,
  Bot,
  Coins,
  Trophy,
  Flame,
  ChevronRight,
  CheckCircle,
  BarChart3,
  PieChart,
  DollarSign,
  ArrowUpRight,
  MessageCircle,
  Gift,
  Star,
  Users,
  Award,
  Heart
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChatBubble, ChatContainer } from "./ui/chat-bubble";
import { ProgressRing } from "./ui/progress-ring";
import { FeaturesSection } from "./features-section";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-subtle to-background opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-8 lg:py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge variant="glass" className="w-fit">
                  <Sparkles className="w-3 h-3 mr-2" />
                  AI-Powered Financial Literacy
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Make saving stick with{" "}
                  <span className="text-gradient">AI + on-chain rewards</span>
                </h1>
                
                <p className="text-xl text-foreground-subtle leading-relaxed max-w-xl">
                  Transform your financial future with personalized AI coaching, blockchain transparency, 
                  and tokenized rewards that make building wealth engaging and sustainable.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-base px-8 py-4"
                  onClick={() => onNavigate("signup")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="glass" 
                  size="lg" 
                  className="text-base px-8 py-4"
                >
                  <Play className="mr-2 h-5 w-5" />
                  See How It Works
                </Button>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-foreground-subtle">No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-foreground-subtle">Bank-level security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-foreground-subtle">Instant rewards</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Dashboard Mock */}
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <Card variant="glass" className="relative overflow-hidden shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl primary-gradient">
                        <Sparkles className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-semibold">Wealthly Dashboard</span>
                    </div>
                    <Badge variant="success">Live</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Balance Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-background-subtle to-background-muted border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground-subtle">Total Balance</span>
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="text-3xl font-bold">$12,847.50</div>
                    <div className="text-sm text-success">+$247.50 this week</div>
                  </div>
                  
                  {/* Progress Rings */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <ProgressRing value={73} variant="success" size="md" showValue />
                      <p className="text-xs text-foreground-subtle mt-2">Emergency Fund</p>
                    </div>
                    <div className="text-center">
                      <ProgressRing value={45} variant="warning" size="md" showValue />
                      <p className="text-xs text-foreground-subtle mt-2">Vacation</p>
                    </div>
                    <div className="text-center">
                      <ProgressRing value={89} variant="gradient" size="md" showValue />
                      <p className="text-xs text-foreground-subtle mt-2">Investments</p>
                    </div>
                  </div>
                  
                  {/* Token Rewards */}
                  <div className="flex items-center justify-between p-3 rounded-xl glass">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-warning" />
                      <span className="font-medium">WLY Tokens</span>
                    </div>
                    <span className="font-bold">1,247</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* How It Works Section */}
      <section id="journey" className="py-20 lg:py-32 bg-background-subtle/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Your journey to <span className="text-gradient">financial freedom</span>
            </h2>
            <p className="text-xl text-foreground-subtle max-w-3xl mx-auto">
              Follow our proven 5-step system to build lasting wealth habits with AI guidance and blockchain rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                step: "01",
                icon: <Shield className="w-8 h-8" />,
                title: "Connect Securely",
                description: "Link your bank accounts with bank-level encryption and Plaid integration"
              },
              {
                step: "02", 
                icon: <Bot className="w-8 h-8" />,
                title: "Meet Your AI Coach",
                description: "Get personalized financial advice tailored to your goals and spending patterns"
              },
              {
                step: "03",
                icon: <Target className="w-8 h-8" />,
                title: "Set Smart Goals",
                description: "Create SMART savings goals with blockchain-backed smart contracts"
              },
              {
                step: "04",
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Start Investing",
                description: "Begin micro-investing with AI-recommended portfolios and risk management"
              },
              {
                step: "05",
                icon: <Coins className="w-8 h-8" />,
                title: "Earn Rewards",
                description: "Collect WLY tokens for hitting milestones and building good habits"
              }
            ].map((item, index) => (
              <Card key={index} variant="glass" className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl primary-gradient text-primary-foreground mb-4">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">{item.step}</Badge>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-foreground-subtle leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline">Trust & Transparency</Badge>
                <h2 className="text-4xl font-bold">
                  Built on <span className="text-gradient">trust, powered by transparency</span>
                </h2>
                <p className="text-lg text-foreground-subtle leading-relaxed">
                  Your financial data is protected by military-grade encryption, while blockchain technology 
                  ensures complete transparency in your rewards and goal tracking. We partner with industry 
                  leaders to provide secure, regulated financial services.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Badge variant="glass" className="px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Bank-level Security
                </Badge>
                <Badge variant="glass" className="px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  FDIC Insured
                </Badge>
                <Badge variant="glass" className="px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Blockchain Verified
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card variant="glass" className="p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-400" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Polygon Network</h3>
                <p className="text-sm text-foreground-subtle">Ethereum-compatible blockchain for secure, fast transactions</p>
              </Card>
              
              <Card variant="glass" className="p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-400" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Plaid Integration</h3>
                <p className="text-sm text-foreground-subtle">Secure bank connectivity used by 11,000+ financial apps</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Coach Section */}
      <section className="py-20 lg:py-32 bg-background-subtle/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline">AI Financial Coach</Badge>
                <h2 className="text-4xl font-bold">
                  Meet your personal <span className="text-gradient">AI advisor</span>
                </h2>
                <p className="text-lg text-foreground-subtle leading-relaxed">
                  Get 24/7 personalized financial coaching powered by advanced AI. Our coach learns your habits, 
                  understands your goals, and provides actionable insights to accelerate your wealth building journey.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    title: "Smart Budget Analysis",
                    description: "AI analyzes your spending patterns and suggests optimized budget allocations"
                  },
                  {
                    icon: <PieChart className="w-5 h-5" />,
                    title: "Investment Recommendations", 
                    description: "Personalized portfolio suggestions based on your risk tolerance and goals"
                  },
                  {
                    icon: <Target className="w-5 h-5" />,
                    title: "Goal Achievement Tracking",
                    description: "Real-time progress monitoring with actionable steps to stay on track"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl glass">
                    <div className="p-2 rounded-lg primary-gradient text-primary-foreground shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-foreground-subtle">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card variant="glass" className="h-[500px] flex flex-col shadow-2xl">
              <CardHeader className="border-b border-border-subtle">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl primary-gradient">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">AI Financial Coach</CardTitle>
                    <CardDescription>Always here to help</CardDescription>
                  </div>
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  </div>
                </div>
              </CardHeader>
              
              <ChatContainer className="flex-1">
                <ChatBubble variant="assistant" name="AI Coach" timestamp="Just now">
                  Hi! I noticed you're spending 23% more on dining out this month. Would you like me to suggest some budget-friendly meal prep ideas to help you reach your emergency fund goal faster?
                </ChatBubble>
                
                <ChatBubble variant="user" name="You" timestamp="Just now">
                  Yes, that would be helpful!
                </ChatBubble>
                
                <ChatBubble variant="assistant" name="AI Coach" timestamp="Just now">
                  Great! Here are 3 personalized tips:
                  
                  💡 **Batch cooking Sundays**: Prep 5 meals for $35 vs $75 dining out
                  
                  💡 **Smart substitutions**: Replace 2 coffee shop visits with home brewing = $84/month saved
                  
                  💡 **30-day challenge**: Cook 20/30 days to boost your emergency fund by $240 extra this month
                  
                  Should I set reminders for these goals?
                </ChatBubble>
              </ChatContainer>
            </Card>
          </div>
        </div>
      </section>

      {/* Rewards & Gamification Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline">Rewards & Gamification</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Make saving <span className="text-gradient">fun and rewarding</span>
            </h2>
            <p className="text-xl text-foreground-subtle max-w-3xl mx-auto">
              Earn WLY tokens for every milestone you hit. Our gamified approach turns building wealth into an engaging journey with real rewards.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Token Balance Card */}
            <Card variant="glass" className="lg:col-span-2 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-6 h-6 text-warning" />
                    WLY Token Balance
                  </CardTitle>
                  <Badge variant="success">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +127 today
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gradient mb-2">3,847</div>
                  <p className="text-foreground-subtle">Total WLY Tokens Earned</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                    <div className="text-2xl font-bold text-success">+50</div>
                    <p className="text-xs text-foreground-subtle">Savings Goal</p>
                  </div>
                  <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="text-2xl font-bold text-warning">+25</div>
                    <p className="text-xs text-foreground-subtle">Daily Login</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">+100</div>
                    <p className="text-xs text-foreground-subtle">Investment</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl glass">
                  <span className="font-medium">Redeem for cash rewards</span>
                  <Button size="sm" variant="outline">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Streak & Achievements */}
            <div className="space-y-6">
              <Card variant="glass" className="shadow-xl">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Savings Streak</CardTitle>
                  <CardDescription>Keep the momentum going!</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">23</div>
                  <p className="text-foreground-subtle mb-4">Days in a row</p>
                  <Badge variant="warning" className="px-4 py-2">
                    <Trophy className="w-3 h-3 mr-2" />
                    On Fire!
                  </Badge>
                </CardContent>
              </Card>
              
              <Card variant="glass" className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-base">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: <Target className="w-4 h-4" />, title: "Goal Crusher", desc: "Reached emergency fund milestone", tokens: "+200" },
                    { icon: <TrendingUp className="w-4 h-4" />, title: "Smart Investor", desc: "First investment made", tokens: "+150" },
                    { icon: <Star className="w-4 h-4" />, title: "Consistency King", desc: "14-day savings streak", tokens: "+100" }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg glass">
                      <div className="p-2 rounded-lg primary-gradient text-primary-foreground">
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-foreground-subtle truncate">{achievement.desc}</p>
                      </div>
                      <Badge variant="success" className="text-xs">{achievement.tokens}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-background-subtle/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="mb-4">
              About Wealthly
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Our mission is to make <span className="text-gradient">wealth accessible</span>
            </h2>
            <p className="text-xl text-foreground-subtle max-w-3xl mx-auto">
              We believe everyone deserves the tools and knowledge to build lasting wealth. Wealthly combines cutting-edge AI with blockchain transparency to democratize financial literacy.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Why we exist</h3>
                <p className="text-lg text-foreground-subtle leading-relaxed">
                  Traditional financial education is broken. It's boring, one-size-fits-all, and disconnected from real behavior change. Meanwhile, Gen Z craves personalized, engaging experiences but lacks the financial knowledge to build lasting wealth.
                </p>
                <p className="text-lg text-foreground-subtle leading-relaxed">
                  Wealthly bridges this gap by making financial literacy engaging, transparent, and rewarding through AI-powered coaching and blockchain-verified achievements.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-xl glass">
                  <div className="text-3xl font-bold text-gradient mb-2">50K+</div>
                  <p className="text-foreground-subtle">Users building wealth</p>
                </div>
                <div className="text-center p-6 rounded-xl glass">
                  <div className="text-3xl font-bold text-gradient mb-2">$2M+</div>
                  <p className="text-foreground-subtle">Collectively saved</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Our values</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <Heart className="w-5 h-5" />,
                    title: "Transparency First",
                    description: "Every recommendation, fee, and reward is recorded on-chain for complete transparency"
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    title: "Inclusive by Design", 
                    description: "Financial tools shouldn't be exclusive to the wealthy - we make wealth-building accessible to everyone"
                  },
                  {
                    icon: <Award className="w-5 h-5" />,
                    title: "Education Over Sales",
                    description: "We prioritize teaching financial literacy over selling products you don't need"
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: "Privacy Protected",
                    description: "Your financial data is yours - we use bank-level security and never sell your information"
                  }
                ].map((value, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl glass">
                    <div className="p-2 rounded-lg primary-gradient text-primary-foreground shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{value.title}</h4>
                      <p className="text-sm text-foreground-subtle">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          

        </div>
      </section>

      {/* Logos/Integrations Section */}
      <section className="py-20 bg-background-subtle/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4">Trusted by leading financial institutions</h3>
            <p className="text-foreground-subtle">Secure integrations with industry-leading partners</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[
              { name: "Plaid", logo: "🏦" },
              { name: "Polygon", logo: "⬢" },
              { name: "Ethereum", logo: "Ξ" },
              { name: "Stripe", logo: "💳" },
              { name: "AWS", logo: "☁️" },
              { name: "OpenAI", logo: "🤖" }
            ].map((partner, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <p className="text-sm text-foreground-subtle font-medium">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 primary-gradient opacity-5" />
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="glass" className="mb-4">
              <Sparkles className="w-3 h-3 mr-2" />
              Ready to Start?
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Your financial future starts <span className="text-gradient">today</span>
            </h2>
            <p className="text-xl text-foreground-subtle max-w-2xl mx-auto">
              Join thousands of users who are already building wealth with AI-powered insights and blockchain rewards. Start your journey to financial freedom now.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              className="text-lg px-12 py-6"
              onClick={() => onNavigate("signup")}
            >
              Start Building Wealth
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>

          </div>
          
          <div className="flex items-center justify-center gap-8 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground-subtle">Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground-subtle">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground-subtle">Instant setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-background-subtle/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl primary-gradient">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-gradient">Wealthly</span>
              </div>
              <p className="text-foreground-subtle mb-6 max-w-md">
                Empowering the next generation to build wealth through AI-powered financial literacy and blockchain transparency.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground-subtle">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground-subtle">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border-subtle mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-subtle">
              © 2025 Wealthly. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-foreground-subtle">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}