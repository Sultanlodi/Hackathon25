import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CreditCard, Brain, Target, Coins, TrendingUp, ArrowRight } from "lucide-react";

export function UserJourneySection() {
  const steps = [
    {
      number: "01",
      icon: CreditCard,
      title: "Connect Your Accounts",
      description: "Securely link your bank accounts and credit cards for comprehensive financial analysis.",
      detail: "Bank-level encryption ensures your data stays safe"
    },
    {
      number: "02", 
      icon: Brain,
      title: "AI Reviews & Suggests",
      description: "Our AI coach analyzes your spending patterns and creates a personalized budget plan.",
      detail: "Get insights into spending habits and optimization opportunities"
    },
    {
      number: "03",
      icon: Target,
      title: "Set Smart Goals",
      description: "Commit to savings goals through smart contracts that automatically enforce your commitments.",
      detail: "Blockchain ensures accountability and transparency"
    },
    {
      number: "04",
      icon: Coins,
      title: "Earn Reward Tokens",
      description: "Hit milestones and earn tokens that can be redeemed for real benefits and discounts.",
      detail: "Gamification makes saving fun and rewarding"
    },
    {
      number: "05",
      icon: TrendingUp,
      title: "Invest & Grow",
      description: "Use tokens or fiat to invest in fractionalized assets and build your wealth portfolio.",
      detail: "Start with any amount - no minimum investment barriers"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            User Journey
          </Badge>
          <h2 className="text-3xl lg:text-4xl">
            Your Path to <span className="text-primary">Financial Freedom</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our simple 5-step process to transform your financial habits 
            and start building wealth with AI guidance and blockchain security.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-16 bg-primary/20 z-0"></div>
              )}
              
              <Card className="relative z-10 border-2 hover:border-primary/30 transition-colors">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-12 gap-6 items-center">
                    {/* Step Number & Icon */}
                    <div className="md:col-span-2 flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                        {step.number}
                      </div>
                      <div className="p-3 rounded-xl bg-primary/10">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-8 space-y-3">
                      <h3 className="text-xl">{step.title}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                      <p className="text-sm text-primary">
                        {step.detail}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-2 flex justify-center">
                      {index < steps.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-primary/60" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="text-lg px-8">
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
}