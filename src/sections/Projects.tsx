import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { projects } from "../data/projects";
import { useTheme } from "../hooks/useTheme";

export function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";
  const { theme } = useTheme();

  if (projects.length === 0) return null;

  return (
    <Section id="projects" heading={t("projects.heading")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 transition-all"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="font-mono font-bold text-lg mb-2">{project.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              {project.description[lang]}
            </p>
            <img
              src={`https://skillicons.dev/icons?i=${project.skillIcons}&theme=${theme}`}
              alt={`Tech: ${project.skillIcons}`}
              className="h-8 mb-4"
            />
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-accent hover:underline"
                >
                  {t("projects.viewLive")}
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-accent hover:underline"
                >
                  {t("projects.viewCode")}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
