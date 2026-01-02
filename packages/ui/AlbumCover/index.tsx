import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface AlbumCoverProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  artist?: string;
  artwork: string;
  status?: string;
  glow?: boolean;
  onPlay?: () => void;
}

const AlbumCover = React.forwardRef<HTMLDivElement, AlbumCoverProps>((props, ref) => {
  const { className, title, artist, artwork, status, glow = true, onPlay, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-album-cover", glow && "has-glow", className)}
      {...rest}
    >
      <div className="react-cupertino-ui-album-cover__artwork">
        <img src={artwork} alt={title} loading="lazy" />
        {glow ? <span className="glow" aria-hidden="true" /> : null}
        <button type="button" className="play" onClick={onPlay} aria-label="Play">
          ▶
        </button>
      </div>
      <div className="react-cupertino-ui-album-cover__meta">
        <p className="title">{title}</p>
        {artist ? <p className="artist">{artist}</p> : null}
        {status ? <p className="status">{status}</p> : null}
      </div>
    </div>
  );
});

AlbumCover.displayName = "AlbumCover";

export { AlbumCover };
