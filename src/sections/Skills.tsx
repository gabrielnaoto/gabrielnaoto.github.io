import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { skills } from "../data/skills";

export function Skills() {
  const { t } = useTranslation();

  return (
    <Section id="skills" heading={t("skills.heading")}>
      <img
        src={`https://skillicons.dev/icons?i=${skills}&theme=dark`}
        alt="Skills and tech stack"
        className="w-full"
      />
    </Section>
  );
}
