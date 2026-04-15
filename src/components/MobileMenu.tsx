import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sectionIds: string[];
  activeId: string;
}

export function MobileMenu({ isOpen, onClose, sectionIds, activeId }: MobileMenuProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <nav className="fixed top-0 right-0 h-full w-64 bg-bg-light dark:bg-bg-dark shadow-lg p-6 pt-20">
        <ul className="flex flex-col gap-4">
          {sectionIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={onClose}
                className={`font-mono text-sm transition-colors ${
                  activeId === id
                    ? "text-accent font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:text-accent"
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
