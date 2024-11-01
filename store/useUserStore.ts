import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";

// Define the structure of the user profile
interface UserProfile {
  username?: string;
  website?: string;
  avatar_url?: string;
  phone_number?: string;
  email?: string;
}

// Extend the UserStore interface
interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
  userProfile: UserProfile | null; // Add userProfile to store
  setUserProfile: (profile: UserProfile | null) => void; // Method to set user profile
}

// Create the store with the added user profile properties
export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isOnboarded: false,
      userProfile: null, // Initialize userProfile as null
      setUser: (user: User | null) => set({ user }),
      setSession: (session: Session | null) => set({ session }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setIsOnboarded: (isOnboarded: boolean) => set({ isOnboarded }),
      setUserProfile: (profile: UserProfile | null) => set({ userProfile: profile }), // Set user profile
    }),
    {
      name: "mobisokoni-user-store",
      storage: createJSONStorage(() => AsyncStorage), // using AsyncStorage for persistence
    }
  )
);
