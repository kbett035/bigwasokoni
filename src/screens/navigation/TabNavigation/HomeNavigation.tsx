import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from '../../tabs/home/HomeScreen';
import OffersScreen from '../../tabs/offers/OffersScreen';
import HistoryScreen from '../../tabs/history/HistoryScreen';
import AlertScreen from '../../tabs/alerts/AlertScreen';
import ProfileScreen from '../../tabs/profile/ProfileScreen';

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,  // Disable header for all screens
        ...TransitionPresets.SlideFromRightIOS,  // iOS-like slide transition
        animationEnabled: true,  // Enable screen transition animations
        gestureEnabled: true,  // Enable swipe gestures to navigate back
        gestureDirection: 'horizontal',  // Swipe left or right to navigate between screens
      }}
    >
      {/* Define Stack Screens */}
      <Stack.Screen name="HomeS" component={HomeScreen} />
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Alerts" component={AlertScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
