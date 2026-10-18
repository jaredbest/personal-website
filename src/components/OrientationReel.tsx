// Blog-card preview for the London post: a few street-orientation charts sweep in one after another,
// each sliding left to make room for the next. Plays once when seen and again on hover or focus.
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { boroughs } from "../content/posts/london-bearings";
import { prefersReducedMotion, useCardPlayback } from "../lib/motion";
import styles from "./OrientationReel.module.css";
import { PolarChart } from "./StreetOrientations";

const PICKS = ["Camden", "Kensington & Chelsea", "City of Westminster", "Hackney"];
const reel = PICKS.map((name) => boroughs.find((borough) => borough.name === name)!);
/** Time each chart gets to sweep in before the reel moves on. Four steps stay under five seconds. */
const STEP_MS = 1100;

export function OrientationReel() {
  const ref = useRef<HTMLDivElement>(null);
  // -1 = nothing drawn yet; otherwise the chart currently sweeping in.
  const [active, setActive] = useState(() => (prefersReducedMotion() ? reel.length - 1 : -1));
  const timers = useRef<number[]>([]);

  const play = useCallback(() => {
    if (prefersReducedMotion()) return;
    timers.current.forEach(clearTimeout);
    setActive(-1);
    timers.current = reel.map((_, i) => window.setTimeout(() => setActive(i), 60 + i * STEP_MS));
  }, []);

  useCardPlayback(ref, play);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div ref={ref} className={styles.window} aria-hidden="true">
      {/* Keep the active chart in the middle; earlier ones slide off to the left. */}
      <ol className={styles.track} style={{ "--position": Math.max(active, 0) } as CSSProperties}>
        {reel.map((borough, i) => (
          <li key={borough.name} className={i === active ? styles.current : undefined}>
            <PolarChart borough={borough} live={i <= active} bare />
          </li>
        ))}
      </ol>
    </div>
  );
}
