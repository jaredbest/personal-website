// Who I am: the facts shown on Home and About.
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Jared Best",
  email: "me@jaredbest.com",
  role: {
    en: "Product Engineer at ioki",
    de: "Product Engineer bei ioki",
  },
  tagline: {
    en: "This place showcases some of the projects I've worked on in my spare time.",
    de: "Hier zeige ich einige Projekte, an denen ich in meiner Freizeit gearbeitet habe.",
  },
  summary: {
    en: "Product Engineer with 8 years in the software industry, spanning technical support, professional services, and product development across transportation and mobility platforms. Works primarily in Ruby on Rails, Python, and SQL, with recent work building internal AI tooling. Currently pursuing a part-time MSc in Computer Science at the University of Bath alongside full-time professional work.",
    de: "Product Engineer mit 8 Jahren Erfahrung in der Softwarebranche – von technischem Support über Professional Services bis zur Produktentwicklung für Verkehrs- und Mobilitätsplattformen. Arbeitet vor allem mit Ruby on Rails, Python und SQL und hat zuletzt interne KI-Werkzeuge gebaut. Studiert berufsbegleitend Informatik (MSc) an der University of Bath.",
  },
  bio: {
    en: "Originally from the Adirondacks, I have lived in Canada and now Germany. I'm an avid traveler, hiker, cyclist, podcast addict, hobby investor, self-taught coder, and life-long learner.",
    de: "Ich komme ursprünglich aus den Adirondacks, habe in Kanada gelebt und wohne jetzt in Deutschland. Ich reise, wandere und fahre Rad, höre viel zu viele Podcasts, investiere als Hobby, habe mir das Programmieren selbst beigebracht und lerne nie aus.",
  },
  nationality: {
    en: "German and American (dual citizen)",
    de: "Deutsch und US-amerikanisch (doppelte Staatsbürgerschaft)",
  },
  location: { en: "Karlsruhe, Germany", de: "Karlsruhe, Deutschland" },
  yearsInSoftware: 8,
  studying: {
    en: "MSc Computer Science, University of Bath",
    de: "MSc Informatik, University of Bath",
  },
  languages: [
    { name: { en: "English", de: "Englisch" }, level: { en: "Native", de: "Muttersprache" } },
    { name: { en: "German", de: "Deutsch" }, level: { en: "C1", de: "C1" } },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/jaredbest" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jaredbest/" },
    { label: "Dribbble", url: "https://dribbble.com/JaredBest" },
  ],
  images: {
    brand: "/images/brand-image-96.webp",
    about: {
      small: "/images/about-image-800.webp",
      medium: "/images/about-image-1200.webp",
      large: "/images/about-image-large.jpg",
    },
  },
};
