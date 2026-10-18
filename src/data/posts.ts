// Blog post list. The post texts live in src/content/posts and load only when a post is opened.
import type { Post } from "./types";

export const posts: Post[] = [
  {
    id: 3,
    slug: "mapping-ticonderoga",
    title: { en: "Mapping Ticonderoga", de: "Ticonderoga kartieren" },
    date: "2026-10-18",
    preview: "ticonderoga-edits",
  },
  {
    id: 2,
    slug: "ml-agents-setup-with-anaconda",
    title: { en: "ML-Agents Setup with Anaconda", de: "ML-Agents mit Anaconda einrichten" },
    date: "2021-03-17",
    preview: "training-loop",
  },
  {
    id: 1,
    slug: "london-street-orientations",
    title: { en: "London Street Orientations", de: "Straßenausrichtungen in London" },
    date: "2020-05-14",
    preview: "london-orientations",
  },
];
