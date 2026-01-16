import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

type ListGroup<TItem> = {
  title: string;
  items: TItem[];
};

export interface ListTemplateProps<TItem = unknown>
  extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  description?: string;
  items?: TItem[];
  groups?: Array<ListGroup<TItem>>;
  renderItem: (item: TItem, index: number) => React.ReactNode;
  onItemPress?: (item: TItem) => void;
  searchable?: boolean;
  refreshable?: boolean;
  onRefresh?: () => Promise<void> | void;
  emptyState?: React.ReactNode;
  actions?: React.ReactNode;
}

const ListTemplate = React.forwardRef<HTMLDivElement, ListTemplateProps>((props, ref) => {
  const {
    title,
    description,
    items,
    groups,
    renderItem,
    onItemPress,
    searchable,
    refreshable,
    onRefresh,
    emptyState,
    actions,
    className,
    ...rest
  } = props;

  const [query, setQuery] = React.useState("");
  const [isRefreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const filterItems = React.useCallback(
    (list: unknown[]) => {
      if (!searchable || !query.trim()) {
        return list;
      }
      const q = query.toLowerCase();
      return list.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
    },
    [query, searchable]
  );

  const filteredGroups = React.useMemo(() => {
    if (groups && groups.length > 0) {
      return groups
        .map((group) => ({ ...group, items: filterItems(group.items) }))
        .filter((group) => group.items.length > 0);
    }
    return undefined;
  }, [groups, filterItems]);

  const filteredItems = React.useMemo(() => {
    if (!groups || groups.length === 0) {
      return filterItems(items || []);
    }
    return [];
  }, [filterItems, groups, items]);

  const handleItemPress = (item: unknown) => {
    onItemPress?.(item);
  };

  const hasContent =
    (filteredGroups && filteredGroups.length > 0) || (filteredItems && filteredItems.length > 0);

  return (
    <div ref={ref} className={cn("react-cupertino-ui-list-template", className)} {...rest}>
      <header className="react-cupertino-ui-list-template__header">
        <div>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="react-cupertino-ui-list-template__actions">{actions}</div> : null}
      </header>

      {searchable ? (
        <div className="react-cupertino-ui-list-template__search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
          />
          {refreshable && onRefresh ? (
            <button type="button" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? "Refreshing" : "Refresh"}
            </button>
          ) : null}
        </div>
      ) : refreshable && onRefresh ? (
        <div className="react-cupertino-ui-list-template__refresh">
          <button type="button" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing" : "Refresh"}
          </button>
        </div>
      ) : null}

      <section className="react-cupertino-ui-list-template__list">
        {filteredGroups && filteredGroups.length > 0
          ? filteredGroups.map((group, groupIndex) => (
              <div key={group.title || groupIndex} className="react-cupertino-ui-list-template__group">
                <h3>{group.title}</h3>
                <div className="react-cupertino-ui-list-template__group-items">
                  {group.items.map((item, itemIndex) => (
                    <button
                      type="button"
                      key={itemIndex}
                      onClick={() => handleItemPress(item)}
                      className="react-cupertino-ui-list-template__item"
                    >
                      {renderItem(item, itemIndex)}
                    </button>
                  ))}
                </div>
              </div>
            ))
          : null}

        {filteredItems && filteredItems.length > 0
          ? filteredItems.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleItemPress(item)}
                className="react-cupertino-ui-list-template__item"
              >
                {renderItem(item, index)}
              </button>
            ))
          : null}

        {!hasContent && (emptyState || <p className="react-cupertino-ui-list-template__empty">No items</p>)}
      </section>
    </div>
  );
});

ListTemplate.displayName = "ListTemplate";

export { ListTemplate };
