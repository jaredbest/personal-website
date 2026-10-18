// Placeholder shown in the main area while a page's code is loading.
import { useLanguage } from "../i18n/language";
import styles from "./PageLoading.module.css";

export function PageLoading() {
  const { t } = useLanguage();
  return (
    <p className={styles.loading} role="status">
      {t.loading}
    </p>
  );
}
