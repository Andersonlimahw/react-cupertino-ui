import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { List, ListItem } from "@react-cupertino-ui/list";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export interface Track {
    id: string;
    title: string;
    artist: string;
    duration?: string;
    artwork?: string;
}

export interface TrackListProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    tracks: Track[];
    activeTrackId?: string;
    onTrackSelect?: (track: Track) => void;
    showIndex?: boolean;
    showArtwork?: boolean;
}

const TrackList = React.forwardRef<HTMLDivElement, TrackListProps>(({
    className,
    tracks,
    activeTrackId,
    onTrackSelect,
    showIndex = true,
    showArtwork = false,
    ...props
}, ref) => {

    return (
        <div
            ref={ref}
            className={cn("react-cupertino-ui-track-list", className)}
            {...props}
        >
            <List>
                {tracks.map((track, index) => {
                    const isActive = track.id === activeTrackId;

                    const iconContent = (
                        <div className="track-prefix">
                            {isActive ? (
                                <div className="playing-indicator">
                                    <span className="bar" /><span className="bar" /><span className="bar" />
                                </div>
                            ) : (
                                <span className="track-index">{showIndex ? index + 1 : ""}</span>
                            )}
                            {showArtwork && track.artwork && (
                                <img src={track.artwork} alt="" className="track-artwork" />
                            )}
                        </div>
                    );

                    return (
                        <ListItem
                            key={track.id}
                            className={cn("track-item", isActive && "is-active")}
                            icon={iconContent}
                            title={track.title}
                            subtitle={track.artist}
                            rightContent={<span className="track-duration">{track.duration}</span>}
                            onClick={() => onTrackSelect?.(track)}
                        />
                    );
                })}
            </List>
        </div>
    );
});

TrackList.displayName = "TrackList";

export { TrackList };
