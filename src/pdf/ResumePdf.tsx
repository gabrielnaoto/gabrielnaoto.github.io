import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { personal } from "../data/personal";
import { education } from "../data/education";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.35,
    color: "#000",
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  contactRow: {
    textAlign: "center",
    fontSize: 9,
    color: "#444",
    marginBottom: 10,
  },
  contactLink: {
    color: "#2b6e99",
    textDecoration: "none",
  },
  sectionHeading: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 3.5,
    marginTop: 10,
    marginBottom: 1,
    borderBottomWidth: 0.8,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  paragraph: {
    fontSize: 10,
    marginTop: 5,
    lineHeight: 1.4,
  },
  bulletItem: {
    flexDirection: "row",
    marginLeft: 8,
    marginTop: 3,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  entryTitleRow: {
    flexDirection: "row",
  },
  entryRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  entryCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  entrySeparator: {
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  entryDate: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
    marginTop: 1,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  educationTitleRow: {
    flexDirection: "row",
    flex: 1,
  },
  educationDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  educationInstitution: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  publicationTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  publicationDetail: {
    fontSize: 10,
  },
});

// Resume-specific content that matches the reference PDF
// This is separate from website data to allow resume-specific wording

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
        {/* Name */}
        <Text style={styles.name}>{personal.fullName}</Text>

        {/* Contact row */}
        <Text style={styles.contactRow}>
          {"Florianópolis, Brazil | "}
          <Link src={`mailto:${personal.email}`} style={styles.contactLink}>
            {personal.email}
          </Link>
          {" | +55 47 9 9113 2459 | gabrielnaoto.github.io"}
        </Text>

        {/* Summary */}
        <Text style={styles.sectionHeading}>{sectionLabels.summary}</Text>
        <Text style={styles.paragraph}>{data.summary}</Text>

        {/* Skills */}
        <Text style={styles.sectionHeading}>{sectionLabels.skills}</Text>
        {data.skills.map((skill) => (
          <View key={skill.category} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {skill.category}:
              </Text>
              {" " + skill.items}
            </Text>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionHeading}>{sectionLabels.experience}</Text>
        {data.experience.map((entry) => (
          <View key={`${entry.company}-${entry.date}`}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryRole}>{entry.role}</Text>
                <Text style={styles.entrySeparator}> — </Text>
                <Text style={styles.entryCompany}>{entry.company}</Text>
              </View>
            </View>
            <Text style={styles.entryDate}>{entry.date}</Text>
            {entry.bullets.map((bullet, i) => (
              <View key={i} style={styles.bulletItem}>
                <Text style={styles.bullet}>&#8226;</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Education */}
        <Text style={styles.sectionHeading}>{sectionLabels.education}</Text>
        <View style={styles.educationHeader}>
          <View style={styles.educationTitleRow}>
            <Text style={styles.educationDegree}>{edu.degree[lang]}</Text>
            <Text style={styles.entrySeparator}> — </Text>
            <Text style={styles.educationInstitution}>
              {data.educationInstitution}
            </Text>
          </View>
        </View>
        <Text style={styles.entryDate}>
          {edu.startYear} - {edu.endYear}
        </Text>

        {/* Publications & Speaking */}
        <Text style={styles.sectionHeading}>
          {sectionLabels.publications}
        </Text>
        {data.publications.map((pub, i) => (
          <View key={i} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.publicationTitle}>{pub.title}</Text>
              <Text style={styles.publicationDetail}>
                {" — " + pub.detail}
              </Text>
            </Text>
          </View>
        ))}

        {/* Languages */}
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
