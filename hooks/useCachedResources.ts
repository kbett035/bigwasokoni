import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons'; // Correct import for FontAwesome

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Load fonts asynchronously
        await Font.loadAsync({
          PlusJakartaSans: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
          PlusJakartaSansExtrabold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
          PlusJakartaSansBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
          PlusJakartaBoldItalic: require('../assets/fonts/PlusJakartaSans-BoldItalic.ttf'), 
          PlusJakartaMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
          PlusJakartaSansMediumItalic: require('../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
          ...FontAwesome.font,
        });

      } catch (e) {
        console.warn(e); // You can log or handle the error here
      } finally {
        // Hide the splash screen once resources are loaded
        setIsLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
