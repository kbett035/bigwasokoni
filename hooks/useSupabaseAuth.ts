import { supabase } from "../lib/supabase"; // corrected the relative path
import { useUserStore } from "@/store/useUserStore";

export default function useSupabaseAuth() {
  const { session, setSession, setUser } = useUserStore();

  async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data?.session) {
      setSession(data.session);
      setUser(data.user);
    }

    return {
      error,
      data,
    };
  }

  async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data?.user) {
      setUser(data.user);
    }

    return {
      error,
      data,
    };
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      setUser(null);
    }

    return {
      error,
    };
  }

  async function getUserProfile() {
    if (!session?.user) throw new Error("No user in the session!");

    const { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url, phone_number, email, payment_due_date`) // Added payment_due_date
      .eq("id", session.user.id)
      .single();

    return {
      data,
      error,
      status,
    };
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    phone_number,
    email,
    payment_due_date, // Added payment_due_date
  }: {
    username: string;
    website: string;
    avatar_url: string;
    phone_number: string;
    email: string;
    payment_due_date: string; // Updated type
  }) {
    if (!session?.user) throw new Error("No user in the session!");

    const updates = {
      id: session.user.id,
      username,
      website,
      avatar_url,
      phone_number,
      email,
      payment_due_date, // Included in the updates
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    return {
      error,
    };
  }

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getUserProfile,
    updateProfile,
  };
}
