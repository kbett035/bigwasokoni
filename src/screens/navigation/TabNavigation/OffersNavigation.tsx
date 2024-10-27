import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import OffersScreen from '../../tabs/offers/OffersScreen';

const Stack = createStackNavigator();

const OffersNavigation = () => {
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
      <Stack.Screen name="OffersS" component={OffersScreen} />
      
    </Stack.Navigator>
  );
};

export default OffersNavigation;
