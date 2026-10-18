// Helpers for the Ticonderoga edit map and its card preview.

/** Longitude is squeezed by cos(latitude) so the map is not stretched. Ticonderoga sits at about 43.85°N. */
export const X_SCALE = Math.cos((43.85 * Math.PI) / 180);

/** Turns [x0, y0, dx1, dy1, …] (first point absolute, the rest offsets) into absolute [x, y, …] pairs. */
export function decodeDeltas(coords: number[]): number[] {
  const points: number[] = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < coords.length; i += 2) {
    x = i === 0 ? coords[i]! : x + coords[i]!;
    y = i === 0 ? coords[i + 1]! : y + coords[i + 1]!;
    points.push(x, y);
  }
  return points;
}

/**
 * Calls `redraw` whenever a canvas needs repainting: its box is resized, the window changes size
 * (height matters too, e.g. a phone's address bar), or the day/night display mode changes.
 * Returns a cleanup function.
 */
export function watchCanvas(box: Element, redraw: () => void): () => void {
  const resize = "ResizeObserver" in window ? new ResizeObserver(redraw) : null;
  resize?.observe(box);
  window.addEventListener("resize", redraw);
  const theme = new MutationObserver(redraw);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    resize?.disconnect();
    window.removeEventListener("resize", redraw);
    theme.disconnect();
  };
}
