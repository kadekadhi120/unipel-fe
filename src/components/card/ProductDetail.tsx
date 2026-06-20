import { useState } from 'react';
import { Product } from '@/types';
import CustomButton from '../button/custom-button';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onOrder: (orderData: {
    name: string;
    phone: string;
    address: string;
    method: string;
    quantity: number;
  }) => void;
}

export function ProductDetail({ product, onBack, onOrder }: ProductDetailProps) {
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: '',
    method: 'Transfer Bank',
    quantity: 1,
  });
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [showAiInsight, setShowAiInsight] = useState(false);

  const totalPrice = product.price * orderData.quantity;

  const handleOrder = () => {
    if (!orderData.name) {
      alert('Mohon masukkan nama penerima.');
      return;
    }
    onOrder(orderData);
  };

  const generateAiInsight = () => {
    // Mock AI insight - replace with actual API call
    setAiInsight("Produk ini sangat cocok untuk gaming enthusiast dengan kualitas suara premium dan desain ergonomis yang nyaman digunakan berjam-jam.");
    setShowAiInsight(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <CustomButton 
        onclick={onBack} 
        name="Kembali ke Home" 
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
        {/* Left: Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
          <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-zinc-800 shadow-2xl">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4 mb-8">
            <div className="w-20 h-20 rounded-lg bg-zinc-800 border-2 border-red-600 overflow-hidden cursor-pointer">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <button
              onClick={generateAiInsight}
              className="text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3 py-2 rounded-full flex items-center gap-2 transition-all"
            >
              <i className="fas fa-sparkles text-red-500"></i> ✨ Analisis Cerdas
            </button>
          </div>
          <p className="text-2xl text-red-600 font-bold mb-6">Rp {product.price.toLocaleString('id-ID')}</p>

          {/* AI Insight Area */}
          {showAiInsight && aiInsight && (
            <div className="mb-6 p-4 bg-red-900/10 border border-red-900/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-robot text-red-500 text-sm"></i>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">NexAI Insight</span>
              </div>
              <p className="text-sm text-zinc-300 italic">{aiInsight}</p>
            </div>
          )}

          <div className="border-t border-zinc-800 pt-6">
            <h4 className="font-bold mb-3 text-zinc-300">Deskripsi Produk</h4>
            <p className="text-zinc-400 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Right: Checkout */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-shopping-cart text-red-600"></i> Form Pemesanan
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Nama Penerima</label>
              <input
                type="text"
                value={orderData.name}
                onChange={(e) => setOrderData(prev => ({ ...prev, name: e.target.value }))}
                className="input-dark"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Nomor HP</label>
              <input
                type="tel"
                value={orderData.phone}
                onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                className="input-dark"
                placeholder="0812xxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Alamat</label>
              <textarea
                value={orderData.address}
                onChange={(e) => setOrderData(prev => ({ ...prev, address: e.target.value }))}
                className="input-dark h-24 resize-none"
                placeholder="Masukkan alamat lengkap"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Metode</label>
                <select
                  value={orderData.method}
                  onChange={(e) => setOrderData(prev => ({ ...prev, method: e.target.value }))}
                  className="input-dark"
                >
                  <option>Transfer Bank</option>
                  <option>E-Wallet</option>
                  <option>COD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Jumlah</label>
                <input
                  type="number"
                  value={orderData.quantity}
                  onChange={(e) => setOrderData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                  className="input-dark"
                  min="1"
                />
              </div>
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center mb-4 text-zinc-400">
                <span>Total Harga:</span>
                <span className="text-white font-bold text-xl">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <button
                onClick={handleOrder}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}