import { useState } from 'react';
import { useRouter } from 'next/router';
import { Script } from '@/types';
import { ScriptDetail } from '@/components/card/ScriptDetail';

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

export default function ScriptDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  const script = mockScripts.find(s => s.id === id);

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

  if (!script) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Script Tidak Ditemukan</h1>
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
      <ScriptDetail
        script={script}
        onBack={handleBack}
       
      />
    </div>
  );
}
