import * as React from "react";
import usePageTracking from "./usePageTracking";
import useTimeUntil from "./useTimeUntil";

import "./Clock.css";

type ClockProps = {
  hour: number;
  minute: number;
};

function Clock({ hour, minute }: ClockProps) {
  usePageTracking();
  const timeUntil = useTimeUntil(hour, minute);
  const isNow = timeUntil === 0;

  return (
    <div className="Clock">
      <div className={"ClockInner" + (isNow ? " now" : "")}>
        <div className="ClockTime">{isNow ? "🎉" : timeUntil}</div>
      </div>
    </div>
  );
}

export default Clock;
