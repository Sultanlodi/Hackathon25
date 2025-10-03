import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Sparkles, Brain, Shield } from 'lucide-react'

interface HeroSectionProps {
  onNavigate: (page: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 pt-32 pb-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge variant="glass" className="w-fit mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                AI + Blockchain Revolution
              </Badge>
              <h1 className="text-5xl lg:text-6xl tracking-tight font-extrabold">
                Unlock Your
                <br />
                <span className="text-gradient">Financial Potential</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Your AI-powered financial coach with blockchain transparency.
                Build wealth, earn rewards, and master money management with
                gamified learning.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="xl"
                className="text-lg"
                onClick={() => onNavigate('signup')}
              >
                Start Building Wealth
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="text-lg bg-background/50"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">AI Coach</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Tokenized Rewards</span>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] group">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
            <div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden h-full border border-glass-border">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758519292135-2af0ad50f552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhcHAlMjBzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc1ODk1MDcxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Stacks Financial App"
                className="w-full h-full object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
