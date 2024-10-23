import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative">

        {/* Header */}
        <View className="w-full flex-row justufy-between items-center px-4">

          <View className="w-3/4 flex-row space-x-2">

        <View className="justify-center items-center">

          <View className="h-12 w-12 rounded-2xl overflow">

          </View>

        </View>
         
          </View>
        </View>

      </View>

    </SafeAreaView>
  );
}

export default HomeScreen;
