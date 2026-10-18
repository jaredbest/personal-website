// Standard page frame: browser tab title, a numbered eyebrow, the heading and an optional lead line.
import type { ReactNode } from "react";
import styles from "./Page.module.css";

interface PageProps {
  title: string;
  /** Label above the heading. Defaults to the title. */
  section?: string;
  /** Nav position, shown as "01", "02" … Matches the number-key shortcut. */
  index?: number;
  heading?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}

export function Page({ title, section, index, heading, lead, children }: PageProps) {
  return (
    <>
      <title>{`${title} · Jared Best`}</title>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          {index !== undefined && <span className={styles.index}>{String(index).padStart(2, "0")}</span>}
          {section ?? title}
        </p>
        <h1 className={styles.heading}>{heading ?? title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </header>
      <div className={styles.body}>{children}</div>
    </>
  );
}
