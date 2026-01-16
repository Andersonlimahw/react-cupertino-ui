import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { SuggestionChip } from "@react-cupertino-ui/suggestion-chip";

import "./index.scss";

export interface AIPromptInputProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  suggestions?: string[];
  attachments?: boolean;
  helperText?: string;
}

const AIPromptInput = React.forwardRef<HTMLDivElement, AIPromptInputProps>((props, ref) => {
  const {
    className,
    value,
    onChange,
    onSubmit,
    placeholder = "Ask Apple Intelligence...",
    disabled = false,
    loading = false,
    suggestions,
    attachments = false,
    helperText,
    ...rest
  } = props;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const resizeTextarea = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, []);

  React.useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitPrompt();
    }
  };

  const submitPrompt = () => {
    const trimmed = value.trim();
    if (!trimmed || loading || disabled) return;
    onSubmit(trimmed);
  };

  const handleSuggestion = (suggestion: string) => {
    onChange(suggestion);
    onSubmit(suggestion);
  };

  const canSubmit = Boolean(value.trim()) && !loading && !disabled;

  return (
    <div
      ref={containerRef}
      className={cn("react-cupertino-ui-ai-prompt-input", className)}
      data-disabled={disabled || undefined}
      {...rest}
    >
      <div className="react-cupertino-ui-ai-prompt-input__shell">
        {attachments ? (
          <button
            type="button"
            className="react-cupertino-ui-ai-prompt-input__attachment"
            aria-label="Add attachment"
            disabled={disabled || loading}
          >
            <span aria-hidden="true" />
          </button>
        ) : null}
        <textarea
          ref={textareaRef}
          className="react-cupertino-ui-ai-prompt-input__textarea"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
        />
        <button
          type="button"
          className="react-cupertino-ui-ai-prompt-input__submit"
          aria-label="Send prompt"
          onClick={submitPrompt}
          disabled={!canSubmit}
          data-loading={loading ? "true" : undefined}
        >
          {loading ? <span className="spinner" aria-hidden="true" /> : <span aria-hidden="true" />}
        </button>
      </div>
      {helperText ? (
        <p className="react-cupertino-ui-ai-prompt-input__helper">{helperText}</p>
      ) : null}
      {suggestions && suggestions.length > 0 ? (
        <div className="react-cupertino-ui-ai-prompt-input__suggestions">
          {suggestions.map((suggestion) => (
            <SuggestionChip
              key={suggestion}
              size="sm"
              variant="glass"
              onClick={() => handleSuggestion(suggestion)}
            >
              {suggestion}
            </SuggestionChip>
          ))}
        </div>
      ) : null}
    </div>
  );
});

AIPromptInput.displayName = "AIPromptInput";

export { AIPromptInput };
