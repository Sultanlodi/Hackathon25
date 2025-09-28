import { ChatMessage } from "./ai-coach";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { Loader2, User, Bot } from "lucide-react";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.type === "user";
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatContent = (content: string) => {
    // Split content by double line breaks to create paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle bold text
      const formattedParagraph = paragraph.split('**').map((part, partIndex) => {
        if (partIndex % 2 === 1) {
          return <strong key={partIndex} className="font-semibold">{part}</strong>;
        }
        return part;
      });

      // Handle bullet points
      if (paragraph.includes('•')) {
        const lines = paragraph.split('\n');
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex}>
                {line.trim().startsWith('•') ? (
                  <div className="flex items-start gap-2 ml-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{line.replace('•', '').trim()}</span>
                  </div>
                ) : (
                  <div>{formattedParagraph}</div>
                )}
              </div>
            ))}
          </div>
        );
      }

      return (
        <p key={index} className={index > 0 ? "mt-3" : ""}>
          {formattedParagraph}
        </p>
      );
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[600px] ${isUser ? 'order-1' : ''}`}>
        <Card 
          className={`p-4 ${
            isUser 
              ? 'bg-primary text-primary-foreground ml-12' 
              : 'bg-card border-border-subtle'
          }`}
        >
          <div className={`prose prose-sm max-w-none ${
            isUser 
              ? 'prose-invert [&_strong]:text-primary-foreground' 
              : '[&_strong]:text-foreground'
          }`}>
            {formatContent(message.content)}
          </div>
        </Card>
        <div className={`text-xs text-foreground-muted mt-2 ${
          isUser ? 'text-right mr-2' : 'ml-2'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 order-2">
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-secondary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start mb-6">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      <div className="max-w-[600px]">
        <Card className="p-4 bg-card border-border-subtle">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-foreground-muted text-sm">AI Coach is typing...</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  return (
    <div className="p-6 space-y-0">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
    </div>
  );
}