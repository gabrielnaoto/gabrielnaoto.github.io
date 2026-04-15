import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { experience } from "../data/experience";

export function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="experience" heading={t("experience.heading")}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-700" />

        {experience.map((entry, i) => {
          const isLeft = i % 2 === 0;
          const firstRole = entry.roles[0];
          const lastRole = entry.roles[entry.roles.length - 1];
          const endDate = firstRole.endDate?.[lang] ?? t("experience.present");
          const dateRange = `${lastRole.startDate} — ${endDate}`;

          return (
            <motion.div
              key={entry.company}
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
              <p className="text-gray-500 text-sm font-mono mb-3">
                {dateRange}
              </p>

              {/* Roles within company */}
              <div className="space-y-4">
                {entry.roles.map((role, j) => {
                  const roleEnd = role.endDate?.[lang] ?? t("experience.present");
                  const showRoleDates = entry.roles.length > 1;

                  return (
                    <div key={j}>
                      <p className="text-accent font-mono text-sm font-bold">
                        {role.title[lang]}
                        {showRoleDates && (
                          <span className="text-gray-500 font-normal ml-2">
                            ({role.startDate} — {roleEnd})
                          </span>
                        )}
                      </p>
                      <ul className={`mt-1 space-y-1 text-gray-300 text-sm ${isLeft ? "md:text-right" : ""}`}>
                        {role.bullets.map((bullet, k) => (
                          <li key={k} className="flex gap-2">
                            <span className={`text-accent shrink-0 ${isLeft ? "md:order-last" : ""}`}>›</span>
                            <span>{bullet[lang]}</span>
                          </li>
                        ))}
                      </ul>
                      <img
                        src={`https://skillicons.dev/icons?i=${role.skillIcons}&theme=dark`}
                        alt={`Tech: ${role.skillIcons}`}
                        className={`h-8 mt-2 ${isLeft ? "md:ml-auto" : ""}`}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
