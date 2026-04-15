import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { personal } from "../data/personal";
import { DownloadButton } from "../pdf/DownloadButton";

export function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="about" heading={t("about.heading")}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/images/profile.jpg"
          alt={personal.name}
          className="w-40 h-40 rounded-full object-cover border-2 border-accent"
        />
        <div className="flex-1">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {personal.bio[lang]}
          </p>
          <DownloadButton />
        </div>
      </div>
    </Section>
  );
}
