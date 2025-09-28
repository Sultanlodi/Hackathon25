import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, Shield, Coins, TrendingUp, MessageCircle, Target, Award, PieChart } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Financial Coach",
      description: "Get personalized budgets, investment strategies, and financial education through conversational AI guidance.",
      badge: "AI Powered",
      badgeColor: "bg-blue-100 text-blue-800",
      items: [
        "Conversational financial guidance",
        "Personalized budgets & strategies", 
        "Real-time spending analysis",
        "Educational content delivery"
      ]
    },
    {
      icon: Shield,
      title: "Blockchain Transparency", 
      description: "Smart contracts enforce savings goals while providing immutable records of all recommendations and transactions.",
      badge: "Blockchain",
      badgeColor: "bg-green-100 text-green-800",
      items: [
        "Smart contract goal enforcement",
        "Immutable recommendation records",
        "Transparent fee structures",
        "Decentralized trust system"
      ]
    },
    {
      icon: Coins,
      title: "Tokenized Rewards",
      description: "Earn tokens for achieving financial milestones and redeem them for discounts, cashback, or staking opportunities.",
      badge: "Gamified",
      badgeColor: "bg-purple-100 text-purple-800",
      items: [
        "Milestone-based token rewards",
        "Redeemable for real benefits",
        "Staking opportunities",
        "Achievement system"
      ]
    },
    {
      icon: TrendingUp,
      title: "Micro-Investing",
      description: "Access fractionalized, blockchain-secured investments that make wealth-building inclusive and beginner-friendly.",
      badge: "Investing",
      badgeColor: "bg-orange-100 text-orange-800",
      items: [
        "Fractionalized asset investing",
        "Blockchain-secured portfolios",
        "Beginner-friendly interface",
        "Low minimum investments"
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="w-fit mx-auto">
            Core Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Everything You Need to Build <span className="text-gradient">Wealth</span>
          </h2>
          <p className="text-xl text-foreground-subtle max-w-3xl mx-auto">
            Wealthly combines cutting-edge AI with blockchain technology to deliver 
            a comprehensive financial education and wealth-building platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="glass" className="hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl primary-gradient">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <Badge variant="glass">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground-subtle">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: MessageCircle, label: "24/7 AI Support" },
            { icon: Target, label: "Goal Tracking" },
            { icon: Award, label: "Achievement System" },
            { icon: PieChart, label: "Portfolio Analytics" }
          ].map((item, index) => (
            <Card key={index} variant="glass" className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}