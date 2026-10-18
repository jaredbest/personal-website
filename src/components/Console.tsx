// The app frame: status bar on top, nav rail on the left (bottom bar on phones), page in the middle.
import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useLanguage } from "../i18n/language";
import styles from "./Console.module.css";
import { NavRail } from "./NavRail";
import { StatusBar } from "./StatusBar";

export function Console() {
  const { t } = useLanguage();
  const { pathname, hash } = useLocation();
  const main = useRef<HTMLElement>(null);
  const lastPath = useRef(pathname);

  // On page change, start at the top and move focus to the new content for keyboard and screen reader users.
  // Comparing paths (not "first render") keeps this right when React runs effects twice in development.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  // Jump to #section links. The browser tries before the page has rendered, so do it again once it has.
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [pathname, hash]);

  return (
    <div className={styles.console}>
      <a className={styles.skip} href="#main">
        {t.skipToContent}
      </a>
      <StatusBar />
      <NavRail />
      <main id="main" ref={main} tabIndex={-1} className={styles.main}>
        <Outlet />
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Jared Best</span>
          <Link to="/legal">{t.nav.legal}</Link>
          <span className={styles.hint}>{t.nav.shortcutHint}</span>
        </footer>
      </main>
    </div>
  );
}
