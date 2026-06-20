import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import { BannerCarousel } from '@/components/BannerCarousel';
import { ProductGrid } from '@/components/card/ProductGrid';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { Notification } from '@/components/Notification';
import { AIFab } from '@/components/AI/AIFab';
import { AIModal } from '@/components/AI/AIModal';
import { Product, Order, Script } from '@/types';
import {ProductDetail} from '@/components/card/ProductDetail';
import {ScriptGrid} from '@/components/card/ScriptGrid';
import LoginPopup from '@/components/auth/loginpopup';
import RegisterPopup from '@/components/auth/registerpopup';



// Mock data - replace with API calls

const mockScripts = [
  {
    id: 's1',
    name: 'Script A',
    description: 'Script untuk automasi tugas harian.',
    category: 'Automation',
    imageUrl: 'https://images.unsplash.com/photo-1581093588401-9c8b0e5a7c8e?w=800',
    createdAt: '2024-01-01'
  },
  {
    id: 's2',
    name: 'Script B',
    description: 'Script untuk analisis data cepat.',
    category: 'Data Analysis',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    createdAt: '2024-01-01'
  }];

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
  },
    {
    id: '7',
    name: 'Camera Lens',
    price: 3200000,
    description: 'Lensa kamera profesional 50mm untuk bokeh.',
    imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800',
    category: 'Photography',
    stock: 5,
    createdAt: '2024-01-01'
  },
    {
    id: '8',
    name: 'Camera Lens',
    price: 3200000,
    description: 'Lensa kamera profesional 50mm untuk bokeh.',
    imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800',
    category: 'Photography',
    stock: 5,
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
  },
  {
    id: 'TX-2024002',
    userId: 'Siska Putri',
    items: [{ productId: '2', quantity: 1, price: 850000 }],
    total: 850000,
    status: 'pending',
    createdAt: '2024-03-21'
  },
  {
    id: 'TX-2024003',
    userId: 'Budi Utomo',
    items: [{ productId: '3', quantity: 1, price: 1500000 }],
    total: 1500000,
    status: 'cancel',
    createdAt: '2024-03-21'
  }
];



export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'detail' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [scripts, setScripts] = useState<Script[]>(mockScripts);
  const [orders] = useState<Order[]>(mockOrders);
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10); // 10ms sudah cukup
    
    return () => clearTimeout(timer);
  }, []);


  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => setNotification({ message: '', visible: false }), 3000);
  };

  const handleShowPage = (page: string) => {
    setCurrentPage(page as any);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product-detail/${product.id}`);
  };

  const handleScriptClick = (script: Script) => {
    router.push(`/script-detail/${script.id}`);
  };

  const handleOrder = (orderData: any) => {
    showNotification(`Terima kasih ${orderData.name}, pesanan diproses!`);
    setTimeout(() => setCurrentPage('home'), 3000);
  };

  const handleLogin = (credentials: { email: string; password: string; phone?: string }) => {
    // Mock login - replace with actual authentication
    console.log('Login:', credentials);
    showNotification('Login berhasil!');
    setIsLoginPopupOpen(false);
    setCurrentPage('home');
  };

  const handleRegister = (data: { name: string; email: string; password: string; phone: string }) => {
    // Mock register - replace with actual registration
    console.log('Register:', data);
    showNotification('Registrasi berhasil!');
    setIsRegisterPopupOpen(false);
    setCurrentPage('home');
  };

  const handleUpdateStock = (productId: string, delta: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock + delta) }
          : product
      )
    );
  };

  const handleLoginPopupOpen = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false);
  };

  const handleRegisterPopupOpen = () => {
    setIsRegisterPopupOpen(true);
  }

  const handleRegisterPopupClose = () => {
    setIsRegisterPopupOpen(false);
  }

 return (
    <div className="relative overflow-hidden">
      
      {/* --- 3. PENERAPAN KELAS TRANSISI PADA WRAPPER UTAMA --- 
        Durasi dibuat sedikit lebih lama (700ms) agar terasa elegan
      */}
      <div 
        className={`pt-20 transition-all duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <Notification
          message={notification.message}
          isVisible={notification.visible}
          onClose={() => setNotification({ message: '', visible: false })}
        />

        <BannerCarousel />
        
        <div className="flex flex-col gap-8 pb-12">
          <ScriptGrid 
            scripts={scripts} 
            onScriptClick={handleScriptClick} 
          />
          <ProductGrid
            products={products}
            onProductClick={handleProductClick}
          />
          <AboutSection />
        </div>
        
        <Footer />
      </div>

    </div>
  );
}