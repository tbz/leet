import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __time?: { hour?: number; minute?: number; seconds?: number };
  }
}

const TICK = 500;

function getNow() {
  const now = new Date();
  if (
    process.env.NODE_ENV === "development" &&
    "__time" in window &&
    window.__time
  ) {
    const { hour, minute, seconds } = window.__time;
    if (hour != null) now.setHours(hour);
    if (minute != null) now.setMinutes(minute);
    if (seconds != null) now.setSeconds(seconds);
  }
  return now;
}

function useClock(tick: number) {
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setNow(getNow());
    }, tick);
    return () => {
      clearInterval(intervalRef.current!);
    };
  });
  return now;
}

function getTimeUntil(now: Date, hours: number, minutes: number) {
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  if (currentHours === hours && currentMinutes === minutes) {
    return 0;
  }

  let next = new Date(now);
  next.setSeconds(0);
  next.setMinutes(minutes);
  next.setHours(hours);

  if (
    currentHours > hours ||
    (currentHours === hours && currentMinutes > minutes)
  ) {
    next.setDate(next.getDate() + 1);
  }

  return Math.ceil((next.getTime() - now.getTime()) / 60 / 1000);
}

function useTimeUntil(hours: number, minutes: number, tick = TICK) {
  return getTimeUntil(useClock(tick), hours, minutes);
}

export default useTimeUntil;
