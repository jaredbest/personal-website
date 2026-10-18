// Resume: summary, skills, experience, education, certifications, publication and languages.
import { KeyFacts } from "../components/KeyFacts";
import { Page } from "../components/Page";
import { Panel } from "../components/Panel";
import { Readout, Readouts } from "../components/Readouts";
import { Timeline, TimelineEntry } from "../components/Timeline";
import { certifications, publications } from "../data/credentials";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { profile } from "../data/profile";
import { skills } from "../data/skills";
import type { YearMonth } from "../data/types";
import { useLanguage } from "../i18n/language";
import { formatYearMonth, monthsBetween } from "../lib/dates";
import styles from "./Resume.module.css";

export function Resume() {
  const { lang, t, pick } = useLanguage();
  const r = t.resume;

  const sections = [
    { id: "summary", label: r.summary },
    { id: "skills", label: r.skills },
    { id: "experience", label: r.experience },
    { id: "education", label: r.education },
    { id: "certifications", label: r.certifications },
    { id: "publication", label: r.publication },
    { id: "languages", label: r.languages },
  ];

  const focusSkills = skills.flatMap((group) => group.skills.filter((skill) => skill.focus).map((skill) => skill.name));

  const range = (start: YearMonth, end?: YearMonth) =>
    `${formatYearMonth(start, lang)} – ${end ? formatYearMonth(end, lang) : r.present}`;

  const duration = (start: YearMonth, end?: YearMonth) => {
    const months = monthsBetween(start, end);
    return r.duration(Math.floor(months / 12), months % 12);
  };

  return (
    <Page title={r.title} index={3} lead={pick(profile.role)}>
      <nav aria-label={r.onThisPage} className={styles.jump}>
        <ul>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.summaryRow}>
        <Panel id="summary" title={r.summary}>
          <p className={styles.summary}>{pick(profile.summary)}</p>
        </Panel>
        <Panel title={r.keyFacts}>
          <KeyFacts />
        </Panel>
      </div>

      <Panel id="skills" title={r.skills}>
        <div className={styles.focusRow}>
          <h3 className={styles.skillTitle}>{r.focus}</h3>
          <ul className={styles.chips}>
            {focusSkills.map((name) => (
              <li key={name} className={styles.focus}>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <ul className={styles.legend}>
          <li>
            <span className={`${styles.sample} ${styles.focus}`} aria-hidden="true" />
            {r.legendFocus}
          </li>
          <li>
            <span className={styles.sample} aria-hidden="true" />
            {r.legendUsed}
          </li>
          <li>
            <span className={`${styles.sample} ${styles.basic}`} aria-hidden="true" />
            {r.legendBasic}
          </li>
        </ul>
        <div className={styles.skillGrid}>
          {skills.map((group) => (
            <section key={group.title.en} className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>{pick(group.title)}</h3>
              <ul className={styles.chips}>
                {group.skills.map(({ name, basic, focus }) => (
                  <li key={name} className={focus ? styles.focus : basic ? styles.basic : undefined}>
                    {name}
                    {focus && <span className="visually-hidden"> ({r.focus})</span>}
                    {basic && <span className={styles.basicTag}>{r.basic}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Panel>

      <Panel id="experience" title={r.experience} aside={experience.length}>
        <Timeline>
          {experience.map((role) => (
            <TimelineEntry
              key={`${role.company}-${role.start}`}
              dates={range(role.start, role.end)}
              duration={duration(role.start, role.end)}
              current={!role.end}
              title={pick(role.title)}
              meta={[
                role.company,
                pick(role.location),
                role.workMode && r.workMode[role.workMode],
                role.employment && r.employment[role.employment],
              ]
                .filter(Boolean)
                .join(" · ")}
            >
              <ul>
                {role.highlights.map((highlight) => (
                  <li key={highlight.en}>{pick(highlight)}</li>
                ))}
              </ul>
            </TimelineEntry>
          ))}
        </Timeline>
      </Panel>

      <Panel id="education" title={r.education} aside={education.length}>
        <Timeline>
          {education.map((school) => (
            <TimelineEntry
              key={school.school}
              dates={`${formatYearMonth(school.start, lang)} – ${formatYearMonth(school.end, lang)}`}
              duration={school.inProgress ? r.inProgress : undefined}
              current={school.inProgress}
              title={pick(school.degree)}
              meta={[school.school, pick(school.location), school.employment && r.employment[school.employment]]
                .filter(Boolean)
                .join(" · ")}
            >
              {school.grade && (
                <p className={styles.detail}>
                  <span className={styles.detailLabel}>{r.grade}</span>
                  {pick(school.grade)}
                </p>
              )}
              {school.modules && (
                <p className={styles.detail}>
                  <span className={styles.detailLabel}>{r.modules}</span>
                  {school.modules.join(" · ")}
                </p>
              )}
              {school.thesis && (
                <p className={styles.detail}>
                  <span className={styles.detailLabel}>
                    {r.thesis}
                    {school.thesis.result && ` · ${pick(school.thesis.result)}`}
                  </span>
                  <a href={school.thesis.url} target="_blank" rel="noopener noreferrer">
                    <cite>{school.thesis.title}</cite>
                    <span className="visually-hidden"> ({r.pdf}, {t.projects.newTab})</span>
                  </a>
                </p>
              )}
            </TimelineEntry>
          ))}
        </Timeline>
      </Panel>

      <div className={styles.columns}>
        <Panel id="certifications" title={r.certifications}>
          <ul className={styles.plainList}>
            {certifications.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Panel>

        <Panel id="publication" title={r.publication}>
          <ul className={styles.plainList}>
            {publications.map(({ title, citation, url }) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <cite>{pick(title)}</cite>
                  <span className="visually-hidden"> ({t.projects.newTab})</span>
                </a>
                <span className={styles.citation}>{citation}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel id="languages" title={r.languages}>
          <Readouts>
            {profile.languages.map(({ name, level }) => (
              <Readout key={name.en} label={pick(name)}>
                {pick(level)}
              </Readout>
            ))}
          </Readouts>
        </Panel>
      </div>
    </Page>
  );
}
