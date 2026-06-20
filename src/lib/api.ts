import axios, { AxiosInstance } from 'axios';

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with base configuration
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token here if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const endpoints = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',

  // Products
  products: '/products',
  product: (id: string) => `/products/${id}`,

  // Orders
  orders: '/orders',
  order: (id: string) => `/orders/${id}`,

  // Users
  users: '/users',
  user: (id: string) => `/users/${id}`,

  // Categories
  categories: '/categories',
  category: (id: string) => `/categories/${id}`,
};

// Helper functions for common API calls
export const apiHelpers = {
  get: <T = unknown>(url: string) => api.get<T>(url),
  post: <T = unknown>(url: string, data?: unknown) => api.post<T>(url, data),
  put: <T = unknown>(url: string, data?: unknown) => api.put<T>(url, data),
  delete: <T = unknown>(url: string) => api.delete<T>(url),
};
