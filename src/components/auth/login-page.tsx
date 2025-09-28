import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { 
  Sparkles, 
  Mail, 
  ArrowLeft, 
  Shield, 
  Zap, 
  TrendingUp,
  CheckCircle,
  Star,
  Users,
  DollarSign
} from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for magic link
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    // Here you would send magic link email
    console.log("Magic link sent to:", email);
    
    // Navigate to dashboard after successful magic link
    onNavigate("dashboard");
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsGoogleLoading(false);
    // Here you would handle Google OAuth
    console.log("Google sign in");
    
    // Navigate to dashboard after successful Google sign in
    onNavigate("dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-between relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 primary-gradient opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-subtle to-background-muted" />
        
        <div className="relative z-10 p-12 space-y-12">
          {/* Header */}
          <div className="space-y-8">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("landing")}
              className="self-start p-0 h-auto hover:bg-transparent text-foreground-subtle hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="space-y-6">

              
              <div className="space-y-4">
                <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                  Welcome back to your
                  <br />
                  <span className="text-gradient">financial future</span>
                </h2>
                
                <p className="text-xl text-foreground-subtle leading-relaxed max-w-lg">
                  Continue your journey toward financial freedom with AI-powered 
                  coaching and blockchain-secured transparency.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Trusted by thousands</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl glass border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-success" />
                  <span className="font-medium text-sm">Bank-level Security</span>
                </div>
                <p className="text-xs text-foreground-subtle">Military-grade encryption</p>
              </div>
              
              <div className="p-4 rounded-xl glass border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">50K+ Users</span>
                </div>
                <p className="text-xs text-foreground-subtle">Building wealth daily</p>
              </div>
              
              <div className="p-4 rounded-xl glass border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-warning" />
                  <span className="font-medium text-sm">$2M+ Saved</span>
                </div>
                <p className="text-xs text-foreground-subtle">By our community</p>
              </div>
              
              <div className="p-4 rounded-xl glass border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-warning" />
                  <span className="font-medium text-sm">4.9★ Rating</span>
                </div>
                <p className="text-xs text-foreground-subtle">App Store & Google Play</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom testimonial */}
        <div className="relative z-10 p-12">
          <Card variant="glass" className="border border-border-subtle">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full primary-gradient flex items-center justify-center text-primary-foreground font-bold">
                  S
                </div>
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed">
                    "Wealthly helped me save $15,000 in my first year. The AI coach 
                    made it feel like a game!"
                  </p>
                  <div>
                    <p className="font-medium text-sm">Sarah Chen</p>
                    <p className="text-xs text-foreground-subtle">Software Engineer, SF</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel - Auth Card */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile header */}
          <div className="lg:hidden text-center space-y-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("landing")}
              className="self-start p-0 h-auto hover:bg-transparent mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 rounded-xl primary-gradient">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Wealthly</h1>
                <Badge variant="glass" className="text-xs mt-1">AI + Blockchain</Badge>
              </div>
            </div>
          </div>

          <Card variant="glass" className="border border-border-subtle shadow-2xl">
            <CardHeader className="space-y-4 text-center">
              <div className="space-y-2">
                <CardTitle className="text-2xl">Sign in to continue</CardTitle>
                <CardDescription>
                  Access your AI financial coach and start building wealth
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Sign In */}
              <Button 
                variant="outline" 
                className="w-full h-12 text-base border-border hover:border-border hover:bg-background-subtle transition-all duration-200"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <div className="w-4 h-4 mr-3 animate-spin border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-foreground-subtle font-medium">Or with email</span>
                </div>
              </div>

              {/* Email Magic Link */}
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-base bg-input border-input-border focus:border-ring"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base primary-gradient hover:primary-gradient-hover"
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
                      Sending magic link...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send magic link
                    </>
                  )}
                </Button>
              </form>

              {/* Privacy Note */}
              <div className="p-4 rounded-xl bg-background-subtle border border-border-subtle">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-foreground">Secure & Private</p>
                    <p className="text-xs text-foreground-subtle leading-relaxed">
                      Bank linking via Plaid. We never store credentials.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sign up link */}
              <div className="text-center text-sm">
                <span className="text-foreground-subtle">Don't have an account? </span>
                <Button 
                  variant="link" 
                  className="px-0 text-sm font-medium text-primary hover:text-primary"
                  onClick={() => onNavigate("signup")}
                >
                  Sign up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}