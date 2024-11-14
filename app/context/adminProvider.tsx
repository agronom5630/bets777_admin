// AdminProvider.tsx
import { useAdminStore } from '../store/useAdminStore';
import React, { createContext, useContext, ReactNode } from 'react';

interface AdminContextValue {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  email: string | null;
  username: string | null;
  login: (token: string, role: string, username: string, email: string) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token, role, username, email, login, logout } = useAdminStore();
  console.log({ isAuthenticated, token, role, username, email, login, logout });

  return (
    <AdminContext.Provider value={{ isAuthenticated, token, role, username, email, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
