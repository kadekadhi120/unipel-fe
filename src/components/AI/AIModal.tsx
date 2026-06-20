import { useState } from 'react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIModal({ isOpen, onClose }: AIModalProps) {
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([
    { text: "Halo! Saya ✨ NexAI. Ada yang bisa saya bantu dalam mencari produk impianmu hari ini?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Mock AI response - replace with actual API call
    setTimeout(() => {
      const aiResponse = { text: "Terima kasih atas pertanyaannya! Saya akan membantu Anda menemukan produk yang tepat.", isUser: false };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[100px] right-[30px] w-[350px] max-h-[500px] bg-[#0f0f0f] border border-zinc-800 rounded-2xl z-[1000] flex flex-col box-shadow shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden">
      <div className="p-4 bg-red-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-robot text-white"></i>
          <span className="font-bold text-sm">NexAI Assistant</span>
        </div>
        <button onClick={onClose} className="text-white opacity-80 hover:opacity-100">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-80 space-y-4 text-sm scroll-smooth">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-2xl ${
              message.isUser
                ? 'bg-red-600/20 self-end ml-8 rounded-tl-2xl rounded-bl-2xl'
                : 'bg-zinc-800 mr-8 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-zinc-200'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="px-4 py-2">
          <div className="flex gap-1 items-center">
            <span className="text-xs text-zinc-500 mr-1">NexAI sedang berpikir</span>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Tanya sesuatu..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-600"
        />
        <button
          onClick={handleSendMessage}
          className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
        >
          <i className="fas fa-paper-plane text-xs"></i>
        </button>
      </div>
    </div>
  );
}