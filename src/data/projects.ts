export interface ProjectEntry {
  name: string;
  description: { en: string; pt: string };
  skillIcons: string;
  liveUrl?: string;
  codeUrl?: string;
  image?: string;
}

export const projects: ProjectEntry[] = [
  {
    name: "Currículo Global",
    description: {
      en: "AI-powered resume optimization platform for software engineers targeting international remote positions. Features ATS diagnostic scoring, seniority-calibrated evaluation, and professional resume rewriting in English.",
      pt: "Plataforma de otimização de currículos com IA para engenheiros de software que buscam posições remotas internacionais. Oferece diagnóstico ATS, avaliação calibrada por senioridade e reescrita profissional de currículos em inglês.",
    },
    skillIcons: "react,nextjs,vercel",
    liveUrl: "https://curriculoglobal.com.br",
  },
];
