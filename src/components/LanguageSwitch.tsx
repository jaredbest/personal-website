// Flag buttons for English and German. Screen readers hear the language name.
import type { Lang } from "../data/types";
import { useLanguage } from "../i18n/language";
import { Flag } from "./Flag";
import styles from "./LanguageSwitch.module.css";
import { Segmented } from "./Segmented";

export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <Segmented<Lang>
      label={t.status.language}
      value={lang}
      onChange={setLang}
      className={className}
      buttonClassName={styles.flag}
      options={[
        { value: "en", label: <Flag lang="en" />, name: "English", lang: "en" },
        { value: "de", label: <Flag lang="de" />, name: "Deutsch", lang: "de" },
      ]}
    />
  );
}
