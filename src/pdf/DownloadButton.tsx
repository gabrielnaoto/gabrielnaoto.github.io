import { pdf } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { ResumePdf } from "./ResumePdf";

export function DownloadButton() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  const handleDownload = async () => {
    const blob = await pdf(<ResumePdf lang={lang} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gabriel-naoto-resume-${lang}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-mono text-sm hover:bg-accent-light transition-colors"
    >
      {t("about.downloadCv")}
    </button>
  );
}
