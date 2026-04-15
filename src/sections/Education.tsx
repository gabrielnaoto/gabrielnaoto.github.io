import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { education } from "../data/education";

export function Education() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="education" heading={t("education.heading")}>
      <div className="space-y-4">
        {education.map((entry) => (
          <div
            key={`${entry.institution}-${entry.endYear}`}
            className="flex flex-col md:flex-row md:items-baseline md:justify-between"
          >
            <div>
              <h3 className="font-mono font-bold">{entry.institution}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {entry.degree[lang]}
              </p>
            </div>
            <p className="text-gray-500 font-mono text-sm">
              {entry.startYear} — {entry.endYear}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
