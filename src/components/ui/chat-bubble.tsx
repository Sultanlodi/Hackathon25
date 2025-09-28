import * as React from "react";
import { cn } from "./utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "user" | "assistant" | "system";
  avatar?: string;
  name?: string;
  timestamp?: string;
  showAvatar?: boolean;
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ 
    className, 
    variant = "user", 
    avatar, 
    name, 
    timestamp, 
    showAvatar = true,
    children,
    ...props 
  }, ref) => {
    const isUser = variant === "user";
    const isSystem = variant === "system";

    if (isSystem) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex justify-center py-2",
            className
          )}
          {...props}
        >
          <div className="px-3 py-1 rounded-2xl bg-muted text-muted-foreground text-xs font-medium">
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3 max-w-[80%] animate-fade-in",
          isUser ? "ml-auto flex-row-reverse" : "mr-auto",
          className
        )}
        {...props}
      >
        {showAvatar && (
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-xs">
              {isUser ? "U" : "AI"}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
          {name && (
            <span className="text-xs text-muted-foreground mb-1 px-1">
              {name}
            </span>
          )}
          
          <div
            className={cn(
              "rounded-2xl px-4 py-2 text-sm break-words",
              isUser 
                ? "primary-gradient text-primary-foreground rounded-br-md" 
                : "bg-card border border-border-subtle rounded-bl-md"
            )}
          >
            {children}
          </div>
          
          {timestamp && (
            <span className="text-xs text-muted-foreground mt-1 px-1">
              {timestamp}
            </span>
          )}
        </div>
      </div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

const ChatContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-4 p-4 overflow-y-auto",
      className
    )}
    {...props}
  />
));
ChatContainer.displayName = "ChatContainer";

const ChatInput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 p-4 border-t border-border-subtle bg-background",
      className
    )}
    {...props}
  />
));
ChatInput.displayName = "ChatInput";

export { ChatBubble, ChatContainer, ChatInput };