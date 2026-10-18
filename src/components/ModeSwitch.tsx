// Day/night display switch. The saved mode is applied in index.html before first paint, so the page never flashes.
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/language";
import { Segmented } from "./Segmented";

type Mode = "day" | "night";

const themeColor: Record<Mode, string> = { day: "#e8ecf0", night: "#0a0d12" };

export function ModeSwitch({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>(() => (document.documentElement.dataset.theme === "day" ? "day" : "night"));

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "day") root.dataset.theme = "day";
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor[mode]);
    try {
      localStorage.setItem("theme", mode);
    } catch {
      // Not saving is fine; the mode still holds for this visit.
    }
  }, [mode]);

  return (
    <Segmented<Mode>
      label={t.status.displayMode}
      value={mode}
      onChange={setMode}
      className={className}
      options={[
        { value: "day", label: t.status.day, icon: Sun },
        { value: "night", label: t.status.night, icon: Moon },
      ]}
    />
  );
}
