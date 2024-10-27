import useSupabaseAuth from '@/hooks/useSupabaseAuth';
import { useUserStore } from '@/store/useUserStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from "expo-image";
import Offers from '@/src/components/Offers';

const OfferScreen = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { getUserProfile } = useSupabaseAuth();
  const { session } = useUserStore();

  const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  // Function to fetch user profile
  async function handleGetProfile() {
    setLoading(true);
    try {
      const { data, error, status } = await getUserProfile();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false); // Ensures loading is set to false in both cases
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (session) {
        handleGetProfile();
      }
    }, [session])
  );

  // Function to get the greeting message based on the time of day
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 14) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Offers</Text>
        </View>
      </View>

      {/* Offers */}
      <View style={styles.offersContainer}>
        <Offers userId={''} onViewAll={() => { /* Handle View All */ }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // Add any other styles you want for your header here
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  offersContainer: {
    flex: 1,
    justifyContent: 'flex-end', // This makes the Offers component align at the bottom
  },
});

export default OfferScreen;
