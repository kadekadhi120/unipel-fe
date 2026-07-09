import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// 1. Buat tipe data untuk item sidebar agar TypeScript tidak error
export interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

// 2. Beri tahu TypeScript bahwa komponen ini bisa menerima props 'items'
interface AdminSidebarProps {
  items?: SidebarItem[];
}

// 3. Data default jika tidak ada props yang dikirim
export const defaultSidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/admin", icon: "fas fa-home" },
  { label: "Products", href: "/admin/products", icon: "fas fa-box" },
  { label: "Orders", href: "/admin/orders", icon: "fas fa-shopping-cart" },
  { label: "Categories", href: "/admin/categories", icon: "fas fa-tags" },
  { label: "Customers", href: "/admin/customers", icon: "fas fa-users" },
  { label: "Settings", href: "/admin/settings", icon: "fas fa-cog" },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ items = defaultSidebarItems }) => {
  const router = useRouter(); // Untuk mendeteksi halaman mana yang sedang aktif

  return (

    <aside className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl h-full">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
        <h2 className="text-xl font-bold text-white">
          NEX<span className="text-red-600">MARKET</span>
        </h2>
        <p className="text-xs text-zinc-500 mt-1">Admin Panel</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            // Mengecek apakah link ini adalah halaman yang sedang dibuka
            const isActive = router.pathname === item.href;

            return (
              <li key={item.href}>
                {/* Gunakan Link dari Next.js, bukan <a> */}
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {/* Menampilkan ikon jika ada (menggunakan FontAwesome seperti di navbar Anda) */}
                  {item.icon && <i className={`${item.icon} w-5 text-center`}></i>}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;