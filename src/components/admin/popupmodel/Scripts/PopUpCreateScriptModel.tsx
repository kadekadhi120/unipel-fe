import React, { useState } from "react";
import useEffect from "react";

interface CreateScriptFormData {
  name: string;
  description: string;
  loadstring: string;
  category: string;
  imageUrl: File | null;
}

interface PopUpCreateScriptModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateScriptFormData) => void;
}

const PopUpCreateScriptModel = ({ isOpen, onClose, onSubmit }: PopUpCreateScriptModelProps) => {
    const [formData, setFormData] = useState<CreateScriptFormData>({
        name: '',
        description: '',
        loadstring: '',
        category: '',
        imageUrl: null
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    }


    if (!isOpen) return null;

   return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center h-screen px-4 transition-all duration-300 ease-in-out ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <form
        onSubmit={handleSubmit}
        className={`relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create <span className="text-red-600">Script</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Nama Script</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-dark w-full"
              placeholder="nama@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-dark w-full"
              placeholder="description"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Load String</label>
            <input
              type="text"
              value={formData.loadstring}
              onChange={(e) => setFormData({...formData, loadstring: e.target.value})}
              className="input-dark w-full"
              placeholder="load string"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="input-dark w-full"
              placeholder="category"
              required
            />
          </div>

          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Image URL</label>
            <input
              type="file"
              accept="image/Scripts/*"
              onChange={(e) => setFormData({...formData, imageUrl: e.target.files?.[0] || null})}
              className="input-dark w-full"
              placeholder="image url"
              required
            />

          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mt-4"
          >
            Create Script
          </button>
        </form>
        </div>
  );
}
  export default PopUpCreateScriptModel;