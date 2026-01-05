import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export interface ProgressSliderProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    currentTime: number;
    duration: number;
    onSeek?: (time: number) => void;
    formatTime?: (seconds: number) => string;
}

const ProgressSlider = React.forwardRef<HTMLDivElement, ProgressSliderProps>(({
    className,
    currentTime,
    duration,
    onSeek,
    formatTime,
    ...props
}, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragTime, setDragTime] = React.useState(currentTime);
    const progressBarRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!isDragging) {
            setDragTime(currentTime);
        }
    }, [currentTime, isDragging]);

    const defaultFormatTime = (seconds: number) => {
        if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        updateTimeFromClientX(e.clientX);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        updateTimeFromClientX(e.clientX);
    };

    const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Final seek update
        if (progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            onSeek?.(percentage * duration);
        }
    };

    const updateTimeFromClientX = (clientX: number) => {
        if (progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            setDragTime(percentage * duration);
        }
    };

    const displayTime = isDragging ? dragTime : currentTime;
    const progressPercentage = duration > 0 ? (displayTime / duration) * 100 : 0;
    const formatter = formatTime || defaultFormatTime;

    return (
        <div
            ref={ref}
            className={cn("react-cupertino-ui-progress-slider", className)}
            {...props}
        >
            <div
                className="progress-bar-container"
                ref={progressBarRef}
                onMouseDown={handleMouseDown}
            >
                <div className="track">
                    <div
                        className="fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                    <div
                        className="thumb"
                        style={{ left: `${progressPercentage}%` }}
                    />
                </div>
            </div>
            <div className="time-labels">
                <span className="current-time">{formatter(displayTime)}</span>
                <span className="duration">-{formatter(duration - displayTime)}</span>
            </div>
        </div>
    );
});

ProgressSlider.displayName = "ProgressSlider";

export { ProgressSlider };
