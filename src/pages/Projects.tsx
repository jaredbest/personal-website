// Side projects as cards. Each card links out to where the project lives.
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { CardPreview } from "../components/CardPreview";
import { ClipPreview } from "../components/ClipPreview";
import { Page } from "../components/Page";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/language";
import styles from "./Projects.module.css";

export function Projects() {
  const { t, pick } = useLanguage();

  return (
    <Page title={t.projects.title} index={4} lead={t.projects.lead}>
      <ul className={styles.grid}>
        {projects.map((project) => {
          const internal = project.url.startsWith("/");
          return (
            <li key={project.url} data-panel className={styles.card}>
              {project.preview ? (
                <div className={styles.image}>
                  <CardPreview kind={project.preview} url={project.url} language={project.language} />
                </div>
              ) : project.clip && project.image ? (
                <ClipPreview still={project.image} clip={project.clip} className={styles.image} />
              ) : (
                <img src={project.image} alt="" width={600} height={400} loading="lazy" className={styles.image} />
              )}
              <div className={styles.body}>
                <h2 className={styles.title}>
                  {/* The link covers the whole card, so the full card is one big target. */}
                  {internal ? (
                    <Link to={project.url} className={styles.link}>
                      {pick(project.title)}
                    </Link>
                  ) : (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {pick(project.title)}
                      <span className="visually-hidden"> ({t.projects.newTab})</span>
                    </a>
                  )}
                </h2>
                <p className={styles.description}>{pick(project.description)}</p>
                <p className={styles.footer}>
                  <span>{internal ? "jaredbest.com" : new URL(project.url).hostname.replace(/^www\./, "")}</span>
                  <span className={styles.open} aria-hidden="true">
                    {internal ? t.blog.read : t.projects.open}
                    {internal ? <ArrowRight size={16} /> : <ArrowUpRight size={16} />}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
