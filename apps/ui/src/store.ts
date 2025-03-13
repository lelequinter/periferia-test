import { create } from 'zustand'
import { User } from './models/User';

type useStore = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useStore = create<useStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  removeUser: () => set(() => ({ user: null })),
}))