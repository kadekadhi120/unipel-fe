import { useState, useEffect } from 'react';
import { Script } from '@/types';
import CustomButton from '../button/custom-button';
import { Copy } from 'lucide-react';

interface ScriptDetailProps {
  script: Script;
  onBack: () => void;
}

export function ScriptDetail({ script, onBack }: ScriptDetailProps) {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [showAiInsight, setShowAiInsight] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.loadstring);
      alert('Script berhasil disalin ke clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateAiInsight = () => {
    // Mock AI insight - replace with actual API call
    setAiInsight("Produk ini sangat cocok untuk gaming enthusiast dengan kualitas suara premium dan desain ergonomis yang nyaman digunakan berjam-jam.");
    setShowAiInsight(true);
  };

  return (
    <div 
      // 3. Tambahkan logika pengkondisian class di sini
      className={`max-w-7xl mx-auto px-6 py-12 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <CustomButton
        onclick={onBack}
        name="Kembali ke Home"
      />
      
      {/* 4. Typo grid-cgridols-1 sudah diperbaiki di sini */}
      <div className="grid-cols-1 lg:grid-cols-1 gap-12 pt-6">
        
        {/* Left: Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
          <div className="rounded-xl overflow-hidden mb-6 bg-zinc-800 shadow-2xl w-full h-96">
            <img src={script.imageUrl} alt={script.name} className="w-full h-full object-cover" />
          </div>
      
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold">{script.name}</h1>
            <button
              onClick={generateAiInsight}
              className="text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3 py-2 rounded-full flex items-center gap-2 transition-all"
            >
              <i className="fas fa-sparkles text-red-500"></i> ✨ Analisis Cerdas
            </button>
          </div>

          {/* AI Insight Area */}
          {showAiInsight && aiInsight && (
            <div className="mb-6 p-4 bg-red-900/10 border border-red-900/30 rounded-xl animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-robot text-red-500 text-sm"></i>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">NexAI Insight</span>
              </div>
              <p className="text-sm text-zinc-300 italic">{aiInsight}</p>
            </div>
          )}

          <div className="border-t border-zinc-800 pt-6">
            <h4 className="font-bold mb-3 text-zinc-300">Deskripsi Script</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">{script.description}</p>
            <div className="relative mt-2">
              <div className="px-4 py-3 bg-zinc-400/10 border border-zinc-400/30 rounded-lg">
              <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">{script.loadstring}</p>
              </div>
              <Copy 
                className="absolute top-3.5 right-5 text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors"
                size={18}
                onClick={handleCopy}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}