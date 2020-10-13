import { useEffect, useRef, useState } from "react";

const TICK = 500;

function useClock(tick: number) {
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setNow(new Date());
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

  if (currentHours > hours || currentMinutes > minutes) {
    next.setDate(next.getDate() + 1);
  }

  return Math.ceil((next.getTime() - now.getTime()) / 60 / 1000);
}

function useTimeUntil(hours: number, minutes: number, tick = TICK) {
  return getTimeUntil(useClock(tick), hours, minutes);
}

export default useTimeUntil;
