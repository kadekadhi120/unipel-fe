import { useState, useEffect } from 'react';
import { Script, Order } from '@/types';
import AdminSidebar from '@/components/admin/sidebar';
import { Pen, Trash } from 'lucide-react';
import PopUpCreateScriptModel from '@/components/admin/popupmodel/Scripts/PopUpCreateScriptModel';
import PopUpConfirmation from '@/components/admin/popupmodel/PopUpConfirmation';


interface ScriptPageProps {
  Scripts?: Script[];
  orders?: Order[];
  onUpdateStock?: (ScriptId: string, delta: number) => void;
}

const mockScripts: Script[] = [
  {
    id: 's1',
    name: 'Script A',
    description: 'Script untuk automasi tugas harian.',
    loadstring: 'console.log("Hello World");',
    category: 'Automation',
    imageUrl: 'https://images.unsplash.com/photo-1581093588401-9c8b0e5a7c8e?w=800',
    createdAt: '2024-01-01'
  },
  {
    id: 's2',
    name: 'Script B',
    description: 'Script untuk analisis data cepat.',
    loadstring: 'console.log("Hello World");',
    category: 'Data Analysis',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    createdAt: '2024-01-01'
  }];

export default function ScriptPage({ 
  Scripts = mockScripts,  
  onUpdateStock = () => alert("Fungsi update stok belum dihubungkan!") 
}: ScriptPageProps) {
  

  const [isCreateScriptOpen, setIsCreateScriptOpen] = useState(false);
  const [isEditScriptOpen, setIsEditScriptOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const handleCreateScript = (data: { name: string; description: string; loadstring: string; category: string; imageUrl: File | null }) => {
    // Logika untuk menambahkan produk baru ke daftar produk
    console.log('Script baru dibuat:', data);
    setIsCreateScriptOpen(false);
  }

  const handleEditScript = (ScriptId: string, data: { name: string; description: string; loadstring: string; category: string; imageUrl: File | null }) => {
    // Logika untuk mengedit produk yang ada

    console.log(`Script dengan ID ${ScriptId} diedit:`, data);
    setIsEditScriptOpen(false);
  }

  const handleDeleteScript = (ScriptId: string) => {
    // Logika untuk menghapus produk dari daftar produk
    console.log(`Script dengan ID ${ScriptId} dihapus`);
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
            Script <span className="text-red-600">Dashboard</span>
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
              <h3 className="font-bold">Script Inventory</h3>
              <button 
                className="bg-red-600 text-xs font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => setIsCreateScriptOpen(true)}
              >
                <i className="fas fa-plus mr-2"></i> Create New Script
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-zinc-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Script</th>
                    <th className="p-4 font-semibold">Kategori</th>
                    <th className="p-4 font-semibold">Deskripsi</th>
                    <th className="p-4 font-semibold text-center">Load String</th>
                    <th className="pr-8 font-semibold text-right">Aksi</th>
                    
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-zinc-800">
                  {Scripts.map((Script) => (
                    <tr key={Script.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={Script.imageUrl}
                            className="w-10 h-10 rounded object-cover border border-zinc-800"
                            alt={Script.name}
                          />
                          <span className="font-semibold">{Script.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-500">{Script.category}</td>
                      <td className="p-4 text-zinc-500">{Script.description}</td>
                      <td className="p-4 text-center">
                        <span className="bg-zinc-800 text-zinc-400 text-xs font-mono py-1 px-2 rounded">
                          {Script.loadstring}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          className="text-zinc-500 hover:text-red-500 mr-3 transition-colors"
                          onClick={() => {
                            setSelectedScript(Script);
                            setIsEditScriptOpen(true);
                          }}
                        >
                          <Pen />
                        </button>
                        <button 
                          className="text-zinc-500 hover:text-red-500 transition-colors"
                          onClick={() => {
                            setSelectedScript(Script);
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

    <PopUpCreateScriptModel
      isOpen={isCreateScriptOpen}
      onClose={() => setIsCreateScriptOpen(false)}
      onSubmit={handleCreateScript}
    />

    <PopUpConfirmation
      isOpen={isDeleteConfirmationOpen}
      onClose={() => setIsDeleteConfirmationOpen(false)}
      onConfirm={() => {
        if (selectedScript) {
          handleDeleteScript(selectedScript.id);
        }
        }}
      title="Konfirmasi Hapus Script"
      description={`Apakah Anda yakin ingin menghapus script "${selectedScript?.name}"? Tindakan ini tidak dapat dibatalkan.`}
      okText="Ya, Hapus"
      cancelText="Batal"
      okType="primary"
      isDanger={true}
    />
    </div>
  )}
