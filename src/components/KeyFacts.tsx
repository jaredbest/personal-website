// The core facts about me as readouts: role, experience, studies, location and, optionally, languages.
import { formatLanguages, profile } from "../data/profile";
import { useLanguage } from "../i18n/language";
import { Readout, Readouts } from "./Readouts";

export function KeyFacts({ withLanguages = false }: { withLanguages?: boolean }) {
  const { t, pick } = useLanguage();
  return (
    <Readouts>
      <Readout label={t.home.currentRole}>{pick(profile.role)}</Readout>
      <Readout label={t.home.experience}>{t.home.years(profile.yearsInSoftware)}</Readout>
      <Readout label={t.home.studying}>{pick(profile.studying)}</Readout>
      <Readout label={t.home.location}>{pick(profile.location)}</Readout>
      {withLanguages && <Readout label={t.home.languages}>{formatLanguages(pick)}</Readout>}
    </Readouts>
  );
}
