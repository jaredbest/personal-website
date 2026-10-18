// Outbound profile links as labelled buttons.
import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import { useLanguage } from "../i18n/language";
import styles from "./SocialLinks.module.css";

export function SocialLinks() {
  const { t } = useLanguage();
  return (
    <ul className={styles.list}>
      {profile.links.map(({ label, url }) => (
        <li key={url}>
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {label}
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="visually-hidden">({t.projects.newTab})</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
