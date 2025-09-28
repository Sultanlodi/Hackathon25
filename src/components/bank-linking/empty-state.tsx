import { 
  Link2, 
  Shield, 
  Zap, 
  PieChart, 
  TrendingUp,
  Target,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const benefits = [
  {
    icon: PieChart,
    title: "Smart Categorization",
    description: "Automatically categorize your transactions with AI-powered insights"
  },
  {
    icon: TrendingUp,
    title: "Spending Analytics", 
    description: "Track your spending patterns and identify opportunities to save"
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Monitor progress towards your financial goals in real-time"
  },
  {
    icon: Shield,
    title: "Bank-level Security",
    description: "Your data is protected with the same security used by banks"
  }
];

export function EmptyState() {
  return (
    <div className="space-y-8">
      {/* Main Empty State Card */}
      <Card variant="glass" className="text-center py-12 px-6">
        <CardContent className="space-y-6">
          {/* Illustration */}
          <div className="mx-auto w-64 h-48 rounded-2xl overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1635261034787-e165213966e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBlbXB0eSUyMHN0YXRlJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1ODk5NTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Connect your bank accounts"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Content */}
          <div className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Connect Your Bank Account</h2>
            <p className="text-foreground-subtle leading-relaxed">
              Link your bank account to start tracking your finances with AI-powered insights. 
              Your data is encrypted and secure with bank-level protection.
            </p>
          </div>

          {/* Action */}
          <Button className="primary-gradient hover:primary-gradient-hover px-8 py-3 mx-auto">
            <Link2 className="w-4 h-4 mr-2" />
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} variant="glass" className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl primary-gradient shrink-0">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-foreground-subtle leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Facts */}
      <Card variant="glass" className="p-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-sm text-foreground-subtle">Supported Banks</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">256-bit</div>
            <p className="text-sm text-foreground-subtle">Encryption</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-warning mb-2">99.9%</div>
            <p className="text-sm text-foreground-subtle">Uptime</p>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <Card variant="glass" className="p-6">
        <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-sm">
          <div className="border-l-2 border-primary pl-4">
            <h4 className="font-medium mb-1">Is my banking information secure?</h4>
            <p className="text-foreground-subtle">
              Yes, we use Plaid's secure API which employs bank-level 256-bit encryption. 
              We never store your banking credentials.
            </p>
          </div>
          <div className="border-l-2 border-success pl-4">
            <h4 className="font-medium mb-1">Which banks are supported?</h4>
            <p className="text-foreground-subtle">
              We support over 10,000 financial institutions including all major banks, 
              credit unions, and investment accounts.
            </p>
          </div>
          <div className="border-l-2 border-warning pl-4">
            <h4 className="font-medium mb-1">Can I disconnect my account anytime?</h4>
            <p className="text-foreground-subtle">
              Absolutely. You can disconnect your account at any time from your settings. 
              This will stop all data synchronization immediately.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}