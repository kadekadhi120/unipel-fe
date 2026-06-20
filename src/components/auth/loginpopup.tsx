import React, { useState } from 'react';

interface LoginPopupProps {
  isOpen: boolean;  
  onClose: () => void;
  onLogin: (credentials: { email: string; password: string; }) => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div 
      // PERBAIKAN 1: Tambahkan 'flex'.
      // PERBAIKAN 2: Hapus typo, dan fokuskan div luar untuk opacity/visibility saja.
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition-all duration-300 ease-in-out ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <form
        onSubmit={handleSubmit}
        // PERBAIKAN 3: Pindahkan logika translate-y ke form ini, ditambah transisinya
        className={`relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          {/* PERBAIKAN 4: Mengganti karakter error  menjadi X */}
          X
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Selamat <span className="text-red-600">Datang Kembali</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark w-full"
              placeholder="nama@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-dark w-full"
              placeholder="******"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mt-4"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;