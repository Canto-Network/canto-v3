"use client";

import { useEffect, useState } from "react";

function getTimeLeft(endTimestamp: number): number {
  const timeLeft = endTimestamp - Date.now();
  return timeLeft > 0 ? timeLeft : 0;
}

const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;
const minute = 1000 * 60;
const second = 1000;

function formatTime(
  days: number,
  hours: number,
  minutes: number,
  seconds: number
) {
  const timeParts = [
    days > 0 ? `${days}d` : "",
    `${hours}h`,
    `${minutes}m`,
    `${seconds}s`,
  ].filter(Boolean);

  return timeParts.join(" ");
}

const Countdown = ({ endDateString }: { endDateString: string }) => {
  const endTimestamp = new Date(endDateString).getTime();
  const [timeLeft, setTimeLeft] = useState<number>(getTimeLeft(endTimestamp));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft(endTimestamp));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [endTimestamp]);

  const days = Math.floor(timeLeft / day);
  const hours = Math.floor((timeLeft % day) / hour);
  const minutes = Math.floor((timeLeft % hour) / minute);
  const seconds = Math.floor((timeLeft % minute) / second);

  return formatTime(days, hours, minutes, seconds);
};

export default Countdown;
