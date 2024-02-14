import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from './src/Components/app-container';
import Navigator from './src';
import { deleteAllDataFromTable, databaseInit, createTask, printAllTasks } from './src/Utils/database_utils';
import OnBoarding1 from './src/Views/OnBoarding1';
import { ActivityIndicator, View } from 'react-native';
import OnBoarding2 from './src/Views/OnBoarding2';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const OnBoardingTabNavigator = createMaterialTopTabNavigator();

function OnBoardingTabs() {
  return (
    <OnBoardingTabNavigator.Navigator initialRouteName="Main"
    screenOptions={{
      tabBarStyle: { backgroundColor: 'white' },
      tabBarLabelStyle: { fontSize: 16 },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'black',
      tabBarIndicatorStyle: { backgroundColor: 'blue' },
      swipeEnabled: true,
      tabBarShowLabel: false,
    }}
    
    >
      <OnBoardingTabNavigator.Screen name="OnBoarding1" component={OnBoarding1} />
      <OnBoardingTabNavigator.Screen name="OnBoarding2" component={OnBoarding2} />
    </OnBoardingTabNavigator.Navigator>
  );
  }
  useEffect(() => {
    async function initializeDatabase() {
      try {
        await databaseInit();
        await deleteAllDataFromTable("tasks");
        await createTask("Test 1","priority 1",2024,2,12,"8:30 PM");
        await createTask("Test 2","priority 3",2024,2,15,"5:30 AM");
        await createTask("Test 3","priority 2",2024,2,15,"6:15 PM");
        await printAllTasks();
      } catch (error) {
        console.error("Database initialization failed:", error);
      }
    }

    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
        initializeDatabase();
      } else {
        setIsFirstLaunch(false);
      }
      // initializeDatabase();
    });
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppContainer>
      <NavigationContainer>
        {isFirstLaunch ? (
          <OnBoardingTabs />
        ) : (
          <Navigator />
        )}
      </NavigationContainer>
    </AppContainer>
  )

// Remove the extra closing curly brace
// }
        }      