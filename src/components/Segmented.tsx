// A row of mutually exclusive buttons, like a hardware selector switch. The chosen one looks pressed in and lit.
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./Segmented.module.css";

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  /** Shown before the label. On phones only the icon shows; screen readers still hear the label. */
  icon?: LucideIcon;
  /** Accessible name when the label is not text, e.g. a flag. */
  name?: string;
  lang?: string;
}

interface SegmentedProps<T extends string> {
  /** Accessible name for the whole group. */
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  buttonClassName?: string;
}

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
  buttonClassName = "",
}: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className={`${styles.group} ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.lang}
          aria-label={option.name}
          title={option.name}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={`${styles.button} ${buttonClassName}`}
        >
          {option.icon && <option.icon size={18} aria-hidden="true" />}
          <span className={option.icon ? styles.iconLabel : undefined}>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
