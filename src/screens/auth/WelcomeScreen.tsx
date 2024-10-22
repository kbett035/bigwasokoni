import Button from '@/src/components/Button';
import ButtonOutline from '@/src/components/ButtonOutline';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Breaker from "../../components/Breaker"
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <StatusBar style="auto" />
      <View className="w-full px-4 items-center justify-center space-y-6 h-full">
        {/* Logo and Brand Name */}
        <View className="w-full px-4 items-center">
          <Animated.View
            entering={FadeInRight.duration(100).springify()}
            className="flex-row justify-center items-center"
          >
            <View >
              <View className="w-20 h-20 overflow-hidden">
                <Image
                  source={require("../../../assets/images/logo.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
            </View>
          </Animated.View>

        </View>

        {/* Welcome text */}
        <View className="items-center justify-center">
          <Animated.Text
            entering={FadeInDown.duration(100).delay(100).springify()}
            className="text-neutral-800 text-3xl font-medium leading-[60px]"
            style={{
              fontFamily: "PlusJakartaSansBold",
            }}
          >
            Welcome
          </Animated.Text>
        </View>
        {/* Login and Sign Up Button*/}

        <View className="w-full justify-start ">
          <Animated.View
            entering={FadeInDown.duration(100).delay(300).springify()

            }

            className="pb-6"
          >
            <Button title="Login" />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(400).springify()

            }
          >
            <ButtonOutline title="Sign Up" />
          </Animated.View>


        </View>
        {/* Breaker Line*/}
        <View>
          <Breaker />
        </View>
        {/* 3rd Party Auth*/}
        <View className="w-full justify-normal">
          <Animated.View
            entering={FadeInDown.duration(100).delay(600).springify()}
            className="border border-white pb-4"
          >
            <ButtonOutline title="Continue with Google">
              <AntDesign name="google" size={20} color="gray" />
            </ButtonOutline>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(700).springify()}
            className="border border-white pb-4"
          >
            <ButtonOutline title="Continue with Apple">
              <AntDesign name="apple1" size={20} color="gray" />
            </ButtonOutline>
          </Animated.View>

        </View>

      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
