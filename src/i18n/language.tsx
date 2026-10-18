// Holds the chosen site language and hands out the matching UI strings.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, Text } from "../data/types";
import { ui, type UiStrings } from "./ui";

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** UI strings in the current language. */
  t: UiStrings;
  /** Picks the current language from a piece of content. */
  pick: (text: Text) => string;
}

const LanguageContext = createContext<LanguageState | null>(null);
const STORAGE_KEY = "lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "de") return saved;
  } catch {
    // Storage can be blocked; fall back to the browser language.
  }
  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not saving is fine; the choice still holds for this visit.
    }
  }, [lang]);

  const value: LanguageState = { lang, setLang, t: ui[lang], pick: (text) => text[lang] };
  return <LanguageContext value={value}>{children}</LanguageContext>;
}

export function useLanguage(): LanguageState {
  const state = useContext(LanguageContext);
  if (!state) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return state;
}
