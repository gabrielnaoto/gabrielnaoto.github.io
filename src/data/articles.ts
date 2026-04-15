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
      pt: "Conduzindo os alunos a resolverem exercícios de programação através da verificação de seus objetivos durante a execução do programa",
    },
    venue: "SBIE — Simpósio Brasileiro de Informática na Educação",
    year: "2019",
    url: "http://milanesa.ime.usp.br/rbie/index.php/sbie/article/view/8711",
  },
];
