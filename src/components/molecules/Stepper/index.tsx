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

const HOLD_DELAY = 350;
const HOLD_INTERVAL = 110;

type HoldDirection = "increment" | "decrement";

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
    const [heldButton, setHeldButton] = React.useState<HoldDirection | null>(null);
    const [valueTrend, setValueTrend] = React.useState<"up" | "down" | null>(null);

    const currentValue = isControlled ? clamp(value as number, min, max) : internalValue;
    const valueRef = React.useRef(currentValue);
    valueRef.current = currentValue;

    const holdTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const holdIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const trendTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const previousValueRef = React.useRef(currentValue);

    const clearHoldTimers = React.useCallback(() => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
    }, []);

    const updateValue = React.useCallback(
      (next: number | ((prev: number) => number)) => {
        const resolved = typeof next === "function" ? next(valueRef.current) : next;
        const clamped = clamp(resolved, min, max);
        valueRef.current = clamped;

        if (!isControlled) {
          setInternalValue(clamped);
        }
        onChange?.(clamped);
      },
      [isControlled, max, min, onChange]
    );

    const changeByStep = React.useCallback(
      (direction: HoldDirection) => {
        updateValue((prev) => prev + (direction === "increment" ? step : -step));
      },
      [step, updateValue]
    );

    const handleIncrement = () => {
      if (disabled) return;
      changeByStep("increment");
    };

    const handleDecrement = () => {
      if (disabled) return;
      changeByStep("decrement");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);
      if (Number.isNaN(next)) {
        return;
      }
      updateValue(next);
    };

    const stopHold = React.useCallback(() => {
      clearHoldTimers();
      setHeldButton(null);
    }, [clearHoldTimers]);

    const startHold = React.useCallback(
      (direction: HoldDirection) => {
        if (disabled) {
          return;
        }
        setHeldButton(direction);
        clearHoldTimers();

        holdTimeoutRef.current = setTimeout(() => {
          changeByStep(direction);
          holdIntervalRef.current = setInterval(() => {
            changeByStep(direction);
          }, HOLD_INTERVAL);
        }, HOLD_DELAY);
      },
      [changeByStep, clearHoldTimers, disabled]
    );

    React.useEffect(() => {
      return () => {
        clearHoldTimers();
        if (trendTimeoutRef.current) {
          clearTimeout(trendTimeoutRef.current);
        }
      };
    }, [clearHoldTimers]);

    React.useEffect(() => {
      const previous = previousValueRef.current;
      if (previous !== currentValue) {
        const trend = currentValue > previous ? "up" : "down";
        setValueTrend(trend);
        if (trendTimeoutRef.current) {
          clearTimeout(trendTimeoutRef.current);
        }
        trendTimeoutRef.current = setTimeout(() => {
          setValueTrend(null);
        }, 420);
      }
      previousValueRef.current = currentValue;
    }, [currentValue]);

    React.useEffect(() => {
      if (!heldButton) {
        return;
      }

      const handlePointerUp = () => {
        stopHold();
      };

      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);

      return () => {
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
      };
    }, [heldButton, stopHold]);

    const getPointerHandlers = (direction: HoldDirection) => {
      return {
        onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
          if (event.button && event.button !== 0) {
            return;
          }
          event.preventDefault();
          startHold(direction);
        },
        onPointerLeave: stopHold,
        onPointerCancel: stopHold,
        onPointerUp: () => stopHold(),
      } as const;
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
            data-pressing={heldButton === "decrement" ? "true" : undefined}
            {...getPointerHandlers("decrement")}
          >
            –
          </button>
          <input
            type="number"
            className="react-cupertino-ui-stepper__input"
            value={currentValue}
            data-trend={valueTrend ?? undefined}
            aria-live="polite"
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
            data-pressing={heldButton === "increment" ? "true" : undefined}
            {...getPointerHandlers("increment")}
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
