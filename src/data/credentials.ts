// Certifications and publications.
import type { Text } from "./types";

export interface Publication {
  title: Text;
  /** Authors, journal and date, as cited. */
  citation: string;
  url: string;
}

export const certifications: string[] = [
  "Learn C++ Course",
  "SQL (Advanced)",
  "Complete C# Masterclass",
  "PTV Vision Certified Trainer",
  "Intern Engineer (EIT)",
];

export const publications: Publication[] = [
  {
    title: {
      en: "Truck Parking Demand Modeling Using Microscopic Traffic Simulation: A Case Study of the New York State Thruway",
      de: "Truck Parking Demand Modeling Using Microscopic Traffic Simulation: A Case Study of the New York State Thruway (englischsprachig)",
    },
    citation: "Best, J. & Moreno, A. T. ITE Journal 89(10), 22–23, October 2019",
    url: "https://trid.trb.org/view/1660769",
  },
];
