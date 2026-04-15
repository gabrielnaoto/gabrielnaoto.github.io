export interface ArticleEntry {
  title: { en: string; pt: string };
  venue: string;
  year: string;
  url?: string;
}

export const articles: ArticleEntry[] = [
  {
    title: {
      en: "Guiding students to solve programming exercises by verifying their objectives during program execution",
      pt: "Conduzindo os alunos a resolverem exercicios de programacao atraves da verificacao de seus objetivos durante a execucao do programa",
    },
    venue: "SBIE - Simposio Brasileiro de Informatica na Educacao",
    year: "2017",
  },
];
