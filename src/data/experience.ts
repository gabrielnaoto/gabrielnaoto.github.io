export interface ExperienceEntry {
  company: string;
  url?: string;
  role: { en: string; pt: string };
  startDate: string;
  endDate: { en: string; pt: string } | null; // null = present
  description: { en: string; pt: string };
  skillIcons: string; // comma-separated skillicons.dev icon ids
}

export const experience: ExperienceEntry[] = [
  {
    company: "Constructor",
    url: "https://constructor.io",
    role: {
      en: "Software Engineer",
      pt: "Engenheiro de Software",
    },
    startDate: "Jun 2021",
    endDate: null,
    description: {
      en: "Working on e-commerce search and discovery products.",
      pt: "Trabalhando em produtos de busca e descoberta para e-commerce.",
    },
    skillIcons: "react,ts,ruby",
  },
  {
    company: "Jungsoft",
    url: "https://jungsoft.io",
    role: {
      en: "Full-stack Developer",
      pt: "Desenvolvedor Full-stack",
    },
    startDate: "2018",
    endDate: { en: "May 2021", pt: "Mai 2021" },
    description: {
      en: "Built web and mobile applications including a cryptocurrency platform.",
      pt: "Construiu aplicacoes web e mobile incluindo uma plataforma de criptomoedas.",
    },
    skillIcons: "react,rails,react",
  },
  {
    company: "Kartrak",
    url: "https://kartrak.app",
    role: {
      en: "Full-stack Developer",
      pt: "Desenvolvedor Full-stack",
    },
    startDate: "2018",
    endDate: { en: "May 2021", pt: "Mai 2021" },
    description: {
      en: "Automation platform for the concrete industry.",
      pt: "Plataforma de automacao para a industria de concreto.",
    },
    skillIcons: "rails,react,androidstudio",
  },
  {
    company: "Singular Sistemas",
    role: {
      en: "Full-stack Developer",
      pt: "Desenvolvedor Full-stack",
    },
    startDate: "2017",
    endDate: { en: "2018", pt: "2018" },
    description: {
      en: "Built REST APIs and Android applications.",
      pt: "Construiu APIs REST e aplicacoes Android.",
    },
    skillIcons: "python,django,androidstudio",
  },
  {
    company: "UDESC",
    role: {
      en: "Scholarship Developer",
      pt: "Desenvolvedor Bolsista",
    },
    startDate: "2014",
    endDate: { en: "2015", pt: "2015" },
    description: {
      en: "Developed academic tools using JSF and PrimeFaces.",
      pt: "Desenvolveu ferramentas academicas usando JSF e PrimeFaces.",
    },
    skillIcons: "java",
  },
];
