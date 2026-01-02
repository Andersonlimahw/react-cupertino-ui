import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type TimelineStatus = "complete" | "current" | "upcoming" | "warning" | "critical";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string | Date;
  meta?: string;
  status?: TimelineStatus;
  icon?: React.ReactNode;
  badge?: string;
  helper?: string;
  onSelect?: (item: TimelineItem) => void;
  disabled?: boolean;
}

export interface TimelineProps extends Omit<BaseProps<HTMLDivElement>, "children" | "variant"> {
  items: TimelineItem[];
  variant?: "glass" | "minimal";
  density?: "comfortable" | "compact";
  interactive?: boolean;
  onItemSelect?: (item: TimelineItem) => void;
  showNowIndicator?: boolean;
}

const formatTimestamp = (value?: string | Date) => {
  if (!value) return undefined;
  if (value instanceof Date) {
    return value.toLocaleString();
  }
  return value;
};

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>((props, ref) => {
  const {
    className,
    items,
    variant = "glass",
    density = "comfortable",
    interactive = false,
    onItemSelect,
    showNowIndicator = true,
    ...rest
  } = props;

  const handleSelect = (item: TimelineItem) => {
    if (item.disabled) return;
    item.onSelect?.(item);
    onItemSelect?.(item);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "react-cupertino-ui-timeline",
        `variant-${variant}`,
        `density-${density}`,
        className
      )}
      {...rest}
    >
      <ol className="react-cupertino-ui-timeline__list">
        {items.map((item, index) => {
          const status = item.status ?? "upcoming";
          const timestamp = formatTimestamp(item.timestamp);
          const isLast = index === items.length - 1;
          const Component = interactive || item.onSelect ? "button" : "div";

          return (
            <li
              key={item.id}
              className={cn(
                "react-cupertino-ui-timeline__item",
                `status-${status}`,
                item.disabled && "is-disabled"
              )}
              data-status={status}
            >
              <div className="react-cupertino-ui-timeline__rail" aria-hidden="true">
                <span className="react-cupertino-ui-timeline__indicator" />
                {!isLast && <span className="react-cupertino-ui-timeline__connector" />}
              </div>

              <Component
                type={Component === "button" ? "button" : undefined}
                className={cn(
                  "react-cupertino-ui-timeline__card",
                  interactive && "is-interactive"
                )}
                onClick={Component === "button" ? () => handleSelect(item) : undefined}
                disabled={Component === "button" ? item.disabled : undefined}
                aria-current={status === "current" ? "step" : undefined}
              >
                <div className="react-cupertino-ui-timeline__header">
                  <div>
                    <p className="title">{item.title}</p>
                    {item.meta ? <span className="meta">{item.meta}</span> : null}
                  </div>
                  <div className="react-cupertino-ui-timeline__header-right">
                    {item.badge ? <span className="badge">{item.badge}</span> : null}
                    {timestamp ? <time>{timestamp}</time> : null}
                  </div>
                </div>
                {item.description ? (
                  <p className="description">{item.description}</p>
                ) : null}
                {item.helper ? <p className="helper">{item.helper}</p> : null}
              </Component>

              {showNowIndicator && status === "current" ? (
                <span className="react-cupertino-ui-timeline__glow" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
});

Timeline.displayName = "Timeline";

export { Timeline };
