import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Shield,
  Gift,
  Brain,
  Coins,
  Zap,
  CheckCircle,
  Star,
  Users,
} from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

interface SignupPageProps {
  onNavigate: (page: string) => void
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAgreementChange = (field: string, checked: boolean) => {
    setAgreements((prev) => ({
      ...prev,
      [field]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    // Here you would typically handle the signup logic
    console.log('Signup submitted:', { formData, agreements })

    // Navigate to dashboard after successful signup
    onNavigate('dashboard')
  }

  const benefits = [
    {
      icon: Brain,
      title: 'AI Financial Coach',
      description: 'Get personalized financial advice 24/7',
    },
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Your data protected by cutting-edge technology',
    },
    {
      icon: Coins,
      title: 'Tokenized Rewards',
      description: 'Earn tokens for achieving financial goals',
    },
    {
      icon: Gift,
      title: 'Welcome Bonus',
      description: 'Get 100 tokens when you complete setup',
    },
  ]

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
              onClick={() => onNavigate('landing')}
              className="self-start p-0 h-auto hover:bg-transparent text-foreground-subtle hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                  Start building your
                  <br />
                  <span className="text-gradient">financial future</span> today
                </h2>

                <p className="text-xl text-foreground-subtle leading-relaxed max-w-lg">
                  Join thousands of users who are already transforming their
                  financial habits with Wealthly's AI-powered platform.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Why choose Wealthly?</h3>
            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl glass border border-border-subtle"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg primary-gradient">
                      <benefit.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{benefit.title}</p>
                      <p className="text-xs text-foreground-subtle leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="space-y-6">
            <Card variant="glass" className="border border-border-subtle">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full primary-gradient flex items-center justify-center text-primary-foreground font-bold">
                    M
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed">
                      "Wealthly's AI coach helped me build an emergency fund in
                      just 6 months. The blockchain rewards made saving actually
                      fun!"
                    </p>
                    <div>
                      <p className="font-medium text-sm">Michael Rodriguez</p>
                      <p className="text-xs text-foreground-subtle">
                        Marketing Manager, NYC
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Panel - Signup Card */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-start justify-center p-6 lg:p-12 pt-24 lg:pt-32">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile header */}
          <div className="lg:hidden text-center space-y-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate('landing')}
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
                <Badge variant="glass" className="text-xs mt-1">
                  AI + Blockchain
                </Badge>
              </div>
            </div>
          </div>

          <Card
            variant="glass"
            className="border border-border-subtle shadow-2xl"
          >
            <CardHeader className="space-y-4 text-center">
              <div className="space-y-2">
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>
                  Start your journey to financial freedom with AI-powered
                  coaching
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange('firstName', e.target.value)
                        }
                        className="pl-10 h-12 text-base bg-input border-input-border focus:border-ring"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange('lastName', e.target.value)
                      }
                      className="h-12 text-base bg-input border-input-border focus:border-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="pl-10 h-12 text-base bg-input border-input-border focus:border-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange('password', e.target.value)
                      }
                      className="pl-10 pr-10 h-12 text-base bg-input border-input-border focus:border-ring"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-foreground-subtle" />
                      ) : (
                        <Eye className="w-4 h-4 text-foreground-subtle" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange('confirmPassword', e.target.value)
                      }
                      className="pl-10 pr-10 h-12 text-base bg-input border-input-border focus:border-ring"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-foreground-subtle" />
                      ) : (
                        <Eye className="w-4 h-4 text-foreground-subtle" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreements.terms}
                      onCheckedChange={(checked: boolean) =>
                        handleAgreementChange('terms', checked)
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{' '}
                      <Button
                        variant="link"
                        className="px-0 text-sm h-auto font-medium text-primary"
                      >
                        Terms of Service
                      </Button>{' '}
                      and{' '}
                      <Button
                        variant="link"
                        className="px-0 text-sm h-auto font-medium text-primary"
                      >
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={(checked: boolean) =>
                        handleAgreementChange('privacy', checked)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="privacy"
                      className="text-sm leading-relaxed"
                    >
                      I acknowledge that Wealthly is not meant for collecting
                      PII or securing sensitive data beyond what's necessary for
                      financial coaching
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={agreements.marketing}
                      onCheckedChange={(checked: boolean) =>
                        handleAgreementChange('marketing', checked)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="marketing"
                      className="text-sm leading-relaxed"
                    >
                      I'd like to receive updates about new features and
                      financial tips (optional)
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base primary-gradient hover:primary-gradient-hover"
                  disabled={
                    isLoading || !agreements.terms || !agreements.privacy
                  }
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-foreground-subtle font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-12 text-base border-border hover:border-border hover:bg-background-subtle transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              {/* Privacy Note */}
              <div className="p-4 rounded-xl bg-background-subtle border border-border-subtle">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-foreground">
                      Secure & Private
                    </p>
                    <p className="text-xs text-foreground-subtle leading-relaxed">
                      Bank linking via Plaid. We never store credentials.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm">
                <span className="text-foreground-subtle">
                  Already have an account?{' '}
                </span>
                <Button
                  variant="link"
                  className="px-0 text-sm font-medium text-primary hover:text-primary"
                  onClick={() => onNavigate('login')}
                >
                  Sign in
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
