import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Play, Pause } from "lucide-react";
import "./index.scss";

export interface AudioMessageProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    duration: number | string; // seconds or formatted string
    isPlaying?: boolean;
    onPlayPause?: () => void;
}

const AudioMessage = React.forwardRef<HTMLDivElement, AudioMessageProps>(({
    className,
    duration,
    isPlaying = false,
    onPlayPause,
    ...props
}, ref) => {

    // Format duration if it's a number
    const formattedDuration = React.useMemo(() => {
        if (typeof duration === "string") return duration;
        const mins = Math.floor(duration / 60);
        const secs = Math.floor(duration % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, [duration]);

    const handlePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        onPlayPause?.();
    };

    return (
        <div
            ref={ref}
            className={cn("react-cupertino-ui-audio-message", isPlaying && "is-playing", className)}
            {...props}
        >
            <button
                type="button"
                className="play-button"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>

            <div className="waveform-container">
                {/* Fake waveform bars for visual representation */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.05}s` }} />
                ))}
            </div>

            <span className="duration">{formattedDuration}</span>
        </div>
    );
});

AudioMessage.displayName = "AudioMessage";

export { AudioMessage };
