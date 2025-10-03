import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Sparkles, Brain, Shield } from 'lucide-react'

interface HeroSectionProps {
  onNavigate: (page: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 pt-16 pb-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="w-4 h-4 mr-2" />
                AI + Blockchain Revolution
              </Badge>
              <h1 className="text-4xl lg:text-6xl tracking-tight">
                Make saving stick
                <br />
                <span className="text-gradient">with AI + on-chain</span>
                <br />
                rewards
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform your financial future with personalized AI coaching,
                blockchain transparency, and tokenized rewards that make
                building wealth engaging and sustainable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => onNavigate('signup')}
              >
                Get Started →
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                See How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-success"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-success"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-success"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Instant rewards</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-8 bg-white/10 rounded-3xl blur-[80px] opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="absolute -inset-6 bg-white/8 rounded-3xl blur-[60px] opacity-45 animate-pulse-slow"></div>
            <div className="absolute -inset-4 bg-gradient-to-br from-white/6 via-white/3 to-white/6 rounded-3xl blur-[40px] opacity-50"></div>
            <div
              className="relative bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-glass-border"
              style={{
                boxShadow:
                  '0 0 60px rgba(255, 255, 255, 0.15), 0 0 100px rgba(255, 255, 255, 0.1), 0 0 140px rgba(255, 255, 255, 0.05)',
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758519292135-2af0ad50f552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhcHAlMjBzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc1ODk1MDcxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Stacks Financial App"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
