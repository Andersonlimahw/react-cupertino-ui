import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface ColorToken {
  name: string;
  value: string;
  description?: string;
}

export interface ColorTokensViewerProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  tokens: ColorToken[];
}

const ColorTokensViewer = React.forwardRef<HTMLDivElement, ColorTokensViewerProps>((props, ref) => {
  const { className, tokens, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-color-tokens-viewer", className)} {...rest}>
      {tokens.map((token) => (
        <div key={token.name} className="token">
          <span className="swatch" style={{ background: token.value }} />
          <div>
            <p className="name">{token.name}</p>
            <p className="value">{token.value}</p>
            {token.description ? <p className="description">{token.description}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
});

ColorTokensViewer.displayName = "ColorTokensViewer";

export { ColorTokensViewer };
