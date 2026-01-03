import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface MapsPOICardProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  subtitle?: string;
  category?: string;
  distance?: string;
  image?: string;
}

const MapsPOICard = React.forwardRef<HTMLDivElement, MapsPOICardProps>((props, ref) => {
  const { className, title, subtitle, category, distance, image, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-maps-poi-card", className)} {...rest}>
      {image ? <img src={image} alt="POI" /> : null}
      <div className="info">
        <p className="title">{title}</p>
        {subtitle ? <p className="subtitle">{subtitle}</p> : null}
        <div className="meta">
          {category ? <span>{category}</span> : null}
          {distance ? <span>{distance}</span> : null}
        </div>
      </div>
    </div>
  );
});

MapsPOICard.displayName = "MapsPOICard";

export { MapsPOICard };
