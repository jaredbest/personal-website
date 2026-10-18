// Replays my OpenStreetMap edits in Ticonderoga on a canvas, changeset by changeset.
// New features flash green, then settle. It starts when scrolled into view; the timeline can be scrubbed.
import { Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../i18n/language";
import { formatDate } from "../lib/dates";
import { decodeDeltas, onThemeChange, X_SCALE } from "../lib/editMap";
import { animate, prefersReducedMotion, useSeen } from "../lib/motion";
import { Segmented } from "./Segmented";
import styles from "./EditReplay.module.css";

type Kind = "b" | "r" | "a" | "o" | "p";
type View = "village" | "town";

interface Extent {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface ReplayData {
  boundary: number[][];
  /** Bounding box of Ticonderoga village: west, south, east, north. */
  village: [number, number, number, number];
  steps: string[];
  features: (number | string)[][];
}

interface Feature {
  step: number;
  kind: Kind;
  /** Absolute x, y pairs. */
  points: number[];
}

const DURATION_MS = 16_000;
/** How many steps a feature stays lit after it appears. */
const GLOW_STEPS = 6;
function villageExtent([minX, minY, maxX, maxY]: ReplayData["village"]): Extent {
  return { minX, minY, maxX, maxY };
}

function boundaryExtent(boundary: number[][]): Extent {
  const xs = boundary.map((p) => p[0]!);
  const ys = boundary.map((p) => p[1]!);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

function decode(data: ReplayData): Feature[] {
  return data.features.map(([step, kind, ...coords]) => ({
    step: step as number,
    kind: kind as Kind,
    points: decodeDeltas(coords as number[]),
  }));
}

export function EditReplay() {
  const { lang, t } = useLanguage();
  const r = t.replay;
  const [data, setData] = useState<ReplayData | null>(null);
  const [step, setStep] = useState(0);
  // null until the user presses play, pause or the timeline; until then playback follows `autoplay`.
  const [choice, setChoice] = useState<boolean | null>(null);
  const [view, setView] = useState<View>("village");
  const wrapper = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  // Mirrors `step` so the play loop can read it without restarting on every frame.
  const stepRef = useRef(0);

  // The edit data is large-ish, so it loads only when this post is open.
  useEffect(() => {
    import("../content/posts/ticonderoga-edits.json").then((module) => {
      const loaded = module.default as ReplayData;
      setData(loaded);
      // With reduced motion there is no replay: show the finished map.
      if (prefersReducedMotion()) setStep(loaded.steps.length - 1);
    });
  }, []);

  const features = useMemo(() => (data ? decode(data) : []), [data]);
  const lastStep = data ? data.steps.length - 1 : 0;
  const extent = useMemo(
    () => (data ? (view === "town" ? boundaryExtent(data.boundary) : villageExtent(data.village)) : null),
    [data, view],
  );

  // Running totals per step for the readouts.
  const totals = useMemo(() => {
    const counts = { b: 0, r: 0, a: 0, p: 0 };
    const perStep: (typeof counts)[] = [];
    let index = 0;
    for (let s = 0; s <= lastStep; s++) {
      while (index < features.length && features[index]!.step <= s) {
        const kind = features[index]!.kind;
        counts[kind === "o" ? "a" : kind]++;
        index++;
      }
      perStep.push({ ...counts });
    }
    return perStep;
  }, [features, lastStep]);

  const draw = useCallback(
    (upTo: number) => {
      const el = canvas.current;
      if (!el || !data || !extent) return;
      const ctx = el.getContext("2d");
      if (!ctx) return;
      const css = getComputedStyle(el);
      const color = (name: string) => css.getPropertyValue(name).trim();

      // Fit the chosen view into the canvas.
      const dpr = window.devicePixelRatio || 1;
      const minX = extent.minX * X_SCALE;
      const minY = extent.minY;
      const spanX = (extent.maxX - extent.minX) * X_SCALE;
      const spanY = extent.maxY - extent.minY;
      // Fill the available width, but never more than 70% of the screen height.
      const pad = 12;
      const available = el.parentElement!.clientWidth - pad * 2;
      const scale = Math.min(available / spanX, (window.innerHeight * 0.7) / spanY);
      const width = Math.round(spanX * scale + pad * 2);
      const height = Math.round(spanY * scale + pad * 2);
      if (el.width !== width * dpr || el.height !== height * dpr) {
        el.width = width * dpr;
        el.height = height * dpr;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
      }
      const px = (x: number) => pad + (x * X_SCALE - minX) * scale;
      const py = (y: number) => height - pad - (y - minY) * scale;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Town boundary.
      ctx.beginPath();
      data.boundary.forEach(([x, y], i) => (i ? ctx.lineTo(px(x!), py(y!)) : ctx.moveTo(px(x!), py(y!))));
      ctx.closePath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = color("--line-strong");
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Colour of each kind once it has settled.
      const settled: Record<Kind, string> = {
        b: color("--text"),
        r: color("--text-muted"),
        a: color("--line-strong"),
        o: color("--line-strong"),
        p: color("--text-muted"),
      };
      const accent = color("--accent");

      const trace = (f: Feature) => {
        ctx.beginPath();
        for (let i = 0; i < f.points.length; i += 2) {
          const x = px(f.points[i]!);
          const y = py(f.points[i + 1]!);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      };

      const paint = (f: Feature, fresh: boolean) => {
        const tone = fresh ? accent : settled[f.kind];
        if (f.kind === "p") {
          ctx.fillStyle = tone;
          ctx.fillRect(px(f.points[0]!) - 1, py(f.points[1]!) - 1, 2, 2);
          return;
        }
        trace(f);
        if (f.kind === "b" || f.kind === "a") {
          ctx.globalAlpha = f.kind === "b" ? 0.9 : 0.35;
          ctx.fillStyle = tone;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          ctx.strokeStyle = tone;
          ctx.lineWidth = f.kind === "r" ? 1.1 : 0.8;
          ctx.stroke();
        }
      };

      // Settled features first, then the fresh ones on top with a glow.
      for (const f of features) {
        if (f.step > upTo) break;
        if (upTo - f.step >= GLOW_STEPS) paint(f, false);
      }
      ctx.shadowColor = accent;
      ctx.shadowBlur = 8;
      for (const f of features) {
        if (f.step > upTo) break;
        if (upTo - f.step < GLOW_STEPS) paint(f, true);
      }
      ctx.shadowBlur = 0;
    },
    [data, features, extent],
  );

  // Redraw on every step, resize and display-mode change.
  useEffect(() => {
    stepRef.current = step;
    draw(step);
  }, [draw, step]);

  useEffect(() => {
    const redraw = () => draw(stepRef.current);
    const resize = "ResizeObserver" in window ? new ResizeObserver(redraw) : null;
    if (canvas.current?.parentElement) resize?.observe(canvas.current.parentElement);
    const stopWatchingTheme = onThemeChange(redraw);
    return () => {
      resize?.disconnect();
      stopWatchingTheme();
    };
  }, [draw]);

  // Play by itself the first time the map is on screen, until the user takes over.
  const seen = useSeen(wrapper, { threshold: 0.5 });
  const autoplay = seen && data !== null && !prefersReducedMotion();
  const playing = choice ?? autoplay;

  // Advance through the steps while playing. Starting from the end replays from the beginning.
  useEffect(() => {
    if (!playing) return;
    // A full run takes DURATION_MS, so a run from halfway takes half as long.
    const from = stepRef.current >= lastStep ? 0 : stepRef.current;
    return animate(((lastStep - from) / lastStep) * DURATION_MS, (progress) => {
      setStep(Math.floor(from + progress * (lastStep - from)));
      if (progress === 1) setChoice(false);
    });
  }, [playing, lastStep]);

  const now = totals[step] ?? { b: 0, r: 0, a: 0, p: 0 };
  const finished = step >= lastStep;
  const PlayIcon = playing ? Pause : finished ? RotateCcw : Play;

  return (
    <figure className={styles.figure} ref={wrapper}>
      <div className={styles.screen}>
        <canvas ref={canvas} className={styles.canvas} role="img" aria-label={r.mapLabel} />
        {!data && <p className={styles.loading}>{r.loading}</p>}
        <div className={styles.date}>
          <span>{r.date}</span>
          <time>{data ? formatDate(data.steps[step]!, lang) : "—"}</time>
        </div>
      </div>

      <div className={styles.controls}>
        <Segmented<View>
          label={r.view}
          value={view}
          onChange={setView}
          className={styles.range}
          options={[
            { value: "village", label: r.village },
            { value: "town", label: r.town },
          ]}
        />
        <button
          type="button"
          className={styles.play}
          onClick={() => setChoice(!playing)}
          disabled={!data}
        >
          <PlayIcon size={18} aria-hidden="true" />
          {playing ? r.pause : finished ? r.replay : r.play}
        </button>
        <input
          type="range"
          min={0}
          max={lastStep}
          value={step}
          aria-label={r.timeline}
          aria-valuetext={data ? formatDate(data.steps[step]!, lang) : undefined}
          onChange={(event) => {
            setChoice(false);
            setStep(Number(event.target.value));
          }}
          className={styles.scrubber}
          disabled={!data}
        />
        <span className={styles.counter}>
          {step + 1}/{lastStep + 1}
        </span>
      </div>

      <dl className={styles.readouts}>
        <div>
          <dt>
            <span className={`${styles.swatch} ${styles.building}`} aria-hidden="true" />
            {r.buildings}
          </dt>
          <dd>{now.b.toLocaleString(lang)}</dd>
        </div>
        <div>
          <dt>
            <span className={`${styles.swatch} ${styles.road}`} aria-hidden="true" />
            {r.roads}
          </dt>
          <dd>{now.r.toLocaleString(lang)}</dd>
        </div>
        <div>
          <dt>
            <span className={`${styles.swatch} ${styles.area}`} aria-hidden="true" />
            {r.areas}
          </dt>
          <dd>{now.a.toLocaleString(lang)}</dd>
        </div>
        <div>
          <dt>
            <span className={`${styles.swatch} ${styles.point}`} aria-hidden="true" />
            {r.points}
          </dt>
          <dd>{now.p.toLocaleString(lang)}</dd>
        </div>
        <div>
          <dt>
            <span className={`${styles.swatch} ${styles.fresh}`} aria-hidden="true" />
            {r.fresh}
          </dt>
          <dd>{r.freshHint}</dd>
        </div>
      </dl>
      <figcaption className={styles.caption}>{r.caption}</figcaption>
    </figure>
  );
}
