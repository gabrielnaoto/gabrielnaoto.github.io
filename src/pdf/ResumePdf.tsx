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
import { experience } from "../data/experience";
import { education } from "../data/education";
import { articles } from "../data/articles";

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
const PT = 1;

const styles = StyleSheet.create({
  page: {
    paddingTop: 0.4 * 72,
    paddingBottom: 0.4 * 72,
    paddingHorizontal: 0.4 * 72,
    fontSize: 10 * PT,
    fontFamily: F,
    lineHeight: 1.3,
    color: "#1a1a1a",
  },
  name: {
    fontSize: 14 * PT,
    fontWeight: 700,
    textAlign: "center",
    color: "#000000",
    marginBottom: 2 * PT,
  },
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
  paragraph: {
    fontSize: 10 * PT,
    marginBottom: 3 * PT,
    lineHeight: 1.3,
  },
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
  companyName: {
    fontSize: 10.5 * PT,
    fontWeight: 700,
    color: "#000000",
    marginTop: 6 * PT,
  },
  roleTitle: {
    fontSize: 10 * PT,
    fontWeight: 700,
    color: "#000000",
    marginTop: 3 * PT,
  },
  entryDate: {
    fontSize: 9 * PT,
    fontStyle: "italic",
    color: "#555555",
    marginBottom: 2 * PT,
  },
  educationTitle: {
    fontSize: 10.5 * PT,
    fontWeight: 700,
    color: "#000000",
    marginTop: 6 * PT,
  },
  publicationTitle: {
    fontWeight: 700,
    fontSize: 10 * PT,
  },
  publicationDetail: {
    fontSize: 10 * PT,
  },
});

const labels = {
  en: {
    summary: "Summary",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    publications: "Publications",
    languages: "Languages",
    present: "Present",
  },
  pt: {
    summary: "Resumo",
    skills: "Habilidades",
    experience: "Experiência",
    education: "Formação",
    publications: "Publicações",
    languages: "Idiomas",
    present: "Atual",
  },
};

const skillsList = {
  en: [
    { category: "Languages", items: "Ruby, JavaScript, TypeScript, Elixir, Python, Java, SQL" },
    { category: "Frameworks & Libraries", items: "React, Ruby on Rails, Next.js, Node.js, Django, GraphQL" },
    { category: "Databases", items: "PostgreSQL, MySQL" },
    { category: "Infrastructure & Tools", items: "AWS, Jenkins, Docker, Git, Vercel, Supabase" },
  ],
  pt: [
    { category: "Linguagens", items: "Ruby, JavaScript, TypeScript, Elixir, Python, Java, SQL" },
    { category: "Frameworks & Bibliotecas", items: "React, Ruby on Rails, Next.js, Node.js, Django, GraphQL" },
    { category: "Bancos de Dados", items: "PostgreSQL, MySQL" },
    { category: "Infraestrutura & Ferramentas", items: "AWS, Jenkins, Docker, Git, Vercel, Supabase" },
  ],
};

const languagesList = {
  en: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Professional" },
  ],
  pt: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Profissional" },
  ],
};

interface ResumePdfProps {
  lang: "en" | "pt";
}

export function ResumePdf({ lang }: ResumePdfProps) {
  const l = labels[lang];
  const edu = education[0];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Name */}
        <Text style={styles.name}>{personal.fullName}</Text>

        {/* Contact */}
        <Text style={styles.contactRow}>
          {`${personal.location[lang]} | `}
          <Link src={`mailto:${personal.email}`} style={styles.contactLink}>
            {personal.email}
          </Link>
          {" | gabrielnaoto.github.io"}
        </Text>

        {/* Summary */}
        <Text style={styles.sectionHeading}>{l.summary}</Text>
        <Text style={styles.paragraph}>{personal.bio[lang]}</Text>

        {/* Skills */}
        <Text style={styles.sectionHeading}>{l.skills}</Text>
        {skillsList[lang].map((skill) => (
          <View key={skill.category} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldInline}>{skill.category}:</Text>
              {" " + skill.items}
            </Text>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionHeading}>{l.experience}</Text>
        {experience.slice(0, 3).map((entry) => (
          <View key={entry.company}>
            {entry.roles.map((role, j) => {
              const endDate = role.endDate?.[lang] ?? l.present;
              return (
                <View key={j}>
                  <Text style={j === 0 ? styles.companyName : styles.roleTitle}>
                    {role.title[lang]} {"\u2014"} {entry.company}
                  </Text>
                  <Text style={styles.entryDate}>
                    {role.startDate} - {endDate}
                  </Text>
                  {role.bullets.map((bullet, k) => (
                    <View key={k} style={styles.bulletItem}>
                      <Text style={styles.bullet}>&#8226;</Text>
                      <Text style={styles.bulletText}>{bullet[lang]}</Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        ))}

        {/* Education */}
        <Text style={styles.sectionHeading}>{l.education}</Text>
        <Text style={styles.educationTitle}>
          {edu.degree[lang]} {"\u2014"} {edu.institution}
        </Text>
        <Text style={styles.entryDate}>
          {edu.startYear} - {edu.endYear}
        </Text>

        {/* Publications */}
        <Text style={styles.sectionHeading}>{l.publications}</Text>
        {articles.map((article, i) => (
          <View key={i} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.publicationTitle}>{article.title[lang]}</Text>
              <Text style={styles.publicationDetail}>
                {` \u2014 ${article.venue}, ${article.year}`}
              </Text>
            </Text>
          </View>
        ))}

        {/* Languages */}
        <Text style={styles.sectionHeading}>{l.languages}</Text>
        {languagesList[lang].map((item) => (
          <View key={item.name} style={styles.bulletItem}>
            <Text style={styles.bullet}>&#8226;</Text>
            <Text style={styles.bulletText}>
              {item.name} ({item.level})
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
