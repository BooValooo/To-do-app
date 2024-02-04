import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainScreen from './Views/main-screen';
import Test from './Views/test';
import Calendar from './Views/Calendar';
// import OtherScreen from './Views/OtherScreen'; // 假设你有另一个页面

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
        swipeEnabled: true, // 确保启用了滑动
      }}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Test" component={Test} />
      <Tab.Screen name="Calendar" component={Calendar} />
    </Tab.Navigator>
  );
}

export default App;
