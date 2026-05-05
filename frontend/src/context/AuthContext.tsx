import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

interface User {
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  login: (data: any, remember?: boolean) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const ADMIN_EMAIL = 'codenexuslabs.dev@gmail.com';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const login = async (data: any, remember = false) => {
    const response: any = await authAPI.login(data);
    const result = response?.data || response;
    const token = result?.token || result?.data?.token;

    if (remember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }

    const u: User = {
      email: data.email,
      fullName: result?.fullName || data.email.split('@')[0],
      role: data.email === ADMIN_EMAIL ? 'ADMIN' : 'STUDENT'
    };

    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    setIsAuthenticated(true);
    
    toast.success(u.role === 'ADMIN' ? 'Welcome Admin! 🚀' : 'Welcome back! 👋');
  };

  const register = async (data: any) => {
    await authAPI.register(data);
    toast.success('Account created! Please login.');
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin: user?.role === 'ADMIN',
        isStudent: !!user && user?.role !== 'ADMIN',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};