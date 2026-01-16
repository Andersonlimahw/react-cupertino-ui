import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface VoiceCommandBarProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  suggestions?: string[];
  listening?: boolean;
}

const VoiceCommandBar = React.forwardRef<HTMLDivElement, VoiceCommandBarProps>((props, ref) => {
  const { className, placeholder = "Ask Siri...", onSubmit, suggestions, listening = false, ...rest } = props;
  const [value, setValue] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.(value);
    setValue("");
  };

  return (
    <div ref={ref} className={cn("react-cupertino-ui-voice-command-bar", listening && "is-listening", className)} {...rest}>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          aria-label="Voice command"
        />
        <button type="submit" aria-label="Submit">
          ▶
        </button>
      </form>
      {suggestions && suggestions.length > 0 ? (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => onSubmit?.(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
});

VoiceCommandBar.displayName = "VoiceCommandBar";

export { VoiceCommandBar };
