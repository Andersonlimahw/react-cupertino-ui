import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface CarouselProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  slides: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  glass?: boolean;
  onSlideChange?: (index: number) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>((props, ref) => {
  const {
    className,
    slides,
    autoPlay = false,
    interval = 4500,
    showIndicators = true,
    showControls = true,
    glass = true,
    onSlideChange,
    ...rest
  } = props;

  const [current, setCurrent] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const clampIndex = React.useCallback(
    (index: number) => {
      const total = slides.length;
      if (total === 0) return 0;
      return (index + total) % total;
    },
    [slides.length]
  );

  const goTo = React.useCallback(
    (index: number) => {
      const next = clampIndex(index);
      setCurrent(next);
      onSlideChange?.(next);
    },
    [clampIndex, onSlideChange]
  );

  const handleNext = React.useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const handlePrev = React.useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  React.useEffect(() => {
    if (!autoPlay || slides.length <= 1) {
      return;
    }
    timerRef.current = setTimeout(() => {
      goTo(current + 1);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoPlay, current, goTo, interval, slides.length]);

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-carousel", glass && "glass", className)}
      {...rest}
    >
      <div className="react-cupertino-ui-carousel__viewport" role="group" aria-label="Carousel">
        <div
          className="react-cupertino-ui-carousel__track"
          style={{ transform: `translateX(calc(-${current} * (100% + 1.25rem)))` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="react-cupertino-ui-carousel__slide"
              aria-hidden={current !== index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showControls && slides.length > 1 ? (
        <div className="react-cupertino-ui-carousel__controls">
          <button type="button" onClick={handlePrev} aria-label="Previous slide">
            ‹
          </button>
          <button type="button" onClick={handleNext} aria-label="Next slide">
            ›
          </button>
        </div>
      ) : null}

      {showIndicators && slides.length > 1 ? (
        <div className="react-cupertino-ui-carousel__indicators" role="tablist" aria-label="Slide indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              className={cn("react-cupertino-ui-carousel__indicator", current === index && "is-active")}
              aria-selected={current === index}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
});

Carousel.displayName = "Carousel";

export { Carousel };
