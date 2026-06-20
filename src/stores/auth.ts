import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Auth store
export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-store' }
  )
);

// Product store example
interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set) => ({
      products: [],
      loading: false,
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: 'product-store' }
  )
);
