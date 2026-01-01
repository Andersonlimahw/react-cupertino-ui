import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface MasterDetailTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  master: React.ReactNode;
  detail: React.ReactNode;
}

const MasterDetailTemplate = React.forwardRef<HTMLDivElement, MasterDetailTemplateProps>((props, ref) => {
  const { master, detail, className, ...rest } = props;

  return (
    <div ref={ref} className={cn("react-cupertino-ui-master-detail", className)} {...rest}>
      <div className="react-cupertino-ui-master-detail__master">{master}</div>
      <div className="react-cupertino-ui-master-detail__detail">{detail}</div>
    </div>
  );
});

MasterDetailTemplate.displayName = "MasterDetailTemplate";

export { MasterDetailTemplate };
