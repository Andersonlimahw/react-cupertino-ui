import * as React from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type MediaTransportState = "playing" | "paused" | "loading";

export interface MediaTransportProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  state?: MediaTransportState;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  disabled?: boolean;
  glass?: boolean;
  showSkipButtons?: boolean;
}

const MediaTransport = React.forwardRef<HTMLDivElement, MediaTransportProps>((props, ref) => {
  const {
    className,
    state = "paused",
    onPlayPause,
    onNext,
    onPrevious,
    disabled = false,
    glass = true,
    showSkipButtons = true,
    ...rest
  } = props;

  const isPlaying = state === "playing";

  const renderPlayPauseIcon = () => {
    if (state === "loading") {
      return <div className="react-cupertino-ui-media-transport__spinner" aria-hidden="true" />;
    }
    return isPlaying ? <Pause size={20} /> : <Play size={20} />;
  };

  return (
    <div
      ref={ref}
      className={cn(
        "react-cupertino-ui-media-transport",
        glass && "glass",
        className
      )}
      role="group"
      {...rest}
    >
      {showSkipButtons ? (
        <button
          type="button"
          className="react-cupertino-ui-media-transport__button"
          onClick={onPrevious}
          disabled={disabled}
          aria-label="Previous"
        >
          <SkipBack size={18} />
        </button>
      ) : null}

      <button
        type="button"
        className="react-cupertino-ui-media-transport__button react-cupertino-ui-media-transport__button--primary"
        onClick={onPlayPause}
        disabled={disabled || state === "loading"}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {renderPlayPauseIcon()}
      </button>

      {showSkipButtons ? (
        <button
          type="button"
          className="react-cupertino-ui-media-transport__button"
          onClick={onNext}
          disabled={disabled}
          aria-label="Next"
        >
          <SkipForward size={18} />
        </button>
      ) : null}
    </div>
  );
});

MediaTransport.displayName = "MediaTransport";

export { MediaTransport };
