import * as React from "react";

import { cn } from "@/lib/utils";

import "./index.scss";

export type BadgeVariant = "glass" | "solid" | "outline" | "success" | "warning" | "error";
export type BadgeSize = "default" | "sm" | "lg" | "pill";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "glass", size = "default", startIcon, endIcon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "react-cupertino-ui-badge",
          `variant-${variant}`,
          `size-${size}`,
          className
        )}
        {...props}
      >
        {startIcon && <span className="react-cupertino-ui-badge__icon" aria-hidden="true">{startIcon}</span>}
        <span className="react-cupertino-ui-badge__content">{children}</span>
        {endIcon && <span className="react-cupertino-ui-badge__icon" aria-hidden="true">{endIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };

export default Badge;
