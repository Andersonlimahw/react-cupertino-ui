import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "filled";
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      size = "default",
      variant = "default",
      label,
      error,
      helperText,
      options,
      placeholder,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="react-cupertino-ui-select-wrapper">
        {label && (
          <label className="react-cupertino-ui-select-label">{label}</label>
        )}
        <div
          className={cn(
            "react-cupertino-ui-select-container",
            `size-${size}`,
            `variant-${variant}`,
            {
              "has-error": error,
              disabled: disabled,
            },
            className
          )}
        >
          <select
            ref={ref}
            className="react-cupertino-ui-select"
            disabled={disabled}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="react-cupertino-ui-select-icon" />
        </div>
        {error && <span className="react-cupertino-ui-select-error">{error}</span>}
        {!error && helperText && (
          <span className="react-cupertino-ui-select-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };

export default Select;
