import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { experience } from "../data/experience";
import { useTheme } from "../hooks/useTheme";

export function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";
  const { theme } = useTheme();

  return (
    <Section id="experience" heading={t("experience.heading")}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />

        {experience.map((entry, i) => {
          const isLeft = i % 2 === 0;
          const endDate = entry.endDate?.[lang] ?? t("experience.present");

          return (
            <motion.div
              key={`${entry.company}-${entry.startDate}`}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative mb-12 md:w-1/2 pl-8 md:pl-0 ${
                isLeft
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-2 w-3 h-3 rounded-full bg-accent left-[-6px] ${
                  isLeft
                    ? "md:left-auto md:right-[-6px]"
                    : "md:left-[-6px]"
                }`}
              />

              <h3 className="font-mono font-bold text-lg">
                {entry.url ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {entry.company}
                  </a>
                ) : (
                  entry.company
                )}
              </h3>
              <p className="text-accent font-mono text-sm">
                {entry.role[lang]}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm font-mono mb-2">
                {entry.startDate} — {endDate}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                {entry.description[lang]}
              </p>
              <img
                src={`https://skillicons.dev/icons?i=${entry.skillIcons}&theme=${theme}`}
                alt={`Tech: ${entry.skillIcons}`}
                className={`h-8 ${isLeft ? "md:ml-auto" : ""}`}
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
