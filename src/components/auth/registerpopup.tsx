import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RegisterPopupProps {
  isOpen: boolean;  
  onClose: () => void;
  onRegister: (credentials: { name: string; email: string; password: string; phone: string }) => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ isOpen, onClose, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRegister({ name, email, password, phone });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition-all duration-300 ease-in-out ${
        isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-10'
      }`}>
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
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register <span className="text-red-600">Akun Baru</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-dark"
              placeholder="Nama Lengkap"
              required
            />
          </div>
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
              placeholder="********"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Nomor Telepon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-dark"
              placeholder="0812xxxxxxx"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mt-4"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPopup;
