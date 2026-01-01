import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

export interface TabBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
  badgeTone?: "default" | "success" | "critical";
  badgeShape?: "pill" | "dot";
  disabled?: boolean;
}

export interface TabBarProps extends React.HTMLAttributes<HTMLElement> {
  items: TabBarItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  glass?: boolean;
  floating?: boolean;
  tone?: "auto" | "light" | "dark";
  safeArea?: boolean;
  hapticFeedback?: boolean;
  ariaLabel?: string;
}

const TabBar = React.forwardRef<HTMLElement, TabBarProps>((props, ref) => {
  const {
    items,
    activeId,
    onChange,
    className,
    glass = true,
    floating = false,
    tone = "auto",
    safeArea = true,
    hapticFeedback = false,
    ariaLabel = "App navigation",
    ...rest
  } = props;

  const buttonsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = React.useMemo(() => {
    const index = items.findIndex((item) => item.id === activeId);
    return index === -1 ? 0 : index;
  }, [activeId, items]);

  const totalItems = items.length || 1;

  const vibrate = React.useCallback(() => {
    if (!hapticFeedback || typeof window === "undefined") {
      return;
    }
    try {
      window.navigator?.vibrate?.(8);
    } catch {
      // ignore vibrate errors in unsupported environments
    }
  }, [hapticFeedback]);

  const selectTab = React.useCallback(
    (id: string) => {
      if (id === activeId) {
        return;
      }
      vibrate();
      onChange?.(id);
    },
    [activeId, onChange, vibrate]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!items.length) {
      return;
    }

    const { key } = event;
    if (key !== "ArrowLeft" && key !== "ArrowRight" && key !== "Home" && key !== "End") {
      return;
    }

    event.preventDefault();
    let nextIndex = activeIndex;

    if (key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + totalItems) % totalItems;
    } else if (key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % totalItems;
    } else if (key === "Home") {
      nextIndex = 0;
    } else if (key === "End") {
      nextIndex = totalItems - 1;
    }

    const nextItem = items[nextIndex];
    if (nextItem) {
      selectTab(nextItem.id);
      buttonsRef.current[nextIndex]?.focus();
    }
  };

  const indicatorStyle = React.useMemo(() => {
    return {
      "--tab-bar-count": totalItems,
      "--tab-bar-active-index": activeIndex,
    } as React.CSSProperties;
  }, [activeIndex, totalItems]);

  return (
    <nav
      ref={ref}
      role="tablist"
      aria-label={ariaLabel}
      data-floating={floating ? "true" : undefined}
      data-tone={tone}
      data-safe-area={safeArea ? "true" : undefined}
      className={cn(
        "react-cupertino-ui-tab-bar",
        glass && "glass",
        floating && "floating",
        safeArea && "has-safe-area",
        tone && `tone-${tone}`,
        className
      )}
      onKeyDown={handleKeyDown}
      style={indicatorStyle}
      {...rest}
    >
      <div className="react-cupertino-ui-tab-bar__content">
        <span className="react-cupertino-ui-tab-bar__indicator" aria-hidden="true" />
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(node) => {
                buttonsRef.current[index] = node;
              }}
              type="button"
              role="tab"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              aria-disabled={item.disabled}
              className={cn(
                "react-cupertino-ui-tab-bar__item",
                isActive && "is-active",
                item.disabled && "is-disabled"
              )}
              data-active={isActive ? "true" : undefined}
              data-badge-shape={item.badgeShape ?? (typeof item.badge === "string" && item.badge.length <= 2 ? "pill" : undefined)}
              onClick={() => {
                if (item.disabled) return;
                selectTab(item.id);
              }}
              disabled={item.disabled}
            >
              <span className="icon-container" aria-hidden="true">
            {item.icon}
            {(item.badge !== undefined && item.badge !== null) || item.badgeShape === "dot" ? (
              <span
                className={cn(
                  "badge",
                  item.badgeShape === "dot" && "is-dot",
                  item.badgeTone && `tone-${item.badgeTone}`
                )}
              >
                {item.badgeShape === "dot" ? <span className="dot" /> : item.badge}
              </span>
            ) : null}
          </span>
              <span className="label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

TabBar.displayName = "TabBar";

export { TabBar };
