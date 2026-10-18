// Polar charts of London street bearings. Each chart sweeps in like a radar when scrolled into view,
// and the grid re-sorts with a smooth slide when you change the order.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { boroughs, type Borough } from "../content/posts/london-bearings";
import { useLanguage } from "../i18n/language";
import { animate, prefersReducedMotion, useSeen } from "../lib/motion";
import { fullCircle, orientationOrder, peakBearing } from "../lib/orientation";
import { Segmented } from "./Segmented";
import styles from "./StreetOrientations.module.css";

type SortKey = "name" | "most" | "least";

export function StreetOrientations() {
  const { t } = useLanguage();
  const o = t.orientations;
  const [sort, setSort] = useState<SortKey>("name");
  const grid = useRef<HTMLUListElement>(null);
  const before = useRef(new Map<string, DOMRect>());

  const charts = useMemo(() => boroughs.map((borough) => ({ ...borough, order: orientationOrder(borough.bins) })), []);
  const sorted = useMemo(() => {
    const list = [...charts];
    if (sort === "most") list.sort((a, b) => b.order - a.order);
    if (sort === "least") list.sort((a, b) => a.order - b.order);
    return list;
  }, [charts, sort]);

  function changeSort(next: SortKey) {
    // Remember where every chart is, so each can slide from there to its new spot.
    before.current.clear();
    grid.current?.querySelectorAll<HTMLElement>("[data-name]").forEach((el) => {
      before.current.set(el.dataset.name!, el.getBoundingClientRect());
    });
    setSort(next);
  }

  useLayoutEffect(() => {
    if (!before.current.size || prefersReducedMotion()) return;
    grid.current?.querySelectorAll<HTMLElement>("[data-name]").forEach((el) => {
      const from = before.current.get(el.dataset.name!);
      if (!from) return;
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!dx && !dy) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration: 600,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "backwards",
      });
    });
    before.current.clear();
  }, [sorted]);

  return (
    <figure className={styles.figure}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel} aria-hidden="true">
          {o.sort}
        </span>
        <Segmented<SortKey>
          label={o.sort}
          value={sort}
          onChange={changeSort}
          options={[
            { value: "name", label: o.byName },
            { value: "most", label: o.mostOrdered },
            { value: "least", label: o.leastOrdered },
          ]}
        />
      </div>
      <ul ref={grid} className={styles.grid}>
        {sorted.map((chart) => (
          <li key={chart.name} data-name={chart.name}>
            <PolarChart borough={chart} order={chart.order} />
          </li>
        ))}
      </ul>
      <figcaption className={styles.caption}>{o.caption}</figcaption>
    </figure>
  );
}

interface PolarChartProps {
  borough: Borough;
  order?: number;
  /** Drive the animation from outside. Leave out to start when scrolled into view. */
  live?: boolean;
  /** Hide the name and readouts, e.g. in a small preview. */
  bare?: boolean;
}

export function PolarChart({ borough, order = orientationOrder(borough.bins), live: liveProp, bare }: PolarChartProps) {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  // Sweep in once the chart is mostly on screen, unless a parent drives it.
  const seen = useSeen(ref, { threshold: 0.4 });
  const live = liveProp ?? seen;
  const shownOrder = useCountUp(order, live);

  const bins = fullCircle(borough.bins);
  const peak = peakBearing(borough.bins);
  const orderText = order.toFixed(2);

  return (
    <div ref={ref} className={`${styles.chart} ${live ? styles.live : ""} ${bare ? styles.bare : ""}`}>
      <svg viewBox="-120 -120 240 240" role="img" aria-label={t.orientations.chartLabel(borough.name, peak, orderText)}>
        {[25, 50, 75, 100].map((r) => (
          <circle key={r} r={r} className={r === 100 ? styles.rim : styles.ring} />
        ))}
        <line y1={-100} y2={100} className={styles.axis} />
        <line x1={-100} x2={100} className={styles.axis} />

        {bins.map((value, i) => (
          <path
            key={i}
            d={wedge(i * 10, value * 100)}
            className={styles.bar}
            style={{ "--i": i } as CSSProperties}
          />
        ))}

        {/* The peak bearing, drawn as a line through the centre. */}
        <line
          x1={-Math.sin((peak * Math.PI) / 180) * 104}
          y1={Math.cos((peak * Math.PI) / 180) * 104}
          x2={Math.sin((peak * Math.PI) / 180) * 104}
          y2={-Math.cos((peak * Math.PI) / 180) * 104}
          className={styles.peak}
        />

        <g className={styles.sweep}>
          <path d={wedge(-15, 100, 30)} className={styles.beam} />
          <line y2={-100} className={styles.beamEdge} />
        </g>
        <circle r={3} className={styles.hub} />

        {(["N", "E", "S", "W"] as const).map((label, i) => (
          <text key={label} {...compass(i * 90)} className={styles.compass}>
            {label}
          </text>
        ))}
      </svg>
      {!bare && (
        <div className={styles.meta}>
          <span className={styles.name}>{borough.name}</span>
          <span className={styles.readouts}>
            <span>
              {t.orientations.order} <b>{formatOrder(shownOrder, lang)}</b>
            </span>
            <span>
              {t.orientations.peak} <b>{String(peak).padStart(3, "0")}°</b>
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

/** φ with two decimals in the reader's number format, e.g. 0.20 or 0,20. */
function formatOrder(value: number, lang: string): string {
  return value.toLocaleString(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** SVG path for a pie wedge centred on `angle` (degrees clockwise from north). */
function wedge(angle: number, radius: number, width = 9.2): string {
  if (radius <= 0) return "";
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${(Math.sin(rad) * radius).toFixed(2)} ${(-Math.cos(rad) * radius).toFixed(2)}`;
  };
  return `M0 0 L${point(angle - width / 2)} A${radius} ${radius} 0 0 1 ${point(angle + width / 2)} Z`;
}

function compass(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.sin(rad) * 112, y: -Math.cos(rad) * 112 };
}

/** Counts from 0 up to `target` once `start` turns true, like an instrument settling. */
function useCountUp(target: number, start: boolean, duration = 900): number {
  const [value, setValue] = useState(0);
  const instant = prefersReducedMotion();
  useEffect(() => {
    if (!start || instant) return;
    return animate(duration, (progress) => setValue(target * (1 - (1 - progress) ** 3)));
  }, [target, start, duration, instant]);
  return instant ? target : value;
}
