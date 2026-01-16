import * as React from "react";
import { Heart } from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface NowPlayingBarProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  artwork: string;
  title: string;
  artist?: string;
  album?: string;
  progress?: number; // 0-1
  duration?: string;
  currentTime?: string;
  liked?: boolean;
  onLikeToggle?: () => void;
  onExpand?: () => void;
}

const clampProgress = (value?: number) => {
  if (value === undefined) return 0;
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
};

const NowPlayingBar = React.forwardRef<HTMLDivElement, NowPlayingBarProps>((props, ref) => {
  const {
    className,
    artwork,
    title,
    artist,
    album,
    progress,
    duration,
    currentTime,
    liked = false,
    onLikeToggle,
    onExpand,
    ...rest
  } = props;

  const percent = clampProgress(progress) * 100;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-now-playing-bar", className)} {...rest}>
      <button type="button" className="artwork" onClick={onExpand} aria-label="Expand player">
        <img src={artwork} alt="Album artwork" />
      </button>
      <div className="meta">
        <p className="title">{title}</p>
        <p className="artist">{artist}</p>
        {album ? <p className="album">{album}</p> : null}
        <div className="progress">
          <span className="progress-track">
            <span className="progress-fill" style={{ width: `${percent}%` }} />
          </span>
          <div className="timestamps">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cn("like", liked && "is-liked")}
        onClick={onLikeToggle}
        aria-label={liked ? "Unlike" : "Like"}
      >
        <Heart size={18} />
      </button>
    </div>
  );
});

NowPlayingBar.displayName = "NowPlayingBar";

export { NowPlayingBar };
