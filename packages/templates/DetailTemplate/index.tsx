import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface DetailTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  subtitle?: string;
  hero?: React.ReactNode;
  metadata?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const DetailTemplate = React.forwardRef<HTMLDivElement, DetailTemplateProps>((props, ref) => {
  const { title, subtitle, hero, metadata, actions, children, footer, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-detail-template", className)} {...rest}>
      {hero ? <div className="react-cupertino-ui-detail-template__hero">{hero}</div> : null}
      <header className="react-cupertino-ui-detail-template__header">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
          {metadata ? (
            <div className="react-cupertino-ui-detail-template__metadata">{metadata}</div>
          ) : null}
        </div>
        {actions ? <div className="react-cupertino-ui-detail-template__actions">{actions}</div> : null}
      </header>
      <section className="react-cupertino-ui-detail-template__content">{children}</section>
      {footer ? <footer className="react-cupertino-ui-detail-template__footer">{footer}</footer> : null}
    </div>
  );
});

DetailTemplate.displayName = "DetailTemplate";

export { DetailTemplate };
