interface MaximizeButtonProps {
  onClick: () => void;
}

export function MaximizeButton({ onClick }: MaximizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md text-white font-mono text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
      aria-label="Maximize to full screen view"
    >
      [ ] Maximize
    </button>
  );
}
