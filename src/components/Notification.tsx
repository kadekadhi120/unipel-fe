import { useState } from 'react';
import { cn } from '@/utils';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Notification({ message, isVisible, onClose }: NotificationProps) {
  return (
    <div
      className={cn(
        "fixed bottom-[-100px] left-1/2 translate-x-[-50%] bg-[#101010] border border-[#e11d48] px-[30px] py-[15px] rounded-[12px] z-[1000] transition-all duration-500 flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
        isVisible && "bottom-[30px]"
      )}
    >
      <i className="fas fa-check-circle text-red-600 text-xl"></i>
      <span>{message}</span>
    </div>
  );
}