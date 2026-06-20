import { Script } from '@/types';
import { ScriptCard } from './ScriptCard';

interface ScriptGridProps {
  scripts: Script[];
  onScriptClick: (script: Script) => void;
}

export function ScriptGrid({ scripts, onScriptClick }: ScriptGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold border-l-4 border-red-600 pl-4">Script Populer</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {scripts.map((script) => (
          <ScriptCard
            key={script.id}
            script={script}
            onClick={onScriptClick}
          />
        ))}
      </div>
    </section>
  );
}