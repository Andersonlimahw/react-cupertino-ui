import * as React from "react";
import { cn } from "@/lib/utils";
import { BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  variant?: "default" | "outline" | "filled";
  size?: "default" | "sm" | "lg";
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="react-cupertino-ui-textfield-wrapper">
        {label && (
          <label className="react-cupertino-ui-textfield-label">
            {label}
          </label>
        )}
        <div
          className={cn(
            BaseVariants("react-cupertino-ui-textfield", {
              variant,
              size,
              className,
            }),
            {
              "has-error": error,
              "has-left-icon": leftIcon,
              "has-right-icon": rightIcon,
              disabled: disabled,
            }
          )}
        >
          {leftIcon && (
            <span className="react-cupertino-ui-textfield-icon left">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className="react-cupertino-ui-textfield-input"
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <span className="react-cupertino-ui-textfield-icon right">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span className="react-cupertino-ui-textfield-error">{error}</span>}
        {!error && helperText && (
          <span className="react-cupertino-ui-textfield-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };

export default TextField;
