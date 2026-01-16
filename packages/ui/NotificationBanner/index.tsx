import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

type BannerTone = "info" | "success" | "warning" | "critical" | "neutral";

type BannerAction = {
  label: string;
  onClick: () => void;
};

export interface NotificationBannerProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  message?: string;
  tone?: BannerTone;
  icon?: React.ReactNode;
  actions?: BannerAction[];
  dismissible?: boolean;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDuration?: number;
}

const toneIcon: Record<Exclude<BannerTone, "neutral">, React.ReactNode> = {
  info: <div className="dot" />,
  success: <div className="dot" />,
  warning: <div className="dot" />,
  critical: <div className="dot" />,
};

const NotificationBanner = React.forwardRef<HTMLDivElement, NotificationBannerProps>((props, ref) => {
  const {
    className,
    title,
    message,
    tone = "neutral",
    icon,
    actions,
    dismissible = true,
    onDismiss,
    autoHide = false,
    autoHideDuration = 6000,
    ...rest
  } = props;

  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (!autoHide || !visible) {
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, autoHideDuration);
    return () => clearTimeout(timer);
  }, [autoHide, autoHideDuration, onDismiss, visible]);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  if (!visible) {
    return null;
  }

  const resolvedIcon = icon ?? (tone !== "neutral" ? toneIcon[tone] : null);

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-notification-banner", `tone-${tone}`, className)}
      role="status"
      {...rest}
    >
      {resolvedIcon ? <span className="react-cupertino-ui-notification-banner__icon">{resolvedIcon}</span> : null}
      <div className="react-cupertino-ui-notification-banner__content">
        <p className="title">{title}</p>
        {message ? <p className="message">{message}</p> : null}
      </div>
      {actions && actions.length > 0 ? (
        <div className="react-cupertino-ui-notification-banner__actions">
          {actions.map((action) => (
            <button key={action.label} type="button" onClick={action.onClick}>
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
      {dismissible ? (
        <button
          type="button"
          className="react-cupertino-ui-notification-banner__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
});

NotificationBanner.displayName = "NotificationBanner";

export { NotificationBanner };
