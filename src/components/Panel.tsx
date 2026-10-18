// A framed display panel with a labelled header bar and corner brackets.
import { useId, type ReactNode } from "react";
import styles from "./Panel.module.css";

interface PanelProps {
  title: string;
  id?: string;
  /** "caution" draws the panel in amber for warnings. */
  tone?: "default" | "caution";
  /** Optional item on the right of the header bar, e.g. a count. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Panel({ title, id, tone = "default", aside, className = "", children }: PanelProps) {
  const headingId = useId();
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-panel
      className={`${styles.panel} ${tone === "caution" ? styles.caution : ""} ${className}`}
    >
      <header className={styles.header}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        {aside && <span className={styles.aside}>{aside}</span>}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
