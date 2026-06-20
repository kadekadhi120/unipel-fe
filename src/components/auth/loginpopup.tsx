import React, { useState } from 'react';

interface LoginPopupProps {
  isOpen: boolean;  
  onClose: () => void;
  onLogin: (credentials: { email: string; password: string; phone?: string }) => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin({ email, password, phone });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          �
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
              className="input-dark"
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
              className="input-dark"
              placeholder="��������"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Telepon (opsional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-dark"
              placeholder="0812xxxxxxx"
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
