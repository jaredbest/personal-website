// Card preview for the Ticonderoga post: the village fills in with my buildings and roads in under five seconds.
// Plays once when seen and again on hover or focus. Loads its small data file only when near the screen.
import { useCallback, useEffect, useRef, useState } from "react";
import { decodeDeltas, onThemeChange, X_SCALE } from "../lib/editMap";
import { animate, prefersReducedMotion, useCardPlayback, useSeen } from "../lib/motion";
import styles from "./EditPreview.module.css";

interface PreviewData {
  /** Width and height of the village box in data units. */
  size: [number, number];
  steps: number;
  features: (number | string)[][];
}

interface Shape {
  step: number;
  building: boolean;
  points: number[];
}

const DURATION_MS = 4500;
const GLOW_STEPS = 8;
function decode(data: PreviewData): Shape[] {
  return data.features.map(([step, kind, ...coords]) => ({
    step: step as number,
    building: kind === "b",
    points: decodeDeltas(coords as number[]),
  }));
}

export function EditPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<{ size: [number, number]; steps: number; shapes: Shape[] } | null>(null);
  // Stops the running animation, if any.
  const stop = useRef(() => {});

  const draw = useCallback(
    (upTo: number) => {
      const el = canvas.current;
      const box = ref.current;
      if (!el || !box || !data) return;
      const ctx = el.getContext("2d");
      if (!ctx) return;
      const css = getComputedStyle(el);
      const color = (name: string) => css.getPropertyValue(name).trim();

      const dpr = window.devicePixelRatio || 1;
      const width = box.clientWidth;
      const height = box.clientHeight;
      if (el.width !== width * dpr || el.height !== height * dpr) {
        el.width = width * dpr;
        el.height = height * dpr;
      }
      // Cover the card: fill it completely, cropping the village edges if needed.
      const [w, h] = data.size;
      const scale = Math.max(width / (w * X_SCALE), height / h);
      const offsetX = (width - w * X_SCALE * scale) / 2;
      const offsetY = (height - h * scale) / 2;
      const px = (x: number) => offsetX + x * X_SCALE * scale;
      const py = (y: number) => height - offsetY - y * scale;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const settledBuilding = color("--text");
      const settledRoad = color("--text-muted");
      const accent = color("--accent");

      const paint = (shape: Shape, fresh: boolean) => {
        ctx.beginPath();
        for (let i = 0; i < shape.points.length; i += 2) {
          const x = px(shape.points[i]!);
          const y = py(shape.points[i + 1]!);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        if (shape.building) {
          ctx.fillStyle = fresh ? accent : settledBuilding;
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          ctx.strokeStyle = fresh ? accent : settledRoad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      };

      for (const shape of data.shapes) if (shape.step <= upTo - GLOW_STEPS) paint(shape, false);
      ctx.shadowColor = accent;
      ctx.shadowBlur = 6;
      for (const shape of data.shapes) if (shape.step <= upTo && shape.step > upTo - GLOW_STEPS) paint(shape, true);
      ctx.shadowBlur = 0;
    },
    [data],
  );

  const play = useCallback(() => {
    if (!data) return;
    stop.current();
    if (prefersReducedMotion()) return draw(data.steps + GLOW_STEPS);
    // Ease out, and run a little past the end so the last features settle.
    stop.current = animate(DURATION_MS, (progress) => draw((1 - (1 - progress) ** 2) * (data.steps + GLOW_STEPS)));
  }, [data, draw]);

  // Fetch the data when the card gets near the screen.
  const near = useSeen(ref, { rootMargin: "200px" });
  useEffect(() => {
    if (!near) return;
    import("../content/posts/ticonderoga-preview.json").then((module) => {
      const raw = module.default as PreviewData;
      setData({ size: raw.size, steps: raw.steps, shapes: decode(raw) });
    });
  }, [near]);

  useCardPlayback(ref, play, Boolean(data));

  // Repaint the finished map when the display mode changes, and stop any animation on unmount.
  useEffect(() => {
    if (!data) return;
    return onThemeChange(() => draw(data.steps + GLOW_STEPS));
  }, [data, draw]);
  useEffect(() => () => stop.current(), []);

  return (
    <div ref={ref} className={styles.preview} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
