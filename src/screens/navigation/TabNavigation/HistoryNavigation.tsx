import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import OffersScreen from '../../tabs/offers/OffersScreen';
import HistoryScreen from '../../tabs/history/HistoryScreen';

const Stack = createStackNavigator();

const HistorysNavigation = () => {
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
      <Stack.Screen name="HistoryS" component={HistoryScreen} />
      
    </Stack.Navigator>
  );
};

export default HistorysNavigation;

