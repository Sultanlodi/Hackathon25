import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Sparkles, Menu } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

interface HeaderProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#journey' },
    { name: 'About', href: '#about' },
  ]

  const handleSmoothScroll = (href: string) => {
    const targetId = href.substring(1) // Remove the # symbol
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80 // Account for fixed header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 rounded-lg primary-gradient">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold">Stacks</span>
              <Badge variant="glass" className="text-xs backdrop-blur-lg">
                AI + Blockchain
              </Badge>
            </div>
          </button>

          {/* Desktop Navigation - only show on landing page */}
          {currentPage === 'landing' && (
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSmoothScroll(item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          )}

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('login')}
            >
              Login
            </Button>
            <Button size="sm" onClick={() => onNavigate('signup')}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 bg-background/90 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-6 pt-6">
                {currentPage === 'landing' && (
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleSmoothScroll(item.href)
                          setIsOpen(false)
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>
                )}
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsOpen(false)
                      onNavigate('login')
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                      onNavigate('signup')
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
