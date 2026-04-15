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
    skillIcons: "react,nextjs,vercel,supabase",
    liveUrl: "https://curriculoglobal.com.br",
  },
  {
    name: "Concretar",
    description: {
      en: "Concrete quality control platform for civil engineering firms. Automates test specimen tracking, CEB-FIP resistance calculations, and PDF report generation, replacing error-prone spreadsheets with a field-ready interface.",
      pt: "Plataforma de controle tecnológico de concreto para empresas de engenharia civil. Automatiza o rastreamento de corpos de prova, cálculos de resistência CEB-FIP e geração de relatórios em PDF, substituindo planilhas propensas a erros por uma interface pronta para o campo.",
    },
    skillIcons: "react,nextjs,vercel,supabase",
    liveUrl: "https://concretar.app.br",
  },
];
