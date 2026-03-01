import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'superadmin' | 'client' | null;

interface User {
  role: UserRole;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    if (role === 'superadmin') {
      setUser({
        role: 'superadmin',
        name: 'Admin User',
        email: 'admin@sitecraft.com',
      });
    } else if (role === 'client') {
      setUser({
        role: 'client',
        name: 'John Anderson',
        email: 'john@clientbusiness.com',
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
