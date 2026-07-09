import React from 'react';
import { Modal, Button } from 'antd';
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
    <Modal
      open={isOpen}
      onCancel={onClose}
      centered
      footer={[
        <Button key="back" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>,
        <Button
          key="submit"
          type={okType}
          danger={isDanger}
          loading={isLoading}
          onClick={onConfirm}
        >
          {okText}
        </Button>,
      ]}
      width={400}
    >
      <div className="flex items-start gap-3 pt-4">
        {icon}
        <div>
          <h3 className="text-base font-semibold text-zinc-200">{title}</h3>
          <p className="text-sm text-zinc-400 mt-1">{description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default PopUpConfirmation;