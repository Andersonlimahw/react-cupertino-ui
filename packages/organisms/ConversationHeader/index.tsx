import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type ConversationPresence = "online" | "away" | "busy" | "offline";

const presenceLabels: Record<ConversationPresence, string> = {
  online: "Online",
  away: "Away",
  busy: "Do Not Disturb",
  offline: "Offline",
};

export interface ConversationHeaderProps extends BaseProps<HTMLDivElement> {
  title: string;
  subtitle?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: React.ReactNode;
  status?: ConversationPresence;
  statusText?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}

const ConversationHeader = React.forwardRef<HTMLDivElement, ConversationHeaderProps>(
  (props, ref) => {
    const {
      title,
      subtitle,
      avatarSrc,
      avatarAlt = title,
      avatarFallback,
      status,
      statusText,
      meta,
      actions,
      className,
      variant,
      size,
      asChild = false,
      children,
      ...rest
    } = props;

    const Comp = asChild ? Slot : "header";

    const classes = BaseVariants(
      "react-cupertino-ui-conversation-header",
      {
        className,
        variant,
        size,
      }
    );

    const resolvedStatus = status ? presenceLabels[status] : undefined;

    return (
      <Comp
        ref={ref}
        className={cn(classes, status && `has-status-${status}`)}
        {...rest}
      >
        <div className="react-cupertino-ui-conversation-header__info">
          {(avatarSrc || avatarFallback) && (
            <span className="react-cupertino-ui-conversation-header__avatar">
              {avatarSrc ? (
                <img src={avatarSrc} alt={avatarAlt} />
              ) : (
                avatarFallback
              )}
            </span>
          )}

          <div className="react-cupertino-ui-conversation-header__text">
            <div className="react-cupertino-ui-conversation-header__title-row">
              <span className="react-cupertino-ui-conversation-header__title">{title}</span>
              {meta ? (
                <span className="react-cupertino-ui-conversation-header__meta">{meta}</span>
              ) : null}
            </div>

            {subtitle ? (
              <p className="react-cupertino-ui-conversation-header__subtitle">{subtitle}</p>
            ) : null}

            {status || statusText ? (
              <div className="react-cupertino-ui-conversation-header__status">
                {status ? (
                  <span
                    className={cn(
                      "react-cupertino-ui-conversation-header__status-indicator",
                      `is-${status}`
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <span>{statusText || resolvedStatus}</span>
              </div>
            ) : null}

            {children ? (
              <div className="react-cupertino-ui-conversation-header__extra">{children}</div>
            ) : null}
          </div>
        </div>

        {actions ? (
          <div className="react-cupertino-ui-conversation-header__actions">{actions}</div>
        ) : null}
      </Comp>
    );
  }
);

ConversationHeader.displayName = "ConversationHeader";

export { ConversationHeader };
export default ConversationHeader;
