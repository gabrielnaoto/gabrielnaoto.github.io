import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { skills } from "../data/skills";

export function Skills() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="skills" heading={t("skills.heading")}>
      <div className="space-y-8">
        {skills.map((category) => (
          <div key={category.category.en}>
            <h3 className="font-mono font-bold text-sm text-gray-400 uppercase tracking-wide mb-3">
              {category.category[lang]}
            </h3>
            <img
              src={`https://skillicons.dev/icons?i=${category.icons}&theme=dark`}
              alt={`${category.category[lang]} skills`}
              className="h-12"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
