// Card image that plays a short clip once when the card is first seen, then rests on the clip's last frame.
// Hover or focus plays it again. The clip itself is encoded to play once and is under five seconds.
import { useCallback, useEffect, useRef, useState } from "react";
import type { Clip } from "../data/types";
import { prefersReducedMotion, useCardPlayback } from "../lib/motion";

interface ClipPreviewProps {
  still: string;
  clip: Clip;
  className?: string;
}

export function ClipPreview({ still, clip, className }: ClipPreviewProps) {
  const ref = useRef<HTMLImageElement>(null);
  // Bumped on every play, so the <img> is recreated and the clip starts from its first frame.
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(0);

  const play = useCallback(() => {
    if (prefersReducedMotion()) return;
    clearTimeout(timer.current);
    setRun((count) => count + 1);
    setPlaying(true);
    timer.current = window.setTimeout(() => setPlaying(false), clip.durationMs);
  }, [clip.durationMs]);

  useCardPlayback(ref, play);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Before the first run: the opening frame. After a run: the closing frame, so nothing jumps.
  const src = playing ? clip.src : run > 0 ? clip.end : still;

  return <img key={playing ? run : "rest"} ref={ref} src={src} alt="" width={600} height={400} className={className} />;
}
