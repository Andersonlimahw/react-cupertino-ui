import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface SplitViewTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  sidebarWidth?: number;
}

const SplitViewTemplate = React.forwardRef<HTMLDivElement, SplitViewTemplateProps>((props, ref) => {
  const { sidebar, content, sidebarWidth = 320, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-split-view", className)} {...rest}>
      <aside className="react-cupertino-ui-split-view__sidebar" style={{ width: sidebarWidth }}>
        {sidebar}
      </aside>
      <main className="react-cupertino-ui-split-view__content">{content}</main>
    </div>
  );
});

SplitViewTemplate.displayName = "SplitViewTemplate";

export { SplitViewTemplate };
