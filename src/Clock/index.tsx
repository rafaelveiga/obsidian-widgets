import * as React from "react";
import { moment } from "obsidian";
import { WidgetType } from "src/types/Widgets";

const Clock = ({ settings }: ClockProps) => {
  const [time, setTime] = React.useState(
    moment().tz(settings.timezone).format("HH:mm:ss")
  );
  const [date, setDate] = React.useState(
    moment().tz(settings.timezone).format("dddd, MMMM DD, YYYY")
  );
  const [amPm, setAmPm] = React.useState(
    moment().tz(settings.timezone).format("A")
  );
  const [zoneName, setZoneName] = React.useState(
    settings.showTimezone ? moment().tz(settings.timezone).format("z") : ""
  );

  React.useEffect(() => {
    const clockInterval = setInterval(() => {
      const timeFormat = settings.format === "12hr" ? "hh:mm:ss" : "HH:mm:ss";
      const currentMoment = moment().tz(settings.timezone);

      setAmPm(currentMoment.format("A"));
      setTime(currentMoment.format(timeFormat));
      setDate(currentMoment.format("dddd, MMMM DD, YYYY"));
      if (settings.showTimezone) {
        setZoneName(currentMoment.format("z"));
      }
    }, 100);

    return () => {
      clearInterval(clockInterval);
    };
  }, [settings.timezone, settings.format, settings.showTimezone]);

  return (
    <div className="Clock_Face">
      <div className="Clock_Divider" />
      <div className="Clock__time-container">
        <div className="Clock__time">{time}</div>
        {settings.format === "12hr" && (
          <div className="Clock__am-pm">{amPm}</div>
        )}
        {settings.showTimezone && (
          <div className="Clock__timezone">{zoneName}</div>
        )}
      </div>
      <div className="Clock_Date">{date}</div>
      <div className="Clock_Divider" />
    </div>
  );
};

export default Clock;

export interface ClockSettings {
  type: WidgetType;
  format: "12hr" | "24hr";
  timezone: string;
  showTimezone?: boolean;
}

interface ClockProps {
  settings: ClockSettings;
}

Clock.defaultProps = {
  settings: {
    type: "clock",
    format: "24hr",
    timezone: "UTC",
    showTimezone: true,
  },
};
