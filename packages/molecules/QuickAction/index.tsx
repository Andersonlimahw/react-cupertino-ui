import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type QuickActionTone = "default" | "success" | "warning" | "danger" | "indigo";
export type QuickActionLayout = "vertical" | "horizontal";

export interface QuickActionProps
  extends Omit<BaseProps<HTMLButtonElement>, "children" | "asChild"> {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  metric?: string;
  badge?: string;
  tone?: QuickActionTone;
  layout?: QuickActionLayout;
  glass?: boolean;
  disabled?: boolean;
  align?: "start" | "center";
  helperText?: string;
  onSelect?: () => void;
  rightSlot?: React.ReactNode;
}

const QuickAction = React.forwardRef<HTMLButtonElement, QuickActionProps>((props, ref) => {
  const {
    title,
    subtitle,
    icon,
    metric,
    badge,
    tone = "default",
    layout = "vertical",
    glass = true,
    disabled = false,
    align = "start",
    helperText,
    onSelect,
    rightSlot,
    className,
    ...rest
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onSelect?.();
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "react-cupertino-ui-quick-action",
        glass && "glass",
        `tone-${tone}`,
        `layout-${layout}`,
        `align-${align}`,
        disabled && "is-disabled",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      <div className="react-cupertino-ui-quick-action__media" aria-hidden="true">
        {icon ? <span className="icon-slot">{icon}</span> : null}
        {badge ? <span className="badge">{badge}</span> : null}
      </div>

      <div className="react-cupertino-ui-quick-action__body">
        <div className="react-cupertino-ui-quick-action__header">
          <div>
            <span className="title">{title}</span>
            {subtitle ? <span className="subtitle">{subtitle}</span> : null}
          </div>
          {metric ? <span className="metric">{metric}</span> : null}
        </div>
        {helperText ? <p className="helper">{helperText}</p> : null}
      </div>

      <div className="react-cupertino-ui-quick-action__cta" aria-hidden="true">
        {rightSlot ?? <ArrowRight size={16} />}
      </div>
    </button>
  );
});

QuickAction.displayName = "QuickAction";

export { QuickAction };
