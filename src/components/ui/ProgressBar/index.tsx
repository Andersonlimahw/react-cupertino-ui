import * as React from "react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value: number;
  max?: number;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  showValue?: boolean;
  label?: string;
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
      animated = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="react-cupertino-ui-progressbar-wrapper" ref={ref} {...props}>
        {(label || showValue) && (
          <div className="react-cupertino-ui-progressbar-header">
            {label && (
              <span className="react-cupertino-ui-progressbar-label">{label}</span>
            )}
            {showValue && (
              <span className="react-cupertino-ui-progressbar-value">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            "react-cupertino-ui-progressbar",
            `size-${size}`,
            `variant-${variant}`,
            className
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn("react-cupertino-ui-progressbar-fill", {
              animated: animated,
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };

export default ProgressBar;
