// Small inline flags, drawn as SVG so they look the same on every OS (Windows has no flag emoji).
import type { Lang } from "../data/types";

export function Flag({ lang }: { lang: Lang }) {
  return lang === "de" ? <GermanFlag /> : <UsFlag />;
}

function GermanFlag() {
  return (
    <svg viewBox="0 0 5 3" width="27" height="16" aria-hidden="true">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#dd0000" />
      <rect width="5" height="1" y="2" fill="#ffce00" />
    </svg>
  );
}

function UsFlag() {
  // 13 stripes and a blue canton. Stars are left out; they would be sub-pixel at this size.
  const stripes = Array.from({ length: 13 }, (_, i) => i);
  return (
    <svg viewBox="0 0 190 100" width="30" height="16" aria-hidden="true" preserveAspectRatio="none">
      {stripes.map((i) => (
        <rect key={i} y={(i * 100) / 13} width="190" height={100 / 13 + 0.5} fill={i % 2 ? "#fff" : "#b22234"} />
      ))}
      <rect width="76" height={(7 * 100) / 13} fill="#3c3b6e" />
    </svg>
  );
}
