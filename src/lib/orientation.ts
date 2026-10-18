// Street-orientation maths for the London charts.

/** All 36 bins (0°–350°) from the stored half, since a street runs both ways. */
export function fullCircle(bins: number[]): number[] {
  return [...bins, ...bins];
}

/**
 * Orientation order φ (Boeing 2019): 0 when bearings are spread evenly, 1 for a perfect four-way grid.
 * Compares the entropy of the 36-bin distribution with a uniform spread and an ideal grid.
 */
export function orientationOrder(bins: number[]): number {
  const all = fullCircle(bins);
  const total = all.reduce((sum, value) => sum + value, 0);
  const entropy = -all.reduce((sum, value) => (value > 0 ? sum + (value / total) * Math.log(value / total) : sum), 0);
  const uniform = Math.log(36);
  const grid = Math.log(4);
  const order = 1 - ((entropy - grid) / (uniform - grid)) ** 2;
  return Math.min(1, Math.max(0, order));
}

/** Bearing of the strongest bin, in degrees (0–170). */
export function peakBearing(bins: number[]): number {
  return bins.indexOf(Math.max(...bins)) * 10;
}
