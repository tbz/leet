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

  return (
    <div className="Clock">
      <div className="ClockInner">
        <div className="ClockTime">{timeUntil}</div>
      </div>
    </div>
  );
}

export default Clock;
