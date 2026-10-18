// Shown for unknown addresses: says what went wrong and offers a way back.
import { TriangleAlert } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Page } from "../components/Page";
import { Panel } from "../components/Panel";
import { useLanguage } from "../i18n/language";
import { navItems } from "../nav";
import styles from "./NotFound.module.css";

export function NotFound() {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  return (
    <Page title={t.notFound.title} section="404">
      <Panel title={t.notFound.warning} tone="caution">
        <p className={styles.message}>
          <TriangleAlert size={22} aria-hidden="true" />
          {t.notFound.body(pathname)}
        </p>
        <h2 className={styles.next}>{t.notFound.wayBack}</h2>
        <ul className={styles.links}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link to={path}>
                <Icon size={18} aria-hidden="true" />
                {t.nav[label]}
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </Page>
  );
}
