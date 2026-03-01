import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginApi, getMeApi } from '../api/auth';
import type { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  quickLogin: (role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('neovidia_token');
    if (token) {
      getMeApi()
        .then(setUser)
        .catch(() => localStorage.removeItem('neovidia_token'))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: u } = await loginApi(email, password);
    localStorage.setItem('neovidia_token', token);
    setUser(u);
  };

  const quickLogin = async (role: UserRole) => {
    const email = role === 'superadmin' ? 'admin@neovidia.com' : 'client@site.com';
    const { token, user: u } = await loginApi(email, 'demo');
    localStorage.setItem('neovidia_token', token);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('neovidia_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, quickLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
