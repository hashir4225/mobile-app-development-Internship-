import React, { createContext, useState, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  name?: string;
  bio?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Mock network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({ id: '1', email, name: 'User' });
    setIsLoading(false);
  };

  const signup = async (email: string, pass: string, name: string) => {
    setIsLoading(true);
    // Mock network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({ id: '1', email, name });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (user) {
      setUser({ ...user, ...data });
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
