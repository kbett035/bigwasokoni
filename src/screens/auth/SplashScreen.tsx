import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Image } from "expo-image"
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


const SplashScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme()

  const { navigate }: NavigationProp<SplashNavigationtype> = useNavigation();
const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
  useEffect(() => {
    //setTimeout(() => {
    //   navigate("Welcome");
    // }, 2000);
  }, []);

  return (
    < SafeAreaView className="flex-1 justify-center items-center bg-white">
      <StatusBar style="auto" />

      <View className="w-full px-4 items-center">

        <Animated.View
        className="flex-row justify-center items-center"
        >
          <View className="pr-2">
            <View className="w-20 h-20 overflow-hidden">
              <Image
              source={require("../../../assets/images/logo.png")}
              placeholder={{blurhash}}
              contentFit="cover"
              transition={1000}
              className="w-full h-full flex-1"
              />

            </View>

          </View>

        </Animated.View>
        <Animated.View>

        </Animated.View>
      </View>


    </SafeAreaView>
  );
}

export default SplashScreen;
