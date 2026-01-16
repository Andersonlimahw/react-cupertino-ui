import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface ProfileTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  avatar: string;
  name: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const ProfileTemplate = React.forwardRef<HTMLDivElement, ProfileTemplateProps>((props, ref) => {
  const { avatar, name, subtitle, stats, actions, children, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-profile-template", className)} {...rest}>
      <div className="react-cupertino-ui-profile-template__hero">
        <img src={avatar} alt="Profile" />
        <div className="react-cupertino-ui-profile-template__info">
          <h1>{name}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
          {stats && stats.length > 0 ? (
            <div className="react-cupertino-ui-profile-template__stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {actions ? <div className="react-cupertino-ui-profile-template__actions">{actions}</div> : null}
      </div>
      <section className="react-cupertino-ui-profile-template__content">{children}</section>
    </div>
  );
});

ProfileTemplate.displayName = "ProfileTemplate";

export { ProfileTemplate };
