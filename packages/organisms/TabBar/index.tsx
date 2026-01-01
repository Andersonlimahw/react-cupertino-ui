import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

export interface TabBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  glass?: boolean;
}

const TabBar = React.forwardRef<HTMLElement, TabBarProps>(
  ({ items, activeId, onChange, className, glass = true, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "react-cupertino-ui-tab-bar",
          glass && "glass",
          className
        )}
        {...props}
      >
        <div className="react-cupertino-ui-tab-bar__content">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "react-cupertino-ui-tab-bar__item",
                  isActive && "is-active"
                )}
                onClick={() => onChange(item.id)}
                aria-selected={isActive}
                role="tab"
              >
                <div className="icon-container">
                  {item.icon}
                  {item.badge && (
                    <span className="badge">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }
);

TabBar.displayName = "TabBar";

export { TabBar };
