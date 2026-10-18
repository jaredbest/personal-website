// Post texts by slug, in English and German. Imported only by the Post page so they load on demand.
import type { Text } from "../../data/types";
import londonEn from "./london-street-orientations.md?raw";
import londonDe from "./london-street-orientations.de.md?raw";
import ticonderogaEn from "./mapping-ticonderoga.md?raw";
import ticonderogaDe from "./mapping-ticonderoga.de.md?raw";
import mlAgentsEn from "./ml-agents-setup-with-anaconda.md?raw";
import mlAgentsDe from "./ml-agents-setup-with-anaconda.de.md?raw";

export const postBodies: Record<string, Text> = {
  "london-street-orientations": { en: londonEn, de: londonDe },
  "ml-agents-setup-with-anaconda": { en: mlAgentsEn, de: mlAgentsDe },
  "mapping-ticonderoga": { en: ticonderogaEn, de: ticonderogaDe },
};
