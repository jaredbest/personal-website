// Unit tests for the small calculation helpers.
import { describe, expect, it } from "vitest";
import { formatYearMonth, monthsBetween } from "../lib/dates";
import { decodeDeltas } from "../lib/editMap";
import { orientationOrder, peakBearing } from "../lib/orientation";

describe("dates", () => {
  it("counts months like LinkedIn, including both ends", () => {
    expect(monthsBetween("2022-08", "2022-10")).toBe(3);
    expect(monthsBetween("2018-02", "2019-12")).toBe(23);
  });

  it("counts an open-ended role up to today", () => {
    expect(monthsBetween("2023-07", undefined, new Date(2026, 9, 18))).toBe(40);
  });

  it("keeps year-only dates as the year", () => {
    expect(formatYearMonth("2009", "en")).toBe("2009");
    expect(formatYearMonth("2023-07", "en")).toBe("Jul 2023");
  });
});

describe("orientation order", () => {
  const half = (fill: (i: number) => number) => Array.from({ length: 18 }, (_, i) => fill(i));

  it("is 0 when streets point evenly in every direction", () => {
    expect(orientationOrder(half(() => 1))).toBeCloseTo(0);
  });

  it("is 1 for a perfect north-south / east-west grid", () => {
    expect(orientationOrder(half((i) => (i === 0 || i === 9 ? 1 : 0)))).toBeCloseTo(1);
  });

  it("finds the strongest bearing", () => {
    expect(peakBearing(half((i) => (i === 15 ? 1 : 0.2)))).toBe(150);
  });
});

describe("map decoding", () => {
  it("turns offsets into absolute points", () => {
    expect(decodeDeltas([10, 20, 1, -2, 3, 4])).toEqual([10, 20, 11, 18, 14, 22]);
  });
});
