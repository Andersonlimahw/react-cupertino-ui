import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Button } from "@react-cupertino-ui/button";

import "./index.scss";

export interface MailDetailTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  subject: string;
  from: string;
  to: string;
  timestamp?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const MailDetailTemplate = React.forwardRef<HTMLDivElement, MailDetailTemplateProps>((props, ref) => {
  const { subject, from, to, timestamp, children, actions, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-mail-detail", className)} {...rest}>
      <header className="react-cupertino-ui-mail-detail__header">
        <div>
          <h1>{subject}</h1>
          <p>
            <strong>From:</strong> {from}
          </p>
          <p>
            <strong>To:</strong> {to}
          </p>
          {timestamp ? <time>{timestamp}</time> : null}
        </div>
        <div className="react-cupertino-ui-mail-detail__actions">
          {actions || (
            <>
              <Button variant="outline">Reply</Button>
              <Button variant="ghost">Archive</Button>
            </>
          )}
        </div>
      </header>
      <section className="react-cupertino-ui-mail-detail__content">{children}</section>
    </div>
  );
});

MailDetailTemplate.displayName = "MailDetailTemplate";

export { MailDetailTemplate };
