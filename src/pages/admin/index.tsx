import { useState, useEffect } from 'react';
import { Product, Order } from '@/types';
import AdminSidebar from '@/components/admin/sidebar';


interface AdminDashboardProps {
  products?: Product[];
  orders?: Order[];
  onUpdateStock?: (productId: string, delta: number) => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Headset X',
    price: 1200000,
    description: 'Headset gaming profesional.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Tech',
    stock: 15,
    createdAt: '2024-01-01'
  }
];

const mockOrders: Order[] = [
  {
    id: 'TX-2024001',
    userId: 'Ahmad Dani',
    items: [{ productId: '1', quantity: 1, price: 1200000 }],
    total: 1200000,
    status: 'confirmed',
    createdAt: '2024-03-20'
  }
];

export default function AdminDashboard({ 
  // PERBAIKAN 2: Berikan nilai default ke props menggunakan mock data
  products = mockProducts, 
  orders = mockOrders, 
  onUpdateStock = () => alert("Fungsi update stok belum dihubungkan!") 
}: AdminDashboardProps) {
  
  const [activeTab, setActiveTab] = useState<'products' | 'transactions'>('products');
  const [transactionFilter, setTransactionFilter] = useState({
    id: '',
    status: 'all'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchId = order.id.toLowerCase().includes(transactionFilter.id.toLowerCase());
    const matchStatus = transactionFilter.status === 'all' || order.status === transactionFilter.status;
    return matchId && matchStatus;
  });

  const getStatusStyle = (status: string) => {
    const baseStyle = "px-3 py-1 rounded-full text-xs font-bold border";
    
    switch (status.toLowerCase()) {
      case 'pending': 
        return `${baseStyle} bg-yellow-500/10 text-yellow-500 border-yellow-500/20`;
      case 'confirmed':
      case 'preparing':
      case 'ready':
      case 'delivered': 
        return `${baseStyle} bg-green-500/10 text-green-500 border-green-500/20`;
      case 'cancel': 
        return `${baseStyle} bg-red-500/10 text-red-500 border-red-500/20`;
      default: 
        return `${baseStyle} bg-zinc-500/10 text-zinc-500 border-zinc-500/20`;
    }
  };

  return (
    <div 
      className={`max-w-7xl mx-auto px-6 py-12 mt-12 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-64 shrink-0">
            <AdminSidebar />
        </div>
      <div className="flex-1 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">
            Admin <span className="text-red-600">Dashboard</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            Kelola inventaris dan pantau transaksi Anda secara real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'products'
                ? 'bg-red-600 text-white'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Manajemen Produk
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'transactions'
                ? 'bg-red-600 text-white'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Tracking Transaksi
          </button>
        </div>
      </div>

      {/* Konten Tab Produk */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h3 className="font-bold">Daftar Inventaris Produk</h3>
              <button className="bg-red-600 text-xs font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                <i className="fas fa-plus mr-2"></i> Tambah Produk Baru
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-zinc-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Produk</th>
                    <th className="p-4 font-semibold">Kategori</th>
                    <th className="p-4 font-semibold">Harga</th>
                    <th className="p-4 font-semibold text-center">Stok</th>
                    <th className="p-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-zinc-800">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            className="w-10 h-10 rounded object-cover border border-zinc-800"
                            alt={product.name}
                          />
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-500">{product.category}</td>
                      <td className="p-4 text-red-500 font-bold">Rp {product.price.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => onUpdateStock(product.id, -1)}
                            className="w-6 h-6 bg-zinc-800 hover:bg-zinc-700 rounded flex items-center justify-center text-xs transition-colors"
                          >
                            -
                          </button>
                          <span className="font-bold w-4 text-center">{product.stock}</span>
                          <button
                            onClick={() => onUpdateStock(product.id, 1)}
                            className="w-6 h-6 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center text-xs transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-zinc-500 hover:text-white mr-3 transition-colors">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-zinc-500 hover:text-red-500 transition-colors">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Konten Tab Transaksi */}
      {activeTab === 'transactions' && (
        <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <p className="text-xs text-zinc-500 mb-1">Cari Transaksi</p>
              <div className="relative">
                <input
                  type="text"
                  value={transactionFilter.id}
                  onChange={(e) => setTransactionFilter(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Nomor Transaksi..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-8 pr-4 text-xs focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px]"></i>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <p className="text-xs text-zinc-500 mb-1">Status</p>
              <select
                value={transactionFilter.status}
                onChange={(e) => setTransactionFilter(prev => ({ ...prev, status: e.target.value }))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-xs focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none appearance-none transition-all"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Berhasil</option>
                <option value="cancel">Cancel</option>
              </select>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl hidden lg:block">
              <p className="text-xs text-zinc-500 mb-1">Total Transaksi</p>
              <p className="text-lg font-bold">{orders.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl hidden lg:block">
              <p className="text-xs text-zinc-500 mb-1">Pendapatan Hari Ini</p>
              <p className="text-lg font-bold text-red-600">
                Rp {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-zinc-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">ID Transaksi</th>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold">Produk</th>
                    <th className="p-4 font-semibold">Total</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-zinc-800">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-xs text-zinc-400">{order.id}</td>
                        <td className="p-4 font-semibold">{order.userId}</td>
                        <td className="p-4 text-zinc-300">
                          {order.items.map(item => `Item #${item.productId}`).join(', ')}
                        </td>
                        <td className="p-4 text-white font-bold">Rp {order.total.toLocaleString('id-ID')}</td>
                        <td className="p-4">
                          <span className={getStatusStyle(order.status)}>
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-right text-zinc-500 text-xs">{order.createdAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-zinc-500">
                        Tidak ada transaksi yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}