import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Switcher } from "@react-cupertino-ui/switcher";

import "./index.scss";

type SettingsItemType = "navigation" | "toggle" | "select" | "button";

export interface SettingsItem {
  type: SettingsItemType;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  value?: React.ReactNode;
  onChange?: (value: unknown) => void;
  navigationHint?: string;
}

export interface SettingsGroup {
  title?: string;
  footer?: string;
  items: SettingsItem[];
}

export interface SettingsTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  title: string;
  groups: SettingsGroup[];
}

const SettingsTemplate = React.forwardRef<HTMLDivElement, SettingsTemplateProps>((props, ref) => {
  const { title, groups, className, ...rest } = props;

  const renderItem = (item: SettingsItem) => {
    const { type, label, description, icon, value, onChange, navigationHint } = item;

    if (type === "toggle") {
      return (
        <div className="react-cupertino-ui-settings-template__row">
          <div>
            <span className="label">{label}</span>
            {description ? <p>{description}</p> : null}
          </div>
          <Switcher checked={Boolean(value)} onCheckedChange={onChange} />
        </div>
      );
    }

    return (
      <button type="button" className="react-cupertino-ui-settings-template__row" onClick={() => onChange?.(value)}>
        <div className="react-cupertino-ui-settings-template__row-left">
          {icon ? <span className="icon" aria-hidden="true">{icon}</span> : null}
          <div>
            <span className="label">{label}</span>
            {description ? <p>{description}</p> : null}
          </div>
        </div>
        <div className="react-cupertino-ui-settings-template__row-right">
          {type === "select" && value ? <span className="value">{value}</span> : null}
          {type === "navigation" ? <span className="hint">{navigationHint || ""}</span> : null}
          {type === "navigation" ? <span aria-hidden="true">›</span> : null}
        </div>
      </button>
    );
  };

  return (
    <div ref={ref} className={cn("react-cupertino-ui-settings-template", className)} {...rest}>
      <header className="react-cupertino-ui-settings-template__header">
        <h1>{title}</h1>
      </header>
      <section className="react-cupertino-ui-settings-template__groups">
        {groups.map((group, groupIndex) => (
          <article key={group.title || groupIndex} className="react-cupertino-ui-settings-template__group">
            {group.title ? <h2>{group.title}</h2> : null}
            <div className="react-cupertino-ui-settings-template__group-card">
              {group.items.map((item, index) => (
                <div key={index} className="react-cupertino-ui-settings-template__item">
                  {renderItem(item)}
                </div>
              ))}
            </div>
            {group.footer ? <p className="footer">{group.footer}</p> : null}
          </article>
        ))}
      </section>
    </div>
  );
});

SettingsTemplate.displayName = "SettingsTemplate";

export { SettingsTemplate };
