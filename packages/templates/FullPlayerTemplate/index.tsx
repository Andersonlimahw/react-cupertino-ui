import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Slider } from "@react-cupertino-ui/slider";
import { Button } from "@react-cupertino-ui/button";

import "./index.scss";

export interface FullPlayerTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  artwork: string;
  title: string;
  subtitle?: string;
  lyrics?: React.ReactNode;
  children?: React.ReactNode;
}

const FullPlayerTemplate = React.forwardRef<HTMLDivElement, FullPlayerTemplateProps>((props, ref) => {
  const { artwork, title, subtitle, lyrics, children, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-full-player", className)} {...rest}>
      <img className="react-cupertino-ui-full-player__artwork" src={artwork} alt="Artwork" />
      <div className="react-cupertino-ui-full-player__meta">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <Slider className="react-cupertino-ui-full-player__slider" value={30} max={100} />
      <div className="react-cupertino-ui-full-player__controls">
        <Button variant="ghost">Shuffle</Button>
        <Button>Play</Button>
        <Button variant="ghost">Repeat</Button>
      </div>
      {lyrics ? <div className="react-cupertino-ui-full-player__lyrics">{lyrics}</div> : null}
      {children}
    </div>
  );
});

FullPlayerTemplate.displayName = "FullPlayerTemplate";

export { FullPlayerTemplate };
