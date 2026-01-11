import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { ArrowUp } from "lucide-react";
import "./index.scss";

export interface MailComposerProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    isOpen: boolean;
    onClose: () => void;
    onSend: (data: { to: string; cc: string; subject: string; body: string }) => void;
    initialData?: {
        to?: string;
        cc?: string;
        subject?: string;
        body?: string;
    };
}

const MailComposer = React.forwardRef<HTMLDivElement, MailComposerProps>(({
    className,
    isOpen,
    onClose,
    onSend,
    initialData,
    ...props
}, ref) => {
    const [to, setTo] = React.useState(initialData?.to || "");
    const [cc, setCc] = React.useState(initialData?.cc || "");
    const [subject, setSubject] = React.useState(initialData?.subject || "");
    const [body, setBody] = React.useState(initialData?.body || "");
    const [isCcVisible, setIsCcVisible] = React.useState(!!initialData?.cc);

    React.useEffect(() => {
        if (isOpen) {
            // document.body.style.overflow = "hidden";
        } else {
            // document.body.style.overflow = "";
        }
        return () => {
            // document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSend = () => {
        onSend({ to, cc, subject, body });
    };

    return (
        <div
            ref={ref}
            className={cn("react-cupertino-ui-mail-composer", className)}
            role="dialog"
            aria-modal="true"
            {...props}
        >
            <div className="composer-header">
                <button className="cancel-button" onClick={onClose}>Cancel</button>
                <span className="title">New Message</span>
                <button
                    className="send-button"
                    onClick={handleSend}
                    disabled={!to}
                >
                    <ArrowUp size={20} fill="currentColor" />
                </button>
            </div>

            <div className="composer-fields">
                <div className="field-row">
                    <label htmlFor="to-field">To:</label>
                    <input
                        id="to-field"
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="ghost-input"
                    />
                    <button
                        className="details-toggle"
                        onClick={() => setIsCcVisible(!isCcVisible)}
                        aria-label="Show Cc/Bcc"
                    >
                        {isCcVisible ? "Hide" : "Cc/Bcc"}
                    </button>
                </div>

                {isCcVisible && (
                    <div className="field-row animate-in">
                        <label htmlFor="cc-field">Cc:</label>
                        <input
                            id="cc-field"
                            type="text"
                            value={cc}
                            onChange={(e) => setCc(e.target.value)}
                            className="ghost-input"
                        />
                    </div>
                )}

                <div className="field-row">
                    <label htmlFor="subject-field">Subject:</label>
                    <input
                        id="subject-field"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="ghost-input"
                    />
                </div>

                <textarea
                    className="body-input"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder=""
                />
            </div>
        </div>
    );
});

MailComposer.displayName = "MailComposer";

export { MailComposer };
