import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { List, ListItem } from "@react-cupertino-ui/list";
import { SwipeActions } from "@react-cupertino-ui/swipe-actions";
import { Flag, Trash, Mail, MailOpen } from "lucide-react";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export interface Email {
    id: string;
    sender: string;
    subject: string;
    preview: string;
    date: string;
    unread: boolean;
    flagged?: boolean;
}

export interface MailListProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    emails: Email[];
    onEmailSelect?: (email: Email) => void;
    onDelete?: (email: Email) => void;
    onFlag?: (email: Email) => void;
    onToggleRead?: (email: Email) => void;
}

const MailList = React.forwardRef<HTMLDivElement, MailListProps>(({
    className,
    emails,
    onEmailSelect,
    onDelete,
    onFlag,
    onToggleRead,
    ...props
}, ref) => {

    return (
        <div
            ref={ref}
            className={cn("react-cupertino-ui-mail-list", className)}
            {...props}
        >
            <List>
                {emails.map((email) => {
                    const startActions = [
                        {
                            label: email.unread ? "Read" : "Unread",
                            icon: email.unread ? <MailOpen /> : <Mail />,
                            color: "primary" as const,
                            onClick: () => onToggleRead?.(email)
                        }
                    ];

                    const endActions = [
                        {
                            label: "Flag",
                            icon: <Flag fill={email.flagged ? "currentColor" : "none"} />,
                            color: "orange" as const, // Apple Mail orange for flag, mapped to custom in SCSS usually
                            onClick: () => onFlag?.(email)
                        },
                        {
                            label: "Trash",
                            icon: <Trash />,
                            color: "danger" as const,
                            onClick: () => onDelete?.(email)
                        }
                    ];

                    const content = (
                        <div className="mail-content">
                            <div className="header">
                                <span className={cn("sender", email.unread && "unread")}>{email.sender}</span>
                                <span className="date">{email.date}</span>
                            </div>
                            <div className="subject">{email.subject}</div>
                            <div className="preview">{email.preview}</div>
                            {email.flagged && <div className="flag-indicator"><Flag size={12} fill="currentColor" /></div>}
                        </div>
                    );

                    return (
                        <div key={email.id} className="mail-item-wrapper">
                            <SwipeActions
                                startActions={startActions}
                                endActions={endActions}
                            >
                                <ListItem
                                    className="mail-item"
                                    title="" // Custom content rendered as children or specific layout
                                    onClick={() => onEmailSelect?.(email)}
                                >
                                    {content}
                                </ListItem>
                            </SwipeActions>
                        </div>
                    );
                })}
            </List>
        </div>
    );
});

MailList.displayName = "MailList";

export { MailList };
