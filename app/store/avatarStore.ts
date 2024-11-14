import { create } from 'zustand';

interface AvatarState {
  avatars: Record<string, string>;
  setAvatarUrl: (userId: string, url: string) => void;
  errors: Record<string, string | null | undefined>;
  setError: (userId: string, error: string) => void;
}

const useAvatarStore = create<AvatarState>((set) => ({
  avatars: {},
  setAvatarUrl: (userId, url) => set((state) => ({
    avatars: { ...state.avatars, [userId]: url },
  })),
  errors: {},
  setError: (userId, error) => set((state) => ({
    errors: { ...state.errors, [userId]: error },
  })),
}));

export default useAvatarStore;