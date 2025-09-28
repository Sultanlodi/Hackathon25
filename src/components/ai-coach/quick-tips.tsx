import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Sparkles } from "lucide-react";

interface QuickTip {
  id: string;
  label: string;
  icon: string;
}

interface QuickTipsProps {
  tips: QuickTip[];
  onTipClick: (tipId: string) => void;
}

export function QuickTips({ tips, onTipClick }: QuickTipsProps) {
  return (
    <div className="p-4 border-b border-border-subtle bg-background-subtle/30">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium">Quick Tips</h3>
        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
          Popular
        </Badge>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {tips.map((tip) => (
          <Button
            key={tip.id}
            variant="outline"
            size="sm"
            onClick={() => onTipClick(tip.id)}
            className="h-8 px-3 text-xs bg-card hover:bg-background-subtle border-border hover:border-primary/20 transition-colors group"
          >
            <span className="mr-2 group-hover:scale-110 transition-transform">
              {tip.icon}
            </span>
            {tip.label}
          </Button>
        ))}
      </div>
      
      <p className="text-xs text-foreground-muted mt-2">
        Click any topic to get personalized advice based on your financial data
      </p>
    </div>
  );
}