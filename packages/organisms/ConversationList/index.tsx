import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface ConversationListItem {
  id: string;
  avatar: string;
  name: string;
  preview: string;
  timestamp?: string;
  unread?: boolean;
}

export interface ConversationListProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  items: ConversationListItem[];
  onSelect?: (id: string) => void;
}

const ConversationList = React.forwardRef<HTMLDivElement, ConversationListProps>((props, ref) => {
  const { items, onSelect, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-conversation-list", className)} {...rest}>
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          className={cn("react-cupertino-ui-conversation-list__item", item.unread && "is-unread")}
          onClick={() => onSelect?.(item.id)}
        >
          <img src={item.avatar} alt="" />
          <div>
            <strong>{item.name}</strong>
            <p>{item.preview}</p>
          </div>
          {item.timestamp ? <span className="timestamp">{item.timestamp}</span> : null}
        </button>
      ))}
    </div>
  );
});

ConversationList.displayName = "ConversationList";

export { ConversationList };
