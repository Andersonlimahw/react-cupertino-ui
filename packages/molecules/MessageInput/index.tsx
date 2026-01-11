import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface MessageInputProps extends BaseProps<HTMLDivElement> {
  value?: string;
  placeholder?: string;
  onSend?: (value: string) => void;
}

const MessageInput = React.forwardRef<HTMLDivElement, MessageInputProps>((props, ref) => {
  const { className, value, placeholder = "Message", onSend, ...rest } = props;
  const [internalValue, setInternalValue] = React.useState(value ?? "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSend?.(internalValue);
    setInternalValue("");
  };

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-message-input", className)} {...rest}>
      <form onSubmit={handleSubmit}>
        <input
          value={currentValue}
          onChange={(event) => {
            if (!isControlled) setInternalValue(event.target.value);
          }}
          placeholder={placeholder}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
});

MessageInput.displayName = "MessageInput";

export { MessageInput };
