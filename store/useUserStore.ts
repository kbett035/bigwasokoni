import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isOnboarded: false,
      setUser: (user: User | null) => set((state) => ({ user })),
      setSession: (session: Session | null) => set((state) => ({ session })),
      setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
      setIsOnboarded: (isOnboarded: boolean) => set(() => ({ isOnboarded })),
    }),
    {
      name: "mobisokoni-user-store", 
      storage: createJSONStorage(() => AsyncStorage), // using AsyncStorage for persistence
    }
  )
);
