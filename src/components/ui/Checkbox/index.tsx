import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  size?: "default" | "sm" | "lg";
  label?: string;
  error?: string;
  variant?: "default" | "ios";
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "default",
      variant = "ios",
      label,
      error,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${React.useId()}`;

    return (
      <div className="react-cupertino-ui-checkbox-wrapper">
        <div
          className={cn("react-cupertino-ui-checkbox-container", {
            disabled: disabled,
            "has-error": error,
          })}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="react-cupertino-ui-checkbox-input"
            disabled={disabled}
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={cn(
              "react-cupertino-ui-checkbox",
              `size-${size}`,
              `variant-${variant}`,
              className
            )}
          >
            <span className="react-cupertino-ui-checkbox-box">
              <Check className="react-cupertino-ui-checkbox-icon" />
            </span>
            {label && (
              <span className="react-cupertino-ui-checkbox-label">{label}</span>
            )}
          </label>
        </div>
        {error && (
          <span className="react-cupertino-ui-checkbox-error">{error}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

export default Checkbox;
