// Landing page: who I am at a glance, plus big shortcuts into the rest of the site.
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Page } from "../components/Page";
import { Panel } from "../components/Panel";
import { KeyFacts } from "../components/KeyFacts";
import { SocialLinks } from "../components/SocialLinks";
import { experience } from "../data/experience";
import { posts } from "../data/posts";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/language";
import styles from "./Home.module.css";

export function Home() {
  const { t, pick } = useLanguage();

  const tiles = [
    { to: "/resume", count: experience.length, label: t.home.roles(experience.length), title: t.nav.resume },
    { to: "/projects", count: projects.length, label: t.home.projects(projects.length), title: t.nav.projects },
    { to: "/blog", count: posts.length, label: t.home.posts(posts.length), title: t.nav.blog },
  ];

  return (
    <Page
      title={t.home.title}
      index={1}
      heading={
        <>
          {t.home.greeting} <span className={styles.name}>{profile.name}</span>
        </>
      }
      lead={pick(profile.tagline)}
    >
      <div className={styles.grid}>
        <Panel title={t.home.atAGlance}>
          <KeyFacts withLanguages />
        </Panel>

        <Panel title={t.home.profiles}>
          <SocialLinks />
        </Panel>
      </div>

      <Panel title={t.home.explore}>
        <ul className={styles.tiles}>
          {tiles.map(({ to, count, label, title }) => (
            <li key={to}>
              <Link to={to} className={styles.tile}>
                <span className={styles.count}>{String(count).padStart(2, "0")}</span>
                <span className={styles.tileText}>
                  <span className={styles.tileTitle}>{title}</span>
                  <span className={styles.tileLabel}>{label}</span>
                </span>
                <ArrowRight size={20} aria-hidden="true" className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </Page>
  );
}
