//register
import React from 'react';

export default function RegisterPage() {
  return (
    <div className="page-section hidden-page min-h-[80vh] flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Selamat <span className="text-red-600">Datang Kembali</span>
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Nama Lengkap</label>
            <input
              type="text"
              className="input-dark"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              className="input-dark"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Password</label>
            <input
              type="password"
              className="input-dark"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}