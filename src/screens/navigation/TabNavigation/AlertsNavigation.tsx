import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AlertsScreen from '../../tabs/alerts/AlertsScreen';
 // Import the AlertsScreen

const Stack = createStackNavigator();

const AlertsNavigation = () => {
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
      <Stack.Screen name="AlertsS" component={AlertsScreen} />
      
    </Stack.Navigator>
  );
};

export default AlertsNavigation;
