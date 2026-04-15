import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { personal } from "../data/personal";
import { experience } from "../data/experience";
import { education } from "../data/education";
import { skills } from "../data/skills";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.3,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  contactRow: {
    textAlign: "center",
    fontSize: 9,
    color: "#333",
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  entryCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  entryRole: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
  },
  entryDate: {
    fontSize: 10,
    textAlign: "right",
  },
  bulletItem: {
    flexDirection: "row",
    marginLeft: 12,
    marginTop: 2,
  },
  bullet: {
    width: 8,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  skillItems: {
    fontSize: 10,
  },
});

interface ResumePdfProps {
  lang: "en" | "pt";
}

export function ResumePdf({ lang }: ResumePdfProps) {
  const presentLabel = lang === "en" ? "Present" : "Atual";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Name */}
        <Text style={styles.name}>{personal.fullName}</Text>

        {/* Contact */}
        <Text style={styles.contactRow}>
          {personal.email} | {personal.social.github} | {personal.social.linkedin}
        </Text>

        {/* Experience */}
        <Text style={styles.sectionHeading}>
          {lang === "en" ? "Experience" : "Experiencia"}
        </Text>
        {experience.map((entry) => {
          const endDate = entry.endDate?.[lang] ?? presentLabel;
          return (
            <View key={`${entry.company}-${entry.startDate}`}>
              <View style={styles.entryRow}>
                <View>
                  <Text style={styles.entryCompany}>{entry.company}</Text>
                  <Text style={styles.entryRole}>{entry.role[lang]}</Text>
                </View>
                <Text style={styles.entryDate}>
                  {entry.startDate} — {endDate}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>&#8226;</Text>
                <Text style={styles.bulletText}>{entry.description[lang]}</Text>
              </View>
            </View>
          );
        })}

        {/* Education */}
        <Text style={styles.sectionHeading}>
          {lang === "en" ? "Education" : "Formacao"}
        </Text>
        {education.map((entry) => (
          <View key={`${entry.institution}-${entry.endYear}`} style={styles.entryRow}>
            <View>
              <Text style={styles.entryCompany}>{entry.institution}</Text>
              <Text style={styles.entryRole}>{entry.degree[lang]}</Text>
            </View>
            <Text style={styles.entryDate}>
              {entry.startYear} — {entry.endYear}
            </Text>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionHeading}>
          {lang === "en" ? "Technical Skills" : "Habilidades Tecnicas"}
        </Text>
        {skills.map((category) => (
          <View key={category.category.en} style={styles.skillsRow}>
            <Text style={styles.skillCategory}>
              {category.category[lang]}:{" "}
            </Text>
            <Text style={styles.skillItems}>
              {category.icons.split(",").join(", ")}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
