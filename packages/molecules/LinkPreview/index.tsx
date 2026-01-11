import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export interface LinkPreviewProps extends Omit<BaseProps<HTMLAnchorElement>, "children"> {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    domain?: string;
}

const LinkPreview = React.forwardRef<HTMLAnchorElement, LinkPreviewProps>(({
    className,
    url,
    title,
    description,
    image,
    domain,
    ...props
}, ref) => {

    const displayDomain = domain || new URL(url).hostname;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
            className={cn("react-cupertino-ui-link-preview", className)}
            {...props}
        >
            {image && (
                <div className="preview-image">
                    <img src={image} alt="" role="presentation" />
                </div>
            )}
            <div className="preview-content">
                {title && <h4 className="preview-title">{title}</h4>}
                {description && <p className="preview-description">{description}</p>}
                <span className="preview-domain">{displayDomain}</span>
            </div>
        </a>
    );
});

LinkPreview.displayName = "LinkPreview";

export { LinkPreview };
