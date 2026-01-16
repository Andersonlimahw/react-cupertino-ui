"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search, X, Clock, ArrowRight } from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface SpotlightResultItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  category?: string;
  onSelect?: () => void;
}

export interface SpotlightResultGroup {
  title: string;
  items: SpotlightResultItem[];
}

export interface SpotlightSearchProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  results?: SpotlightResultGroup[];
  recentSearches?: string[];
  onSelectRecent?: (query: string) => void;
  onClearRecent?: () => void;
  loading?: boolean;
  emptyMessage?: string;
  glass?: boolean;
}

const SpotlightSearch = React.forwardRef<HTMLDivElement, SpotlightSearchProps>(
  (props, ref) => {
    const {
      open,
      onOpenChange,
      value,
      onValueChange,
      onSearch,
      placeholder = "Search",
      results = [],
      recentSearches = [],
      onSelectRecent,
      onClearRecent,
      loading = false,
      emptyMessage = "No results found",
      glass = true,
      className,
      ...rest
    } = props;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const allItems = React.useMemo(() => {
      const items: Array<{ type: "recent" | "result"; value: string | SpotlightResultItem }> = [];

      if (value.length === 0 && recentSearches.length > 0) {
        recentSearches.forEach((search) => {
          items.push({ type: "recent", value: search });
        });
      } else {
        results.forEach((group) => {
          group.items.forEach((item) => {
            items.push({ type: "result", value: item });
          });
        });
      }

      return items;
    }, [value, recentSearches, results]);

    React.useEffect(() => {
      if (open) {
        setFocusedIndex(-1);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < allItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < allItems.length) {
            const focused = allItems[focusedIndex];
            if (focused.type === "recent") {
              onSelectRecent?.(focused.value as string);
            } else {
              const item = focused.value as SpotlightResultItem;
              item.onSelect?.();
              onOpenChange(false);
            }
          } else if (value.length > 0) {
            onSearch?.(value);
          }
          break;
        case "Escape":
          e.preventDefault();
          onOpenChange(false);
          break;
        default:
          break;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value);
      setFocusedIndex(-1);
    };

    const handleClear = () => {
      onValueChange("");
      inputRef.current?.focus();
    };

    const hasContent = value.length === 0
      ? recentSearches.length > 0
      : results.some((g) => g.items.length > 0);

    let itemCounter = -1;

    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              "react-cupertino-ui-spotlight__overlay",
              glass && "glass"
            )}
          />
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              "react-cupertino-ui-spotlight",
              glass && "glass",
              className
            )}
            onKeyDown={handleKeyDown}
            aria-label="Spotlight Search"
            {...rest}
          >
            <div className="react-cupertino-ui-spotlight__search">
              <Search className="search-icon" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="react-cupertino-ui-spotlight__input"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {loading && <div className="spinner" aria-label="Loading" />}
              {!loading && value.length > 0 && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="react-cupertino-ui-spotlight__content">
              {value.length === 0 && recentSearches.length > 0 && (
                <div className="react-cupertino-ui-spotlight__section">
                  <div className="section-header">
                    <span className="section-title">Recent Searches</span>
                    {onClearRecent && (
                      <button
                        type="button"
                        className="clear-recent"
                        onClick={onClearRecent}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <ul className="react-cupertino-ui-spotlight__list" role="listbox">
                    {recentSearches.map((search, index) => {
                      itemCounter++;
                      const isFocused = focusedIndex === itemCounter;
                      const currentIndex = itemCounter;
                      return (
                        <li key={`recent-${index}`} role="option" aria-selected={isFocused}>
                          <button
                            type="button"
                            className={cn(
                              "react-cupertino-ui-spotlight__item",
                              isFocused && "is-focused"
                            )}
                            onClick={() => onSelectRecent?.(search)}
                            onMouseEnter={() => setFocusedIndex(currentIndex)}
                          >
                            <Clock size={16} className="item-icon" />
                            <span className="item-title">{search}</span>
                            <ArrowRight size={14} className="item-arrow" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {value.length > 0 && results.map((group) => {
                if (group.items.length === 0) return null;
                return (
                  <div key={group.title} className="react-cupertino-ui-spotlight__section">
                    <div className="section-header">
                      <span className="section-title">{group.title}</span>
                    </div>
                    <ul className="react-cupertino-ui-spotlight__list" role="listbox">
                      {group.items.map((item) => {
                        itemCounter++;
                        const isFocused = focusedIndex === itemCounter;
                        const currentIndex = itemCounter;
                        return (
                          <li key={item.id} role="option" aria-selected={isFocused}>
                            <button
                              type="button"
                              className={cn(
                                "react-cupertino-ui-spotlight__item",
                                isFocused && "is-focused"
                              )}
                              onClick={() => {
                                item.onSelect?.();
                                onOpenChange(false);
                              }}
                              onMouseEnter={() => setFocusedIndex(currentIndex)}
                            >
                              {item.icon && (
                                <span className="item-icon">{item.icon}</span>
                              )}
                              <div className="item-content">
                                <span className="item-title">{item.title}</span>
                                {item.subtitle && (
                                  <span className="item-subtitle">{item.subtitle}</span>
                                )}
                              </div>
                              {item.category && (
                                <span className="item-category">{item.category}</span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}

              {value.length > 0 && !hasContent && !loading && (
                <div className="react-cupertino-ui-spotlight__empty">
                  <p>{emptyMessage}</p>
                </div>
              )}
            </div>

            <div className="react-cupertino-ui-spotlight__footer">
              <div className="keyboard-hints">
                <span className="hint">
                  <kbd>↑</kbd><kbd>↓</kbd> to navigate
                </span>
                <span className="hint">
                  <kbd>↵</kbd> to select
                </span>
                <span className="hint">
                  <kbd>esc</kbd> to close
                </span>
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

SpotlightSearch.displayName = "SpotlightSearch";

export { SpotlightSearch };
