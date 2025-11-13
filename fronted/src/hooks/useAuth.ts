import { useState, useEffect, useCallback } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';
import type { User } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario de localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginService(username);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: any) {
      setError(err.message || 'Error de login');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutService();
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
    }
  }, []);

  return { user, loading, error, login, logout };
}
