import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import "./index.scss";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onBlur" | "onFocus"> {
  className?: string;
  size?: "default" | "sm" | "lg";
  label?: string;
  helperText?: string;
  error?: string;
  variant?: "glass" | "solid" | "outline";
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "default",
      variant = "glass",
      label,
      helperText,
      error,
      id,
      disabled,
      onFocus,
      onBlur,
      indeterminate,
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = React.useId();
    const checkboxId = id ?? `checkbox-${generatedId}`;
    const helperId = helperText ? `${checkboxId}-helper` : undefined;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const messageId = error ? errorId : helperId;

    const internalRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(forwardedRef, () => internalRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    return (
      <label
        className={cn(
          "react-cupertino-ui-checkbox",
          `size-${size}`,
          `variant-${variant}`,
          className
        )}
        data-disabled={disabled ? "true" : undefined}
        data-error={error ? "true" : undefined}
        htmlFor={checkboxId}
      >
        <input
          ref={internalRef}
          id={checkboxId}
          type="checkbox"
          className="react-cupertino-ui-checkbox__input"
          disabled={disabled}
          aria-describedby={messageId}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />

        <span className="react-cupertino-ui-checkbox__control" aria-hidden="true">
          <span className="react-cupertino-ui-checkbox__box">
            <Check className="react-cupertino-ui-checkbox__icon" />
          </span>
        </span>

        {(label || helperText || error) && (
          <span className="react-cupertino-ui-checkbox__text">
            {label && <span className="react-cupertino-ui-checkbox__label">{label}</span>}
            {helperText && !error && (
              <span id={helperId} className="react-cupertino-ui-checkbox__helper">
                {helperText}
              </span>
            )}
            {error && (
              <span
                id={errorId}
                className="react-cupertino-ui-checkbox__error"
                role="alert"
              >
                {error}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

export default Checkbox;
