import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type RatingSize = "sm" | "md" | "lg";

export interface RatingProps extends Omit<BaseProps<HTMLDivElement>, "children" | "size"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  allowHalf?: boolean;
  onValueChange?: (value: number) => void;
  size?: RatingSize;
  labels?: string[];
  helperText?: string;
}

const clampValue = (value: number, max: number, allowHalf: boolean) => {
  const step = allowHalf ? 0.5 : 1;
  const clamped = Math.max(0, Math.min(value, max));
  return Math.round(clamped / step) * step;
};

const StarIcon = ({ percentage }: { percentage: number }) => {
  const pct = Math.max(0, Math.min(percentage, 100));
  return (
    <span className="react-cupertino-ui-rating__star">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="rating-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${pct}%`} stopColor="currentColor" />
            <stop offset={`${pct}%`} stopColor="rgba(255,255,255,0.2)" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.6l2.7 5.46 6.03.88-4.37 4.24 1.03 6.02L12 16.9l-5.37 2.8 1.03-6.02L3.3 8.94l6.03-.88L12 2.6z"
          fill="url(#rating-fill)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.6"
        />
      </svg>
    </span>
  );
};

const Rating = React.forwardRef<HTMLDivElement, RatingProps>((props, ref) => {
  const {
    className,
    value,
    defaultValue = 0,
    max = 5,
    allowHalf = true,
    readOnly = false,
    onValueChange,
    size = "md",
    labels,
    helperText,
    ...rest
  } = props;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(() => clampValue(defaultValue, max, allowHalf));
  const currentValue = isControlled ? clampValue(value as number, max, allowHalf) : internalValue;

  const handleChange = (next: number) => {
    const resolved = clampValue(next, max, allowHalf);
    if (!isControlled) {
      setInternalValue(resolved);
    }
    onValueChange?.(resolved);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (readOnly) {
      return;
    }
    const step = allowHalf ? 0.5 : 1;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      handleChange(currentValue + step);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      handleChange(currentValue - step);
    } else if (event.key === "Home") {
      event.preventDefault();
      handleChange(0);
    } else if (event.key === "End") {
      event.preventDefault();
      handleChange(max);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleChange(index + 1);
    }
  };

  const getFillPercentage = (index: number) => {
    const starValue = index + 1;
    if (currentValue >= starValue) {
      return 100;
    }
    if (currentValue + (allowHalf ? 0.5 : 1) > starValue && allowHalf) {
      return 50;
    }
    return Math.max(0, (currentValue - index) * 100);
  };

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-rating", `size-${size}`, className)}
      data-readonly={readOnly ? "true" : undefined}
      {...rest}
    >
      <div className="react-cupertino-ui-rating__stars" role="group" aria-label="Rating">
        {Array.from({ length: max }).map((_, index) => {
          const percentage = getFillPercentage(index);
          const label = labels?.[index];
          const buttonValue = index + 1;

          if (readOnly) {
            return (
              <div key={buttonValue} className="react-cupertino-ui-rating__slot" aria-hidden="true" title={label}>
                <StarIcon percentage={percentage} />
              </div>
            );
          }

          return (
            <button
              key={buttonValue}
              type="button"
              className="react-cupertino-ui-rating__slot"
              data-active={currentValue >= buttonValue ? "true" : undefined}
              onClick={(event) => {
                if (readOnly) {
                  return;
                }
                if (allowHalf) {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const clickOffset = event.clientX - rect.left;
                  const isLeftHalf = clickOffset <= rect.width / 2;
                  handleChange(isLeftHalf ? buttonValue - 0.5 : buttonValue);
                  return;
                }
                handleChange(buttonValue);
              }}
              onKeyDown={(event) => handleKeyDown(event, index)}
              aria-label={label ?? `${buttonValue} star${buttonValue === 1 ? "" : "s"}`}
            >
              <StarIcon percentage={percentage} />
            </button>
          );
        })}
      </div>
      {helperText ? <p className="react-cupertino-ui-rating__helper">{helperText}</p> : null}
    </div>
  );
});

Rating.displayName = "Rating";

export { Rating };
