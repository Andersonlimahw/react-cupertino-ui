import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface SuggestionBarProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  suggestions: string[];
  onSelect?: (value: string) => void;
}

const SuggestionBar = React.forwardRef<HTMLDivElement, SuggestionBarProps>((props, ref) => {
  const { className, suggestions, onSelect, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-suggestion-bar", className)} {...rest}>
      {suggestions.map((suggestion) => (
        <button key={suggestion} type="button" onClick={() => onSelect?.(suggestion)}>
          {suggestion}
        </button>
      ))}
    </div>
  );
});

SuggestionBar.displayName = "SuggestionBar";

export { SuggestionBar };
