import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type MiniNotificationTone = "info" | "success" | "warning" | "critical";

export interface MiniNotificationProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  message?: string;
  tone?: MiniNotificationTone;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const MiniNotification = React.forwardRef<HTMLDivElement, MiniNotificationProps>((props, ref) => {
  const { className, title, message, tone = "info", onDismiss, action, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-mini-notification", `tone-${tone}`, className)}
      role="status"
      {...rest}
    >
      <div className="react-cupertino-ui-mini-notification__content">
        <p className="title">{title}</p>
        {message ? <p className="message">{message}</p> : null}
      </div>
      {action ? (
        <button type="button" className="react-cupertino-ui-mini-notification__action" onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
      {onDismiss ? (
        <button
          type="button"
          className="react-cupertino-ui-mini-notification__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      ) : null}
    </div>
  );
});

MiniNotification.displayName = "MiniNotification";

export { MiniNotification };
