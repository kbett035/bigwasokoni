import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeNavigation from './HomeNavigation';
import OffersNavigation from './OffersNavigation';
import HistoryNavigation from './HistoryNavigation';
import AlertsNavigation from './AlertsNavigation';
import ProfileNavigation from './ProfileNavigation';
import { TransitionPresets } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Offers: "pricetags-outline",
            Alerts: "notifications-outline",
            History: "time-outline",
            Profile: "person-outline", // Ensured it's from the Ionicons set
          };

          return {
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              const iconName = icons[route.name]; // Ensuring that the name is from the predefined set
              const customizeSize = 25;
              return (
                <Ionicons
                  name={iconName}
                  size={customizeSize}
                  color={focused ? "#164b48" : "gray"}
                />
              );
            },
            tabBarActiveTintColor: "#164b48",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "bold"
            },
            ...TransitionPresets.SlideFromRightIOS,
            animationEnable: true,
            gestureEnable: true,
            gestureDirection: "horizontal"
          };
        }
      }
    >
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Offers" component={OffersNavigation} />
      <Tab.Screen name="History" component={HistoryNavigation} />
      <Tab.Screen name="Alerts" component={AlertsNavigation} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
