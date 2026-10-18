// Schools and degrees, newest first.
import type { Education } from "./types";

export const education: Education[] = [
  {
    school: "University of Bath",
    degree: { en: "Master of Science (MSc) | Computer Science", de: "Master of Science (MSc) | Informatik" },
    start: "2026-01",
    end: "2028-04",
    location: { en: "Bath, UK (remote)", de: "Bath, Vereinigtes Königreich (remote)" },
    employment: "part-time",
    inProgress: true,
    modules: [
      "Principles of Programming",
      "Software Engineering 1 & 2",
      "Foundations of Computation",
      "Databases and Cloud",
    ],
  },
  {
    school: "Technical University of Munich (TUM)",
    degree: {
      en: "Master of Science (M.Sc.) | Environmental Engineering, focus on Urban Environments & Transportation",
      de: "Master of Science (M.Sc.) | Umweltingenieurwesen, Schwerpunkt Urbane Räume & Verkehr",
    },
    start: "2015-04",
    end: "2018-01",
    location: { en: "Munich, Germany", de: "München, Deutschland" },
    employment: "full-time",
    grade: {
      en: "1.7 (scale 1.0–5.0; 1.0 is best)",
      de: "1,7 (Skala 1,0–5,0; 1,0 ist die beste Note)",
    },
    thesis: {
      result: { en: "Awarded a perfect score", de: "Mit der Bestnote bewertet" },
      title:
        "Modeling and Evaluating a Truck Parking Information Management System Using Microscopic Traffic Simulation: A Case Study of the New York State Thruway",
      url: "https://www.mos.ed.tum.de/fileadmin/w00ccp/tb/theses/Best_2018.pdf",
    },
  },
  {
    school: "University of Waterloo",
    degree: { en: "No degree conferred | Civil Engineering", de: "Ohne Abschluss | Bauingenieurwesen" },
    start: "2013-09",
    end: "2014-12",
    location: { en: "Waterloo, Ontario, Canada", de: "Waterloo, Ontario, Kanada" },
    employment: "full-time",
  },
  {
    school: "Clarkson University",
    degree: {
      en: "Bachelor of Science (B.S.) with Distinction | Environmental Engineering",
      de: "Bachelor of Science (B.S.) mit Auszeichnung | Umweltingenieurwesen",
    },
    start: "2009-08",
    end: "2013-05",
    location: { en: "Potsdam, New York, USA", de: "Potsdam, New York, USA" },
    employment: "full-time",
  },
  {
    school: "Ticonderoga Senior High School",
    degree: { en: "High School Diploma", de: "High-School-Abschluss" },
    start: "2006",
    end: "2009",
    location: { en: "Ticonderoga, New York, USA", de: "Ticonderoga, New York, USA" },
  },
];
