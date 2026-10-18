// Impressum (§ 5 DDG, § 18 Abs. 2 MStV) and privacy notice, in German and English.
import type { ReactNode } from "react";
import { Page } from "../components/Page";
import { Panel } from "../components/Panel";
import { profile } from "../data/profile";
import type { Lang } from "../data/types";
import { useLanguage } from "../i18n/language";
import styles from "./Legal.module.css";

const address = (
  <address className={styles.address}>
    Jared Best
    <br />
    Gellertstr. 4g
    <br />
    76185 Karlsruhe
    <br />
    Deutschland / Germany
  </address>
);

const email = <a href={`mailto:${profile.email}`}>{profile.email}</a>;

const content: Record<Lang, { imprint: string; privacy: string; body: [ReactNode, ReactNode] }> = {
  de: {
    imprint: "Impressum",
    privacy: "Datenschutz",
    body: [
      <>
        <p>Angaben gemäß § 5 DDG:</p>
        {address}
        <p>E-Mail: {email}</p>
        <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Jared Best, Anschrift wie oben.</p>
      </>,
      <>
        <p>Verantwortlich für die Datenverarbeitung ist Jared Best (Anschrift siehe Impressum).</p>
        <p>
          <strong>Hosting.</strong> Diese Website wird bei Netlify, Inc. (USA) gehostet. Beim Aufruf verarbeitet
          Netlify technisch notwendige Daten wie IP-Adresse, Zeitpunkt und aufgerufene Seite in Server-Logs, um die
          Seite auszuliefern und abzusichern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          <strong>Keine Cookies, kein Tracking.</strong> Es gibt keine Analyse-Werkzeuge und keine eingebetteten
          Inhalte von Dritten. Schriftarten werden von dieser Website selbst geladen. Ihre Sprach- und
          Anzeigeeinstellung wird nur in Ihrem Browser gespeichert (localStorage).
        </p>
        <p>
          <strong>E-Mail.</strong> Wenn Sie mir schreiben, nutze ich Ihre Angaben nur, um zu antworten.
        </p>
        <p>
          <strong>Ihre Rechte.</strong> Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit und Widerspruch sowie auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.
        </p>
      </>,
    ],
  },
  en: {
    imprint: "Legal notice (Impressum)",
    privacy: "Privacy",
    body: [
      <>
        <p>Information under § 5 DDG (German Digital Services Act):</p>
        {address}
        <p>Email: {email}</p>
        <p>Responsible for content under § 18(2) MStV: Jared Best, address as above.</p>
      </>,
      <>
        <p>The controller for data processing is Jared Best (address in the legal notice).</p>
        <p>
          <strong>Hosting.</strong> This site is hosted by Netlify, Inc. (USA). When you visit, Netlify processes
          technically necessary data such as your IP address, the time and the page requested in server logs, to
          deliver and protect the site. The legal basis is Art. 6(1)(f) GDPR.
        </p>
        <p>
          <strong>No cookies, no tracking.</strong> There are no analytics tools and no embedded third-party content.
          Fonts are served by this site. Your language and display setting is stored only in your browser
          (localStorage).
        </p>
        <p>
          <strong>Email.</strong> If you write to me, I use your details only to reply.
        </p>
        <p>
          <strong>Your rights.</strong> You have the right to access, rectification, erasure, restriction of
          processing, data portability and objection, and to complain to a data protection authority.
        </p>
      </>,
    ],
  },
};

export function Legal() {
  const { lang, t } = useLanguage();
  const { imprint, privacy, body } = content[lang];

  return (
    <Page title={t.legal.title}>
      <div className={styles.grid}>
        <Panel title={imprint}>
          <div className={styles.text}>{body[0]}</div>
        </Panel>
        <Panel title={privacy}>
          <div className={styles.text}>{body[1]}</div>
        </Panel>
      </div>
    </Page>
  );
}
