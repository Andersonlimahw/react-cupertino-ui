import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface MessageBubbleProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  message: string;
  isUser?: boolean;
  timestamp?: string;
  status?: "sent" | "delivered" | "read";
}

const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>((props, ref) => {
  const { className, message, isUser = false, timestamp, status, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-message-bubble", isUser ? "is-user" : "is-ai", className)}
      {...rest}
    >
      <p className="text">{message}</p>
      <div className="meta">
        {timestamp ? <span>{timestamp}</span> : null}
        {status ? <span>{status}</span> : null}
      </div>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

export { MessageBubble };
