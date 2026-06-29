import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, AuthSession } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('analytiq_user');
    const token  = localStorage.getItem('analytiq_token');
    if (stored && token) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const session: AuthSession = await authService.login(email, password);
    localStorage.setItem('analytiq_token', session.token);
    localStorage.setItem('analytiq_user', JSON.stringify(session.user));
    setUser(session.user);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const hasPermission = useCallback((permission: string) => {
    return user?.permissions.includes(permission as any) ?? false;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
