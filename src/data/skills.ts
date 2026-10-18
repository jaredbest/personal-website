// Skills grouped by area. No self-ratings. "focus" marks what I most want to work on; "basic" marks skills I know the basics of.
import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    title: { en: "Programming languages", de: "Programmiersprachen" },
    skills: [
      { name: "Ruby", focus: true },
      { name: "Python", focus: true },
      { name: "SQL" },
      { name: "TypeScript", focus: true },
      { name: "JavaScript" },
      { name: "C++" },
      { name: "C#" },
      { name: "HTML/CSS" },
      { name: "VBA" },
      { name: "Rust", basic: true },
    ],
  },
  {
    title: { en: "Frameworks & libraries", de: "Frameworks & Bibliotheken" },
    skills: [
      { name: "Ruby on Rails", focus: true },
      { name: "React", focus: true },
      { name: "Hotwire (Turbo, Action Cable)" },
      { name: "Phlex" },
      { name: "Node.js" },
      { name: "Pandas" },
      { name: "Plotly" },
      { name: "OSMnx" },
      { name: "Tauri", basic: true },
    ],
  },
  {
    title: { en: "AI tooling", de: "KI-Werkzeuge" },
    skills: [{ name: "Claude Code", focus: true }, { name: "Model Context Protocol (MCP)" }, { name: "Claude skills" }],
  },
  {
    title: { en: "Databases", de: "Datenbanken" },
    skills: [{ name: "PostgreSQL" }, { name: "Oracle" }, { name: "DBeaver" }],
  },
  {
    title: { en: "Delivery & operations", de: "Auslieferung & Betrieb" },
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitLab" },
      { name: "GitHub Actions" },
      { name: "Jenkins" },
      { name: "Docker" },
      { name: "AppSignal" },
      { name: "Grafana" },
    ],
  },
  {
    title: { en: "Work tools", de: "Arbeitswerkzeuge" },
    skills: [
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "Jira" },
      { name: "Confluence" },
      { name: "Azure DevOps" },
      { name: "Microsoft Dynamics" },
    ],
  },
  {
    title: { en: "Transport & operations software", de: "Verkehrs- & Betriebssoftware" },
    skills: [
      { name: "DRT platform configuration" },
      { name: "HASTUS" },
      { name: "PTV Vissim" },
      { name: "PTV Visum" },
      { name: "PTV Vistro" },
      { name: "PTV Viswalk" },
    ],
  },
  {
    title: { en: "Geospatial", de: "Geodaten" },
    skills: [{ name: "Esri ArcGIS" }, { name: "QGIS" }, { name: "JOSM" }],
  },
  {
    title: { en: "Creative & 3D", de: "Gestaltung & 3D" },
    skills: [{ name: "Unity" }, { name: "Unity ML-Agents" }, { name: "Blender" }, { name: "Adobe Illustrator" }],
  },
];
