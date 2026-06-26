"use client";

import { useState, useEffect } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Use a fixed width to prevent layout shift if it starts empty, 
  // though we suppress hydration warnings so we could just render it directly.
  return (
    <span className="inline-block min-w-[36px]" suppressHydrationWarning>
      {time}
    </span>
  );
}
