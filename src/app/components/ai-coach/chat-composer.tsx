import { useState, useRef, KeyboardEvent } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";

interface ChatComposerProps {
  onSendMessage: (message: string) => void;
}

export function ChatComposer({ onSendMessage }: ChatComposerProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle voice recording
  };

  const suggestedPrompts = [
    "How can I save more money?",
    "Review my spending patterns",
    "Help me plan for retirement"
  ];

  return (
    <div className="sticky bottom-0 bg-background border-t border-border-subtle">
      {/* Suggested Prompts (show when input is empty) */}
      {!message && (
        <div className="p-3 pb-1.5">
          <div className="flex gap-1.5 flex-wrap">
            {suggestedPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setMessage(prompt)}
                className="text-xs h-6 px-2.5 text-foreground-subtle hover:text-foreground hover:bg-background-subtle"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="p-2.5 pt-1">
        <Card className="p-2.5 bg-background-subtle border-border">
          <div className="flex items-end gap-3">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 flex-shrink-0 text-foreground-muted hover:text-foreground"
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your finances..."
                className="min-h-[36px] max-h-[120px] resize-none border-0 bg-transparent px-0 py-2 text-sm placeholder:text-foreground-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
              />
              
              {/* Character count (show when approaching limit) */}
              {message.length > 400 && (
                <div className="absolute bottom-1 right-2 text-xs text-foreground-muted">
                  {message.length}/500
                </div>
              )}
            </div>

            {/* Voice/Send Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Voice Recording Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`h-9 w-9 p-0 ${
                  isRecording 
                    ? 'text-error bg-error/10 hover:bg-error/20' 
                    : 'text-foreground-muted hover:text-foreground'
                }`}
                onClick={handleVoiceToggle}
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
              </Button>

              {/* Send Button */}
              <Button
                onClick={handleSend}
                disabled={!message.trim()}
                size="sm"
                className="h-9 w-9 p-0 primary-gradient hover:primary-gradient-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="mt-3 flex items-center gap-2 text-xs text-error">
              <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
              <span>Recording... Click to stop</span>
            </div>
          )}
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-foreground-muted text-center mt-1.5">
          AI Coach provides general guidance. Always consult a financial professional for personalized advice.
        </p>
      </div>
    </div>
  );
}