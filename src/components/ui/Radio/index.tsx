import * as React from "react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  size?: "default" | "sm" | "lg";
  label?: string;
  error?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size = "default",
      label,
      error,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${React.useId()}`;

    return (
      <div className="react-cupertino-ui-radio-wrapper">
        <div
          className={cn("react-cupertino-ui-radio-container", {
            disabled: disabled,
            "has-error": error,
          })}
        >
          <input
            ref={ref}
            id={radioId}
            type="radio"
            className="react-cupertino-ui-radio-input"
            disabled={disabled}
            {...props}
          />
          <label
            htmlFor={radioId}
            className={cn(
              "react-cupertino-ui-radio",
              `size-${size}`,
              className
            )}
          >
            <span className="react-cupertino-ui-radio-button">
              <span className="react-cupertino-ui-radio-dot" />
            </span>
            {label && (
              <span className="react-cupertino-ui-radio-label">{label}</span>
            )}
          </label>
        </div>
        {error && (
          <span className="react-cupertino-ui-radio-error">{error}</span>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export { Radio };

export default Radio;
