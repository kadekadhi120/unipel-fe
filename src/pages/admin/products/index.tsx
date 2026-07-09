import { useState, useEffect } from 'react';
import { Product, Order } from '@/types';
import AdminSidebar from '@/components/admin/sidebar';
import { Pen, Trash } from 'lucide-react';
import PopUpCreateProductModel from '@/components/admin/popupmodel/PopUpCreateProductModel';
import PopUpEditProductModel from '@/components/admin/popupmodel/PopUpEditProductModel';
import PopUpConfirmation from '@/components/admin/popupmodel/PopUpConfirmation';


interface ProductPageProps {
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

export default function ProductPage({ 
  products = mockProducts, 
  orders = mockOrders, 
  onUpdateStock = () => alert("Fungsi update stok belum dihubungkan!") 
}: ProductPageProps) {
  

  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const handleCreateProduct = (data: { name: string; description: string; price: number; stock: number; imageUrl: File | null }) => {
    // Logika untuk menambahkan produk baru ke daftar produk
    console.log('Produk baru dibuat:', data);
    setIsCreateProductOpen(false);
  }

  const handleEditProduct = (productId: string, data: { name: string; description: string; price: number; stock: number; imageUrl: File | null }) => {
    // Logika untuk mengedit produk yang ada

    console.log(`Produk dengan ID ${productId} diedit:`, data);
    setIsEditProductOpen(false);
  }

  const handleDeleteProduct = (productId: string) => {
    // Logika untuk menghapus produk dari daftar produk
    console.log(`Produk dengan ID ${productId} dihapus`);
    setIsDeleteConfirmationOpen(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

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
            Product <span className="text-red-600">Dashboard</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            Kelola inventaris dan pantau transaksi Anda secara real-time.
          </p>
        </div>
      </div>

      {/* Konten Tab Produk */}
        <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h3 className="font-bold">Daftar Inventaris Produk</h3>
              <button 
                className="bg-red-600 text-xs font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => setIsCreateProductOpen(true)}
              >
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
                    <th className="pr-8 font-semibold text-right">Aksi</th>
                    
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
                          <span className="font-bold w-4 text-center">{product.stock}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          className="text-zinc-500 hover:text-red-500 mr-3 transition-colors"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEditProductOpen(true);
                          }}
                        >
                          <Pen />
                        </button>
                        <button 
                          className="text-zinc-500 hover:text-red-500 transition-colors"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsDeleteConfirmationOpen(true);
                          }}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

   
    </div>
    </div>
    <PopUpCreateProductModel 
      isOpen={isCreateProductOpen} 
      onClose={() => setIsCreateProductOpen(false)} 
      onSubmit={handleCreateProduct} 
    />
    <PopUpEditProductModel 
      isOpen={isEditProductOpen} 
      onClose={() => setIsEditProductOpen(false)} 
      onSubmit={handleEditProduct} 
      productData={selectedProduct}
    />

    <PopUpConfirmation
      isOpen={isDeleteConfirmationOpen}
      onClose={() => setIsDeleteConfirmationOpen(false)}
      onConfirm={() => {
        if (selectedProduct) {
          handleDeleteProduct(selectedProduct.id);
        }
      }}
      title="Konfirmasi Hapus Produk"
      description={`Apakah Anda yakin ingin menghapus produk "${selectedProduct?.name}"? Tindakan ini tidak dapat dibatalkan.`}
      okText="Ya, Hapus"
      cancelText="Batal"
      okType="primary"
      isDanger={true}
    />

    </div>

  )}
