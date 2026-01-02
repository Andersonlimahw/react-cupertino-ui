import * as React from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle } from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type PlaybackState = "playing" | "paused" | "loading";

export interface PlaybackControlsProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  state?: PlaybackState;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onShuffle?: () => void;
  shuffleActive?: boolean;
  disabled?: boolean;
}

const PlaybackControls = React.forwardRef<HTMLDivElement, PlaybackControlsProps>((props, ref) => {
  const {
    className,
    state = "paused",
    onPlayPause,
    onNext,
    onPrevious,
    onShuffle,
    shuffleActive = false,
    disabled = false,
    ...rest
  } = props;
  const isPlaying = state === "playing";

  const renderPlayPauseIcon = () => {
    if (state === "loading") {
      return <div className="react-cupertino-ui-playback-controls__spinner" aria-hidden="true" />;
    }
    return isPlaying ? <Pause size={18} /> : <Play size={18} />;
  };

  return (
    <div ref={ref} className={cn("react-cupertino-ui-playback-controls", className)} {...rest}>
      <button
        type="button"
        className="react-cupertino-ui-playback-controls__button"
        onClick={onShuffle}
        disabled={disabled}
        aria-pressed={shuffleActive}
        aria-label="Shuffle"
      >
        <Shuffle size={16} />
      </button>
      <button
        type="button"
        className="react-cupertino-ui-playback-controls__button"
        onClick={onPrevious}
        disabled={disabled}
        aria-label="Previous"
      >
        <SkipBack size={16} />
      </button>
      <button
        type="button"
        className="react-cupertino-ui-playback-controls__button react-cupertino-ui-playback-controls__button--primary"
        onClick={onPlayPause}
        disabled={disabled || state === "loading"}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {renderPlayPauseIcon()}
      </button>
      <button
        type="button"
        className="react-cupertino-ui-playback-controls__button"
        onClick={onNext}
        disabled={disabled}
        aria-label="Next"
      >
        <SkipForward size={16} />
      </button>
    </div>
  );
});

PlaybackControls.displayName = "PlaybackControls";

export { PlaybackControls };
