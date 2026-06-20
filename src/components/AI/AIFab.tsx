interface AIFabProps {
  onClick: () => void;
}

export function AIFab({ onClick }: AIFabProps) {
  return (
    <div className="ai-fab" onClick={onClick}>
      <i className="fas fa-magic text-white text-2xl"></i>
    </div>
  );
}