import { useState } from 'react';
import { Product, Order } from '@/types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onUpdateStock: (productId: string, delta: number) => void;
}

export function AdminDashboard({ products, orders, onUpdateStock }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'transactions'>('products');
  const [transactionFilter, setTransactionFilter] = useState({
    id: '',
    status: 'all'
  });

  const filteredOrders = orders.filter(order => {
    const matchId = order.id.toLowerCase().includes(transactionFilter.id.toLowerCase());
    const matchStatus = transactionFilter.status === 'all' || order.status === transactionFilter.status;
    return matchId && matchStatus;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed':
      case 'preparing':
      case 'ready':
      case 'delivered': return 'status-success';
      case 'cancel': return 'status-cancel';
      default: return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
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
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Manajemen Produk
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'transactions'
                ? 'bg-red-600 text-white'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Tracking Transaksi
          </button>
        </div>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-6">
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
                            className="w-6 h-6 bg-zinc-800 hover:bg-zinc-700 rounded flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="font-bold w-4 text-center">{product.stock}</span>
                          <button
                            onClick={() => onUpdateStock(product.id, 1)}
                            className="w-6 h-6 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-zinc-500 hover:text-white mr-2">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-zinc-500 hover:text-red-500">
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

      {activeTab === 'transactions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <p className="text-xs text-zinc-500 mb-1">Cari Transaksi</p>
              <div className="relative">
                <input
                  type="text"
                  value={transactionFilter.id}
                  onChange={(e) => setTransactionFilter(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Nomor Transaksi..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-8 pr-4 text-xs focus:border-red-600 outline-none"
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px]"></i>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <p className="text-xs text-zinc-500 mb-1">Status</p>
              <select
                value={transactionFilter.status}
                onChange={(e) => setTransactionFilter(prev => ({ ...prev, status: e.target.value }))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-xs focus:border-red-600 outline-none appearance-none"
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
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-zinc-400">{order.id}</td>
                      <td className="p-4 font-semibold">{order.userId}</td>
                      <td className="p-4">{order.items.map(item => item.productId).join(', ')}</td>
                      <td className="p-4 text-white font-bold">Rp {order.total.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className={`status-pill ${getStatusClass(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right text-zinc-500 text-xs">{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}