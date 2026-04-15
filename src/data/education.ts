export interface EducationEntry {
  institution: string;
  degree: { en: string; pt: string };
  startYear: string;
  endYear: string;
}

export const education: EducationEntry[] = [
  {
    institution: "Universidade do Estado de Santa Catarina",
    degree: {
      en: "Bachelor's in Software Engineering",
      pt: "Bacharelado em Engenharia de Software",
    },
    startYear: "2014",
    endYear: "2018",
  },
];
