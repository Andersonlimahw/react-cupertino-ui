import * as React from "react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  className?: string;
  size?: "default" | "sm" | "lg";
  label?: string;
  showValue?: boolean;
  error?: string;
  helperText?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      size = "default",
      label,
      showValue = false,
      error,
      helperText,
      min = 0,
      max = 100,
      value,
      defaultValue,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      (value as number) || (defaultValue as number) || Number(min)
    );

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setInternalValue(newValue);
      onChange?.(e);
    };

    const percentage = ((Number(currentValue) - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <div className="react-cupertino-ui-slider-wrapper">
        {(label || showValue) && (
          <div className="react-cupertino-ui-slider-header">
            {label && <label className="react-cupertino-ui-slider-label">{label}</label>}
            {showValue && (
              <span className="react-cupertino-ui-slider-value">{currentValue}</span>
            )}
          </div>
        )}
        <div
          className={cn(
            "react-cupertino-ui-slider-container",
            `size-${size}`,
            {
              disabled: disabled,
              "has-error": error,
            },
            className
          )}
        >
          <input
            ref={ref}
            type="range"
            className="react-cupertino-ui-slider"
            min={min}
            max={max}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            style={{
              background: `linear-gradient(to right, var(--blue) 0%, var(--blue) ${percentage}%, hsl(var(--border)) ${percentage}%, hsl(var(--border)) 100%)`,
            }}
            {...props}
          />
        </div>
        {error && <span className="react-cupertino-ui-slider-error">{error}</span>}
        {!error && helperText && (
          <span className="react-cupertino-ui-slider-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

export default Slider;
