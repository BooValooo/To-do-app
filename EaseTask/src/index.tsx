import React from 'react';
import{createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './Views/main-screen';
import Calendar from './Views/Calendar';
import Settings from './Views/Settings';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      

      // ...

            screenOptions={{
              // tabBarStyle: { backgroundColor: 'white' },
              tabBarLabelStyle: { fontSize: 16 },
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'black',
              tabBarShowLabel: false,
              headerShown: false,
              tabBarStyle: { position: 'absolute', backgroundColor: '#ababab' }, // Add backgroundColour only for Android
              tabBarBackground: () => (
                <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />
              ),
              // headerShown: false,
              
            }}
    >
      <Tab.Screen name="Main" component={MainScreen} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home-outline" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Calendar" component={Calendar} options={{
        tabBarLabel: 'Calendar',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-month-outline" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Settings" component={Settings} options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-settings-outline" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}

export default Navigator;
