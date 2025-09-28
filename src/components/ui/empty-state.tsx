import * as React from "react";
import { cn } from "./utils";
import { Button } from "./button";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "minimal" | "illustration";
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ 
    className, 
    icon, 
    title, 
    description, 
    action,
    variant = "default",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center py-12 px-6",
          {
            "min-h-[400px]": variant === "default",
            "py-8": variant === "minimal",
            "min-h-[500px]": variant === "illustration",
          },
          className
        )}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <div 
            className={cn(
              "mb-4 flex items-center justify-center rounded-2xl",
              {
                "w-16 h-16 bg-muted text-muted-foreground": variant === "default",
                "w-12 h-12 text-muted-foreground": variant === "minimal",
                "w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 text-primary": variant === "illustration",
              }
            )}
          >
            {icon}
          </div>
        )}
        
        {/* Content */}
        <div className="max-w-md space-y-2">
          <h3 
            className={cn(
              "font-semibold text-foreground",
              {
                "text-lg": variant === "default" || variant === "illustration",
                "text-base": variant === "minimal",
              }
            )}
          >
            {title}
          </h3>
          
          {description && (
            <p 
              className={cn(
                "text-muted-foreground",
                {
                  "text-sm": variant === "default" || variant === "illustration",
                  "text-xs": variant === "minimal",
                }
              )}
            >
              {description}
            </p>
          )}
        </div>
        
        {/* Action */}
        {action && (
          <Button 
            onClick={action.onClick}
            className="mt-6"
            variant={variant === "minimal" ? "ghost" : "default"}
            size={variant === "minimal" ? "sm" : "default"}
          >
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };