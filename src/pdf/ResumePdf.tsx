import {
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { personal } from "../data/personal";
import { education } from "../data/education";

// Computer Modern Serif — the actual LaTeX font
// OTF files served from public/fonts/
Font.register({
  family: "Computer Modern Serif",
  fonts: [
    { src: "/fonts/cmunrm.otf", fontWeight: 400, fontStyle: "normal" },
    { src: "/fonts/cmunbx.otf", fontWeight: 700, fontStyle: "normal" },
    { src: "/fonts/cmunti.otf", fontWeight: 400, fontStyle: "italic" },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const F = "Computer Modern Serif";

// All values below are matched to the reference PDF from curriculoglobal:
// h1: 14pt bold center, margin 0 0 2pt 0
// contact: 9pt #444 center, margin 0 0 6pt 0
// h2: 11pt bold uppercase, letter-spacing 1pt, margin 10pt 0 4pt 0, border-bottom 0.5pt #333
// h3: 10.5pt bold, margin 6pt 0 0 0
// date: 9pt #555 italic, margin 0 0 2pt 0
// body: 10pt #1a1a1a, line-height 1.3
// ul: padding-left 14pt, disc markers
// page: 0.4in margins all sides

const PT = 1; // 1pt = 1 in react-pdf units (which are pt by default)

const styles = StyleSheet.create({
  page: {
    paddingTop: 0.4 * 72,    // 0.4in
    paddingBottom: 0.4 * 72,
    paddingHorizontal: 0.4 * 72,
    fontSize: 10 * PT,
    fontFamily: F,
    lineHeight: 1.3,
    color: "#1a1a1a",
  },

  // h1 — name
  name: {
    fontSize: 14 * PT,
    fontWeight: 700,
    textAlign: "center",
    color: "#000000",
    marginBottom: 2 * PT,
  },

  // Contact line (p after h1)
  contactRow: {
    textAlign: "center",
    fontSize: 9 * PT,
    color: "#444444",
    marginBottom: 6 * PT,
  },
  contactLink: {
    color: "#0645ad",
    textDecoration: "none",
  },

  // h2 — section headings
  sectionHeading: {
    fontSize: 11 * PT,
    fontWeight: 700,
    color: "#000000",
    textTransform: "uppercase",
    letterSpacing: 1 * PT,
    marginTop: 10 * PT,
    marginBottom: 4 * PT,
    paddingBottom: 2 * PT,
    borderBottomWidth: 0.5 * PT,
    borderBottomColor: "#333333",
  },

  // Body paragraph (under Summary)
  paragraph: {
    fontSize: 10 * PT,
    marginBottom: 3 * PT,
    lineHeight: 1.3,
  },

  // Bullet list items
  bulletItem: {
    flexDirection: "row",
    paddingLeft: 14 * PT,
    marginBottom: 1 * PT,
  },
  bullet: {
    width: 10 * PT,
    fontSize: 10 * PT,
    color: "#555555",
  },
  bulletText: {
    flex: 1,
    fontSize: 10 * PT,
    lineHeight: 1.3,
  },
  boldInline: {
    fontWeight: 700,
  },

  // h3 — job title line
  entryTitle: {
    fontSize: 10.5 * PT,
    fontWeight: 700,
    color: "#000000",
    marginTop: 6 * PT,
  },

  // Date line (italic, after h3)
  entryDate: {
    fontSize: 9 * PT,
    fontStyle: "italic",
    color: "#555555",
    marginBottom: 2 * PT,
  },

  // Education — same as h3
  educationTitle: {
    fontSize: 10.5 * PT,
    fontWeight: 700,
    color: "#000000",
    marginTop: 6 * PT,
  },

  // Publication bold title
  publicationTitle: {
    fontWeight: 700,
    fontSize: 10 * PT,
  },
  publicationDetail: {
    fontSize: 10 * PT,
  },
});

// Resume-specific content matching the reference PDF exactly

const resumeData = {
  en: {
    summary:
      "Full-stack Software Engineer with 7+ years of experience building production web and mobile applications across Ruby on Rails, React, and Elixir. Currently shipping features at Constructor.io, a global e-commerce search and discovery platform, working across the full stack with a strong focus on quality and delivery.",
    skills: [
      {
        category: "Languages",
        items: "Ruby, JavaScript, TypeScript, Elixir, Python, Java, SQL",
      },
      {
        category: "Frameworks & Libraries",
        items: "Ruby on Rails, React, React Native, Django, GraphQL",
      },
      { category: "Databases", items: "SQL (relational)" },
      { category: "Tools & Practices", items: "Git, Agile" },
    ],
    experience: [
      {
        role: "Software Engineer",
        company: "Constructor.io",
        date: "Jun 2021 - Present",
        bullets: [
          "Build and maintain full-stack features across Ruby on Rails and React for a large-scale e-commerce search and discovery platform used by major global retailers.",
          "Contribute to GraphQL API design and implementation, enabling flexible data querying across client-facing product surfaces.",
          "Collaborate with distributed, cross-functional engineering teams to ship product improvements in a remote-first environment.",
        ],
      },
      {
        role: "Full-stack Developer",
        company: "Jungsoft GmbH",
        date: "2018 - May 2021",
        bullets: [
          "Developed full-stack features using Elixir and React across multiple client projects at a software consultancy, adapting quickly to varying domain requirements.",
          "Built React Native mobile interfaces, extending product reach to iOS and Android users.",
        ],
      },
      {
        role: "Full-stack Developer",
        company: "Singular Sistemas",
        date: "2017 - 2018",
        bullets: [
          "Delivered full-stack features using Python and Django for internal business systems.",
        ],
      },
    ],
    educationInstitution: "University of the State of Santa Catarina",
    publications: [
      {
        title:
          "Leading students to programming resolution exercises by verifying their goals during program execution",
        detail:
          "Brazilian Symposium on Computers in Education, 2019. Authors: Adilson Vahldick, Gabriel Naoto Ymai Pereira.",
      },
    ],
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Professional" },
    ],
  },
  pt: {
    summary:
      "Engenheiro de Software Full-stack com 7+ anos de experiencia construindo aplicacoes web e mobile em producao com Ruby on Rails, React e Elixir. Atualmente desenvolvendo funcionalidades na Constructor.io, uma plataforma global de busca e descoberta para e-commerce, trabalhando em toda a stack com forte foco em qualidade e entrega.",
    skills: [
      {
        category: "Linguagens",
        items: "Ruby, JavaScript, TypeScript, Elixir, Python, Java, SQL",
      },
      {
        category: "Frameworks & Bibliotecas",
        items: "Ruby on Rails, React, React Native, Django, GraphQL",
      },
      { category: "Bancos de Dados", items: "SQL (relacional)" },
      { category: "Ferramentas & Praticas", items: "Git, Agile" },
    ],
    experience: [
      {
        role: "Engenheiro de Software",
        company: "Constructor.io",
        date: "Jun 2021 - Atual",
        bullets: [
          "Construir e manter funcionalidades full-stack em Ruby on Rails e React para uma plataforma de busca e descoberta e-commerce em larga escala utilizada por grandes varejistas globais.",
          "Contribuir para o design e implementacao de APIs GraphQL, permitindo consultas flexiveis de dados em superficies de produto voltadas ao cliente.",
          "Colaborar com equipes de engenharia distribuidas e multifuncionais para entregar melhorias de produto em um ambiente remote-first.",
        ],
      },
      {
        role: "Desenvolvedor Full-stack",
        company: "Jungsoft GmbH",
        date: "2018 - Mai 2021",
        bullets: [
          "Desenvolveu funcionalidades full-stack usando Elixir e React em multiplos projetos de clientes em uma consultoria de software, adaptando-se rapidamente a diferentes requisitos de dominio.",
          "Construiu interfaces mobile com React Native, estendendo o alcance do produto para usuarios iOS e Android.",
        ],
      },
      {
        role: "Desenvolvedor Full-stack",
        company: "Singular Sistemas",
        date: "2017 - 2018",
        bullets: [
          "Entregou funcionalidades full-stack usando Python e Django para sistemas internos de negocios.",
        ],
      },
    ],
    educationInstitution: "Universidade do Estado de Santa Catarina",
    publications: [
      {
        title:
          "Leading students to programming resolution exercises by verifying their goals during program execution",
        detail:
          "Simposio Brasileiro de Informatica na Educacao, 2019. Autores: Adilson Vahldick, Gabriel Naoto Ymai Pereira.",
      },
    ],
    languages: [
      { name: "Portugues", level: "Nativo" },
      { name: "Ingles", level: "Profissional" },
    ],
  },
};

interface ResumePdfProps {
  lang: "en" | "pt";
}

export function ResumePdf({ lang }: ResumePdfProps) {
  const data = resumeData[lang];
  const edu = education[0];
  const sectionLabels =
    lang === "en"
      ? {
          summary: "Summary",
          skills: "Skills",
          experience: "Experience",
          education: "Education",
          publications: "Publications & Speaking",
          languages: "Languages",
        }
      : {
          summary: "Resumo",
          skills: "Habilidades",
          experience: "Experiencia",
          education: "Formacao",
          publications: "Publicacoes & Palestras",
          languages: "Idiomas",
        };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* h1 — Name */}
        <Text style={styles.name}>{personal.fullName}</Text>

        {/* Contact line */}
        <Text style={styles.contactRow}>
          {"Florianópolis, Brazil | "}
          <Link src={`mailto:${personal.email}`} style={styles.contactLink}>
            {personal.email}
          </Link>
          {" | +55 47 9 9113 2459 | gabrielnaoto.github.io"}
        </Text>

        {/* SUMMARY */}
        <Text style={styles.sectionHeading}>{sectionLabels.summary}</Text>
        <Text style={styles.paragraph}>{data.summary}</Text>

        {/* SKILLS */}
        <Text style={styles.sectionHeading}>{sectionLabels.skills}</Text>
        {data.skills.map((skill) => (
          <View key={skill.category} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldInline}>{skill.category}:</Text>
              {" " + skill.items}
            </Text>
          </View>
        ))}

        {/* EXPERIENCE */}
        <Text style={styles.sectionHeading}>{sectionLabels.experience}</Text>
        {data.experience.map((entry) => (
          <View key={`${entry.company}-${entry.date}`}>
            <Text style={styles.entryTitle}>
              {entry.role} {"\u2014"} {entry.company}
            </Text>
            <Text style={styles.entryDate}>{entry.date}</Text>
            {entry.bullets.map((bullet, i) => (
              <View key={i} style={styles.bulletItem}>
                <Text style={styles.bullet}>&#8226;</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* EDUCATION */}
        <Text style={styles.sectionHeading}>{sectionLabels.education}</Text>
        <Text style={styles.educationTitle}>
          {edu.degree[lang]} {"\u2014"} {data.educationInstitution}
        </Text>
        <Text style={styles.entryDate}>
          {edu.startYear} - {edu.endYear}
        </Text>

        {/* PUBLICATIONS & SPEAKING */}
        <Text style={styles.sectionHeading}>
          {sectionLabels.publications}
        </Text>
        {data.publications.map((pub, i) => (
          <View key={i} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.publicationTitle}>{pub.title}</Text>
              <Text style={styles.publicationDetail}>
                {" \u2014 " + pub.detail}
              </Text>
            </Text>
          </View>
        ))}

        {/* LANGUAGES */}
        <Text style={styles.sectionHeading}>{sectionLabels.languages}</Text>
        {data.languages.map((l) => (
          <View key={l.name} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              {l.name} ({l.level})
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
