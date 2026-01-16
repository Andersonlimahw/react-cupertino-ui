import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

export interface PageControlProps {
  total: number;
  current: number;
  onChange?: (index: number) => void;
  className?: string;
  variant?: "dots" | "pills";
}

const PageControl = React.forwardRef<HTMLDivElement, PageControlProps>(
  (
    {
      total,
      current,
      onChange,
      className,
      variant = "dots",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-page-control",
          `variant-${variant}`,
          className
        )}
        {...props}
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              "react-cupertino-ui-page-control__indicator",
              index === current && "is-active"
            )}
            onClick={() => onChange?.(index)}
            aria-current={index === current ? "step" : undefined}
            aria-label={`Page ${index + 1}`}
          />
        ))}
      </div>
    );
  }
);

PageControl.displayName = "PageControl";

export { PageControl };
