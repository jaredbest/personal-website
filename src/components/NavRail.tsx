// Main navigation. A labelled button column on desktop, a thumb-reach bottom bar on phones.
// Number keys 1–5 jump straight to each page.
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { profile } from "../data/profile";
import { useLanguage } from "../i18n/language";
import { navItems } from "../nav";
import styles from "./NavRail.module.css";

export function NavRail() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      // Leave the keys alone while typing or while a dialog (e.g. the enlarged photo) is open.
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (document.querySelector("dialog[open]")) return;
      const item = navItems[Number(event.key) - 1];
      if (item) navigate(item.path);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <nav aria-label={t.nav.label} className={styles.rail}>
      <ul className={styles.list}>
        {navItems.map(({ path, label, icon: Icon }, index) => (
          <li key={path}>
            <NavLink to={path} end={path === "/"} className={styles.item}>
              <span className={styles.led} aria-hidden="true" />
              <Icon size={20} aria-hidden="true" />
              <span className={styles.text}>{t.nav[label]}</span>
              <kbd className={styles.key} aria-hidden="true">
                {index + 1}
              </kbd>
            </NavLink>
          </li>
        ))}
        <li className={styles.mail}>
          <a
            href={`mailto:${profile.email}`}
            className={styles.item}
            aria-label={`${t.status.emailMe}: ${profile.email}`}
          >
            <Mail size={20} aria-hidden="true" />
            <span className={styles.text}>{t.status.email}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
