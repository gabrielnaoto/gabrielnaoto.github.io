import { pdf } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ResumePdf } from "./ResumePdf";

export function DownloadButton() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<ResumePdf lang={lang} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gabriel-naoto-resume-${lang}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed:", e);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-mono text-sm hover:bg-accent-light transition-colors disabled:opacity-50 cursor-pointer"
    >
      {loading ? (lang === "en" ? "Generating..." : "Gerando...") : t("about.downloadCv")}
    </button>
  );
}
