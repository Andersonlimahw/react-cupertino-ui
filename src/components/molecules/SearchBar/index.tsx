import * as React from "react";
import { Search, X, Mic } from "lucide-react";

import { cn } from "@/lib/utils";
import "./index.scss";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue?: (value: string) => void;
  onCancel?: () => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  cancelLabel?: string;
  loading?: boolean;
  glass?: boolean;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  showVoice?: boolean;
  onVoicePress?: () => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      value,
      onChangeValue,
      onCancel,
      onSearch,
      placeholder = "Search",
      cancelLabel = "Cancel",
      loading = false,
      glass = true,
      suggestions = [],
      onSelectSuggestion,
      showVoice = true,
      onVoicePress,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeValue?.(e.target.value);
    };

    const handleClear = () => {
      onChangeValue?.("");
      inputRef.current?.focus();
    };

    const handleCancel = () => {
      onChangeValue?.("");
      setIsFocused(false);
      onCancel?.();
      inputRef.current?.blur();
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(value);
      }
      props.onKeyDown?.(e);
    };
    
    // We handle blur via a click outside listener or just keep it simple.
    // iOS behavior: Cancel button appears when focused.
    
    const showCancel = isFocused || (value && value.length > 0);

    return (
      <div
        className={cn(
          "react-cupertino-ui-search-bar",
          glass && "glass",
          isFocused && "is-focused",
          className
        )}
      >
        <div className="react-cupertino-ui-search-bar__container">
          <div className="react-cupertino-ui-search-bar__input-wrapper">
            <Search className="search-icon" size={16} />
            <input
              ref={inputRef}
              type="text"
              className="react-cupertino-ui-search-bar__input"
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onBlur={(e) => {
                  props.onBlur?.(e);
                  // We don't set isFocused false here immediately to allow interactions
                  // But standard behavior is: Cancel button stays until 'Cancel' is pressed or user manually cancels?
                  // Actually on iOS, 'Cancel' button is always there if focused. If user clicks 'Cancel', it blurs.
                  // If user clicks outside, it might blur but 'Cancel' button usually hides only if text is empty?
                  // Let's rely on manual Cancel press for hiding the button fully effectively in this UI pattern
              }}
              placeholder={placeholder}
              {...props}
            />
            {loading && <div className="spinner" />}
            {!loading && value.length > 0 && (
              <button type="button" className="clear-button" onClick={handleClear}>
                <X size={12} fill="currentColor" />
              </button>
            )}
            {!loading && value.length === 0 && showVoice && (
                <button type="button" className="voice-button" onClick={onVoicePress}>
                    <Mic size={16} />
                </button>
            )}
          </div>
          
          <button
            type="button"
            className="react-cupertino-ui-search-bar__cancel"
            onClick={handleCancel}
            tabIndex={showCancel ? 0 : -1}
          >
            {cancelLabel}
          </button>
        </div>

        {isFocused && suggestions.length > 0 && (
          <div className="react-cupertino-ui-search-bar__suggestions">
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="suggestion-item"
                    onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur
                        onSelectSuggestion?.(suggestion);
                    }}
                  >
                    <Search size={14} className="suggestion-icon" />
                    <span>{suggestion}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
