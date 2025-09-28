import * as React from "react";
import { cn } from "./utils";

interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  thickness?: "thin" | "medium" | "thick";
  variant?: "default" | "success" | "warning" | "error" | "gradient";
  showValue?: boolean;
  children?: React.ReactNode;
}

const sizeMap = {
  sm: { size: 40, strokeWidth: 3, fontSize: "text-xs" },
  md: { size: 60, strokeWidth: 4, fontSize: "text-sm" },
  lg: { size: 80, strokeWidth: 5, fontSize: "text-base" },
  xl: { size: 120, strokeWidth: 6, fontSize: "text-lg" },
};

const thicknessMap = {
  thin: 0.8,
  medium: 1,
  thick: 1.2,
};

const variantMap = {
  default: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  error: "stroke-error",
  gradient: "",
};

const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    size = "md", 
    thickness = "medium",
    variant = "default",
    showValue = false,
    children,
    ...props 
  }, ref) => {
    const { size: dimensions, strokeWidth: baseStrokeWidth, fontSize } = sizeMap[size];
    const strokeWidth = baseStrokeWidth * thicknessMap[thickness];
    const radius = (dimensions - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max(value, 0), max) / max;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (circumference * percentage);

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: dimensions, height: dimensions }}
        {...props}
      >
        <svg
          width={dimensions}
          height={dimensions}
          className="transform -rotate-90"
          viewBox={`0 0 ${dimensions} ${dimensions}`}
        >
          {/* Background circle */}
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted opacity-20"
          />
          
          {/* Progress circle */}
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            stroke={variant === "gradient" ? "url(#progressGradient)" : "currentColor"}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-500 ease-out",
              variant !== "gradient" && variantMap[variant]
            )}
          />
          
          {/* Gradient definition for gradient variant */}
          {variant === "gradient" && (
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          )}
        </svg>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children || (showValue && (
            <span className={cn("font-medium text-foreground", fontSize)}>
              {Math.round(percentage * 100)}%
            </span>
          ))}
        </div>
      </div>
    );
  }
);

ProgressRing.displayName = "ProgressRing";

export { ProgressRing };