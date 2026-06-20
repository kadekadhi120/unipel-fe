import { useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@/types';
import { ProductDetail } from '@/components/card/ProductDetail';

// Mock data - replace with API calls
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Headset X',
    price: 1200000,
    description: 'Headset gaming profesional dengan noise cancelling aktif.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Tech',
    stock: 15,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Smartwatch V2',
    price: 850000,
    description: 'Smartwatch canggih untuk memantau kesehatan harian.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    category: 'Wearables',
    stock: 24,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Mechanical Keyboard',
    price: 1500000,
    description: 'Keyboard mekanik dengan switch tactile nyaman.',
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
    category: 'Tech',
    stock: 8,
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Premium Bottle',
    price: 320000,
    description: 'Botol minum stylish tahan suhu minuman.',
    imageUrl: 'https://images.unsplash.com/photo-1602143328240-46e749a29266?w=800',
    category: 'Home',
    stock: 42,
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    price: 450000,
    description: 'Mouse nirkabel dengan presisi tinggi.',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    category: 'Tech',
    stock: 19,
    createdAt: '2024-01-01'
  },
  {
    id: '6',
    name: 'Camera Lens',
    price: 3200000,
    description: 'Lensa kamera profesional 50mm untuk bokeh.',
    imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800',
    category: 'Photography',
    stock: 5,
    createdAt: '2024-01-01'
  }
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  const product = mockProducts.find(p => p.id === id);

  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => setNotification({ message: '', visible: false }), 3000);
  };

  const handleOrder = (orderData: any) => {
    showNotification(`Terima kasih ${orderData.name}, pesanan diproses!`);
    setTimeout(() => router.push('/'), 3000);
  };

  const handleBack = () => {
    router.back();
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Produk Tidak Ditemukan</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <ProductDetail
        product={product}
        onBack={handleBack}
        onOrder={handleOrder}
      />
    </div>
  );
}
