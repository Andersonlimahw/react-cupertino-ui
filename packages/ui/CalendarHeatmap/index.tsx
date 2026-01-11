import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface CalendarHeatmapDatum {
  date: string;
  value: number;
}

export interface CalendarHeatmapProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  data: CalendarHeatmapDatum[];
  weeks?: number;
}

const CalendarHeatmap = React.forwardRef<HTMLDivElement, CalendarHeatmapProps>((props, ref) => {
  const { className, data, weeks = 8, ...rest } = props;

  const cells = React.useMemo(() => {
    const result: { date: Date; value: number }[] = [];
    const today = new Date();
    for (let i = 0; i < weeks * 7; i += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - (weeks * 7 - i));
      const match = data.find((item) => new Date(item.date).toDateString() === date.toDateString());
      result.push({ date, value: match?.value ?? 0 });
    }
    return result;
  }, [data, weeks]);

  return (
    <div ref={ref} className={cn("react-cupertino-ui-calendar-heatmap", className)} {...rest}>
      {cells.map((cell, index) => (
        <div
          key={`${cell.date.toISOString()}-${index}`}
          className={cn("cell", cell.value > 0 && "has-value")}
          style={{ opacity: Math.min(1, 0.3 + cell.value * 0.1) }}
        />
      ))}
    </div>
  );
});

CalendarHeatmap.displayName = "CalendarHeatmap";

export { CalendarHeatmap };
