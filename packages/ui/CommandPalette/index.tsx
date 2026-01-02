import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface CommandPaletteAction {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandPaletteProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  actions: CommandPaletteAction[];
  placeholder?: string;
  glass?: boolean;
  highlightMatches?: boolean;
}

const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>((props, ref) => {
  const {
    open,
    onClose,
    query,
    onQueryChange,
    actions,
    placeholder = "Type a command",
    glass = true,
    highlightMatches = true,
    className,
    ...rest
  } = props;

  const listRef = React.useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = React.useState(0);

  React.useEffect(() => {
    setHighlighted(0);
  }, [query, actions.length]);

  const filteredActions = React.useMemo(() => {
    if (!query.trim()) {
      return actions;
    }
    const lower = query.toLowerCase();
    return actions.filter((action) => action.label.toLowerCase().includes(lower));
  }, [actions, query]);

  const highlightLabel = (label: string) => {
    if (!highlightMatches || !query.trim()) {
      return label;
    }
    const lower = query.toLowerCase();
    const index = label.toLowerCase().indexOf(lower);
    if (index === -1) {
      return label;
    }
    return (
      <>
        {label.slice(0, index)}
        <mark>{label.slice(index, index + lower.length)}</mark>
        {label.slice(index + lower.length)}
      </>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((prev) => Math.min(prev + 1, filteredActions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      filteredActions[highlighted]?.onSelect?.();
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="react-cupertino-ui-command-palette__backdrop" onClick={onClose}>
      <div
        ref={ref}
        className={cn("react-cupertino-ui-command-palette", glass && "glass", className)}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...rest}
      >
        <div className="react-cupertino-ui-command-palette__input">
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
            aria-label="Search commands"
            autoFocus
          />
          <kbd>⌘K</kbd>
        </div>
        <div className="react-cupertino-ui-command-palette__list" ref={listRef}>
          {filteredActions.length === 0 ? (
            <p className="react-cupertino-ui-command-palette__empty">No commands found.</p>
          ) : (
            filteredActions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                className={cn(
                  "react-cupertino-ui-command-palette__item",
                  highlighted === index && "is-active",
                  action.disabled && "is-disabled"
                )}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => {
                  if (action.disabled) return;
                  action.onSelect?.();
                  onClose();
                }}
              >
                <div>
                  <p className="label">{highlightLabel(action.label)}</p>
                  {action.description ? (
                    <p className="description">{action.description}</p>
                  ) : null}
                </div>
                {action.shortcut ? <span className="shortcut">{action.shortcut}</span> : null}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
});

CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
