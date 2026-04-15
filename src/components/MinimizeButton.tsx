interface MinimizeButtonProps {
  onClick: () => void;
}

export function MinimizeButton({ onClick }: MinimizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-mono text-sm font-bold"
      aria-label="Minimize to retro computer view"
      title="Minimize"
    >
      _
    </button>
  );
}
