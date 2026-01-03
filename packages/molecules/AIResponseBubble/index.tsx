import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { marked } from "marked";
import DOMPurify from "dompurify";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface AIResponseBubbleProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  content: string;
  isUser?: boolean;
  timestamp?: Date;
  status?: "sending" | "sent" | "error";
  typing?: boolean;
  actions?: React.ReactNode;
  markdown?: boolean;
}

const statusLabel: Record<NonNullable<AIResponseBubbleProps["status"]>, string> = {
  sending: "Sending…",
  sent: "Sent",
  error: "Error",
};

const AIResponseBubble = React.forwardRef<HTMLDivElement, AIResponseBubbleProps>((props, ref) => {
  const { content, isUser = false, timestamp, status, typing = false, actions, markdown = false, className, ...rest } = props;

  const timeLabel = React.useMemo(() => {
    if (!timestamp) return undefined;
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, [timestamp]);

  return (
    <div
      ref={ref}
      className={cn(
        "react-cupertino-ui-ai-response-bubble",
        isUser ? "is-user" : "is-ai",
        typing && "is-typing",
        status && `status-${status}`,
        className
      )}
      {...rest}
    >
      <div className="react-cupertino-ui-ai-response-bubble__body">
        {typing ? (
          <span
            className="react-cupertino-ui-ai-response-bubble__typing"
            aria-live="polite"
            role="status"
          >
            <span /><span /><span />
          </span>
        ) : (
          <p
            className="react-cupertino-ui-ai-response-bubble__content"
            dangerouslySetInnerHTML={
              markdown
                ? {
                    __html: DOMPurify.sanitize(marked.parse(content) as string),
                  }
                : undefined
            }
          >
            {!markdown ? content : null}
          </p>
        )}
        {actions ? <div className="react-cupertino-ui-ai-response-bubble__actions">{actions}</div> : null}
      </div>
      <div className="react-cupertino-ui-ai-response-bubble__meta">
        {status && <span className="react-cupertino-ui-ai-response-bubble__status">{statusLabel[status]}</span>}
        {timeLabel && <time dateTime={timestamp?.toISOString()}>{timeLabel}</time>}
      </div>
    </div>
  );
});

AIResponseBubble.displayName = "AIResponseBubble";

export { AIResponseBubble };
