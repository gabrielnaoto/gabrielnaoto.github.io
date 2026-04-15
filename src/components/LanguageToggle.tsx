import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggle = () => {
    const next = currentLang === "en" ? "pt" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  };

  return (
    <button
      onClick={toggle}
      className="px-2 py-1 rounded-md text-sm font-mono font-bold hover:bg-gray-800 transition-colors"
      aria-label={`Switch language to ${currentLang === "en" ? "Portuguese" : "English"}`}
    >
      {currentLang === "en" ? "PT" : "EN"}
    </button>
  );
}
