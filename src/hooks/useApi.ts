import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

// Custom hook for API calls
export function useApi<T>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.request({
        url,
        method: options?.method || 'GET',
        data: options?.body,
      });
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, options?.method, options?.body]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for products
export function useProducts() {
  return useApi('/products');
}

// Hook for user authentication
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    setUser(response.data.user);
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    await api.post('/auth/logout');
    setUser(null);
  }, []);

  return { user, loading, login, logout, checkAuth };
}
