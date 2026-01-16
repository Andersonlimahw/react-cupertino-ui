import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import "./index.scss";

export interface VolumeControlProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    volume: number; // 0 to 1
    onVolumeChange?: (volume: number) => void;
    muted?: boolean;
}

const VolumeControl = React.forwardRef<HTMLDivElement, VolumeControlProps>(({
    className,
    volume,
    onVolumeChange,
    muted = false,
    ...props
}, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragVolume, setDragVolume] = React.useState(volume);
    const sliderRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!isDragging) {
            setDragVolume(volume);
        }
    }, [volume, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        updateVolumeFromClientX(e.clientX);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        updateVolumeFromClientX(e.clientX);
    };

    const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Final commit
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            onVolumeChange?.(percentage);
        }
    };

    const updateVolumeFromClientX = (clientX: number) => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            setDragVolume(percentage);
            // Optional: Real-time update
            // onVolumeChange?.(percentage);
        }
    };

    const displayVolume = muted ? 0 : (isDragging ? dragVolume : volume);
    const percentage = displayVolume * 100;

    const VolumeIcon = () => {
        if (muted || displayVolume === 0) return <VolumeX size={18} />;
        if (displayVolume < 0.3) return <Volume size={18} />;
        if (displayVolume < 0.7) return <Volume1 size={18} />;
        return <Volume2 size={18} />;
    };

    return (
        <div
            ref={ref}
            className={cn("react-cupertino-ui-volume-control", className)}
            {...props}
        >
            <div className="icon start">
                <VolumeIcon />
            </div>

            <div
                className="slider-container"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
            >
                <div className="track">
                    <div
                        className="fill"
                        style={{ width: `${percentage}%` }}
                    />
                    <div
                        className="thumb"
                        style={{ left: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="icon end">
                <Volume2 size={16} />
            </div>
        </div>
    );
});

VolumeControl.displayName = "VolumeControl";

export { VolumeControl };
