// Shapes of the site content. Every piece of prose has an English and a German version.

export type Lang = "en" | "de";

/** Text in both site languages. */
export type Text = Record<Lang, string>;

/** "YYYY" or "YYYY-MM". */
export type YearMonth = string;

export type Employment = "full-time" | "part-time";

/** Live card previews that can stand in for an image. */
export type PreviewKind = "london-orientations" | "ticonderoga-edits" | "training-loop" | "repo" | "vscode-theme";

export interface ProfileLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  email: string;
  role: Text;
  tagline: Text;
  summary: Text;
  bio: Text;
  nationality: Text;
  location: Text;
  yearsInSoftware: number;
  studying: Text;
  languages: { name: Text; level: Text }[];
  links: ProfileLink[];
  images: { brand: string; about: { small: string; medium: string; large: string } };
}

export interface Role {
  company: string;
  title: Text;
  start: YearMonth;
  /** Leave out for a current role. */
  end?: YearMonth;
  location: Text;
  workMode?: "hybrid" | "remote" | "onsite";
  employment?: Employment;
  highlights: Text[];
}

export interface Education {
  school: string;
  degree: Text;
  start: YearMonth;
  end: YearMonth;
  location: Text;
  employment?: Employment;
  inProgress?: boolean;
  /** Final grade, with the scale explained. */
  grade?: Text;
  /** Course modules, by their official names. */
  modules?: string[];
  /** Final thesis, linked to its PDF. */
  thesis?: { title: string; url: string; result?: Text };
}

export interface Skill {
  name: string;
  /** Marks a skill I know the basics of. */
  basic?: boolean;
  /** Marks what I most want to work on. Keep this list short. */
  focus?: boolean;
}

export interface SkillGroup {
  title: Text;
  skills: Skill[];
}

/** A play-once animation (under five seconds) and the frame it ends on. */
export interface Clip {
  src: string;
  end: string;
  durationMs: number;
}

export interface Project {
  title: Text;
  description: Text;
  /** Card image. Not needed when the card has a live preview. */
  image?: string;
  /** Short clip that plays once over `image` when the card is seen or hovered. */
  clip?: Clip;
  preview?: PreviewKind;
  /** Main language, shown on "repo" previews. */
  language?: string;
  url: string;
}

export interface Post {
  id: number;
  slug: string;
  title: Text;
  date: string;
  /** Live graphic shown on the blog card. */
  preview: PreviewKind;
}
