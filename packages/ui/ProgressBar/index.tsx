import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value: number;
  max?: number;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  showValue?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  animated?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      size = "default",
      variant = "default",
      showValue = false,
      label,
      helperText,
      error,
      animated = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const message = error ?? helperText;
    const messageId = message ? `${props.id ?? "progress"}-message` : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-progressbar",
          `size-${size}`,
          `variant-${variant}`,
          className
        )}
        data-error={error ? "true" : undefined}
        {...props}
      >
        {(label || showValue) && (
          <div className="react-cupertino-ui-progressbar__header">
            {label && <span className="react-cupertino-ui-progressbar__label">{label}</span>}
            {showValue && (
              <span className="react-cupertino-ui-progressbar__value">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        <div className="react-cupertino-ui-progressbar__track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-describedby={messageId}>
          <div
            className={cn("react-cupertino-ui-progressbar__fill", {
              animated,
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {message && (
          <span
            id={messageId}
            className={cn(
              "react-cupertino-ui-progressbar__message",
              error && "is-error"
            )}
            role={error ? "alert" : undefined}
          >
            {message}
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };

export default ProgressBar;
