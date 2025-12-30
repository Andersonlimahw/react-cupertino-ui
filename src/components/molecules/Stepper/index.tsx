import * as React from "react";

import { cn } from "@/lib/utils";

import "./index.scss";

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  label?: string;
}

const clamp = (value: number, min?: number, max?: number) => {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
};

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      value,
      defaultValue = 0,
      min,
      max,
      step = 1,
      disabled = false,
      onChange,
      label,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number>(
      clamp(defaultValue, min, max)
    );

    const currentValue = isControlled ? clamp(value as number, min, max) : internalValue;

    const updateValue = (next: number) => {
      const clamped = clamp(next, min, max);
      if (!isControlled) {
        setInternalValue(clamped);
      }
      onChange?.(clamped);
    };

    const handleIncrement = () => {
      if (disabled) return;
      updateValue(currentValue + step);
    };

    const handleDecrement = () => {
      if (disabled) return;
      updateValue(currentValue - step);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);
      if (Number.isNaN(next)) {
        return;
      }
      updateValue(next);
    };

    return (
      <div
        ref={ref}
        className={cn("react-cupertino-ui-stepper", className)}
        data-disabled={disabled ? "true" : undefined}
        {...props}
      >
        {label && <span className="react-cupertino-ui-stepper__label">{label}</span>}
        <div className="react-cupertino-ui-stepper__control">
          <button
            type="button"
            className="react-cupertino-ui-stepper__button"
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && currentValue <= min)}
            aria-label="Decrease value"
          >
            –
          </button>
          <input
            type="number"
            className="react-cupertino-ui-stepper__input"
            value={currentValue}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
          />
          <button
            type="button"
            className="react-cupertino-ui-stepper__button"
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && currentValue >= max)}
            aria-label="Increase value"
          >
            +
          </button>
        </div>
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };

export default Stepper;
