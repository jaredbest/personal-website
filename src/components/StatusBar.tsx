// Top bar: identity on the left, clocks in the middle, language and display controls on the right.
import { Link } from "react-router";
import { profile } from "../data/profile";
import { useLanguage } from "../i18n/language";
import { Clock } from "./Clock";
import { LanguageSwitch } from "./LanguageSwitch";
import { ModeSwitch } from "./ModeSwitch";
import styles from "./StatusBar.module.css";

export function StatusBar() {
  const { t, pick } = useLanguage();

  return (
    <header className={styles.bar}>
      <Link to="/" className={styles.identity}>
        <img src={profile.images.brand} alt="" width={36} height={36} className={styles.avatar} />
        <span className={styles.name}>{profile.name}</span>
        <span className={styles.role}>{pick(profile.role)}</span>
      </Link>
      <div className={styles.clocks}>
        <Clock label={t.status.localTime} timeZone="Europe/Berlin" />
        <Clock label={t.status.utc} timeZone="UTC" />
      </div>
      <div className={styles.controls}>
        <LanguageSwitch />
        <ModeSwitch />
      </div>
    </header>
  );
}
