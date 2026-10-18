// Label/value rows, like instrument readouts.
import type { ReactNode } from "react";
import styles from "./Readouts.module.css";

export function Readouts({ children }: { children: ReactNode }) {
  return <dl className={styles.list}>{children}</dl>;
}

export function Readout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.row}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}
