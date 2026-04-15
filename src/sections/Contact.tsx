import { useTranslation } from "react-i18next";
import { personal } from "../data/personal";

export function Contact() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="py-20 px-6 border-t border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold font-mono mb-6 text-accent">
          {t("contact.heading")}
        </h2>
        <a
          href={`mailto:${personal.email}`}
          className="text-lg font-mono hover:text-accent transition-colors"
        >
          {personal.email}
        </a>
        <div className="flex items-center justify-center gap-6 mt-6">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors font-mono text-sm"
          >
            GitHub
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors font-mono text-sm"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-10 text-gray-500 text-sm font-mono">
          &copy; {new Date().getFullYear()} {personal.name}
        </p>
      </div>
    </footer>
  );
}
