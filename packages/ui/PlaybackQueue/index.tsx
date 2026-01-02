import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface PlaybackQueueItem {
  id: string;
  title: string;
  artist?: string;
  duration?: string;
  artwork?: string;
  playing?: boolean;
}

export interface PlaybackQueueProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  items: PlaybackQueueItem[];
  onSelect?: (item: PlaybackQueueItem) => void;
  currentId?: string;
}

const PlaybackQueue = React.forwardRef<HTMLDivElement, PlaybackQueueProps>((props, ref) => {
  const { className, items, onSelect, currentId, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-playback-queue", className)} {...rest}>
      <ol>
        {items.map((item) => {
          const playing = item.playing || item.id === currentId;
          return (
            <li key={item.id} className={cn("react-cupertino-ui-playback-queue__item", playing && "is-playing")}
              role="button"
              onClick={() => onSelect?.(item)}
            >
              {item.artwork ? (
                <img src={item.artwork} alt="" aria-hidden="true" />
              ) : (
                <span className="placeholder" aria-hidden="true" />
              )}
              <div className="meta">
                <p className="title">{item.title}</p>
                {item.artist ? <p className="artist">{item.artist}</p> : null}
              </div>
              <div className="duration">{playing ? "Now" : item.duration}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
});

PlaybackQueue.displayName = "PlaybackQueue";

export { PlaybackQueue };
