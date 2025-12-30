import * as React from "react";

import { cn } from "@/lib/utils";

import "./index.scss";

interface SliderNativeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onFocus" | "onBlur"> {}

export interface SliderProps extends SliderNativeProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  label?: string;
  helperText?: string;
  error?: string;
  variant?: "glass" | "solid" | "outline";
  showValue?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      size = "default",
      label,
      helperText,
      error,
      variant = "glass",
      showValue = false,
      min = 0,
      max = 100,
      value,
      defaultValue,
      disabled,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      typeof value === "number"
        ? value
        : typeof defaultValue === "number"
          ? defaultValue
          : Number(min)
    );

    const currentValue = typeof value === "number" ? value : internalValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);
      if (typeof value !== "number") {
        setInternalValue(nextValue);
      }
      onChange?.(event);
    };

    const percentage =
      ((Number(currentValue) - Number(min)) / (Number(max) - Number(min))) * 100;

    const helperId = helperText ? `${props.id ?? "slider"}-${React.useId()}-helper` : undefined;
    const errorId = error ? `${props.id ?? "slider"}-${React.useId()}-error` : undefined;
    const messageId = error ? errorId : helperId;

    return (
      <div
        className={cn(
          "react-cupertino-ui-slider",
          `size-${size}`,
          `variant-${variant}`,
          className
        )}
        data-disabled={disabled ? "true" : undefined}
        data-error={error ? "true" : undefined}
      >
        {(label || showValue) && (
          <div className="react-cupertino-ui-slider__header">
            {label && <label className="react-cupertino-ui-slider__label">{label}</label>}
            {showValue && (
              <span className="react-cupertino-ui-slider__value">{currentValue}</span>
            )}
          </div>
        )}

        <div className="react-cupertino-ui-slider__track">
          <div className="react-cupertino-ui-slider__progress" style={{ width: `${percentage}%` }} />

          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className="react-cupertino-ui-slider__input"
            aria-describedby={messageId}
            onFocus={onFocus}
            onBlur={onBlur}
            {...props}
          />

          <span className="react-cupertino-ui-slider__thumb" style={{ left: `${percentage}%` }} />
        </div>

        {(helperText || error) && (
          <span
            id={messageId}
            className={cn(
              "react-cupertino-ui-slider__message",
              error && "is-error"
            )}
            role={error ? "alert" : undefined}
          >
            {error ?? helperText}
          </span>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

export default Slider;
