import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Picker, type PickerOption } from "@react-cupertino-ui/picker";
import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: Date;
  onChange: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  glass?: boolean;
  layout?: "wheel" | "calendar" | "compact";
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const monthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const startOfDay = (date: Date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const {
    value,
    onChange,
    mode = "date",
    minDate,
    maxDate,
    className,
    glass = true,
    layout: layoutProp = "wheel",
    locale: localeProp,
    weekStartsOn = 0,
    ...rest
  } = props;

  const locale = React.useMemo(() => {
    if (localeProp) {
      return localeProp;
    }

    if (typeof navigator !== "undefined") {
      return navigator.language;
    }

    return "en-US";
  }, [localeProp]);

  const includesDate = mode !== "time";
  const includesTime = mode !== "date";
  const resolvedLayout = layoutProp === "calendar" && !includesDate ? "wheel" : layoutProp;

  const clampDate = React.useCallback(
    (nextDate: Date) => {
      const next = new Date(nextDate);
      if (minDate && next < minDate) {
        return new Date(minDate);
      }
      if (maxDate && next > maxDate) {
        return new Date(maxDate);
      }
      return next;
    },
    [maxDate, minDate]
  );

  const updateDate = React.useCallback(
    (updater: (draft: Date) => void) => {
      const draft = new Date(value.getTime());
      updater(draft);
      const next = clampDate(draft);
      onChange(next);
    },
    [clampDate, onChange, value]
  );

  const yearOptions = React.useMemo(() => {
    const currentYear = value.getFullYear();
    const start = minDate ? minDate.getFullYear() : currentYear - 100;
    const end = maxDate ? maxDate.getFullYear() : currentYear + 100;
    const result: PickerOption[] = [];
    for (let year = start; year <= end; year += 1) {
      result.push({ value: year, label: year.toString() });
    }
    return result;
  }, [maxDate, minDate, value]);

  const monthOptions = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => ({
      value: index,
      label: new Date(2000, index, 1).toLocaleString(locale, { month: "long" }),
    }));
  }, [locale]);

  const dayOptions = React.useMemo(() => {
    const totalDays = getDaysInMonth(value.getFullYear(), value.getMonth());
    const startDay =
      minDate &&
      minDate.getFullYear() === value.getFullYear() &&
      minDate.getMonth() === value.getMonth()
        ? minDate.getDate()
        : 1;
    const endDay =
      maxDate &&
      maxDate.getFullYear() === value.getFullYear() &&
      maxDate.getMonth() === value.getMonth()
        ? maxDate.getDate()
        : totalDays;

    const result: PickerOption[] = [];
    for (let day = startDay; day <= endDay; day += 1) {
      result.push({ value: day, label: day.toString() });
    }
    return result;
  }, [maxDate, minDate, value]);

  const hours = React.useMemo(() => {
    const result: PickerOption[] = [];
    for (let hour = 0; hour < 24; hour += 1) {
      result.push({ value: hour, label: hour.toString().padStart(2, "0") });
    }
    return result;
  }, []);

  const minutes = React.useMemo(() => {
    const result: PickerOption[] = [];
    for (let minute = 0; minute < 60; minute += 1) {
      result.push({ value: minute, label: minute.toString().padStart(2, "0") });
    }
    return result;
  }, []);

  const [displayedMonth, setDisplayedMonth] = React.useState(() => monthStart(value));

  React.useEffect(() => {
    if (resolvedLayout === "calendar") {
      setDisplayedMonth(monthStart(value));
    }
  }, [resolvedLayout, value]);

  const goToMonth = (offset: number) => {
    setDisplayedMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + offset);
      return monthStart(next);
    });
  };

  const canNavigate = React.useMemo(() => {
    const minMonth = minDate ? monthStart(minDate) : null;
    const maxMonth = maxDate ? monthStart(maxDate) : null;

    return {
      prev: !minMonth || monthStart(displayedMonth) > minMonth,
      next: !maxMonth || monthStart(displayedMonth) < maxMonth,
    };
  }, [displayedMonth, maxDate, minDate]);

  const weekdayLabels = React.useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const weekday = (weekStartsOn + index) % 7;
      const reference = new Date(2021, 4, 2 + weekday);
      return reference.toLocaleDateString(locale, { weekday: "short" });
    });
  }, [locale, weekStartsOn]);

  const calendarDays = React.useMemo(() => {
    const start = monthStart(displayedMonth);
    const totalDays = getDaysInMonth(start.getFullYear(), start.getMonth());
    const startOffset = (start.getDay() - weekStartsOn + 7) % 7;
    const totalCells = Math.ceil((startOffset + totalDays) / 7) * 7;
    const cells: { date: Date; inCurrentMonth: boolean }[] = [];

    for (let index = 0; index < totalCells; index += 1) {
      const day = index - startOffset + 1;
      const date = new Date(start.getFullYear(), start.getMonth(), day);
      cells.push({ date, inCurrentMonth: date.getMonth() === start.getMonth() });
    }

    return cells;
  }, [displayedMonth, weekStartsOn]);

  const dateFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [locale]);

  const isDateDisabled = React.useCallback(
    (date: Date) => {
      if (minDate && startOfDay(date) < startOfDay(minDate)) {
        return true;
      }
      if (maxDate && startOfDay(date) > startOfDay(maxDate)) {
        return true;
      }
      return false;
    },
    [maxDate, minDate]
  );

  const handleCalendarSelect = (day: Date) => {
    if (!includesDate) {
      return;
    }
    updateDate((draft) => {
      draft.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
    });
  };

  const handleSelectChange = (type: "year" | "month" | "day" | "hour" | "minute", next: number) => {
    updateDate((draft) => {
      if (type === "year") draft.setFullYear(next);
      if (type === "month") draft.setMonth(next);
      if (type === "day") draft.setDate(next);
      if (type === "hour") draft.setHours(next);
      if (type === "minute") draft.setMinutes(next);
    });
  };

  const renderWheelPickers = () => {
    return (
      <>
        {includesDate && (
          <>
            <div className="picker-column year-column">
              <Picker
                options={yearOptions}
                value={value.getFullYear()}
                onChange={(val: number | string) => handleSelectChange("year", Number(val))}
              />
            </div>
            <div className="picker-column month-column">
              <Picker
                options={monthOptions}
                value={value.getMonth()}
                onChange={(val: number | string) => handleSelectChange("month", Number(val))}
              />
            </div>
            <div className="picker-column day-column">
              <Picker
                options={dayOptions}
                value={value.getDate()}
                onChange={(val: number | string) => handleSelectChange("day", Number(val))}
              />
            </div>
          </>
        )}

        {includesTime && (
          <>
            <div className="picker-column hour-column">
              <Picker
                options={hours}
                value={value.getHours()}
                onChange={(val: number | string) => handleSelectChange("hour", Number(val))}
              />
            </div>
            <div className="picker-column separator">:</div>
            <div className="picker-column minute-column">
              <Picker
                options={minutes}
                value={value.getMinutes()}
                onChange={(val: number | string) => handleSelectChange("minute", Number(val))}
              />
            </div>
          </>
        )}
      </>
    );
  };

  const calendarHourSelectId = React.useId();
  const calendarMinuteSelectId = React.useId();

  const renderCalendar = () => {
    return (
      <div className="react-cupertino-ui-date-picker__calendar">
        <div className="react-cupertino-ui-date-picker__calendar-header">
          <button
            type="button"
            className="react-cupertino-ui-date-picker__month-button"
            onClick={() => goToMonth(-1)}
            disabled={!canNavigate.prev}
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="react-cupertino-ui-date-picker__month-label">
            {displayedMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })}
          </div>
          <button
            type="button"
            className="react-cupertino-ui-date-picker__month-button"
            onClick={() => goToMonth(1)}
            disabled={!canNavigate.next}
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="react-cupertino-ui-date-picker__weekday-row">
          {weekdayLabels.map((weekday) => (
            <span key={weekday} className="react-cupertino-ui-date-picker__weekday">
              {weekday}
            </span>
          ))}
        </div>

        <div className="react-cupertino-ui-date-picker__calendar-grid">
          {calendarDays.map(({ date, inCurrentMonth }) => {
            const disabled = isDateDisabled(date);
            const isSelected = includesDate && isSameDay(date, value);
            const isToday = isSameDay(date, new Date());

            return (
              <button
                type="button"
                key={date.toISOString()}
                className={cn(
                  "react-cupertino-ui-date-picker__day",
                  isSelected && "is-selected",
                  isToday && "is-today",
                  !inCurrentMonth && "is-outside"
                )}
                onClick={() => handleCalendarSelect(date)}
                disabled={disabled}
                aria-label={`Select ${dateFormatter.format(date)}`}
              >
                <span>{date.getDate()}</span>
              </button>
            );
          })}
        </div>

        {includesTime && (
          <div className="react-cupertino-ui-date-picker__time-row">
            <div>
              <label htmlFor={calendarHourSelectId}>Hour</label>
              <select
                id={calendarHourSelectId}
                value={value.getHours()}
                onChange={(event) => handleSelectChange("hour", Number(event.target.value))}
              >
                {hours.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={calendarMinuteSelectId}>Minutes</label>
              <select
                id={calendarMinuteSelectId}
                value={value.getMinutes()}
                onChange={(event) => handleSelectChange("minute", Number(event.target.value))}
              >
                {minutes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };

  const monthSelectId = React.useId();
  const daySelectId = React.useId();
  const yearSelectId = React.useId();
  const hourSelectId = React.useId();
  const minuteSelectId = React.useId();

  const renderCompact = () => {
    return (
      <div className="react-cupertino-ui-date-picker__compact">
        {includesDate && (
          <div className="react-cupertino-ui-date-picker__compact-row">
            <div>
              <label htmlFor={monthSelectId}>Month</label>
              <select
                id={monthSelectId}
                value={value.getMonth()}
                onChange={(event) => handleSelectChange("month", Number(event.target.value))}
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={daySelectId}>Day</label>
              <select
                id={daySelectId}
                value={value.getDate()}
                onChange={(event) => handleSelectChange("day", Number(event.target.value))}
              >
                {dayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={yearSelectId}>Year</label>
              <select
                id={yearSelectId}
                value={value.getFullYear()}
                onChange={(event) => handleSelectChange("year", Number(event.target.value))}
              >
                {yearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {includesTime && (
          <div className="react-cupertino-ui-date-picker__compact-row">
            <div>
              <label htmlFor={hourSelectId}>Hour</label>
              <select
                id={hourSelectId}
                value={value.getHours()}
                onChange={(event) => handleSelectChange("hour", Number(event.target.value))}
              >
                {hours.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={minuteSelectId}>Minutes</label>
              <select
                id={minuteSelectId}
                value={value.getMinutes()}
                onChange={(event) => handleSelectChange("minute", Number(event.target.value))}
              >
                {minutes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        "react-cupertino-ui-date-picker",
        glass && "glass",
        `layout-${resolvedLayout}`,
        className
      )}
      data-mode={mode}
      {...rest}
    >
      {resolvedLayout === "wheel" && renderWheelPickers()}
      {resolvedLayout === "calendar" && renderCalendar()}
      {resolvedLayout === "compact" && renderCompact()}
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export { DatePicker };
