// About me: photo, short bio and personal details.
import { X, ZoomIn } from "lucide-react";
import { useRef } from "react";
import { Page } from "../components/Page";
import { Panel } from "../components/Panel";
import { Readout, Readouts } from "../components/Readouts";
import { profile } from "../data/profile";
import { useLanguage } from "../i18n/language";
import styles from "./About.module.css";

export function About() {
  const { t, pick } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  const { about } = profile.images;

  return (
    <Page title={t.about.title} index={2}>
      <div className={styles.grid}>
        <div data-panel className={styles.photoFrame}>
          <button type="button" className={styles.photoButton} onClick={() => dialog.current?.showModal()}>
            <img
              src={about.medium}
              srcSet={`${about.small} 800w, ${about.medium} 1200w`}
              sizes="(max-width: 1000px) 100vw, 560px"
              alt={t.about.photoAlt}
              width={1200}
              height={900}
              fetchPriority="high"
            />
            <span className={styles.zoom}>
              <ZoomIn size={18} aria-hidden="true" />
              {t.about.enlarge}
            </span>
          </button>
        </div>

        <Panel title={t.about.details}>
          <p className={styles.bio}>{pick(profile.bio)}</p>
          <Readouts>
            <Readout label={t.about.name}>{profile.name}</Readout>
            <Readout label={t.about.nationality}>{pick(profile.nationality)}</Readout>
            <Readout label={t.about.languages}>
              {profile.languages.map(({ name, level }) => `${pick(name)} (${pick(level)})`).join(", ")}
            </Readout>
            <Readout label={t.about.location}>{pick(profile.location)}</Readout>
            <Readout label={t.about.email}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </Readout>
          </Readouts>
        </Panel>
      </div>

      {/* Clicking the backdrop closes the dialog; Esc works natively. */}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={t.about.photoAlt}
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
      >
        <img src={about.large} alt={t.about.photoAlt} width={2364} height={1773} loading="lazy" />
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()}>
          <X size={20} aria-hidden="true" />
          {t.about.close}
        </button>
      </dialog>
    </Page>
  );
}
