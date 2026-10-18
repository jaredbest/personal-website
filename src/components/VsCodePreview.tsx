// Card preview for the GreyStillPlays theme: a small VS Code window types a Unity script in the theme's real colours,
// ending on a typo that gets the theme's pink error underline. Plays once when seen and again on hover or focus.
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, prefersReducedMotion, useCardPlayback } from "../lib/motion";
import styles from "./VsCodePreview.module.css";

// Colours copied from greystillplays-color-theme.json.
const theme = {
  keyword: "#17BCDE",
  control: "#B2A5F3",
  type: "#A3D96D",
  func: "#FFD65C",
  variable: "#85E0EA",
  string: "#FC935F",
  number: "#C2E69E",
  comment: "#707070",
  plain: "#C0C0C0",
};

// The script being typed, in plain C#. The first TYPED_FROM lines are already there when playback starts.
const SOURCE = `using UnityEngine;

public class Player : MonoBehaviour
{
    public float speed = 5f;

    void Update()
    {
        // Move with the arrow keys
        float x = Input.GetAxis("Horizontal");
        transform.Translate(x * speed, 0, 0);
        Debug.Lgo("moving");
    }
}`;

/** The deliberate typo that gets the theme's pink error underline. */
const ERROR_WORD = "Lgo";

const KEYWORDS = new Set(["public", "class", "float", "void"]);
const CONTROL = new Set(["using"]);
const TYPES = new Set(["UnityEngine", "Player", "MonoBehaviour", "Input", "Debug"]);

interface Token {
  text: string;
  color: keyof typeof theme;
  error?: boolean;
}

/** Splits one line of C# into coloured tokens, the way the theme colours them in VS Code. */
function tokenize(line: string): Token[] {
  const pattern = /(\/\/.*$)|("[^"]*")|(\d+f?\b)|([A-Za-z_]\w*)|(\s+|.)/g;
  return [...line.matchAll(pattern)].map((match): Token => {
    const [text, comment, string, number, word] = match;
    if (comment) return { text, color: "comment" };
    if (string) return { text, color: "string" };
    if (number) return { text, color: "number" };
    if (!word) return { text, color: "plain" };
    if (CONTROL.has(word)) return { text, color: "control" };
    if (KEYWORDS.has(word)) return { text, color: "keyword" };
    if (TYPES.has(word)) return { text, color: "type" };
    // A name followed by "(" is a function call; anything else is a variable.
    const isCall = line[match.index + word.length] === "(";
    return { text, color: isCall ? "func" : "variable", error: word === ERROR_WORD };
  });
}

const code: Token[][] = SOURCE.split("\n").map(tokenize);
const TYPED_FROM = 6;
const DURATION_MS = 4200;

/** Characters in a line, plus one for the line break. */
const lineLength = (line: Token[]) => line.reduce((sum, { text }) => sum + text.length, 0) + 1;
const PREFILLED = code.slice(0, TYPED_FROM).reduce((sum, line) => sum + lineLength(line), 0);
const TOTAL = code.reduce((sum, line) => sum + lineLength(line), 0);

/** Which characters are visible after `typed` keystrokes, and where the cursor sits. */
function layout(typed: number) {
  let budget = typed;
  let cursor = { line: 0, column: 0 };
  const lines = code.map((line, index) => {
    const tokens: { text: string; color: string; error?: boolean }[] = [];
    let column = 0;
    for (const { text, color, error } of line) {
      if (budget <= 0) break;
      const shown = text.slice(0, budget);
      budget -= shown.length;
      column += shown.length;
      tokens.push({ text: shown, color: theme[color], error: error && shown.length === text.length });
    }
    if (budget > 0 || column > 0) cursor = { line: index, column };
    budget -= 1; // the line break
    return tokens;
  });
  return { lines, cursor };
}

export function VsCodePreview() {
  const ref = useRef<HTMLDivElement>(null);
  // Stops the running animation, if any.
  const stop = useRef(() => {});
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? TOTAL : PREFILLED));

  const play = useCallback(() => {
    if (prefersReducedMotion()) return;
    stop.current();
    stop.current = animate(DURATION_MS, (progress) => setTyped(Math.round(PREFILLED + progress * (TOTAL - PREFILLED))));
  }, []);

  useCardPlayback(ref, play);
  useEffect(() => () => stop.current(), []);

  const { lines, cursor } = layout(typed);
  const done = typed >= TOTAL;
  const errors = done ? 1 : 0;

  return (
    <div ref={ref} className={styles.preview} aria-hidden="true">
      <div className={styles.window}>
        <div className={styles.tabs}>
          <span className={styles.tab}>Player.cs</span>
        </div>
        <div className={styles.editor}>
          {lines.map((tokens, index) => (
            <div key={index} className={`${styles.line} ${index === cursor.line ? styles.active : ""}`}>
              <span className={styles.number}>{index + 1}</span>
              <span>
                {tokens.map(({ text, color, error }, i) => (
                  <span key={i} style={{ color }} className={error && done ? styles.error : undefined}>
                    {text}
                  </span>
                ))}
                {index === cursor.line && !done && <span className={styles.cursor} />}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.status}>
          <span>
            <span className={errors ? styles.errorCount : undefined}>⊗ {errors}</span> ⚠ 0
          </span>
          <span>
            Ln {cursor.line + 1}, Col {cursor.column + 1} · C#
          </span>
        </div>
      </div>
    </div>
  );
}
