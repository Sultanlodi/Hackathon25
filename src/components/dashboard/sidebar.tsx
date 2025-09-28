import { 
  LayoutDashboard, 
  Link2, 
  PieChart, 
  Target, 
  Gift, 
  Bot,
  Sparkles,
  LogOut,
  Settings,
  ChevronLeft
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard", 
    icon: LayoutDashboard,
    badge: null
  },
  {
    id: "link",
    label: "Link Accounts",
    icon: Link2,
    badge: null
  },
  {
    id: "budget",
    label: "Budget",
    icon: PieChart,
    badge: null
  },
  {
    id: "goals",
    label: "Goals",
    icon: Target,
    badge: "3"
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: Gift,
    badge: "NEW"
  },
  {
    id: "coach",
    label: "AI Coach",
    icon: Bot,
    badge: null
  }
];

export function Sidebar({ activeSection, onSectionChange, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-background-subtle border-r border-border-subtle flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl primary-gradient">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Stacks</h1>
            <p className="text-xs text-foreground-subtle">AI Financial Coach</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                isActive 
                  ? "primary-gradient text-primary-foreground shadow-md" 
                  : "hover:bg-background-muted"
              }`}
              onClick={() => {
                if (item.id === "dashboard") {
                  onNavigate("dashboard");
                } else if (item.id === "link") {
                  onNavigate("bank-linking");
                } else if (item.id === "budget") {
                  onNavigate("budget");
                } else if (item.id === "goals") {
                  onNavigate("goals");
                } else if (item.id === "rewards") {
                  onNavigate("rewards");
                } else if (item.id === "coach") {
                  onNavigate("ai-coach");
                } else if (item.id === "settings") {
                  onNavigate("settings");
                } else {
                  onSectionChange(item.id);
                }
              }}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant={item.badge === "NEW" ? "success" : "secondary"} 
                  className="ml-2 text-xs px-2 py-0.5"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>
      
      <Separator className="mx-4" />
      
      {/* User Section */}
      <div className="p-4 space-y-3">
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">John Doe</p>
              <p className="text-xs text-foreground-subtle truncate">Premium Member</p>
            </div>
          </div>
        </Card>
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start h-10"
            onClick={() => onNavigate("settings")}
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start h-10 text-foreground-subtle hover:text-foreground"
            onClick={() => onNavigate("landing")}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Collapse Button */}
      <div className="p-4 border-t border-border-subtle">
        <Button variant="ghost" className="w-full justify-center h-10">
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}