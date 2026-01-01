import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  MinusCircle,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Button, type ButtonProps } from "@react-cupertino-ui/button";

import "./index.scss";

export type AlertTone = "neutral" | "info" | "success" | "warning" | "destructive";

const toneIcons: Record<AlertTone, LucideIcon> = {
  neutral: MinusCircle,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: ShieldAlert,
};

const toneLiveRegion: Record<AlertTone, "polite" | "assertive"> = {
  neutral: "polite",
  info: "polite",
  success: "polite",
  warning: "assertive",
  destructive: "assertive",
};

export interface AlertActionItem
  extends Partial<
    Pick<
      ButtonProps,
      "variant" | "loading" | "fullWidth" | "disabled" | "icon" | "onClick" | "className" | "type"
    >
  > {
  key?: React.Key;
  label: React.ReactNode;
}

export interface AlertProps
  extends Omit<BaseProps<HTMLDivElement>, "variant" | "size" | "asChild">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode | null;
  glass?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: AlertActionItem[];
  actionsLayout?: "inline" | "stacked";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    className,
    tone = "info",
    title,
    description,
    icon,
    glass = true,
    dismissible = false,
    onDismiss,
    actions,
    actionsLayout = "inline",
    children,
    role,
    ["aria-live"]: ariaLiveProp,
    ["aria-atomic"]: ariaAtomicProp,
    ...rest
  } = props;

  const [isVisible, setIsVisible] = React.useState(true);

  const IconComponent = toneIcons[tone];
  const resolvedIcon =
    icon === null ? null : icon ?? (IconComponent ? <IconComponent aria-hidden="true" /> : null);

  const resolvedRole = role ?? "alert";
  const ariaLive = ariaLiveProp ?? toneLiveRegion[tone];
  const ariaAtomic = ariaAtomicProp ?? true;

  const classes = cn(
    "react-cupertino-ui-alert",
    `tone-${tone}`,
    glass && "is-glass",
    actions?.length && "has-actions",
    className
  );

  const handleDismiss = () => {
    if (!dismissible) {
      return;
    }

    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={ref}
      role={resolvedRole}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      data-tone={tone}
      data-glass={glass ? "true" : undefined}
      data-actions={actions?.length ? "true" : undefined}
      className={classes}
      {...rest}
    >
      {resolvedIcon && <span className="react-cupertino-ui-alert__icon">{resolvedIcon}</span>}
      <div className="react-cupertino-ui-alert__body">
        {title && <p className="react-cupertino-ui-alert__title">{title}</p>}
        {description && (
          <div className="react-cupertino-ui-alert__description">{description}</div>
        )}
        {children}
        {actions?.length ? (
          <div
            className={cn(
              "react-cupertino-ui-alert__actions",
              `layout-${actionsLayout}`
            )}
            data-layout={actionsLayout}
          >
            {actions.map((action, index) => {
              const {
                key,
                label,
                className: actionClassName,
                fullWidth,
                ...buttonProps
              } = action;

              return (
                <Button
                  key={key ?? index}
                  size="sm"
                  fullWidth={
                    typeof fullWidth === "boolean" ? fullWidth : actionsLayout === "stacked"
                  }
                  className={cn("react-cupertino-ui-alert__action", actionClassName)}
                  {...buttonProps}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>
      {dismissible && (
        <button
          type="button"
          className="react-cupertino-ui-alert__dismiss"
          aria-label="Dismiss alert"
          onClick={handleDismiss}
        >
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

Alert.displayName = "Alert";

export { Alert };
