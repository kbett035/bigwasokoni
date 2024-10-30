import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '@/src/components/Avatar';
import useSupabaseAuth from '@/hooks/useSupabaseAuth';
import { useUserStore } from '@/store/useUserStore';

const ProfileScreen = () => {
  const { getUserProfile, updateProfile, signOut } = useSupabaseAuth();
  const { session } = useUserStore();
  const [profile, setProfile] = useState({
    username: '',
    website: '',
    avatar_url: '',
    phone_number: '',
    email: '',
    payment_due_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await getUserProfile();  // Fetch profile data from auth table
        if (data) {  // Check if data is not null or undefined
          setProfile({
            username: data.username || '',
            website: data.website || '',
            avatar_url: data.avatar_url || '',
            email: data.email || '',  // Pull email from auth table
            phone_number: data.phone_number || '',
            payment_due_date: data.payment_due_date || '',
          });
          calculateRemainingDays(data.payment_due_date);
        } else {
          Alert.alert("Error", "User profile data is not available.");
        }
      } catch (error: unknown) {
        // Check if error is an instance of Error to access message
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        Alert.alert("Error", "Failed to fetch profile: " + errorMessage);
      }
      setLoading(false);
    };
    if (session) fetchProfile();
  }, [session]);

  const calculateRemainingDays = (dueDate: string) => {
    if (!dueDate) return;
    const due = new Date(dueDate);
    let today = new Date();
    let remaining = 0;

    while (today < due) {
      today = new Date(today.setDate(today.getDate() + 1));
      const day = today.getDay();
      if (day !== 0 && day !== 6) remaining++;
    }
    setRemainingDays(remaining);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    const { error } = await updateProfile(profile);
    if (error) {
      Alert.alert("Error", "Failed to update profile.");
    } else {
      Alert.alert("Success", "Profile updated successfully!");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#F0F2F5', flexGrow: 1 }}>
        <View className="w-full flex-row items-center mb-4 space-x-3">
          <Avatar url={profile.avatar_url} size={60} onUpload={(filePath) => { /* Upload logic */ }} />
          <View>
            <Text className="text-lg font-bold text-neutral-800">{profile.username || 'User'}</Text>
            <Text className="text-sm text-neutral-500">{profile.email}</Text>
          </View>
        </View>

        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-neutral-700 mb-2">Account Settings</Text>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm text-neutral-600">Username</Text>
            <TextInput
              value={profile.username}
              onChangeText={(text) => setProfile({ ...profile, username: text })}
              placeholder="Enter your username"
              style={{ backgroundColor: '#F9F9F9', borderRadius: 8, padding: 10, flex: 1, textAlign: 'right' }}
            />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm text-neutral-600">Email</Text>
            <Text className="text-right text-neutral-800 font-semibold">
              {profile.email}  {/* Display email as read-only text */}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm text-neutral-600">Phone Number</Text>
            <TextInput
              value={profile.phone_number}
              onChangeText={(text) => setProfile({ ...profile, phone_number: text })}
              placeholder="Enter your phone number"
              style={{ backgroundColor: '#F9F9F9', borderRadius: 8, padding: 10, flex: 1, textAlign: 'right' }}
            />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm text-neutral-600">Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={pushNotifications ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm text-neutral-600">Next Payment Due</Text>
            <Text className="text-right text-neutral-800 font-semibold">
              {remainingDays !== null ? `${remainingDays} days left` : 'Loading...'}
            </Text>
          </View>
        </View>

        {/* Conditional Upgrade/Renewal Section */}
        {remainingDays !== null && remainingDays > 0 ? (
          <View className="bg-green-500 rounded-lg p-4 mb-6">
            <Text className="text-center text-white font-semibold">Your Subscription is Active</Text>
          </View>
        ) : (
          <TouchableOpacity className="bg-[#FF3B30] rounded-lg p-4 mb-6">
            <Text className="text-center text-white font-semibold">Renew Subscription</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleProfileUpdate}
          disabled={loading}
          className={`bg-[#262626] rounded-lg p-4 ${loading ? 'opacity-50' : ''}`}
        >
          <Text className="text-center text-white font-semibold">
            {loading ? 'Updating...' : 'Update Profile'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} className="mt-4 border border-[#262626] rounded-lg p-4">
          <Text className="text-center text-[#FF3B30] font-semibold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
