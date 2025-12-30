import * as React from "react";

import { cn } from "@/lib/utils";

import "./index.scss";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onBlur" | "onFocus"> {
  className?: string;
  size?: "default" | "sm" | "lg";
  label?: string;
  helperText?: string;
  error?: string;
  variant?: "glass" | "solid" | "outline";
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size = "default",
      label,
      helperText,
      error,
      variant = "glass",
      id,
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = React.useId();
    const controlId = id ?? `radio-${generatedId}`;
    const helperId = helperText ? `${controlId}-helper` : undefined;
    const errorId = error ? `${controlId}-error` : undefined;
    const messageId = error ? errorId : helperId;

    const internalRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(forwardedRef, () => internalRef.current as HTMLInputElement);

    return (
      <label
        className={cn(
          "react-cupertino-ui-radio",
          `size-${size}`,
          `variant-${variant}`,
          className
        )}
        data-disabled={disabled ? "true" : undefined}
        data-error={error ? "true" : undefined}
        htmlFor={controlId}
      >
        <input
          ref={internalRef}
          id={controlId}
          type="radio"
          className="react-cupertino-ui-radio__input"
          disabled={disabled}
          aria-describedby={messageId}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />

        <span className="react-cupertino-ui-radio__control" aria-hidden="true">
          <span className="react-cupertino-ui-radio__ring" />
          <span className="react-cupertino-ui-radio__dot" />
        </span>

        {(label || helperText || error) && (
          <span className="react-cupertino-ui-radio__text">
            {label && <span className="react-cupertino-ui-radio__label">{label}</span>}
            {helperText && !error && (
              <span id={helperId} className="react-cupertino-ui-radio__helper">
                {helperText}
              </span>
            )}
            {error && (
              <span id={errorId} className="react-cupertino-ui-radio__error" role="alert">
                {error}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export { Radio };

export default Radio;
