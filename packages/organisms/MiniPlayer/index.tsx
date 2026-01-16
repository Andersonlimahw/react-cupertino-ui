import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Slider } from "@react-cupertino-ui/slider";

import "./index.scss";

export interface MiniPlayerProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  artwork: string;
  title: string;
  artist: string;
  progress?: number;
  duration?: number;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const MiniPlayer = React.forwardRef<HTMLDivElement, MiniPlayerProps>((props, ref) => {
  const {
    artwork,
    title,
    artist,
    progress = 0,
    duration = 100,
    onPlayPause,
    onNext,
    onPrev,
    className,
    ...rest
  } = props;

  const isPlaying = true;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-mini-player", className)} {...rest}>
      <img src={artwork} alt="Artwork" />
      <div className="react-cupertino-ui-mini-player__info">
        <strong>{title}</strong>
        <span>{artist}</span>
        <Slider value={progress} max={duration} className="react-cupertino-ui-mini-player__slider" />
      </div>
      <div className="react-cupertino-ui-mini-player__actions">
        <button type="button" onClick={onPrev} aria-label="Previous">
          ‹
        </button>
        <button type="button" onClick={onPlayPause} aria-label="Play/Pause">
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button type="button" onClick={onNext} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
});

MiniPlayer.displayName = "MiniPlayer";

export { MiniPlayer };
