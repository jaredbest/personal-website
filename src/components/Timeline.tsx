// A vertical timeline. Each entry shows its dates on the left and details on the right.
import type { ReactNode } from "react";
import styles from "./Timeline.module.css";

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className={styles.timeline}>{children}</ol>;
}

interface EntryProps {
  dates: ReactNode;
  duration?: string;
  /** Lights the marker for something still going on. */
  current?: boolean;
  title: string;
  meta: ReactNode;
  children?: ReactNode;
}

export function TimelineEntry({ dates, duration, current, title, meta, children }: EntryProps) {
  return (
    <li className={`${styles.entry} ${current ? styles.current : ""}`}>
      <div className={styles.when}>
        <span className={styles.dates}>{dates}</span>
        {duration && <span className={styles.duration}>{duration}</span>}
      </div>
      <div className={styles.what}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>{meta}</p>
        {children}
      </div>
    </li>
  );
}
