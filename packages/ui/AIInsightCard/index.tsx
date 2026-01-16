import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface AIInsightCardProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
}

const AIInsightCard = React.forwardRef<HTMLDivElement, AIInsightCardProps>((props, ref) => {
  const { className, title, description, badge, actions, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-ai-insight-card", className)} {...rest}>
      {badge ? <span className="badge">{badge}</span> : null}
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {actions ? <div className="actions">{actions}</div> : null}
    </div>
  );
});

AIInsightCard.displayName = "AIInsightCard";

export { AIInsightCard };
