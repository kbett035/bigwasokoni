// useSupabaseAuth.ts
import { supabase } from "../lib/supabase";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@supabase/supabase-js"; // Import the Supabase User type

// Custom UserProfile type for profile data in 'profiles' table
interface UserProfile {
  payment_due_date: string;
  username: string;
  website: string;
  avatar_url: string;
  phone_number: string;
  email: string;
}

interface SubscriptionData {
  end_date: string;
}

export default function useSupabaseAuth() {
  const { session, setSession, setUser, setUserProfile, user } = useUserStore();

  async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data?.session) {
      setSession(data.session);
      setUser(data.user); // Supabase User object
    }

    return { error, data };
  }

  async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data?.user) {
      setUser(data.user); // Supabase User object
    }

    return { error, data };
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      setUser(null);
      setUserProfile(null);
    }

    return { error };
  }

  async function getUserProfile() {
    if (!session?.user) throw new Error("No user in the session!");

    const { data, error, status } = await supabase
      .from("profiles")
      .select("username, website, avatar_url, phone_number, email")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile data:", error.message);
      return { data: null, error, status };
    }

    const profileData = data as UserProfile;
    setUserProfile(profileData); // Store profile data separately in the store

    return { data: profileData, error: null, status };
  }

  async function getSubscriptionData() {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("end_date")
      .eq("user_id", session?.user.id);

    if (error) {
      return { data: null, error };
    }

    if (data.length !== 1) {
      return { data: null, error: new Error("Unexpected subscription data.") };
    }

    return { data: data[0] as SubscriptionData, error: null };
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    phone_number,
    email,
  }: UserProfile) {
    if (!session?.user) throw new Error("No user in the session!");

    const updates = {
      id: session.user.id,
      username,
      website,
      avatar_url,
      phone_number,
      email,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (!error) {
      setUserProfile(updates); // Update profile in the store
    }

    return { error };
  }

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getUserProfile,
    getSubscriptionData,
    updateProfile,
  };
}
