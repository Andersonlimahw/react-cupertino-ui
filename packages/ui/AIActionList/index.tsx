import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface AIActionListItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
}

export interface AIActionListProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  items: AIActionListItem[];
  onSelect?: (item: AIActionListItem) => void;
}

const AIActionList = React.forwardRef<HTMLDivElement, AIActionListProps>((props, ref) => {
  const { className, items, onSelect, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-ai-action-list", className)} {...rest}>
      {items.map((item) => (
        <button key={item.id} type="button" className="action" onClick={() => onSelect?.(item)}>
          {item.icon ? <span className="icon" aria-hidden="true">{item.icon}</span> : null}
          <div>
            <p className="label">{item.label}</p>
            {item.description ? <p className="description">{item.description}</p> : null}
          </div>
          {item.shortcut ? <span className="shortcut">{item.shortcut}</span> : null}
        </button>
      ))}
    </div>
  );
});

AIActionList.displayName = "AIActionList";

export { AIActionList };
