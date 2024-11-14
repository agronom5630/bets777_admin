import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setCookie } from 'cookies-next'; 

interface AdminState {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  username: string | null;
  email: string | null;
  login: (token: string, role: string, username: string, email: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      role: null,
      username: null,
      email: null,
      login: (token, role, username, email) => set({
        isAuthenticated: true,
        token,
        role,
        username,
        email
      }),
      logout: () => {
        setCookie('authToken', '', { expires: new Date(0), path: '/' });
        set({
          isAuthenticated: false,
          token: null,
          role: null,
          username: null,
          email: null
        });
      }
    }),
    {
      name: 'admin-storage',
    }
  )
);

