import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface ReactionPickerProps
  extends Omit<BaseProps<HTMLDivElement>, "children" | "variant" | "size"> {
  reactions?: string[];
  onSelect?: (reaction: string) => void;
}

const defaultReactions = ["❤️", "👍", "😂", "😮", "😢", "🔥"];

const ReactionPicker = React.forwardRef<HTMLDivElement, ReactionPickerProps>((props, ref) => {
  const { reactions = defaultReactions, onSelect, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-reaction-picker", className)} {...rest}>
      {reactions.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect?.(emoji)}
          aria-label={`React with ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
});

ReactionPicker.displayName = "ReactionPicker";

export { ReactionPicker };
