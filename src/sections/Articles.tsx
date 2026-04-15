import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { articles } from "../data/articles";

export function Articles() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="articles" heading={t("articles.heading")}>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.title.en}>
            <h3 className="font-mono font-bold">
              {article.url ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {article.title[lang]}
                </a>
              ) : (
                article.title[lang]
              )}
            </h3>
            <p className="text-gray-500 text-sm font-mono">
              {article.venue} — {article.year}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
