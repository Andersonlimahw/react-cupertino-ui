import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface LyricsViewProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  lines: { text: string; time?: string; active?: boolean }[];
}

const LyricsView = React.forwardRef<HTMLDivElement, LyricsViewProps>((props, ref) => {
  const { lines, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-lyrics-view", className)} {...rest}>
      {lines.map((line, index) => (
        <p key={index} data-active={line.active ? "true" : undefined}>
          {line.text}
        </p>
      ))}
    </div>
  );
});

LyricsView.displayName = "LyricsView";

export { LyricsView };
