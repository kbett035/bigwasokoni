import useSupabaseAuth from '@/hooks/useSupabaseAuth';
import Avatar from '@/src/components/Avatar';
import { useUserStore } from '@/store/useUserStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from "expo-image";
import UsageGraph from '@/src/components/UsageGraph';

const HomeScreen = () => {
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

  // Refresh balance function
  const handleRefreshBalance = () => {
    console.log("Balance refreshed!");
    // Implement your logic here to refresh the balance.
  };

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
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative">

        {/* Header */}
        <View className="w-full flex-row justify-between items-center px-4">
          <View className="w-3/4 flex-row space-x-2">
            <View className="justify-center items-center">
              <View className="h-12 w-12 rounded-2xl overflow-hidden">
                <Avatar
                  url={avatarUrl}
                  size={50}
                  onUpload={function (filePath: string): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </View>
            </View>

            <View>
              <Text className="text-lg font-bold">Hi, {username ? username : "User"} 👋</Text>
              <Text className="text-sm text-neutral-500">{getGreetingMessage()}</Text>
            </View>
          </View>

          {/* Menu Icon */}
          <View className="py-6">
            <View className="bg-neutral-700 rounded-lg p-1">
              <Ionicons name="menu" size={24} color="white" />
            </View>
          </View>
        </View>

        {/* Balance */}
        <View className="mx-4 bg-neutral-800 rounded-[34px] overflow-hidden mt-4 mb-4">
          <View className="bg-[#0DF69E] py-6 px-4 rounded-[34px] justify-center items-center">
            {/* Airtime Balance Title */}
            <Text className="text-sm font-medium text-neutral-700">
              Airtime Balance
            </Text>

            {/* Balance and Refresh Icon Row */}
            <View className="flex-row items-center space-x-2 mt-2">
              <Text className="text-3xl font-extrabold">
                2,345.00
              </Text>

              {/* Refresh Icon */}
              <TouchableOpacity onPress={handleRefreshBalance}>
                <Ionicons name="refresh" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="justify-between items-center flex-row py-4">
            {/* Send To */}
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/money-send.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">Send To</Text>
            </View>
            {/* Request */}
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/money-receive.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">Request</Text>
            </View>
            {/* Top Up */}
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/card-add.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">Top Up</Text>
            </View>
            {/* More */}
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/more.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">More</Text>
            </View>
          </View>
        </View>

        {/* Transactions Section */}
        {session && session.user && (
          <View className="w-full justify-center items-center mt-4"> 
          <UsageGraph/> 
          </View>
        )}
      </View>
      
    </SafeAreaView>
  );
};

export default HomeScreen;
