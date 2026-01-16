import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export type ReadReceiptStatus = "sending" | "sent" | "delivered" | "read" | "failed";

export interface ReadReceiptProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    status: ReadReceiptStatus;
    timestamp?: Date;
    showTimestamp?: boolean;
}

const ReadReceipt = React.forwardRef<HTMLDivElement, ReadReceiptProps>(({
    className,
    status,
    timestamp,
    showTimestamp = true,
    ...props
}, ref) => {

    const label = React.useMemo(() => {
        if (status === "read" && timestamp && showTimestamp) {
            return `Read ${timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        }
        switch (status) {
            case "sending": return "Sending...";
            case "sent": return "Sent";
            case "delivered": return "Delivered";
            case "read": return "Read";
            case "failed": return "Not Delivered";
            default: return "";
        }
    }, [status, timestamp, showTimestamp]);

    return (
        <div
            ref={ref}
            className={cn(
                "react-cupertino-ui-read-receipt",
                `status-${status}`,
                className
            )}
            role="status"
            {...props}
        >
            {label}
        </div>
    );
});

ReadReceipt.displayName = "ReadReceipt";

export { ReadReceipt };
