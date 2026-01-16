import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Button } from "@react-cupertino-ui/button";

import "./index.scss";

export interface EmptyStateTemplateProps
  extends Omit<BaseProps<HTMLDivElement>, "children" | "variant" | "size"> {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const EmptyStateTemplate = React.forwardRef<HTMLDivElement, EmptyStateTemplateProps>((props, ref) => {
  const { icon, title, description, action, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-empty-state", className)} {...rest}>
      <div className="react-cupertino-ui-empty-state__icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? (
        <Button onClick={action.onPress}>{action.label}</Button>
      ) : null}
    </div>
  );
});

EmptyStateTemplate.displayName = "EmptyStateTemplate";

export { EmptyStateTemplate };
