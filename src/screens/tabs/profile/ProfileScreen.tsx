import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/useUserStore';
import useSupabaseAuth from '@/hooks/useSupabaseAuth';

const ProfileScreen = () => {
  const { getUserProfile, updateProfile, changePassword, signOut, getSubscriptionData } = useSupabaseAuth();
  const { session } = useUserStore();

  const [profile, setProfile] = useState({
    fullName: '',
    username: '',
    email: '',
    phone_number: '',
    avatar_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [remainingDays, setRemainingDays] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const { data: profileData, error: profileError } = await getUserProfile();
        const { data: subscriptionData, error: subscriptionError } = await getSubscriptionData();

        if (profileError) throw new Error(profileError.message);
        if (subscriptionError || !subscriptionData) {
          setHasSubscription(false);
        } else {
          setHasSubscription(true);
          calculateRemainingDays(subscriptionData.end_date);
        }

        setProfile({
          fullName: profileData.fullName || '',
          username: profileData.username || '',
          email: profileData.email || '',
          phone_number: profileData.phone_number || '',
          avatar_url: profileData.avatar_url || '',
        });
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchProfileData();
  }, [session]);

  const calculateRemainingDays = (endDate) => {
    const due = new Date(endDate);
    const today = new Date();
    const differenceInTime = due - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    setRemainingDays(differenceInDays);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    const { error } = await updateProfile(profile);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Profile updated successfully!");
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    setLoading(true);
    const { error } = await changePassword(password, newPassword);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Password changed successfully!");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: profile.avatar_url || 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{profile.fullName || 'User'}</Text>
          <Text style={styles.profileUsername}>{profile.username}</Text>
        </View>

        {/* User Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.infoText}>{profile.email}</Text>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.infoText}>{profile.phone_number}</Text>
        </View>

        {/* Account Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          <TextInput
            placeholder="Update Name"
            value={profile.fullName}
            onChangeText={(text) => setProfile({ ...profile, fullName: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Current Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity onPress={handleProfileUpdate} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangePassword} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Subscription Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription Details</Text>
          <Text style={styles.infoText}>
            {hasSubscription ? (remainingDays > 0 ? `Active: ${remainingDays} days remaining` : 'Subscription Expired') : 'No Active Subscription'}
          </Text>
        </View>

        {/* Support and Help Center Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support and Help Center</Text>
          <TouchableOpacity onPress={() => Alert.alert("Support", "Redirecting to support...")} style={styles.link}>
            <Text style={styles.linkText}>FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Support", "Redirecting to support...")} style={styles.link}>
            <Text style={styles.linkText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFdFF',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileUsername: {
    color: '#888',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
