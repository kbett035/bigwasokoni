import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ProfileScreen from '../../tabs/profile/ProfileScreen';

const Stack = createStackNavigator();

const ProfileNavigation = () => {
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
      {/* Define the single Profile Screen */}
      <Stack.Screen name="ProfileS" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
