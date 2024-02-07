import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainScreen from './Views/main-screen';
// import Test from './Views/test';
import Calendar from './Views/Calendar';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white' },
        tabBarLabelStyle: { fontSize: 16 },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: { backgroundColor: 'blue' },
        swipeEnabled: true, // スワイプでの画面遷移を許可
      }}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      {/* <Tab.Screen name="Test" component={Test} /> */}
      <Tab.Screen name="Calendar" component={Calendar} />
    </Tab.Navigator>
  );
}

export default App;