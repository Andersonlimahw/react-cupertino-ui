import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface AIRecommenderTile {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  tone?: "blue" | "pink" | "green" | "orange";
}

export interface AIRecommenderGridProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  tiles: AIRecommenderTile[];
  columns?: 2 | 3;
  onSelect?: (tile: AIRecommenderTile) => void;
}

const AIRecommenderGrid = React.forwardRef<HTMLDivElement, AIRecommenderGridProps>((props, ref) => {
  const { className, tiles, columns = 2, onSelect, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-ai-recommender-grid", `columns-${columns}`, className)} {...rest}>
      {tiles.map((tile) => (
        <button
          key={tile.id}
          type="button"
          className={cn("tile", tile.tone && `tone-${tile.tone}`)}
          onClick={() => onSelect?.(tile)}
        >
          {tile.icon ? <span className="icon" aria-hidden="true">{tile.icon}</span> : null}
          <div>
            <p className="title">{tile.title}</p>
            {tile.description ? <p className="description">{tile.description}</p> : null}
          </div>
        </button>
      ))}
    </div>
  );
});

AIRecommenderGrid.displayName = "AIRecommenderGrid";

export { AIRecommenderGrid };
