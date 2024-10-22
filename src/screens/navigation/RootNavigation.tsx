import React, { useState } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation'; // Ensure these imports are correct
import TabNavigation from './TabNavigation';
import { useUserStore } from '@/store/useUserStore';

// Initialize the stack navigator
const Stack = createStackNavigator();

const RootNavigation = () => {
    const {session} = useUserStore();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    animationEnabled: true,
                    gestureEnabled: true,
                    gestureDirection: "horizontal"
                }}>
                {session && session.user? (
                    // If authenticated, show the TabNavigation (e.g., for app's main flow)
                    <Stack.Screen
                        name="TabNavigation"
                        component={TabNavigation}
                    // options={{ headerShown: false }} // Customize screen options as needed
                    />
                ) : (
                    // If not authenticated, show AuthNavigation (e.g., login/signup)
                    <Stack.Screen
                        name="AuthNavigation"
                        component={AuthNavigation}
                    // options={{ headerShown: false }} // Hide header for auth screens
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation;
