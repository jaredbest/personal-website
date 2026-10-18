// Side projects, newest first. A `url` starting with "/" links to a page on this site.
import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: {
      en: "United States Congress Stock Transactions Retrieval",
      de: "Aktiengeschäfte des US-Kongresses abrufen",
    },
    description: {
      en: "I made a Jupyter Notebook that retrieves stock trade information of Members of Congress from publicly available financial disclosure reports.",
      de: "Ein Jupyter Notebook, das Aktiengeschäfte von Kongressmitgliedern aus öffentlich zugänglichen Vermögensoffenlegungen ausliest.",
    },
    preview: "repo",
    language: "Python",
    url: "https://github.com/jaredbest/us-congress-stock-transactions-retrieval",
  },
  {
    title: { en: "GreyStillPlays Theme for VS Code", de: "GreyStillPlays-Theme für VS Code" },
    description: {
      en: "I created a minimal, grey theme with subtle hints of lime and tickle me pink error messages. Crafted with C# development for Unity in mind, it is available on the Visual Studio Marketplace.",
      de: "Ein schlichtes, graues Theme mit dezenten Limettentönen und rosa Fehlermeldungen. Gemacht für die C#-Entwicklung mit Unity und im Visual Studio Marketplace erhältlich.",
    },
    preview: "vscode-theme",
    url: "https://marketplace.visualstudio.com/items?itemName=jaredbest.greystillplays-vscode",
  },
  {
    title: { en: "Mount Rainier", de: "Mount Rainier" },
    description: {
      en: "I created this 3D model of Mount Rainier, Washington, in Blender using the BlenderGIS add-on, which is capable of importing basemap and SRTM data. I applied quite a few material tweaks on this mesh and rendered it using Syferfontein 1d Clear from HDRIHaven.",
      de: "Ein 3D-Modell des Mount Rainier (Washington), erstellt in Blender mit dem Add-on BlenderGIS, das Basiskarten und SRTM-Höhendaten importiert. Mit vielen Material-Anpassungen und gerendert mit „Syferfontein 1d Clear“ von HDRIHaven.",
    },
    image: "/images/projects/blender-mount-rainier/blender-mount-rainier.webp",
    url: "https://dribbble.com/shots/15312472-Mount-Rainier-Blender-Render",
  },
  {
    title: { en: "Donut & Coffee", de: "Donut & Kaffee" },
    description: {
      en: "I rendered this as part of a Blender course, which covered topics such as Modeling, Sculpting, Materials, Lighting, Particles, UV Unwrapping, Texture Painting, Procedural Texturing, Displacement, Photo Texturing, and Volumetrics.",
      de: "Entstanden in einem Blender-Kurs zu Modellierung, Sculpting, Materialien, Beleuchtung, Partikeln, UV-Unwrapping, Texture Painting, prozeduralen Texturen, Displacement, Fototexturen und Volumetrics.",
    },
    image: "/images/projects/blender-donut-and-coffee/blender-donut-and-coffee.webp",
    url: "https://dribbble.com/shots/14615605-Donut-Coffee-Blender-Render",
  },
  {
    title: {
      en: "Legend of Zelda: Link's Awakening Look-Alike",
      de: "Legend of Zelda: Link's Awakening – Nachbau",
    },
    description: {
      en: "Following the tutorial of the incredible Mister Taft Creates and adding my own stuff along the way, I am developing this 2D game in Unity.",
      de: "Ein 2D-Spiel in Unity, nach dem Tutorial des großartigen Mister Taft Creates und mit eigenen Ergänzungen.",
    },
    image: "/images/projects/legend-of-zelda/legend-of-zelda-still.webp",
    clip: {
      src: "/images/projects/legend-of-zelda/legend-of-zelda-clip.webp",
      end: "/images/projects/legend-of-zelda/legend-of-zelda-end.webp",
      durationMs: 4400,
    },
    url: "https://github.com/jaredbest/unity-legend-of-zelda-links-awakening-look-alike",
  },
  {
    title: { en: "Mapping Ticonderoga", de: "Ticonderoga kartieren" },
    description: {
      en: "Ticonderoga is a town in Essex County, New York, USA. On OpenStreetMap (OSM), there was quite a bit of emptiness within the town boundary, so I used JOSM to fill in the gaps.",
      de: "Ticonderoga ist eine Stadt im Essex County, New York, USA. Auf OpenStreetMap (OSM) war innerhalb der Stadtgrenze vieles leer – mit JOSM habe ich die Lücken gefüllt.",
    },
    preview: "ticonderoga-edits",
    url: "/blog/3/mapping-ticonderoga",
  },
  {
    title: {
      en: "Output PTV Vissim Parking Lot Occupancy to CSV",
      de: "Parkplatzbelegung aus PTV Vissim als CSV ausgeben",
    },
    description: {
      en: "I created a PTV Vissim integrated Python script which outputs a CSV file containing the parking lot occupancy per unit of time as defined by the user.",
      de: "Ein in PTV Vissim eingebundenes Python-Skript, das die Parkplatzbelegung je Zeiteinheit (frei wählbar) als CSV-Datei ausgibt.",
    },
    preview: "repo",
    language: "Python",
    url: "https://github.com/jaredbest/output-ptv-vissim-parking-lot-occupancy-to-csv",
  },
  {
    title: {
      en: "Extract PTV Vissim Link Attributes to CSV",
      de: "Strecken-Attribute aus PTV Vissim als CSV exportieren",
    },
    description: {
      en: "I expanded on a Python script that parses a PTV Vissim INPX file and exports a CSV file containing relevant link attributes.",
      de: "Erweiterung eines Python-Skripts, das eine PTV-Vissim-INPX-Datei einliest und die wichtigsten Strecken-Attribute als CSV exportiert.",
    },
    preview: "repo",
    language: "Python",
    url: "https://github.com/jaredbest/extract-ptv-vissim-link-attributes-to-csv",
  },
];
