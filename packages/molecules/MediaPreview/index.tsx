import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export interface MediaPreviewProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    src: string;
    type?: "image" | "video";
    alt?: string;
    poster?: string;
    aspectRatio?: number;
}

const MediaPreview = React.forwardRef<HTMLDivElement, MediaPreviewProps>(({
    className,
    src,
    type = "image",
    alt = "Media preview",
    poster,
    aspectRatio,
    ...props
}, ref) => {

    const style = aspectRatio ? {
        aspectRatio: `${aspectRatio}`,
    } as React.CSSProperties : undefined;

    return (
        <div
            ref={ref}
            className={cn(
                "react-cupertino-ui-media-preview",
                `type-${type}`,
                className
            )}
            style={style}
            {...props}
        >
            {type === "video" ? (
                <div className="video-container">
                    <video src={src} poster={poster} controls playsInline />
                    <div className="play-overlay">
                        <span className="play-icon">▶</span>
                    </div>
                </div>
            ) : (
                <img src={src} alt={alt} loading="lazy" />
            )}
        </div>
    );
});

MediaPreview.displayName = "MediaPreview";

export { MediaPreview };
