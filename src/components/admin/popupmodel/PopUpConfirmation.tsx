import React from 'react';
import { Modal, Button, ConfigProvider } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

// Definisikan tipe props agar sangat fleksibel
interface PopUpConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>; // Mendukung fungsi async (menunggu API)
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  okType?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  isDanger?: boolean; // Jika true, tombol konfirmasi jadi merah (misal: untuk hapus)
  isLoading?: boolean; // Menampilkan animasi loading jika sedang menembak API
}

const PopUpConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Aksi",
  description = "Apakah kamu yakin ingin melanjutkan tindakan ini?",
  icon = <ExclamationCircleFilled className="text-amber-500 text-xl" />,
  okText = "Ya, Lanjutkan",
  cancelText = "Batal",
  okType = "primary",
  isDanger = false,
  isLoading = false,
}: PopUpConfirmationProps) => {
return (
  <ConfigProvider
    theme={{
      token: {
        // Mengubah warna teks global di dalam modal menjadi putih/terang
        colorText: '#e4e4e7', // text-zinc-300
      },
      components: {
        Modal: {
          
          contentBg: '#18181b',       
          headerBg: '#18181b',        
          borderRadiusLG: 16,         // rounded-2xl
          paddingMD: 32,              // padding p-8
        },
      },
    }}
  >
    <Modal
      open={isOpen}
      onCancel={onClose}
      centered
      closable={false}
      footer={null}
      width={400}
      styles={{
        mask: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      {/* ISI KONTEN UTAMA */}
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/40 text-amber-500 [&_svg]:text-6xl">
          {icon}
        </div>

        {/* Judul & Deskripsi */}
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 mb-6 max-w-xs">
          {(() => {
            // Jika teks mengandung tanda kutip ganda, kita pecah teksnya
            if (description.includes('"')) {
              const parts = description.split('"');
              return (
                <span>
                  {parts[0]}"
                  {/* Bagian di dalam tanda kutip (nama produk) diberi warna kustom */}
                  <span className="text-red-500 font-bold">{parts[1]}</span>
                  "{parts[2]}
                </span>
              );
            }
            // Jika tidak ada tanda kutip, tampilkan teks biasa bawaan
            return description;
          })()}
        </p>

        {/* STRUKTUR TOMBOL */}
        <div className="flex w-full gap-3">
          <Button 
            onClick={onClose} 
            disabled={isLoading}
            className="flex-1 h-11 border-zinc-700 bg-transparent hover:bg-zinc-800 hover:border-zinc-600 rounded-lg text-sm font-semibold transition-colors"
          >
            <div className="text-black *:text-zinc-300"> 
            {cancelText}

            </div>
          </Button>
          <Button
            type={okType}
            danger={isDanger}
            loading={isLoading}
            onClick={onConfirm}
            className={`flex-1 h-11 rounded-lg text-sm font-semibold transition-colors ${
              isDanger 
                ? 'bg-red-600 hover:bg-red-700 border-none text-white' 
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-none'
            }`}
          >
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  </ConfigProvider>
);
};

export default PopUpConfirmation;