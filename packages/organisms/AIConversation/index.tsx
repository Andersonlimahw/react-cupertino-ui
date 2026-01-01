import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { AIResponseBubble } from "@react-cupertino-ui/ai-response-bubble";
import { AIPromptInput } from "@react-cupertino-ui/ai-prompt-input";
import { SuggestionChip } from "@react-cupertino-ui/suggestion-chip";

import "./index.scss";

export interface AIConversationMessage {
  id: string;
  content: string;
  isUser?: boolean;
  timestamp?: Date;
  status?: "sending" | "sent" | "error";
}

export interface AIConversationProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  messages: AIConversationMessage[];
  onSend: (message: string) => void;
  loading?: boolean;
  suggestions?: string[];
  typing?: boolean;
}

const AIConversation = React.forwardRef<HTMLDivElement, AIConversationProps>((props, ref) => {
  const { className, messages, onSend, loading = false, suggestions, typing = false, ...rest } = props;
  const [prompt, setPrompt] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => scrollRef.current as HTMLDivElement);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, loading, typing]);

  const handleSend = (value: string) => {
    onSend(value);
    setPrompt("");
  };

  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    onSend(suggestion);
  };

  return (
    <div className={cn("react-cupertino-ui-ai-conversation", className)} {...rest}>
      <div className="react-cupertino-ui-ai-conversation__messages" ref={scrollRef}>
        {messages.map((message) => (
          <AIResponseBubble key={message.id} {...message} />
        ))}
        {typing && !messages[messages.length - 1]?.isUser ? (
          <AIResponseBubble content="" typing />
        ) : null}
        {loading ? (
          <AIResponseBubble content="" typing status="sending" />
        ) : null}
      </div>
      <div className="react-cupertino-ui-ai-conversation__input">
        {suggestions && suggestions.length > 0 ? (
          <div className="react-cupertino-ui-ai-conversation__suggestions">
            {suggestions.map((suggestion) => (
              <SuggestionChip key={suggestion} size="sm" onClick={() => handleSuggestion(suggestion)}>
                {suggestion}
              </SuggestionChip>
            ))}
          </div>
        ) : null}
        <AIPromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSend}
          suggestions={undefined}
          helperText={loading ? "Apple Intelligence está respondendo..." : undefined}
        />
      </div>
    </div>
  );
});

AIConversation.displayName = "AIConversation";

export { AIConversation };
