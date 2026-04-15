export interface Role {
  title: { en: string; pt: string };
  startDate: string;
  endDate: { en: string; pt: string } | null;
  bullets: { en: string; pt: string }[];
  skillIcons: string;
}

export interface ExperienceEntry {
  company: string;
  url?: string;
  roles: Role[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Constructor",
    url: "https://constructor.io",
    roles: [
      {
        title: {
          en: "Engineering Manager",
          pt: "Gerente de Engenharia",
        },
        startDate: "Jan 2024",
        endDate: null,
        bullets: [
          {
            en: "Restructured team composition and responsibilities to align with evolving business priorities",
            pt: "Reestruturou a composição e responsabilidades da equipe para alinhar com as prioridades de negócio em evolução.",
          },
          {
            en: "Led migration of authentication system to an in-house solution, enabling RBAC, granular API token permissions, and reducing legacy technical debt",
            pt: "Liderou a migração do sistema de autenticação para uma solução interna, habilitando RBAC, permissões granulares de tokens de API e reduzindo débito técnico legado.",
          },
          {
            en: "Guided engineers through delivery of complex cross-functional initiatives including an agentic AI chat with a knowledge base and merchant tooling for facet and collection management",
            pt: "Orientou engenheiros na entrega de iniciativas complexas e multifuncionais, incluindo um chat com IA agêntica com base de conhecimento e ferramentas para comerciantes gerenciarem facetas e coleções.",
          },
        ],
        skillIcons: "aws,jenkins,react,ts,nodejs,ruby,postgres",
      },
      {
        title: {
          en: "Software Engineer",
          pt: "Engenheiro de Software",
        },
        startDate: "Jun 2021",
        endDate: { en: "Dec 2023", pt: "Dez 2023" },
        bullets: [
          {
            en: "Drove migration to a new analytics service, replacing Elasticsearch to deliver improved performance and scalability across the platform",
            pt: "Conduziu a migração para um novo serviço de analytics, substituindo o Elasticsearch para entregar melhor desempenho e escalabilidade em toda a plataforma.",
          },
          {
            en: "Built a campaign management system for merchandiser rules, enabling merchants to create and manage rules from a single interface",
            pt: "Construiu um sistema de gerenciamento de campanhas para regras de merchandising, permitindo que comerciantes criem e gerenciem regras a partir de uma única interface.",
          },
        ],
        skillIcons: "react,ts,ruby,py,mysql",
      },
    ],
  },
  {
    company: "Jungsoft",
    url: "https://jungsoft.io",
    roles: [
      {
        title: {
          en: "Full-Stack Developer",
          pt: "Desenvolvedor Full-Stack",
        },
        startDate: "2018",
        endDate: { en: "May 2021", pt: "Mai 2021" },
        bullets: [
          {
            en: "Led frontend development of a web-based workout application",
            pt: "Liderou o desenvolvimento frontend de uma aplicação web de treinos.",
          },
          {
            en: "Contributed to the development of The Kitty App, a shared-funds platform that allows groups to pool money for events, outings, and fundraisers with integrated Apple Pay and Google Pay support",
            pt: "Contribuiu no desenvolvimento do The Kitty App, uma plataforma de fundos compartilhados que permite grupos reunirem dinheiro para eventos, passeios e arrecadações com integração de Apple Pay e Google Pay.",
          },
        ],
        skillIcons: "react,rails",
      },
    ],
  },
  {
    company: "Kartrak",
    url: "https://kartrak.app",
    roles: [
      {
        title: {
          en: "Full-Stack Developer",
          pt: "Desenvolvedor Full-Stack",
        },
        startDate: "2018",
        endDate: { en: "May 2021", pt: "Mai 2021" },
        bullets: [
          {
            en: "Maintained an ERP platform for fleet management including NFS-e issuance, billing, accounts payable, expense tracking, and vehicle maintenance",
            pt: "Manteve uma plataforma ERP para gestão de frotas incluindo emissão de NFS-e, boletos, contas a pagar, controle de despesas e manutenção de veículos.",
          },
          {
            en: "Built a real-time dashboard for automation of concrete batching plants",
            pt: "Construiu um dashboard em tempo real para automação de usinas de concreto.",
          },
          {
            en: "Developed a real-time map for tracking truck fleet locations",
            pt: "Desenvolveu um mapa em tempo real para rastreamento de frotas de caminhões.",
          },
          {
            en: "Managed an Android field application used by drivers and operators",
            pt: "Gerenciou uma aplicação Android de campo utilizada por motoristas e operadores.",
          },
        ],
        skillIcons: "rails,react,elixir,androidstudio,java",
      },
    ],
  },
  {
    company: "Singular Sistemas",
    roles: [
      {
        title: {
          en: "Full-Stack Developer",
          pt: "Desenvolvedor Full-Stack",
        },
        startDate: "2017",
        endDate: { en: "2018", pt: "2018" },
        bullets: [
          {
            en: "Led development of a laboratory management system with automated approval workflows and calculation of field test reports covering 50+ test types for the concrete industry",
            pt: "Liderou o desenvolvimento de um sistema de gestão laboratorial com fluxos de aprovação automatizados e cálculo de relatórios de ensaios de campo cobrindo mais de 50 tipos de testes para a indústria de concreto.",
          },
          {
            en: "Led development of a ride-booking platform (web + mobile) for call centers to dispatch drivers to corporate events using proximity-based matching",
            pt: "Liderou o desenvolvimento de uma plataforma de agendamento de corridas (web + mobile) para call centers despacharem motoristas para eventos corporativos utilizando correspondência por proximidade.",
          },
        ],
        skillIcons: "py,django,androidstudio",
      },
    ],
  },
];
