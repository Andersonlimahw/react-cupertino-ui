import * as React from "react";

import { BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "defaultValue" | "onChange" | "onFocus" | "onBlur"
>;

export interface TextFieldProps extends NativeInputProps {
  className?: string;
  variant?: "glass" | "default" | "outline" | "filled";
  size?: "default" | "sm" | "lg";
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  defaultValue?: React.InputHTMLAttributes<HTMLInputElement>["defaultValue"];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const hasFieldValue = (
  nextValue: string | number | readonly string[] | undefined
) => {
  if (Array.isArray(nextValue)) {
    return nextValue.length > 0;
  }

  if (nextValue === undefined || nextValue === null) {
    return false;
  }

  return `${nextValue}`.trim().length > 0;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant = "glass",
      size = "default",
      label,
      error,
      helperText,
      success,
      leftIcon,
      rightIcon,
      disabled,
      id,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const resolvedVariant = variant === "default" ? "glass" : variant;
    const generatedId = React.useId();
    const inputId = id ?? `textfield-${generatedId}`;
    const [isFocused, setFocused] = React.useState(false);
    const [isFilled, setFilled] = React.useState(() =>
      hasFieldValue(value ?? (defaultValue as string | number | readonly string[] | undefined))
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setFilled(hasFieldValue(value as string | number | readonly string[] | undefined));
      }
    }, [value]);

    const state: "default" | "error" | "success" = error
      ? "error"
      : success
        ? "success"
        : "default";
    const message = error ?? success ?? helperText;
    const messageType = error ? "error" : success ? "success" : helperText ? "helper" : null;
    const messageId = messageType ? `${inputId}-${messageType}` : undefined;

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false);
      onBlur?.(event);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      if (value === undefined) {
        setFilled(hasFieldValue(event.target.value));
      }
      onChange?.(event);
    };

    const inputValueProps =
      value !== undefined
        ? { value }
        : { defaultValue };

    const classes = BaseVariants(
      "react-cupertino-ui-textfield",
      {
        variant: resolvedVariant,
        size,
        className: cn(className, {
          "has-left-icon": Boolean(leftIcon),
          "has-right-icon": Boolean(rightIcon),
        }),
      },
      {
        defaultVariants: {
          variant: "glass",
        },
      }
    );

    return (
      <div className="react-cupertino-ui-textfield-wrapper">
        <div
          className={classes}
          data-focused={isFocused ? "true" : undefined}
          data-filled={isFilled ? "true" : undefined}
          data-label={label ? (isFocused || isFilled ? "raised" : "resting") : undefined}
          data-state={state !== "default" ? state : undefined}
          data-disabled={disabled ? "true" : undefined}
        >
          {leftIcon && (
            <span
              className="react-cupertino-ui-textfield__icon"
              data-slot="left"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <div className="react-cupertino-ui-textfield__control">
            {label && (
              <label className="react-cupertino-ui-textfield__label" htmlFor={inputId}>
                {label}
              </label>
            )}

            <input
              id={inputId}
              ref={ref}
              className="react-cupertino-ui-textfield__input"
              disabled={disabled}
              aria-invalid={state === "error" ? "true" : undefined}
              aria-describedby={messageId}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...inputValueProps}
              {...rest}
            />
          </div>

          {rightIcon && (
            <span
              className="react-cupertino-ui-textfield__icon"
              data-slot="right"
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {message && (
          <span
            id={messageId}
            className={cn("react-cupertino-ui-textfield__message", {
              "is-error": state === "error",
              "is-success": state === "success",
            })}
            role={state === "error" ? "alert" : undefined}
          >
            {message}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };

export default TextField;
