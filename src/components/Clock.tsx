// A labelled 24-hour clock for one time zone. Updates every few seconds.
import { useEffect, useState } from "react";
import styles from "./Clock.module.css";

interface ClockProps {
  label: string;
  timeZone: string;
}

export function Clock({ label, timeZone }: ClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 5_000);
    return () => clearInterval(timer);
  }, []);

  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(now);

  return (
    <div className={styles.clock}>
      <span className={styles.label}>{label}</span>
      <time dateTime={now.toISOString()} className={styles.time}>
        {time}
      </time>
    </div>
  );
}
