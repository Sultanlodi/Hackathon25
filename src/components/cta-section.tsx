import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, ArrowRight, Users, TrendingUp, Shield } from "lucide-react";

interface CTASectionProps {
  onNavigate: (page: string) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit mx-auto bg-white/20 text-white border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Join the Revolution
            </Badge>
            <h2 className="text-3xl lg:text-5xl">
              Ready to Transform Your 
              <br />
              <span className="text-accent">Financial Future?</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of users who are already building wealth with Stacks' 
              AI-powered coaching and blockchain-secured transparency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-primary hover:bg-white/90" onClick={() => onNavigate("signup")}>
              Start Building Wealth
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-2xl text-white">10,000+</p>
                <p className="text-sm text-primary-foreground/80">Early adopters</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-2xl text-white">$50M+</p>
                <p className="text-sm text-primary-foreground/80">Assets under management</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-2xl text-white">100%</p>
                <p className="text-sm text-primary-foreground/80">Secure & transparent</p>
              </CardContent>
            </Card>
          </div>

          {/* Final Message */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-lg text-primary-foreground/80">
              <span className="text-accent">Stacks:</span> Making finance transparent, personal, and rewarding.
              <br />
              Let's build financial literacy and wealth for the next generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}