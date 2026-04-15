export interface SkillCategory {
  category: { en: string; pt: string };
  icons: string; // comma-separated skillicons.dev ids
}

export const skills: SkillCategory[] = [
  {
    category: { en: "Frontend", pt: "Frontend" },
    icons: "react,ts,js,html,css",
  },
  {
    category: { en: "Backend", pt: "Backend" },
    icons: "ruby,rails,python,django,elixir,java",
  },
  {
    category: { en: "Mobile", pt: "Mobile" },
    icons: "androidstudio",
  },
  {
    category: { en: "Databases", pt: "Bancos de Dados" },
    icons: "postgres,mysql",
  },
  {
    category: { en: "Tools", pt: "Ferramentas" },
    icons: "git,github,graphql,docker",
  },
];
