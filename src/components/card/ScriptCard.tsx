import { Script } from '@/types';

interface ScriptCardProps {
  script: Script;
  onClick: (script: Script) => void;
}

export function ScriptCard({ script, onClick }: ScriptCardProps) {
  return (
    <div
      className="product-card bg-zinc-900 border border-zinc-800 rounded-xl p-3 cursor-pointer"
      onClick={() => onClick(script)}
    >
      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-800">
        <img src={script.imageUrl} alt={script.name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-sm font-semibold truncate text-white">{script.name}</h4>
    </div>
  );
}