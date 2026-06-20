//Navbar
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AuthButton from './button/auth-button';

interface NavbarProps {
  onShowPage: (page: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onShowPage, onLoginClick, onRegisterClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <nav className="glass-effect fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onShowPage('home-page')}>
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
          <i className="fas fa-shopping-bag text-white"></i>
        </div>
        <span className="text-xl font-bold tracking-tight">
          NEX<span className="text-red-600">MARKET</span>
        </span>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari produk impianmu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-full py-2 px-12 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
          />
          <i className="fas fa-search absolute left-4 top-1/2 -transform -translate-y-1/2 text-zinc-500"></i>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <AuthButton
          onClick={onLoginClick}
          name="Login"
        />
        <AuthButton
          onClick={onRegisterClick}
          name="Register"
        />
      </div>
    </nav>
  );
};

export default Navbar;
