import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface PhotosGridItem {
  id: string;
  src: string;
  alt?: string;
  date?: string;
  favorite?: boolean;
}

export interface PhotosGridProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  items: PhotosGridItem[];
  columns?: 2 | 3 | 4;
  onSelect?: (item: PhotosGridItem) => void;
  selectedIds?: string[];
}

const PhotosGrid = React.forwardRef<HTMLDivElement, PhotosGridProps>((props, ref) => {
  const { className, items, columns = 3, onSelect, selectedIds = [], ...rest } = props;

  const handleSelect = (item: PhotosGridItem) => {
    onSelect?.(item);
  };

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-photos-grid", `columns-${columns}`, className)}
      {...rest}
    >
      {items.map((item) => {
        const selected = selectedIds.includes(item.id);
        return (
          <button
            type="button"
            key={item.id}
            className={cn("react-cupertino-ui-photos-grid__item", selected && "is-selected")}
            onClick={() => handleSelect(item)}
          >
            <img src={item.src} alt={item.alt ?? ""} loading="lazy" />
            {item.favorite ? <span className="favorite" aria-label="Favorite">★</span> : null}
            {item.date ? <span className="date">{item.date}</span> : null}
            <span className="selection" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
});

PhotosGrid.displayName = "PhotosGrid";

export { PhotosGrid };
