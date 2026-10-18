// The app frame: status bar on top, nav rail on the left (bottom bar on phones), page in the middle.
import { useEffect, useRef } from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router";
import { useLanguage } from "../i18n/language";
import styles from "./Console.module.css";
import { NavRail } from "./NavRail";
import { StatusBar } from "./StatusBar";

export function Console() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const lastPath = useRef(pathname);

  // On page change, move focus to the new content for keyboard and screen reader users.
  // Scrolling is left to <ScrollRestoration>: top of page for new links, the old position on Back/Forward.
  // Comparing paths (not "first render") keeps this right when React runs effects twice in development.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  // On first load, jump to a #section link. The browser tries before the page has rendered.
  useEffect(() => {
    const { hash } = window.location;
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, []);

  return (
    <div className={styles.console}>
      <ScrollRestoration />
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
