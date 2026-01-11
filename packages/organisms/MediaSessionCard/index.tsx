import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface MediaSessionTrack {
  id: string;
  title: string;
  artist?: string;
  duration?: string;
  active?: boolean;
}

export interface MediaSessionCardProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  artwork: string;
  title: string;
  subtitle?: string;
  tracks?: MediaSessionTrack[];
}

const MediaSessionCard = React.forwardRef<HTMLDivElement, MediaSessionCardProps>((props, ref) => {
  const { className, artwork, title, subtitle, tracks = [], ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-media-session-card", className)} {...rest}>
      <div className="hero">
        <img src={artwork} alt="Artwork" />
        <div>
          <p className="title">{title}</p>
          {subtitle ? <p className="subtitle">{subtitle}</p> : null}
        </div>
      </div>
      <div className="list">
        {tracks.map((track) => (
          <div key={track.id} className={cn("track", track.active && "is-active")}
          >
            <div>
              <p className="track-title">{track.title}</p>
              {track.artist ? <p className="track-artist">{track.artist}</p> : null}
            </div>
            {track.duration ? <span className="track-duration">{track.duration}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
});

MediaSessionCard.displayName = "MediaSessionCard";

export { MediaSessionCard };
