// Card preview for the ML-Agents post: the reinforcement learning loop between Unity and the Python trainer.
// Signals travel round the loop while a step counter ticks up. Plays once when seen and again on hover or focus.
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/language";
import { animate, prefersReducedMotion, useCardPlayback } from "../lib/motion";
import styles from "./TrainingLoopPreview.module.css";

const DURATION_MS = 4500;
const LAPS = 3;

export function TrainingLoopPreview() {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  // Stops the running animation, if any.
  const stop = useRef(() => {});
  // 0 → 1 over one playback.
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));

  const play = useCallback(() => {
    if (prefersReducedMotion()) return;
    stop.current();
    stop.current = animate(DURATION_MS, setProgress);
  }, []);

  useCardPlayback(ref, play);
  useEffect(() => () => stop.current(), []);

  // Position within the current lap: first half goes Unity → trainer on top, second half returns below.
  const lap = (progress * LAPS) % 1;
  const done = progress >= 1;
  const top = !done && lap < 0.5;
  const along = top ? lap * 2 : (lap - 0.5) * 2;
  const x = top ? 104 + along * 112 : 216 - along * 112;
  const y = top ? 62 : 118;
  const steps = Math.round(progress * 500_000);

  return (
    <div ref={ref} className={styles.preview} aria-hidden="true">
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
        <g className={styles.box}>
          <rect x="16" y="40" width="88" height="100" rx="4" />
          <text x="60" y="84">UNITY</text>
          <text x="60" y="100" className={styles.small}>
            C#
          </text>
        </g>
        <g className={styles.box}>
          <rect x="216" y="40" width="88" height="100" rx="4" />
          <text x="260" y="84">PYTHON</text>
          <text x="260" y="100" className={styles.small}>
            PYTORCH
          </text>
        </g>

        <path d="M104 62 H216" className={`${styles.wire} ${top ? styles.wireLive : ""}`} />
        <path d="M216 118 H104" className={`${styles.wire} ${!top && !done ? styles.wireLive : ""}`} />
        <path d="M208 58 L216 62 L208 66" className={styles.arrow} />
        <path d="M112 114 L104 118 L112 122" className={styles.arrow} />
        <text x="160" y="52" className={styles.label}>
          {t.trainingLoop.observation}
        </text>
        <text x="160" y="136" className={styles.label}>
          {t.trainingLoop.action}
        </text>

        {!done && <circle cx={x} cy={y} r="4" className={styles.pulse} />}

        <text x="160" y="94" className={styles.counter}>
          {steps.toLocaleString(lang)}
        </text>
        <text x="160" y="106" className={styles.small}>
          {t.trainingLoop.steps}
        </text>
      </svg>
    </div>
  );
}
